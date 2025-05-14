import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 pt-6 pb-4">
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
      </div>
    </header>
  );
}