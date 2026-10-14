import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from "../generated/prisma/client";
import { errorResponse, normalizedString } from "../lib/utilities";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt";

interface RegisterBody {
  name?: string;
  email: string;
  password: string;
}

export const registerController = async (
  req: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedString(email) },
    });

    if (existingUser) {
      return reply
        .status(409)
        .send(errorResponse<string>("This email already exists"));
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: (name || "").trim(),
        email: normalizedString(email),
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    console.log({ user });

    return reply.status(201).send({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return reply
        .status(409)
        .send(
          errorResponse<string>("An account with this email already exists"),
        );
    }

    throw error;
  }
};

export const loginController = async (
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply,
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedString(email),
    },
  });

  if (!user) {
    return reply.status(401).send(errorResponse("Invalid email or password"));
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return reply.status(401).send(errorResponse("Invalid email or password"));
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  reply.status(200).send({
    message: "login successfully",
    data: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });
};
