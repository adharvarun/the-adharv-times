'use client';

import { motion } from 'framer-motion';
import BlogPostPreview from './BlogPostPreview';

export default function AnimatedBlogPostList({ posts }: { posts: any[] }) {
  return (
    <motion.ol
      className="space-y-10"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12
          }
        }
      }}
    >
      {posts.map((post) => (
        <motion.li
          key={post._id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 80 }}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-0 overflow-hidden"
        >
          <BlogPostPreview post={post} />
        </motion.li>
      ))}
    </motion.ol>
  );
} 