import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { client } from '@/sanity/lib/client';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
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
      return NextResponse.json(
        { error: 'This email is already subscribed.' },
        { status: 400 }
      );
    }

    // Add subscriber to Sanity
    await client.create({
      _type: 'subscriber',
      email,
    });

    // Send welcome email
    await resend.emails.send({
      from: 'The Adharv Times <noreply@adharvarun.tech>',
      to: email,
      subject: 'Welcome to The Adharv Times Newsletter!',
      html: `<h2>Thank you for subscribing!</h2><p>You'll now receive the latest posts and updates from The Adharv Times.</p>`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
