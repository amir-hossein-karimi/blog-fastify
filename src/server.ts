import "dotenv/config";
import Fastify from "fastify";
import { prisma } from "./lib/prisma";
import authRoutes from "./routes/auth.route";

const app = Fastify({ logger: true });

const SERVER_PORT: string = process.env.SERVER_PORT || "8000";

app.get("/", async () => {
  return { message: "Blog API is running" };
});

app.get("/health", async () => {
  await prisma.$queryRaw`SELECT 1`;

  return {
    status: "ok",
    database: "connected",
  };
});

app.register(authRoutes, { prefix: "/auth" });

const start = async () => {
  try {
    await app.listen({ port: +SERVER_PORT });
  } catch (error) {
    app.log.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

const shutdown = async () => {
  await app.close();
  await prisma.$disconnect();
};

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());

void start();
