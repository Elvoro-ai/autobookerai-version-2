import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/prisma/client';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const appointmentId = params.id;
  const body = await req.json();
  const { dateTime } = body;

  const appointment = await db.appointment.findUnique({ where: { id: appointmentId } });

  if (!appointment) {
    return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
  }

  const conflict = await db.appointment.findFirst({
    where: {
      coachId: appointment.coachId,
      dateTime: new Date(dateTime),
      cancelled: false,
      id: { not: appointmentId },
    },
  });

  if (conflict) {
    return NextResponse.json({ error: 'Slot already booked' }, { status: 400 });
  }

  const updated = await db.appointment.update({
    where: { id: appointmentId },
    data: { dateTime: new Date(dateTime) },
  });

  return NextResponse.json(updated);
}
