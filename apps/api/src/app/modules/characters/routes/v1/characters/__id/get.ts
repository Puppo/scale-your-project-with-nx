import { CharacterParamSchema, CharacterSchema } from '@acme/characters-api';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

const routePlugin: FastifyPluginAsyncZod = async function (fastify) {
  fastify.get("/", {
    schema: {
      params: CharacterParamSchema,
      response: {
        200: CharacterSchema
      }
    }
  }, ({ params: { id } }) => {
      fastify.log.info(`GET /characters/${id}`);
      return fastify.db.selectFrom('characters')
        .select([
          'id',
          'name',
          'description',
          'image_url as imageUrl',
          'created_at as createdAt',
          'updated_at as updatedAt'
        ])
        .where('id', '=', id)
        .executeTakeFirst();
  })
}

export default routePlugin;
