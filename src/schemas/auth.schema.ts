import type { FastifySchema } from "fastify";
import { errorsSchema } from "../lib/errors.schema";

export const registerSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    additionalProperties: false,
    properties: {
      name: {
        type: "string",
        minLength: 1,
        maxLength: 100,
      },
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
      required: ["message", "user"],
      additionalProperties: false,
      properties: {
        message: { type: "string" },
        user: {
          type: "object",
          required: ["id", "name", "email", "role", "createdAt"],
          additionalProperties: false,
          properties: {
            id: { type: "integer" },
            email: { type: "string" },
            name: { type: "string" },
            role: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    ...errorsSchema,
  },
};
