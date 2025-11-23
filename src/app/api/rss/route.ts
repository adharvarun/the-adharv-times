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

export async function GET(request: Request) {
  const posts = await client.fetch(query);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.adharvarun.tech';
  const portfolioUrl = 'https://adharvarun.tech';
  const rssIconUrl = `${baseUrl}/rss_icon.ico`;

  const origin = request.headers.get('origin');
  const allowedOrigins = [
    portfolioUrl, 
    'https://adharvarun.tech', 
    'https://www.adharvarun.tech',
    'http://localhost:3000'
  ];
  const corsOrigin = origin && allowedOrigins.includes(origin) ? origin : null;

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Adharv Times</title>
    <link>${baseUrl}</link>
    <description>A space where tech, creativity, and curiosity collide.</description>
    <language>en-us</language>
    <image>
      <url>${rssIconUrl}</url>
      <title>The Adharv Times</title>
      <link>${baseUrl}</link>
    </image>
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

  const headers: HeadersInit = {
    'Content-Type': 'application/xml',
  };

  if (corsOrigin) {
    headers['Access-Control-Allow-Origin'] = corsOrigin;
    headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
  }

  return new NextResponse(rss, { headers });
}

export async function OPTIONS(request: Request) {
  const portfolioUrl = 'https://adharvarun.tech';
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    portfolioUrl, 
    'https://adharvarun.tech', 
    'https://www.adharvarun.tech',
    'http://localhost:3000'
  ];
  const corsOrigin = origin && allowedOrigins.includes(origin) ? origin : null;

  const headers: HeadersInit = {
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (corsOrigin) {
    headers['Access-Control-Allow-Origin'] = corsOrigin;
  }

  return new NextResponse(null, { headers });
}