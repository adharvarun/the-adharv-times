import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body?._type !== 'post' || body?._rev === body?._previousRev) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const postTitle = body.title || 'Untitled';
  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.adharvarun.tech'}/blog/${body.slug?.current}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 });
  }

  const recipientsFile = path.join(process.cwd(), 'recipients.txt');
  let recipients: string[] = [];

  try {
    const data = await fs.readFile(recipientsFile, 'utf-8');
    recipients = data.split('\n').map(e => e.trim()).filter(Boolean);
  } catch {
    return NextResponse.json({ error: 'No subscribers found' }, { status: 400 });
  }

  const emailBody = {
    from: 'no-reply@blog.adharvarun.tech',
    to: recipients,
    subject: `📝 New Post: ${postTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">📰 The Adharv Times</h1>
          <p style="margin: 5px 0 0; font-size: 14px;">By Adharv Arun</p>
        </div>
        <div style="background-color: #ffffff; padding: 24px;">
          <h2 style="color: #333;">${postTitle}</h2>
          <p style="font-size: 16px; color: #555;">
            A new blog post has just been published! Check it out now:
          </p>
          <p style="margin: 20px 0;">
            <a href="${postUrl}" style="background-color: #000; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
              👉 Read "${postTitle}"
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
    `
  };

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailBody),
  });

  if (!emailRes.ok) {
    const error = await emailRes.text();
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, recipients });
}