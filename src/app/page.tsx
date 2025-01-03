import BlogGrid from "@/app/blog/page";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="mt-24 mb-16">
        <BlogGrid />
      </div>
    </main>
  );
}
