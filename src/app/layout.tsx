import { Montserrat } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/1c42d02712.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <link rel="shortcut icon" href="https://raw.githubusercontent.com/adharvarun/adharvarun/refs/heads/main/favicon.ico" />
      </head>
<body className={`${montserrat.variable} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 m-0`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}