import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-semibold text-gray-900 dark:text-white">
            The Adharv Times
          </a>
        </Link>
        <nav>
          <ul className="flex space-x-6 text-gray-700 dark:text-gray-300">
            <li>
              <Link href="/" legacyBehavior>
                <a className="hover:underline">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about" legacyBehavior>
                <a className="hover:underline">About</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a className="hover:underline">Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
