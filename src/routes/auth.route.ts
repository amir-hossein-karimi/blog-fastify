import { FastifyPluginAsync } from "fastify";
import { registerSchema } from "../schemas/auth.schema";
import { registerController } from "../controllers/auth.controller";

const authRoutes: FastifyPluginAsync = async (app) => {
  app.post("/register", { schema: registerSchema }, registerController);
};

export default authRoutes;
