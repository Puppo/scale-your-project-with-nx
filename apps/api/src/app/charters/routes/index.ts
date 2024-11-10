import { FastifyInstance } from "fastify";


export default async function charactersRouteModule(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  })
}
