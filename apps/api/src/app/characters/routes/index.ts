import { CharactersSchema } from '@acme/characters-api';
import { FastifyInstance } from "fastify";

export default async function charactersRouteModule(fastify: FastifyInstance) {
  fastify.get("/", {
    schema: {
      response: {
        200: CharactersSchema
      }
    }
  }, async (request, reply) => {
    return { hello: "world" };
  })
}
