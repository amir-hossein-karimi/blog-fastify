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

export const loginSchema: FastifySchema = {
  body: {
    type: "object",
    additionalProperties: false,
    required: ["email", "password"],
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
    200: {
      type: "object",
      required: ["message", "data"],
      additionalProperties: false,
      properties: {
        message: { type: "string" },
        data: {
          type: "object",
          required: ["accessToken", "refreshToken"],
          additionalProperties: false,
          properties: {
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
          },
        },
      },
    },
    ...errorsSchema,
  },
};
