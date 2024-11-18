import { z } from 'zod';

export const CharacterIdSchema = z.string().uuid();

export const CharacterParamSchema = z.object({
  id: CharacterIdSchema,
});

export const CreateCharacterSchema = z.object({
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
});

export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;

export const CharacterSchema = z.intersection(
  CreateCharacterSchema,
  z.object({
    id: CharacterIdSchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  })
);

export type Character = z.infer<typeof CharacterSchema>;

export const CharactersSchema = z.array(CharacterSchema);

export type Characters = z.infer<typeof CharactersSchema>;
