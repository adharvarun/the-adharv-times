'use client';

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full mb-8 py-6">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          {theme === 'light' ? <Image src="/logo.png" alt="Logo" width={40} height={40} /> : <Image src="/logo-dark.png" alt="Logo" width={40} height={40} />}
          <span className="text-2xl font-semibold">The Adharv Times</span>
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 hover:text-gray-500 hover:cursor-pointer transition-colors duration-300"
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </header>
  );
}