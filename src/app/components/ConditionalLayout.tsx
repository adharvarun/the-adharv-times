"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider } from "./ThemeProvider";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  if (!isStudio) {
    return (
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <main className="min-h-screen">
      {children}
    </main>
  );
}