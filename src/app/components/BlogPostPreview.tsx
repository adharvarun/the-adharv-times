import Link from "next/link";

interface BlogPostPreviewProps {
  post: {
    _id: string;
    title: string;
    subtitle?: string;
    slug: { current: string };
    publishedAt: string;
    tags?: string[];
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
    <li key={post._id} className="mb-8 pb-8 border-b last:border-b-0">
      <Link href={`/blog/${post.slug.current}`} className="block no-underline">
        <h2 className="text-2xl font-semibold mb-2">
          {post.title}
        </h2>
        {post.subtitle && (
          <p className="text-base mb-3 opacity-70">{post.subtitle}</p>
        )}
        <div className="text-sm opacity-60 flex gap-4 flex-wrap">
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
      </Link>
    </li>
  );
}