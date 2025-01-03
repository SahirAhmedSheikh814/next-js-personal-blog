import { defineArrayMember } from "sanity";
import { Rule } from "sanity";

const blogPostSchema = {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title of the blog post',
    },
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'Unique identifier for the blog post, used in URLs',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'Reference to the author of the post',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'Date of publication',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Main image of the blog post',
      options: { hotspot: true },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for categorizing the blog post',
      validation: (Rule: Rule) => Rule.max(11).error('Too many tags. Maximum is 11.'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description of the blog post',
    },
    {
      name: 'ctaText',
      title: 'Call To Action Text',
      type: 'string',
      description: 'Text for the View Post button or similar actions',
    },
    {
      name: 'shares',
      title: 'Shares',
      type: 'string',
      description: 'Share count in a readable format (e.g., <1K shares)',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    },
  ],
};

export default blogPostSchema;
