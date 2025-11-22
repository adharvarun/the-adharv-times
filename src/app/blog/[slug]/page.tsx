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
  tags,
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
    <div className="w-full">
      <div className="mb-8">
        <Link href="/" className="text-sm underline">
          ← Back to Home
        </Link>
      </div>
      <article>
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          {post.title}
        </h1>
        {post.subtitle && (
          <h2 className="text-xl mb-6 opacity-70 font-normal">
            {post.subtitle}
          </h2>
        )}
        <div className="mb-8 text-sm opacity-60 flex gap-4 flex-wrap">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          {post.category?.title && (
            <span>{post.category.title}</span>
          )}
          {post.tags && post.tags.length > 0 && (
            <>
              {post.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </>
          )}
        </div>
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{markdownBody}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;