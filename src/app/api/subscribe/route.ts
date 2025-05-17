import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
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
    console.error(err);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
  }
}