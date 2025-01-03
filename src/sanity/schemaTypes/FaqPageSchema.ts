
export default {
    name: 'faq',
    type: 'document',
    title: 'FAQ',
    fields: [
      {
        name: 'question',
        type: 'string',
        title: 'Question',
        validation: (Rule: any) => Rule.required().max(150).warning('Keep the question concise'),
      },
      {
        name: 'answer',
        type: 'text',
        title: 'Answer',
        validation: (Rule: any) => Rule.required(),
      },
    ],
  };
  