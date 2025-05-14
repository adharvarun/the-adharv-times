import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import BlogPostPreview from "./components/BlogPostPreview";
import NewsletterSignup from "./components/NewsletterSignup";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  author: { name: string };
};

export const revalidate = 60;

const query = groq`*[_type == "post"] | order(publishedAt desc)[0...10] {
  _id,
  title,
  subtitle,
  slug,
  publishedAt,
  author {
    name
  },
  category->{
    _id,
    title,
    slug {
      current
    } 
  }
}`;

export const metadata = {
  title: "The Adharv Times",
};

export default async function HomePage() {
  const posts: Post[] = await client.fetch(query);

  return (
    <div className="bg-white min-h-screen w-full">
      <section className="max-w-7xl mx-auto text-center py-16 px-4">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 tracking-tight">The Adharv Times</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">A modern publication for code, ideas, and stories. Read, learn, and get inspired by the latest posts from Adharv Arun.</p>
      </section>
      <NewsletterSignup />
      <section className="max-w-7xl mx-auto px-4 pb-24">      
        <h2 className="text-2xl font-semibold mb-8 text-gray-900 text-left">Latest Posts</h2>
        <ol className="space-y-10">
          {posts.map((post) => (
            <BlogPostPreview key={post._id} post={post} />
          ))}
        </ol>
      </section>
    </div>
  );
}
