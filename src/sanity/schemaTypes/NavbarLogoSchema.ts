export default {
  name: "navbarLogo",
  title: "Navbar Logo",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string", // This will store the title of the logo
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true, // Enables cropping the image
      },
    },
  ],
};
