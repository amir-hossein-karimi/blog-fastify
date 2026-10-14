import type { FastifySchema } from "fastify";
import { errorsSchema } from "../lib/errors.schema";

export const registerSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    additionalProperties: false,
    properties: {
      email: {
        type: "string",
        format: "email",
        maxLength: 254,
      },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 72,
      },
    },
  },
  response: {
    201: {
      type: "object",
      required: ["message"],
      additionalProperties: false,
      properties: {
        message: { type: "string" },
      },
    },
    ...errorsSchema,
  },
};
