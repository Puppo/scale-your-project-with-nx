import { CharactersSchema, CreateCharacterSchema } from '@acme/characters-api';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

const routePlugin: FastifyPluginAsyncZod = async function (fastify) {
  fastify.post("/", {
    schema: {
      body: CreateCharacterSchema,
      response: {
        200: CharactersSchema
      }
    }
  }, ({ body: { name, description, imageUrl } }) => {
      fastify.log.info('POST /characters');
      return fastify.db.insertInto('characters').values({
        description,
        name,
        image_url: imageUrl
      })
      .returning(['id', 'name', 'description', 'image_url as imageUrl', 'created_at as createdAt', 'updated_at as updatedAt'])
      .execute();
  })
}

export default routePlugin;
