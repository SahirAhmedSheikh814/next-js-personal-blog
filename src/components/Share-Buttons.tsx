"use client";

import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Linkedin, Github, Link2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  slug: string;
  socialLinks: Array<{ platform: string; url: string }>;
}

export function ShareButtons({slug, socialLinks }: ShareButtonsProps) {
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/blog/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "github":
        return <Github className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-2 mb-8">
      {socialLinks.map((link) => (
        <Button
          key={link.platform}
          variant="secondary"
          size="icon"
          onClick={() => window.open(link.url, "_blank")}
          className={`
            hover:bg-opacity-10 transition-colors duration-200
            ${link.platform.toLowerCase() === "instagram" && "hover:bg-red-500  hover:text-red-500"}
            ${link.platform.toLowerCase() === "facebook" && "hover:bg-blue-600  hover:text-blue-600"}
            ${link.platform.toLowerCase() === "linkedin" && "hover:bg-blue-700  hover:text-blue-700"}
            ${link.platform.toLowerCase() === "github" && "hover:bg-gray-700  hover:text-gray-700"}
          `}
        >
          {getIcon(link.platform)}
        </Button>
      ))}
      <Button
        variant="secondary"
        size="icon"
        onClick={handleCopyLink}
        className="hover:bg-gray-700 hover:border-gray-700 hover:text-gray-700 hover:bg-opacity-10 transition-colors duration-200"
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
