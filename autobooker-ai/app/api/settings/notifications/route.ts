import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { db } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';

// Récupère les préférences actuelles
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { notificationSettings: true },
  });
  return NextResponse.json({ settings: user?.notificationSettings });
}

// Met à jour les préférences de notifications
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  await db.user.update({
    where: { id: session.user.id },
    data: { notificationSettings: body },
  });
  return NextResponse.json({ ok: true });
}
