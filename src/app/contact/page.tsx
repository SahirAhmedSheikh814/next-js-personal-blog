import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import ContactForm from "@/components/Contact-form";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import SectionHeading from "@/components/Helper/SectionHeading";

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
    url
  }
}
`;

export default async function ContactPage() {
  const { socialLinks }: { socialLinks: { platform: string; url: string }[] } =
    await client.fetch(socialLinksQuery);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mt-12">
          <SectionHeading>Get in Touch</SectionHeading>
        </div>
        <p className="text-xl text-center mt-12 mb-12 text-gray-600">
          We&apos;d love to hear from you. Send us a message and we&apos;ll respond as
          soon as possible.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <ContactForm />

          <div className="mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-500 mr-2" />
                  <span>North Karachi, Karachi</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-500 mr-2" />
                  <span>+92 (314-2471639)</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-500 mr-2" />
                  <span>sahirahmedsheikh@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 mt-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
              <div className="flex gap-4">
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
                    >
                      {Icon && <Icon size={24} />}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
