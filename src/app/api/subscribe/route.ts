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
      subject: 'Thanks for subscribing to The Adharv Times 📰',
      html: `
        <p>
          Welcome! You're now subscribed to <strong>The Adharv Times</strong>. Stay tuned for fresh ideas, code, and inspiration.
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
  }
}