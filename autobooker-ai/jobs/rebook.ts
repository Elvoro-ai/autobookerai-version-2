import { db } from '@prisma/client';
import { generateRebookEmail } from '@/emails/rebook';
import { sendEmail } from '@/lib/email';
/**
 * Job: Send rebook emails 1 day after a no-show.
 * Finds appointments marked as NO_SHOW the previous day and sends an email with suggested new slots.
 */
export async function sendRebookJob() {
  // Determine cutoff: appointments flagged as no-show up to yesterday
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const appointments = await db.appointment.findMany({
    where: {
      status: 'NO_SHOW',
      dateTime: { lte: yesterday }
    },
    include: {
      coach: true,
      client: true
    }
  });
  for (const appointment of appointments) {
    // Suggest three new slots: next three days at the same time
    const suggestions: { date: string; time: string }[] = [];
    for (let i = 1; i <= 3; i++) {
      const newDate = new Date(appointment.dateTime.getTime());
      newDate.setDate(newDate.getDate() + i);
      suggestions.push({
        date: newDate.toLocaleDateString(),
        time: newDate.toLocaleTimeString()
      });
    }
    const email = generateRebookEmail({
      coachName: appointment.coach.name,
      clientName: appointment.client.name,
      suggestions,
      rebookLink: `${process.env.NEXT_PUBLIC_APP_URL}/book/${appointment.coachId}`
    });
    await sendEmail({
      to: [appointment.client.email],
      ...email
    });
    // Log notification for the coach
    await db.notification.create({
      data: {
        userId: appointment.coachId,
        type: 'REBOOK',
        content: `Une proposition de nouveau rendez-vous a été envoyée à ${appointment.client.name}.`,
        createdAt: new Date(),
        read: false
      }
    });
  }
}
