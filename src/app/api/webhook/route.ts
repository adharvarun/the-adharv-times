import { NextResponse } from 'next/server';

const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.json();
  const secret = req.headers.get('x-webhook-secret');
  if (!WEBHOOK_SECRET || secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  if (body._type !== 'post' || body._rev === body._previousRev) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  // Webhook received - can be extended for other purposes
  return NextResponse.json({ ok: true });
} 