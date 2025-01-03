import React from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { CommentSection } from "@/components/Comment-Section";
import { Newsletter } from "@/components/Newsletter";
import { RelatedPosts } from "@/components/RelatedPosts";
import { Share2, Github, Linkedin, Facebook, Instagram } from "lucide-react";
import { TypedObject } from "@portabletext/types";

interface BlogPost {
  title: string;
  id: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  description: string;
  content: TypedObject | TypedObject[];
  shares: number;
  relatedPosts: RelatedPost[];
}

interface RelatedPost {
  title: string;
  id: string;
  image: string;
  shares: number;
  ctaText: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface BlogPostResponse {
  post: BlogPost;
  socialLinks: SocialLink[];
}

// Social Icons Configuration
const socialIcons = {
  github: Github,
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

type SocialPlatform = keyof typeof socialIcons;
type HoverClassMap = Record<SocialPlatform, string>;

const hoverClassMap: HoverClassMap = {
  instagram: "hover:text-red-500",
  github: "hover:text-gray-800",
  facebook: "hover:text-blue-500",
  linkedin: "hover:text-blue-500",
};

// Social Links Component
function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <div className="flex gap-4 mb-8">
      {links.map((link, index) => {
        const platform = link.platform.toLowerCase() as SocialPlatform;
        const Icon = socialIcons[platform];
        const hoverClass = hoverClassMap[platform] || "hover:text-gray-600";

        return Icon ? (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-600 transition-colors ${hoverClass}`}
            aria-label={`Visit our ${platform} page`}
          >
            <Icon size={24} />
          </a>
        ) : null;
      })}
    </div>
  );
}

// Fetch blog post data
async function getBlogPost(id: string): Promise<BlogPostResponse> {
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
  const { post, socialLinks } = await getBlogPost(params.id);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-screen w-full overflow-hidden">
        <div className="relative w-full h-[100vh]">
          <Image
            src={urlFor(post.image).url()}
            alt={post.title}
            fill
            style={{
              objectFit: "cover", // Ensures the image covers the container
              filter: "brightness(0.7)",
            }}
            quality={100}
            priority
            fetchPriority="high"
          />
        </div>

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

        <SocialLinks links={socialLinks} />

        {post.tags && (
          <div className="flex gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-400 cursor-pointer rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none mb-12">
          <PortableText value={post.content} />
        </div>

        <CommentSection postSlug={params.id} />
        <Newsletter />
        <RelatedPosts posts={post.relatedPosts} />
      </article>
    </div>
  );
}
