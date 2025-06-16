import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { client } from '@/sanity/lib/client';

// Initialize rate limiter
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 requests per hour
  analytics: true,
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limit by IP
export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { email } = await req.json();

    // Validate email
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if email is already subscribed
    const existingSubscriber = await client.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email }
    );

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        );
      } else {
        // Reactivate unsubscribed user
        await client
          .patch(existingSubscriber._id)
          .set({ status: 'active', subscribedAt: new Date().toISOString() })
          .commit();
      }
    } else {
      // Add new subscriber
      await client.create({
        _type: 'subscriber',
        email,
        subscribedAt: new Date().toISOString(),
        status: 'active',
      });
    }

    // Send welcome email
    await resend.emails.send({
      from: process.env.EMAIL_FROM ?? 'noreply@blog.adharvarun.tech',
      to: email,
      subject: '🎉 Welcome to The Adharv Times!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">📰 The Adharv Times</h1>
            <p style="margin: 5px 0 0; font-size: 14px;">By Adharv Arun</p>
          </div>
          <div style="background-color: #ffffff; padding: 24px;">
            <h2 style="color: #333;">You're in! 🎉</h2>
            <p style="font-size: 16px; color: #555;">
              Thanks for subscribing to <strong>The Adharv Times</strong> — a place where code meets creativity.
            </p>
            <p style="font-size: 16px; color: #555;">
              Expect occasional doses of dev thoughts, original ideas, side-project magic, and inspiration straight from me to your inbox.
            </p>
            <p style="font-size: 16px; color: #555;">
              No fluff. Just quality stuff.
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
