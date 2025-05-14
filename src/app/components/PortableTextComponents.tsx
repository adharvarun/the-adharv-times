import Link from "next/link";
import {
  PortableTextComponents as PortableTextComponentType,
} from "@portabletext/react";

export const PortableTextComponents: PortableTextComponentType = {
  types: {
    code: ({ value }) => (
      <pre className="bg-gray-100 text-gray-800 rounded-xl p-6 overflow-x-auto my-6 leading-relaxed text-sm md:text-base">
        <code className={`language-${value.language || 'text'}`}>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-8 leading-tight tracking-tight text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold my-6 leading-snug tracking-tight text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium my-5 leading-snug text-gray-900">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-lg my-4 leading-relaxed tracking-wide text-gray-800">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200"
        >
          {children}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm">{children}</code>
    ),
  },
};