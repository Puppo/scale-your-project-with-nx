import autoLoad from "@fastify/autoload";
import { FastifyInstance } from "fastify";
import { join } from "path";

export default async function routesModule(fastify: FastifyInstance) {
  fastify.register(autoLoad, {
    dir: join(__dirname, "routes"),
    options: { prefix: "api/" },
    forceESM: true,
    routeParams: true,
  });

}
