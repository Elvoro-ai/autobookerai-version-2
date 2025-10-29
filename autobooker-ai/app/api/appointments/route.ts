import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const AppointmentSchema = z.object({
  coachId: z.string().uuid(),
  clientId: z.string().uuid(),
  dateTime: z.string().or(z.date()).transform((val) => new Date(val)),
});

export async function GET() {
  const appointments = await db.appointment.findMany();
  return NextResponse.json(appointments);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { coachId, clientId, dateTime } = AppointmentSchema.parse(body);

    // vérifier qu'aucun rendez-vous n'existe déjà pour ce coach à la même date/heure (et non annulé)
    const conflict = await db.appointment.findFirst({
      where: {
        coachId,
        dateTime,
        cancelled: false,
      },
    });

    if (conflict) {
      return NextResponse.json({ error: "Slot already booked" }, { status: 400 });
    }

    const appointment = await db.appointment.create({
      data: {
        coachId,
        clientId,
        dateTime,
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
