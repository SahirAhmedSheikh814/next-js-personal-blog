import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { CommentSection } from "@/components/Comment-Section";
import { Newsletter } from "@/components/Newsletter";
import { RelatedPosts } from "@/components/RelatedPosts";
import { Share2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  instagram: FaInstagram,
};

// Fetch single blog post and social links
async function getBlogPost(id: string) {
  return await client.fetch(
    groq`{
      "post": *[_type == "blogPost" && id == $id][0]{
        title,
        id,
        "author": author->name,
        date,
        image,
        tags,
        description,
        content,
        shares,
        "relatedPosts": *[_type == "blogPost" && id != $id][0...3]{
          title,
          id,
          image,
          shares,
          ctaText
        }
      },
      "socialLinks": *[_type == "aboutMe"][0].socialLinks
    }`,
    { id }
  );
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const {
    post,
    socialLinks,
  }: { post: any; socialLinks: { platform: string; url: string }[] } =
    await getBlogPost(params.id);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <Image
          src={urlFor(post.image).url()}
          alt="Hero section Background"
          width={1200} // Define a width for the image (adjust as needed)
          height={800} // Define the height based on the aspect ratio you want (adjust as needed)
          style={{
            objectFit: "cover",
            filter: "brightness(0.7)",
            width: "100%",
            height: "100%",
          }}
          quality={100}
          priority
          fetchPriority="high"
        />
        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-2 max-w-7xl mx-auto drop-shadow-lg">
          <div className="text-center mt-30">
            <h1 className="text-2xl sm:text-4xl md:text-6xl leading-[84px] font-bold text-[64px] tracking-[0.5px] text-white mb-4 drop-shadow-lg max-w-6xl">
              {post.title}
            </h1>
            <p className="text-xl mt-4 md:text-2xl font-light max-w-4xl mx-auto">
              {post.description}
            </p>
            <div className="flex items-center mt-4 justify-center space-x-4 text-sm md:text-base">
              <span>By {post.author}</span>
              <span>•</span>
              <time>{new Date(post.date).toLocaleDateString()}</time>
              <span>•</span>
              <Share2 className="w-4 h-4" />
              <span>{post.shares}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-4 py-8">
        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <span>By {post.author}</span>
            <span>•</span>
            <time>{new Date(post.date).toLocaleDateString()}</time>
            {post.shares && (
              <>
                <span>•</span>
                <Share2 className="w-4 h-4" />
                <span>{post.shares}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-4 mb-8 ">
          {socialLinks.map((link, index) => {
            const platform =
              link.platform.toLowerCase() as keyof typeof socialIcons;
            const Icon = socialIcons[platform];
            const hoverClass =
              platform === "instagram"
                ? "hover:text-red-500"
                : platform === "github"
                  ? "hover:text-gray-800"
                  : platform === "facebook" || platform === "linkedin"
                    ? "hover:text-blue-500"
                    : "hover:text-gray-600"; // Default hover color
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 transition-colors ${hoverClass}`}
                aria-label={`Visit our ${platform} page`}
              >
                {Icon && <Icon size={24} />}
              </a>
            );
          })}
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="flex gap-2 mb-8">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-400 cursor-pointer rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Post Content */}
        <div className="prose dark:prose-invert max-w-none mb-12">
          <PortableText value={post.content} />
        </div>

        {/* Comments Section */}
        <CommentSection postSlug={params.id} />

        {/* Newsletter */}
        <Newsletter />

        {/* Related Posts */}
        <RelatedPosts posts={post.relatedPosts} />
      </article>
    </div>
  );
}
