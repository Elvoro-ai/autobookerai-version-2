import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create two coach users
  const coach1 = await prisma.user.upsert({
    where: { email: 'coach1@example.com' },
    update: {},
    create: {
      name: 'Coach One',
      email: 'coach1@example.com',
      role: 'COACH',
    },
  });

  const coach2 = await prisma.user.upsert({
    where: { email: 'coach2@example.com' },
    update: {},
    create: {
      name: 'Coach Two',
      email: 'coach2@example.com',
      role: 'COACH',
    },
  });

  // Create six clients (3 for each coach)
  const clientsData = [
    { name: 'Alice Client', email: 'alice@example.com', phone: '123', coachId: coach1.id },
    { name: 'Bob Client', email: 'bob@example.com', phone: '234', coachId: coach1.id },
    { name: 'Charlie Client', email: 'charlie@example.com', phone: '345', coachId: coach1.id },
    { name: 'Diana Client', email: 'diana@example.com', phone: '456', coachId: coach2.id },
    { name: 'Eve Client', email: 'eve@example.com', phone: '567', coachId: coach2.id },
    { name: 'Frank Client', email: 'frank@example.com', phone: '678', coachId: coach2.id },
  ];
  const clients = await Promise.all(
    clientsData.map((client) => prisma.client.create({ data: client }))
  );

  // Create ten appointments with varying dates and statuses
  const now = new Date();
  const day = 24 * 60 * 60 * 1000;
  const appointmentsData = [
    {
      coachId: coach1.id,
      clientId: clients[0].id,
      startTime: new Date(now.getTime() + 1 * day),
      endTime: new Date(now.getTime() + 1 * day + 60 * 60 * 1000),
      status: 'SCHEDULED',
    },
    {
      coachId: coach1.id,
      clientId: clients[1].id,
      startTime: new Date(now.getTime() + 2 * day),
      endTime: new Date(now.getTime() + 2 * day + 60 * 60 * 1000),
      status: 'SCHEDULED',
    },
    {
      coachId: coach1.id,
      clientId: clients[2].id,
      startTime: new Date(now.getTime() + 3 * day),
      endTime: new Date(now.getTime() + 3 * day + 60 * 60 * 1000),
      status: 'COMPLETED',
    },
    {
      coachId: coach1.id,
      clientId: clients[0].id,
      startTime: new Date(now.getTime() - 1 * day),
      endTime: new Date(now.getTime() - 1 * day + 60 * 60 * 1000),
      status: 'CANCELLED',
    },
    {
      coachId: coach1.id,
      clientId: clients[1].id,
      startTime: new Date(now.getTime() - 2 * day),
      endTime: new Date(now.getTime() - 2 * day + 60 * 60 * 1000),
      status: 'NO_SHOW',
    },
    {
      coachId: coach2.id,
      clientId: clients[3].id,
      startTime: new Date(now.getTime() + 1 * day),
      endTime: new Date(now.getTime() + 1 * day + 60 * 60 * 1000),
      status: 'SCHEDULED',
    },
    {
      coachId: coach2.id,
      clientId: clients[4].id,
      startTime: new Date(now.getTime() + 2 * day),
      endTime: new Date(now.getTime() + 2 * day + 60 * 60 * 1000),
      status: 'SCHEDULED',
    },
    {
      coachId: coach2.id,
      clientId: clients[5].id,
      startTime: new Date(now.getTime() + 3 * day),
      endTime: new Date(now.getTime() + 3 * day + 60 * 60 * 1000),
      status: 'COMPLETED',
    },
    {
      coachId: coach2.id,
      clientId: clients[3].id,
      startTime: new Date(now.getTime() - 1 * day),
      endTime: new Date(now.getTime() - 1 * day + 60 * 60 * 1000),
      status: 'CANCELLED',
    },
    {
      coachId: coach2.id,
      clientId: clients[4].id,
      startTime: new Date(now.getTime() - 2 * day),
      endTime: new Date(now.getTime() - 2 * day + 60 * 60 * 1000),
      status: 'NO_SHOW',
    },
  ];

  await Promise.all(
    appointmentsData.map((appt) =>
      prisma.appointment.create({
        data: {
          coachId: appt.coachId,
          clientId: appt.clientId,
          startTime: appt.startTime,
          endTime: appt.endTime,
          status: appt.status,
        },
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
