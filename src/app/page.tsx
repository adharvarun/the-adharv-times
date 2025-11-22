import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import HomePageClient from "./components/HomePageClient";

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
  tags,
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
    <HomePageClient posts={posts} />
  );
}
