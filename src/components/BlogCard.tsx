"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity/lib/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share } from "lucide-react";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <article
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all 
    duration-300 border border-gray-100"
    >
      {/* Image Container with Hover Overlay */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={urlFor(post.image).url()}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Hover Overlay */}
        <div
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center 
        justify-center p-6"
        >
          <p className="text-white text-center line-clamp-4">
            {post.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </h2>

        {/* Author and Meta Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={urlFor(post.author.image).url()}
                alt={post.author.name}
              />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm text-gray-600">{post.author.name}</div>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Share className="h-4 w-4" />
            <span className="text-sm">{post.shares}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* View Post Link */}
        <Link
          href={`/blog/${post.id}`}
          className="text-sm text-black-600 nav__link active:underline"
        >
          View Post
        </Link>
      </div>
    </article>
  );
}
