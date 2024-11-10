import { z } from 'zod';

export const CharactersSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Characters = z.infer<typeof CharactersSchema>;
