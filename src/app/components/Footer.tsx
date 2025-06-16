import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaRss } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-gray-900 mb-4">The Adharv Times</div>
            <p className="text-gray-600 mb-4 max-w-md">
              A modern publication for code, ideas, and stories. Read, learn, and get inspired by the latest posts from Adharv Arun.
            </p>
            <div className="flex gap-4 text-gray-500 text-xl">
              <a href="mailto:adharvarun.10@gmail.com" aria-label="Email" className="hover:text-gray-900 transition">
                <FaEnvelope />
              </a>
              <a href="https://github.com/adharvarun" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-900 transition">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/adharv-arun" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-gray-900 transition">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition">
                  Blog
                </Link>
              </li>
              <li>
                <a href="https://adharvarun.tech" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="https://github.com/adharvarun/the-adharv-times" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">
                  Source Code
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://adharvarun.tech/projects" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">
                  Projects
                </a>
              </li>
              <li>
                <a href="https://adharvarun.tech/#resume" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">
                  Resume
                </a>
              </li>
              <li>
                <a href="https://adharvarun.tech/#contact" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
            Made with ❤️ by Adharv Arun &middot; {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}