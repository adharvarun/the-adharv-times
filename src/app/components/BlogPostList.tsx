'use client';

import BlogPostPreview from './BlogPostPreview';

export default function BlogPostList({ posts }: { posts: any[] }) {
  return (
    <ol>
      {posts.map((post) => (
        <BlogPostPreview key={post._id} post={post} />
      ))}
    </ol>
  );
}
