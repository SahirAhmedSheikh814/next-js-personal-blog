import { Rule } from '@sanity/types';

const heroPageSchema = {
  name: 'heroPage',
  title: 'Hero Page',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(5).max(100),
    },
    {
      name: 'paragraph',
      title: 'Paragraph',
      type: 'text',
      validation: (Rule: Rule) => Rule.required().min(10).max(500),
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().max(50),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image cropping in Sanity Studio
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};

export default heroPageSchema;
