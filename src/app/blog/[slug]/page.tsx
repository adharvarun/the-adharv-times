import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "../../components/PortableTextComponents";
import Link from "next/link";

export const revalidate = 60;

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  subtitle,
  publishedAt,
  category->{
    _id,
    title,
    slug {
      current
    }
  },
  body
}`;

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps) {
  const post = await client.fetch(query, { slug: params.slug });
  return {
    title: `${post.title} - The Adharv Times`,
  };
}

const BlogPost = async ({ params }: PageProps): Promise<JSX.Element> => {
  const post = await client.fetch(query, { slug: params.slug });

  return (
    <main className="max-w-3xl mx-auto py-20 px-4 text-white flex-grow min-h-screen">
      <Link
        href="/"
        className="flex items-center text-gray-400 hover:text-gray-200 mb-4 gap-2"
      >
        <i className="fa-solid fa-left-long"></i> Back to Home
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-4 font-dm-serif-display">
          {post.title}
        </h1>
        {post.subtitle && (
          <h2 className="text-2xl font-medium border-solid text-gray-300 py-3 font-dm-serif-display">
            {post.subtitle}
          </h2>
        )}
        <p className="text-sm text-gray-500 mb-2">
          Published on {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        {post.category?.title && (
          <p className="text-sm font-medium border-solid border-1 text-gray-400 border-gray-700 w-fit px-[5px] py-[4px] rounded-full mt-2">
            {post.category.title}
          </p>
        )}
        <article className="prose prose-invert max-w-none mt-10">
          <PortableText value={post.body} components={PortableTextComponents} />
        </article>
      </div>
    </main>
  );
};

export default BlogPost;