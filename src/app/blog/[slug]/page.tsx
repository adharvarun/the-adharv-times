import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import ReactMarkdown from "react-markdown";
import blockContentToMarkdown from '@sanity/block-content-to-markdown';
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
  const markdownBody = blockContentToMarkdown(post.body, { serializers: {} });

  return (
    <main className="bg-white min-h-screen w-full">
      <div className="max-w-7xl mx-auto py-16 px-4">
        <Link
          href="/"
          className="inline-block text-gray-400 hover:text-gray-700 mb-8 text-sm font-medium"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center leading-tight">{post.title}</h1>
        {post.subtitle && (
          <h2 className="text-xl text-gray-500 mb-4 text-center font-normal">{post.subtitle}</h2>
        )}
        <div className="flex flex-col items-center gap-2 mb-10">
          <span className="text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString()}</span>
          {post.category?.title && (
            <span className="text-xs text-gray-500 px-3 py-1 rounded-full bg-gray-100">{post.category.title}</span>
          )}
        </div>
        <article className="prose prose-lg max-w-none mx-auto text-gray-900">
          <ReactMarkdown>{markdownBody}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
};

export default BlogPost;