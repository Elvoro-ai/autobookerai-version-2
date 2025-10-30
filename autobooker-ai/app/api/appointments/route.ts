import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  const appointments = [
    { id: 1, date: '2025-11-01', time: '10:00', client: 'Jean Dupont', status: 'confirmed' },
    { id: 2, date: '2025-11-02', time: '14:00', client: 'Marie Martin', status: 'pending' }
  ];
  return NextResponse.json(appointments);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ success: true, id: Math.floor(Math.random() * 1000), ...body });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  return NextResponse.json({ success: true, deleted: id });
}