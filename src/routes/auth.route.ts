import { FastifyPluginAsync } from "fastify";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller";

const authRoutes: FastifyPluginAsync = async (app) => {
  app.post("/register", { schema: registerSchema }, registerController);
  app.post("/login", { schema: loginSchema }, loginController);
};

export default authRoutes;
