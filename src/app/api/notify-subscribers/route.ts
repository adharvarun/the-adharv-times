import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { client } from '@/sanity/lib/client';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { post } = await req.json();

    if (!post || !post.title || !post.slug) {
      return NextResponse.json(
        { error: 'Invalid post data' },
        { status: 400 }
      );
    }

    // Get all active subscribers
    const subscribers = await client.fetch(
      `*[_type == "subscriber" && status == "active"]{ email }`
    );

    if (!subscribers.length) {
      return NextResponse.json(
        { message: 'No active subscribers found' },
        { status: 200 }
      );
    }

    const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.adharvarun.tech'}/blog/${post.slug.current}`;

    // Send email to all subscribers
    await resend.emails.send({
      from: process.env.EMAIL_FROM ?? 'noreply@blog.adharvarun.tech',
      to: subscribers.map(s => s.email),
      subject: `📝 New Post: ${post.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">📰 The Adharv Times</h1>
            <p style="margin: 5px 0 0; font-size: 14px;">By Adharv Arun</p>
          </div>
          <div style="background-color: #ffffff; padding: 24px;">
            <h2 style="color: #333;">${post.title}</h2>
            ${post.subtitle ? `<p style="font-size: 16px; color: #555; margin-bottom: 20px;">${post.subtitle}</p>` : ''}
            <p style="font-size: 16px; color: #555;">
              A new blog post has just been published! Check it out now:
            </p>
            <p style="margin: 20px 0;">
              <a href="${postUrl}" style="background-color: #000; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
                👉 Read "${post.title}"
              </a>
            </p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
            <p style="font-size: 14px; color: #999;">
              Cheers,<br />
              <strong>Adharv Arun</strong><br />
              Creator of The Adharv Times
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      subscribersCount: subscribers.length 
    });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json(
      { error: 'Failed to notify subscribers' },
      { status: 500 }
    );
  }
} 