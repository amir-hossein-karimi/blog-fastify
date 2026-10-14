import Fastify from "fastify";
import { config } from "dotenv";

config();

const SERVER_PORT: string = process.env.SERVER_PORT || "8000";

const app = Fastify({
  logger: true,
});

app.get("/", async () => {
  return {
    message: "Blog API is running",
  };
});

const start = async () => {
  try {
    await app.listen({
      port: +SERVER_PORT,
    });
    console.log(`Server is running on port ${SERVER_PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
