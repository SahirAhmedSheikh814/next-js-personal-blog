import { Rule } from "sanity";

const faqSchema = {
  name: 'faq',
  type: 'document',
  title: 'FAQ',
  fields: [
    {
      name: 'question',
      type: 'string',
      title: 'Question',
      validation: (Rule: Rule) => Rule.required().max(150).warning('Keep the question concise'),
    },
    {
      name: 'answer',
      type: 'text',
      title: 'Answer',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};

export default faqSchema;
