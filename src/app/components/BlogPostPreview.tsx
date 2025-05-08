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
    <li key={post._id} className="border-b border-gray-800 pb-4">
      <Link href={`/blog/${post.slug.current}`}>
        <h2 className="text-xl font-semibold hover:underline font-dm-serif-display">
          {post.title}
        </h2>
        {post.subtitle ? (
          <p className="text-lg font-medium border-solid text-gray-300 py-3 font-dm-serif-display">{post.subtitle}</p>
        ) : null}
      </Link>
      <p className="text-sm text-gray-400">
        Published on {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      {post.category?.title ? (
          <p className="text-sm font-medium border-solid border-1 text-gray-400 border-gray-700 w-fit px-[5px] py-[4px] rounded-full mt-2">{post.category.title}</p>
        ) : null}
      {post.mainImage && (
        <Link href={`/blog/${post.slug.current}`}>
          <Image
            src={urlFor(post.mainImage).width(600).height(300).url()}
            alt={post.mainImage.alt || post.title}
            width={600}
            height={300}
            className="object-cover w-full h-48 mt-4"
          />
        </Link>
      )}
    </li>
  );
}