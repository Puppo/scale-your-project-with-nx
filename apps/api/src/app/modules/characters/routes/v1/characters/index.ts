import { CharactersSchema } from '@acme/characters-api';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

const routePlugin: FastifyPluginAsyncZod = async function (fastify) {
  fastify.get("/", {
    schema: {
      response: {
        200: CharactersSchema
      }
    }
  }, () => {
      fastify.log.info('GET /characters');
      return fastify.db.selectFrom('characters')
        .select([
          'id',
          'name',
          'description',
          'image_url as imageUrl',
          'created_at as createdAt',
          'updated_at as updatedAt'
        ])
        .execute();
  })
}

export default routePlugin;
