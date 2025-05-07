import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface BlogPostPreviewProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage?: SanityImageSource & { alt?: string };
    publishedAt: string;
    author: { name: string };
  };
}

export default function BlogPostPreview({ post }: BlogPostPreviewProps) {
  return (
    <article className="max-w-3xl w-full rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
      {post.mainImage && (
        <Link href={`/blog/${post.slug.current}`}>
            <Image
              src={urlFor(post.mainImage).width(600).height(300).url()}
              alt={post.mainImage.alt || post.title}
              width={600}
              height={300}
              className="object-cover w-full h-48"
            />
        </Link>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
          <Link href={`/post/${post.slug.current}`}>
            {post.title}
          </Link>
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          By {post.author?.name} on{" "}
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </article>
  );
}
