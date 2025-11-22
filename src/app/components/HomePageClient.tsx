'use client';
import { useState } from "react";
import BlogPostList from "./BlogPostList";

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

  return (
    <div className="w-full">
      <div className="mb-16 pb-8 border-b">
        <p className="text-base leading-relaxed">
        Welcome to The Adharv Times - a space where tech, creativity, and curiosity collide. I break down complex ideas in AI, robotics, and engineering into simple, readable stories. If you love building, experimenting, or just exploring how things work, you’re in the right place.
        </p>
      </div>
      <div className="mb-12">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded focus:outline-none"
        />
      </div>
      <BlogPostList posts={filtered} />
    </div>
  );
} 