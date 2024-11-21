import { randomUUID } from 'crypto'
import { describe, expectTypeOf, it } from 'vitest'

import { Characters, CharactersSchema } from './characters'

describe('characters', () => {

  describe('type', () => {
    it('should have the correct ts types', () => {
      expectTypeOf<Characters>()
        .toEqualTypeOf<{
          id: string
          name: string
          description: string
          image: string
          createdAt: Date
          updatedAt: Date
        }>()
    })
  })

  describe('schema', () => {
    it('should parse a correct schema', () => {
      const date = new Date()
      const id = randomUUID()
      expect(CharactersSchema.parse([{
        id,
        name: 'name',
        description: 'description',
        imageUrl: 'https://image.com',
        createdAt: date,
        updatedAt: date,
      }]))
        .toEqual([{
          id,
          name: 'name',
          description: 'description',
          imageUrl: 'https://image.com',
          createdAt: date,
          updatedAt: date,
        }])
    })

    it('should throw an error if the schema is incorrect', () => {
      expect(() => CharactersSchema.parse({
        id: 'invalid',
        name: 'name',
        description: 'description',
        image: 'https://image.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
        .toThrowError()
    })
  })


})
