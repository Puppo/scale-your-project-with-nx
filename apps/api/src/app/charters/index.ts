import autoLoad from "@fastify/autoload";
import { FastifyInstance } from "fastify";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "infrastructure");

export default async function routesModule(fastify: FastifyInstance) {
  fastify.register(autoLoad, {
    dir: join(__dirname, "routes"),
    options: { prefix: "/characters" },
    forceESM: true,
  });

}
