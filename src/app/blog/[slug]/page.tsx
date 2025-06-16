import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import ReactMarkdown from "react-markdown";
import blockContentToMarkdown from '@sanity/block-content-to-markdown';
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import ShareModal from "./ShareModal";

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
  mainImage {
    asset->{
      url
    },
    alt
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
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="inline-block text-gray-400 hover:text-gray-700 text-sm font-medium"
          >
            <p className="flex items-center gap-2"><FaArrowLeft /> Back to Home</p>
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center leading-tight">
          {post.title}
        </h1>
        {post.subtitle && (
          <h2 className="text-xl text-gray-500 mb-4 text-center font-normal">
            {post.subtitle}
          </h2>
        )}
        <div className="flex flex-col items-center gap-2 mb-10">
          <span className="text-xs text-gray-400">
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>
          {post.category?.title && (
            <span className="text-xs text-gray-500 px-3 py-1 rounded-full bg-gray-100">
              {post.category.title}
            </span>
          )}
        </div>
        <article className="prose prose-lg max-w-none mx-auto text-gray-900">
          {post.mainImage && post.mainImage.asset?.url && (
            <div className="mb-8">
              <Image
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || "Blog post image"}
                width={1200}
                height={600}
                className="w-full max-h-96 object-cover rounded-lg mx-auto"
              />
              {post.mainImage.alt && (
                <p className="text-sm text-gray-400 italic text-center mt-2">
                  {post.mainImage.alt}
                </p>
              )}
            </div>
          )}
          <ShareModal />
          <ReactMarkdown>{markdownBody}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
};

export default BlogPost;