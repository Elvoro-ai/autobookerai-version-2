import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const coach = await prisma.coach.upsert({
    where: { email: 'coach@example.com' },
    update: {},
    create: {
      name: 'Test Coach',
      email: 'coach@example.com',
    },
  });

  await prisma.appointment.create({
    data: {
      coachId: coach.id,
      clientName: 'John Doe',
      clientEmail: 'john@example.com',
      dateTime: new Date(Date.now() + 3600 * 1000),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
