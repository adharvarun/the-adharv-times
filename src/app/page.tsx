import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import BlogPostPreview from "./components/BlogPostPreview";

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
    <>
      <div className="flex-grow bg-[#0e1013] text-white min-h-screen rounded-xl">
        <main className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8 font-dm-serif-display">Latest Posts</h1>
          <ol className="space-y-6">
              {posts.map((post) => (
                <BlogPostPreview key={post._id} post={post} />
              ))}
          </ol>
        </main>
      </div>
    </>
  );
}
