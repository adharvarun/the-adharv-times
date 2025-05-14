import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface BlogPostPreviewProps {
  post: {
    _id: string;
    title: string;
    subtitle?: string;
    slug: { current: string };
    mainImage?: SanityImageSource & { alt?: string };
    publishedAt: string;
    author: { name: string };
    category?: {
      _id: string;
      title: string;
      slug?: { current: string };
    };
  };
}

export default function BlogPostPreview({ post }: BlogPostPreviewProps) {
  return (
    <li key={post._id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-0 overflow-hidden">
      <Link href={`/blog/${post.slug.current}`} className="block">
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(600).height(300).url()}
            alt={post.mainImage.alt || post.title}
            width={600}
            height={300}
            className="object-cover w-full h-48 rounded-t-2xl"
          />
        )}
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.category?.title && (
              <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                {post.category.title}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
            {post.title}
          </h2>
          {post.subtitle ? (
            <p className="text-base text-gray-600 mb-3 line-clamp-2">{post.subtitle}</p>
          ) : null}
          <div className="text-sm text-gray-400 flex flex-wrap gap-4 mt-4">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}