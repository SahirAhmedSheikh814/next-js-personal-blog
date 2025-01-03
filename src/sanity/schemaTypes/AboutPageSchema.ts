const aboutPageSchema = {
  name: 'aboutMe',
  title: 'About Me',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Your full name',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'A short bio about yourself',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a profile picture',
    },
    {
      name: 'introduction',
      title: 'Introduction',
      type: 'blockContent',
      description: 'A detailed introduction about yourself and your blog',
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List your key skills',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            {
              name: 'followers',
              title: 'Followers',
              type: 'string',
              description: 'Number of followers on this platform',
            },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
      description: 'Links to your social media profiles',
    },
    {
      name: 'hobbies',
      title: 'Hobbies',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of your hobbies or interests',
    },
  ],
};

export default aboutPageSchema;
