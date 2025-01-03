
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [logo, setLogo] = React.useState<string | null>(null);
  const pathname = usePathname();

  const blackBackgroundPages = ["/about", "/contact", "/faq"];
  const shouldBeBlack = blackBackgroundPages.includes(pathname);

  React.useEffect(() => {
    const fetchLogo = async () => {
      try {
        const query = '*[_type == "navbarLogo"][0]{logo}';
        const logoData = await client.fetch(query);

        if (logoData?.logo) {
          setLogo(urlFor(logoData.logo).url());
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavStyles = () => {
    if (!shouldBeBlack) {
      return isScrolled
        ? "bg-black/70 text-white backdrop-blur-md"
        : "bg-transparent text-white";
    } else {
      return isScrolled
        ? "bg-black/70 text-white backdrop-blur-md"
        : "bg-black text-white";
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${getNavStyles()}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {logo ? (
              <Image
                src={urlFor(logo).url()}
                alt="Logo"
                width={140}
                height={40}
                className="w-[180px] h-auto md:w-[220px] xl:w-[240px]"
                style={{ height: "auto" }}
                priority
              />
            ) : (
              <h1 className="text-white font-semibold text-lg">Inspiration By <span className="text-2xl font-bold text-white"> Trazler </span></h1>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8">
            {[
              { href: "/", label: "HOME" },
              { href: "/about", label: "ABOUT" },
              { href: "/contact", label: "CONTACT" },
              { href: "/faq", label: "FAQs" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-semibold text-lg text-white hover:underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              className="hidden xl:inline-flex bg-black text-white hover:bg-black/90"
            >
              Get your $120 Christmas Gift
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger className="xl:hidden">
                <Menu className="text-white h-8 w-8" />
              </SheetTrigger>

              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription className="hidden">
                    Mobile navigation options
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-6 mt-8">
                  {[
                    { href: "/", label: "HOME" },
                    { href: "/about", label: "ABOUT" },
                    { href: "/contact", label: "CONTACT" },
                    { href: "/faq", label: "FAQs" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-base font-medium hover:text-primary hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button className="w-full bg-black text-white hover:bg-black/90">
                    Get your $120 Christmas Gift
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
