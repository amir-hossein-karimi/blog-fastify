export const errorsSchema = {
  400: {
    type: "object",
    required: ["message"],
    properties: {
      message: { type: "string" },
    },
  },
  401: {
    type: "object",
    required: ["message"],
    properties: {
      message: { type: "string" },
    },
  },
  403: {
    type: "object",
    required: ["message"],
    properties: {
      message: { type: "string" },
    },
  },
  404: {
    type: "object",
    required: ["message"],
    properties: {
      message: { type: "string" },
    },
  },
  409: {
    type: "object",
    required: ["message"],
    properties: {
      message: { type: "string" },
    },
  },
  500: {
    type: "object",
    required: ["message"],
    properties: {
      message: { type: "string" },
    },
  },
};
