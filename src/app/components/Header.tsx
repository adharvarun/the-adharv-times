'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!scrolled && (
          <motion.header
            key="full"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white border-b border-gray-200 px-6 pt-6 pb-4 fixed top-0 z-50 transition-shadow duration-300"
          >
            <div className="max-w-5xl mx-auto flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <Image src="/logo.png" alt="Logo" width={60} height={60} />
                <div className="flex flex-col text-left">
                  <Link href="/" className="text-3xl font-bold tracking-tight text-gray-900 leading-tight">
                    The Adharv Times
                  </Link>
                  <span className="text-gray-500 text-sm mt-1">
                    Read &middot; Code &middot; Repeat
                  </span>
                </div>
              </div>
            </div>
          </motion.header>
        )}
        {scrolled && (
          <motion.header
            key="scrolled"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full fixed top-0 left-0 z-50 bg-black/10 backdrop-blur-md transition-all duration-300 flex flex-col justify-center items-center"
            style={{ height: 56 }}
          >
            <motion.div
              className="absolute top-0 left-0 h-1 w-full"
              style={{ background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)', opacity: 0.7 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: scrollProgress }}
              transition={{ type: 'spring', stiffness: 120, damping: 30 }}
            />
            <div className="flex items-center justify-center w-full h-full">
              <Image src="/logo.png" alt="Logo" width={36} height={36} className="drop-shadow-lg" />
            </div>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}