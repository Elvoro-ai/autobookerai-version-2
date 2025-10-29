import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db';

// Renvoie les disponibilités des coachs (placeholder)
export async function GET() {
  const availability = await db.availability.findMany();
  return NextResponse.json(availability);
}

// Met à jour les disponibilités (placeholder)
export async function POST(req: NextRequest) {
  const body = await req.json();
  // À implémenter : valider et mettre à jour les créneaux
  return NextResponse.json({ ok: true, body });
}
