import { NextResponse, NextRequest } from 'next/server';
import { db } from '../../../lib/db';

// Renvoie les disponibilités des coachs (placeholder)
export async function GET() {
  try {
    // Return mock data for MVP deployment
    const availability = [
      { id: 1, date: '2025-11-01', time: '09:00', available: true },
      { id: 2, date: '2025-11-01', time: '10:00', available: false },
      { id: 3, date: '2025-11-02', time: '14:00', available: true }
    ];
    return NextResponse.json(availability);
  } catch (error) {
    console.error('Availability API error:', error);
    return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
  }
}

// Met à jour les disponibilités (placeholder)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Return success for MVP
    return NextResponse.json({ ok: true, body });
  } catch (error) {
    console.error('Availability POST error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
