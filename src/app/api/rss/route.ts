import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export const revalidate = 60;

const query = groq`*[_type == "post"] | order(publishedAt desc) {
  title,
  subtitle,
  slug,
  publishedAt,
  body,
  author {
    name
  }
}`;

export async function GET() {
  const posts = await client.fetch(query);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.adharvarun.tech';

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Adharv Times</title>
    <link>${baseUrl}</link>
    <description>A space where tech, creativity, and curiosity collide.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map((post: any) => {
      const postUrl = `${baseUrl}/blog/${post.slug.current}`;
      const pubDate = new Date(post.publishedAt).toUTCString();
      const description = post.subtitle || post.title;
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      <author>${post.author?.name || 'Adharv Arun'}</author>
    </item>`;
    }).join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}