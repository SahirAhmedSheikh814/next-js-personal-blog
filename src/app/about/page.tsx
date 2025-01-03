import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import SectionHeading from "@/components/Helper/SectionHeading";
import { TypedObject } from "@portabletext/types";

interface AboutMeData {
  name: string;
  bio: string;
  profileImage: string;
  introduction: TypedObject | TypedObject[];
  skills: string[];
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  hobbies: string[];
}

const socialIcons = {
  github: FaGithub,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
} as const;

export default async function AboutMeContent() {
  const query = groq`
    *[_type == "aboutMe"][0] {
      name,
      bio,
      profileImage,
      introduction,
      skills,
      socialLinks[] {
        platform,
        url
      },
      hobbies
    }
  `;
  
  const about: AboutMeData = await client.fetch(query);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="container mx-auto mt-6 px-4 py-8">
          <div className="text-center mb-8">
            <Image
              src={urlFor(about.profileImage).url()}
              alt={`${about.name}'s Profile`}
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
              priority
            />
            <h1 className="text-3xl font-bold mb-2">{about.name}</h1>
            <p className="text-xl text-gray-600">{about.bio}</p>
          </div>

          <div className="mb-8">
            <div className="mt-12">
              <SectionHeading>About Me</SectionHeading>
            </div>
            <div className="mt-12 prose max-w-none">
              <PortableText value={about.introduction} />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 cursor-pointer text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Connect with Me</h2>
            <div className="flex gap-4">
              {about.socialLinks.map((link, index) => {
                const platform = link.platform.toLowerCase() as keyof typeof socialIcons;
                const Icon = socialIcons[platform];
                const hoverClass = {
                  instagram: "hover:text-red-500",
                  github: "hover:text-gray-800",
                  facebook: "hover:text-blue-500",
                  linkedin: "hover:text-blue-500"
                }[platform] || "hover:text-gray-600";

                return Icon ? (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-600 transition-colors ${hoverClass}`}
                  >
                    <Icon size={24} />
                  </a>
                ) : null;
              })}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Hobbies & Interests</h2>
            <ul className="list-disc list-inside">
              {about.hobbies.map((hobby, index) => (
                <li key={index} className="mb-2">
                  {hobby}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}