import { NextRequest, NextResponse } from 'next/server';
import { db } from '@prisma/client';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const appointmentId = params.id;
  try {
    const appointment = await db.appointment.update({
      where: { id: appointmentId },
      data: { cancelled: true },
    });
    return NextResponse.json(appointment);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
