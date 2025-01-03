import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface RelatedPost {
  title: string;
  id: string;
  image: any;
  shares: string;
  ctaText: string;
}

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">You may also like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group">
            <div className="relative aspect-video mb-4">
              <Image
                src={urlFor(post.image).url()}
                alt={post.title}
                fill
                className="object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                priority
              />
            </div>
            <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            <h6 className="text-sm text-gray-500">{post.ctaText}</h6>
            <time className="text-sm text-gray-500">{post.shares}</time>
          </Link>
        ))}
      </div>
    </section>
  );
}
