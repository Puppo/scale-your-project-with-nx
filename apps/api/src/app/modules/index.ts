import { FastifyInstance } from "fastify";
import { join } from "path";

export default async function modulesPlugin(fastify: FastifyInstance) {
  fastify.register(require(join(__dirname, "characters")));
}
