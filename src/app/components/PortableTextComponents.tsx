import Link from "next/link";
import {
  PortableTextComponents as PortableTextComponentType,
} from "@portabletext/react";

export const PortableTextComponents: PortableTextComponentType = {
  types: {
    code: ({ value }) => (
      <pre className="p-4 overflow-x-auto my-6 text-sm border rounded">
        <code className={`language-${value.language || 'text'}`}>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-8 leading-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold my-6 leading-snug">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium my-5 leading-snug">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-base my-4 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className="underline"
        >
          {children}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="px-1 text-sm border rounded">{children}</code>
    ),
  },
};