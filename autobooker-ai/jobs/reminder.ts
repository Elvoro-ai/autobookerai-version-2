import { db } from '@/prisma/client';
import { sendEmail } from '@/lib/email';
import { generateReminderEmail } from '@/emails/reminder';

export async function sendReminderJob() {
  // Determine tomorrow's date range
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const startOfDay = new Date(tomorrow);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(tomorrow);
  endOfDay.setHours(23, 59, 59, 999);

  const appointments = await db.appointment.findMany({
    where: {
      dateTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: 'SCHEDULED',
    },
    include: {
      Coach: true,
      Client: true,
    },
  });

  for (const appt of appointments) {
    const coach = appt.Coach;
    const client = appt.Client;
    if (!client) continue;

    const { subject, text, html } = generateReminderEmail({
      coach: coach?.name || 'Votre coach',
      client: client.name || client.email,
      date: appt.dateTime.toLocaleDateString(),
      time: appt.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rebookLink: `${process.env.NEXT_PUBLIC_APP_URL}/book/${coach?.id}`,
      cancelLink: `${process.env.NEXT_PUBLIC_APP_URL}/api/appointments/${appt.id}/cancel`,
    });

    await sendEmail({
      to: client.email,
      subject,
      text,
      html,
    });

    await db.notification.create({
      data: {
        userId: appt.coachId,
        appointmentId: appt.id,
        type: 'REMINDER',
        message: `Rappel envoyé à ${client.email} pour le rendez-vous du ${appt.dateTime.toISOString()}`,
      },
    });
  }
}
