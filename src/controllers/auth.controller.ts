import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from "../generated/prisma/client";

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
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return reply.status(409).send({
        message: "This email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: (name || "").trim(),
        email: normalizedEmail,
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
      return reply.status(409).send({
        message: "An account with this email already exists",
      });
    }

    throw error;
  }
};
