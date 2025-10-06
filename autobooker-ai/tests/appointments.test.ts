import { describe, it, expect, beforeAll } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('appointments API', () => {
  beforeAll(async () => {
    await prisma.appointment.deleteMany();
  });

  it('crée un rendez-vous valide', async () => {
    const coach = await prisma.user.findFirst({ where: { role: 'COACH' } });
    const client = await prisma.client.findFirst({});
    const res = await fetch('http://localhost:3000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coachId: coach!.id,
        clientId: client!.id,
        dateTime: new Date().toISOString()
      })
    });
    const data = await res.json();
    expect(res.status).toBe(201);
    expect(data.coachId).toBe(coach!.id);
  });
});
