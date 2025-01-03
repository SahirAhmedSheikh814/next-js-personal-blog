import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const socialIcons = {
  github: FaGithub,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
};

const socialLinksQuery = groq`
*[_type == "aboutMe"][0] {
  socialLinks[] {
    platform,
    url,
    followers
  }
}
`;

interface SocialLink {
  platform: string;
  url: string;
  followers: string;
}

export default async function Footer() {
  const { socialLinks }: { socialLinks: SocialLink[] } =
    await client.fetch(socialLinksQuery);

  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              Designed & Developed by{" "}
              <span className="font-semibold text-white">
                Sahir Ahmed Sheikh
              </span>
            </p>
          </div>

          <div className="flex items-center gap-8">
            {socialLinks.map((link, index) => {
              const platform =
                link.platform.toLowerCase() as keyof typeof socialIcons;
              const Icon = socialIcons[platform];

              const hoverClass =
                platform === "instagram"
                  ? "hover:text-red-500"
                  : platform === "github"
                    ? "hover:text-gray-400"
                    : platform === "facebook" || platform === "linkedin"
                      ? "hover:text-blue-500"
                      : "hover:text-gray-400";

              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 transition-colors duration-300"
                >
                  <div
                    className={`transition-colors duration-300 ${hoverClass}`}
                  >
                    {Icon && <Icon size={20} />}
                  </div>
                  <span className="text-sm font-medium">{link.followers}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
