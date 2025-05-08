export default function Footer() {
  return (
<footer className="w-full bg-[#0e1013] text-white py-2 border-t border-gray-800 shadow-inner flex-shrink-0">
      <div className="max-w-5xl mx-auto px-6 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} The Adharv Times. All rights reserved.
      </div>
    </footer>
  );
}