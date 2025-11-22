import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t mt-16 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {currentYear} The Adharv Times</p>
          <div className="flex gap-6">
            <a href="mailto:adharvarun.10@gmail.com" className="underline">Email</a>
            <a href="https://github.com/adharvarun" target="_blank" rel="noopener noreferrer" className="underline">GitHub</a>
            <a href="https://linkedin.com/in/adharv-arun" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a>
            <a href="https://adharvarun.tech" target="_blank" rel="noopener noreferrer" className="underline">Portfolio</a>
            <a href="/api/rss" className="underline">RSS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}