import BlogCard from "@/components/BlogCard";
import { client } from "@/sanity/lib/client";

export default async function BlogGrid() {
  const query = `*[_type == 'blogPost' ] | order(_createdAt asc) {
    description,
    title,
    id,
    image,
    date,
    shares,
    "author":author-> {
      name,
      image
    }
  }`;

  const posts: Post[] = await client.fetch(query);
  //   console.log("postss", posts)
  return (
    <div className="flex min-h-screen mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
