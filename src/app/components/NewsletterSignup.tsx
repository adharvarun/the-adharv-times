'use client';

import { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setStatus("success");
      setEmail('');
    } else {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl shadow-md max-w-7xl mx-auto mt-3 mb-16 px-4 sm:px-8 py-8 sm:py-10 flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Subscribe to The Adharv Times</h2>
      <p className="text-gray-500 text-base mb-6 text-center">Get the latest posts and updates delivered straight to your inbox.</p>
      <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-2 mb-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 bg-gray-50 min-w-0"
          required
        />
        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition disabled:opacity-60 w-full sm:w-auto"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {status === "success" && <p className="text-green-600 mt-3 text-sm">You&apos;re subscribed! 🎉</p>}
      {status === "error" && <p className="text-red-600 mt-3 text-sm">Something went wrong. 😕</p>}
    </form>
  );
};

export default NewsletterSignup;