import { NextResponse } from 'next/server';
import { verifySignature } from '@sanity/webhook';

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('sanity-webhook-signature');
    const body = await req.json();

    if (!signature || !WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 401 }
      );
    }

    const isValid = verifySignature(
      JSON.stringify(body),
      signature,
      WEBHOOK_SECRET
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Only process new posts
    if (body._type !== 'post' || body._rev === body._previousRev) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    // Notify subscribers about the new post
    const notifyRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notify-subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post: body }),
    });

    if (!notifyRes.ok) {
      console.error('Failed to notify subscribers:', await notifyRes.text());
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
} 