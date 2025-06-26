import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaShareAlt, FaCopy } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    alert('Link copied to clipboard!');
    setShowShareModal(false);
  };

  return (
    <header className={`w-full bg-white border-b border-gray-200 px-6 pt-6 pb-4 fixed top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:justify-between">
        <div className="w-full lg:w-auto flex justify-center lg:justify-start items-center space-x-4">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
          <div className="hidden lg:flex flex-col text-left">
            <Link href="/" className="text-3xl font-bold tracking-tight text-gray-900 leading-tight">
              The Adharv Times
            </Link>
            <span className="text-gray-500 text-sm mt-1">
              Read &middot; Code &middot; Repeat
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSearchModal(true)}
            className="text-gray-600 hover:text-gray-900 transition"
            aria-label="Search"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" /></svg>
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="text-gray-600 hover:text-gray-900 transition"
            aria-label="Share"
          >
            <FaShareAlt size={20} />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <a
              href="https://adharvarun.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
            >
              Portfolio
            </a>
            <a
              href="https://github.com/adharvarun/the-adharv-times"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
            >
              Source
            </a>
          </div>
        </div>
      )}

      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            <h3 className="text-xl font-bold mb-4">Search Blog Posts</h3>
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
            />
            <p className="text-sm text-gray-500 mt-2">Note: Search functionality is not fully implemented yet.</p>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            <h3 className="text-xl font-bold mb-4">Share This Page</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={currentUrl}
                readOnly
                className="flex-1 border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 text-gray-700"
              />
              <button
                onClick={handleCopyLink}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition flex items-center gap-2"
              >
                <FaCopy /> Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}