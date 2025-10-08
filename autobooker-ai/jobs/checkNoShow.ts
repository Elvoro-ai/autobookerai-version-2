import { db } from '@/prisma/client';
import { sendEmail } from '@/lib/email';
import { generateNoShowEmail } from '@/emails/noshow';

export async function checkNoShowJob() {
  const threshold = new Date(Date.now() - 30 * 60 * 1000);
  const appointments = await db.appointment.findMany({
    where: {
      dateTime: { lte: threshold },
      status: 'SCHEDULED',
    },
    include: {
      Coach: true,
      Client: true,
    },
  });

  for (const appointment of appointments) {
    await db.appointment.update({
      where: { id: appointment.id },
      data: { status: 'NO_SHOW' },
    });

    const email = generateNoShowEmail({
      coach: appointment.Coach.name,
      client: appointment.Client.name,
      date: appointment.dateTime.toLocaleDateString(),
      time: appointment.dateTime.toLocaleTimeString(),
      rebookLink: `${process.env.NEXT_PUBLIC_APP_URL}/book/${appointment.Coach.id}`,
    });

    await sendEmail({
      to: appointment.Client.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    await db.notification.create({
      data: {
        userId: appointment.coachId,
        type: 'NO_SHOW',
        message: `Appointment with ${appointment.Client.name} was marked as no-show`,
      },
    });
  }
}
