'use client';
import NewsletterSignup from "./NewsletterSignup";
import { useState } from "react";
import AnimatedBlogPostList from "./AnimatedBlogPostList";
import { motion } from "framer-motion";

export default function HomePageClient({ posts }: { posts: any[] }) {
  const [search, setSearch] = useState("");
  const filtered = search.trim()
    ? posts.filter(
        (p: any) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(search.toLowerCase()))
      )
    : posts;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const minHeight = Math.max(filtered.length * 220, 220);

  return (
      <section className="bg-white min-h-screen w-full pt-24">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 tracking-tight">The Adharv Times</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">A modern publication for code, ideas, and stories. Read, learn, and get inspired by the latest posts from Adharv Arun.</p>
        </div>
        <div className="mx-auto mb-12 px-4">
          <NewsletterSignup />
        </div>
        <section className="max-w-7xl mx-auto px-4 pb-24">
          <h2 className="text-2xl font-semibold mb-8 text-gray-900 text-left">Latest Posts</h2>
          <div className="mb-8 w-full flex">
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={handleSearchChange}
              className="w-full h-15 px-4 py-2 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
          <motion.div
            animate={{ minHeight }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 80 }}
          >
            <AnimatedBlogPostList posts={filtered} />
          </motion.div>
        </section>
      </section>
  );
} 