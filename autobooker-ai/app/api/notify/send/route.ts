import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('Notification envoyée :', body);
  return NextResponse.json({ ok: true });
}
