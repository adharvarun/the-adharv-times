import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './schemaTypes/postType'
import { categoryType } from './schemaTypes/categoryType'
import { authorType } from './schemaTypes/authorType'
 
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, categoryType, authorType],
} 