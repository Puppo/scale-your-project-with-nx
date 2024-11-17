import { z } from 'zod';

export const CharacterSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Character = z.infer<typeof CharacterSchema>;

export const CharactersSchema = z.array(CharacterSchema);

export type Characters = z.infer<typeof CharactersSchema>;
