import Link from "next/link";
import {
  PortableTextComponents as PortableTextComponentType,
} from "@portabletext/react";

export const PortableTextComponents: PortableTextComponentType = {
  types: {
    code: ({ value }) => (
      <pre data-language={value.language}>
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-medium my-2">{children}</h3>,
    code: ({ children }) => (<code className="bg-gray-800 text-white p-1 rounded">{children}</code>),
    normal: ({ children }) => <p className="my-2">{children}</p>,
  },
  marks: {
    link: ({ value, children }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link href={value.href} rel={rel} className="text-blue-400 underline hover:text-blue-200">
          {children}
        </Link>
      );
    },
  },
};