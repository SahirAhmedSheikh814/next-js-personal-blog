const navbarLogoSchema = {
    name: 'navbarLogo',
    title: 'Navbar Logo',
    type: 'document',
    fields: [
      {
        name: 'logo',
        title: 'Logo Image',
        type: 'image',
        options: {
          hotspot: true, // Enable cropping in Sanity Studio
        },
      },
    ],
  };
  
  export default navbarLogoSchema;
  