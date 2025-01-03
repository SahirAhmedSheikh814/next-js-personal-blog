export default {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        description: 'Full name of the author',
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'text',
        description: 'Short biography of the author',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
        description: 'Profile picture of the author',
      },
    ],
  };
  