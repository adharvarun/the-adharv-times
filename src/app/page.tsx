import { client } from "../sanity/lib/client";
import { groq } from "next-sanity";
import BlogPostPreview from "./components/BlogPostPreview";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: SanityImageSource & { alt?: string };
  publishedAt: string;
  author: { name: string };
}

async function getPosts(): Promise<Post[]> {
  const query = groq`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    author-> {
      name
    }
  }`;
  const posts = await client.fetch(query);
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-8">
      {posts.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No posts found.
        </p>
      )}
      {posts.map((post) => (
        <BlogPostPreview key={post._id} post={post} />
      ))}
    </div>
  );
}
