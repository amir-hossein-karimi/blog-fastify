import { FastifyReply, FastifyRequest } from "fastify";

export const registerController = (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  // const { email, password } = req.body;

  reply.status(201).send({
    message: "User crated successfully",
  });
};
