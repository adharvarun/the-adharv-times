"use client";

import { groq } from "next-sanity";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";

const query = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    "name": author->name,
    "categories": categories[]->title,
    mainImage,
    publishedAt,
    body
  }
`;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function FloatingElement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 m-4 transform transition-transform hover:scale-105 hover:shadow-2xl ${className} floating-element`}>
      {children}
    </div>
  );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    client.fetch(query, { slug: params.slug }).then((data) => {
      setPost(data);
    });
  }, [params.slug]);

  if (!post) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10 text-gray-900 dark:text-white relative overflow-hidden">
      <h1 className="text-5xl font-extrabold mb-8 text-center drop-shadow-lg">The Adharv Times</h1>
      <div className="max-w-5xl mx-auto relative z-10">
        <FloatingElement className="absolute top-10 left-10 w-64">
          {post.mainImage && (
            <Image
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt || post.title}
              width={256}
              height={144}
              className="rounded-md object-cover"
            />
          )}
        </FloatingElement>
        <FloatingElement className="absolute top-40 right-10 w-96">
          <h2 className="text-4xl font-bold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            By {post.name} on {formatDate(post.publishedAt)}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.categories.map((cat: string) => (
              <span key={cat} className="bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 rounded-full px-3 py-1 text-xs font-semibold">
                {cat}
              </span>
            ))}
          </div>
        </FloatingElement>
        <FloatingElement className="relative mt-64 p-8 max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <PortableText value={post.body} />
        </FloatingElement>
      </div>
      <style jsx>{`
        .floating-element {
          position: relative;
          transition: transform 0.3s ease;
        }
        .floating-element:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </main>
  );
}
