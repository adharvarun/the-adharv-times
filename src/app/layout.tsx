import { Lora } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://kit.fontawesome.com/1c42d02712.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <link rel="shortcut icon" href="https://raw.githubusercontent.com/adharvarun/adharvarun/refs/heads/main/favicon.ico" />
      </head>
      <body className={`${lora.variable} antialiased`}>
        <ConditionalLayout>{children}</ConditionalLayout>
        <Analytics />
      </body>
    </html>
  );
}