export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 shadow-inner mt-12">
      <div className="max-w-5xl mx-auto px-6 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} The Adharv Times. All rights reserved.
      </div>
    </footer>
  );
}
