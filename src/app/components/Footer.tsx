import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 pt-16 pb-8 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-4">
        <div className="text-2xl font-bold text-gray-900">Adharv Arun</div>
        <div className="text-gray-500 text-base">AI Engineer & Software Developer</div>
        <div className="flex gap-8 justify-center text-gray-500 text-3xl my-4">
          <a href="mailto:adharvarun.10@gmail.com" aria-label="Email"><FaEnvelope /></a>
          <a href="https://github.com/adharvarun" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://linkedin.com/in/adharv-arun" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
        <a href="https://adharvarun.tech" className="mt-2 px-6 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition">Portfolio</a>
      </div>
      <div className="text-center text-xs text-gray-400 mt-12">Made with ❤️ by Adharv Arun {new Date().getFullYear()}</div>
    </footer>
  );
}