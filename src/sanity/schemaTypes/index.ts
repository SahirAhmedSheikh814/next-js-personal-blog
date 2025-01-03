import { type SchemaTypeDefinition } from 'sanity'
import HeroPageSchema from './HeroPageSchema'
import BlogPageSchema from './BlogPageSchema'
import AuthorSchema from './AuthorSchema'
import AboutPageSchema from './AboutPageSchema'
import BlockContent from './BlockContent'
import FaqPageSchema from './FaqPageSchema'
import navbarLogoSchema from './NavbarLogoSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [HeroPageSchema,BlogPageSchema,AuthorSchema,BlockContent,AboutPageSchema,FaqPageSchema,navbarLogoSchema],
}
