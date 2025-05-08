import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex not-first:bg-[#0e1013] text-white py-6 border-b border-gray-800 items-center justify-center font-">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 gap-2 text-center">
        <Link href="/" className="flex items-center justify-center space-x-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-3xl font-bold tracking-tight font-dm-serif-display">
            The Adharv Times
          </span>
        </Link>
        <span>Read &middot; Code &middot; Repeat</span>
      </div>
    </header>
  );
}