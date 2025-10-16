import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (request.headers.get('x-cron-secret') !== secret) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  return NextResponse.json({ status: 'ok', ts: Date.now() });
}
