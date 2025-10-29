import { db } from '@prisma/client';
import { generateNpsEmail } from '@/emails/nps';
import { sendEmail } from '@/lib/email';
/**
 * Job: Send NPS survey emails 7 days after a completed appointment.
 * Looks up completed appointments from a week ago and sends a survey link.
 */
export async function sendNpsJob() {
  const aWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const appointments = await db.appointment.findMany({
    where: {
      status: 'COMPLETED',
      dateTime: { lte: aWeekAgo }
    },
    include: {
      coach: true,
      client: true
    }
  });
  for (const appointment of appointments) {
    const email = generateNpsEmail({
      coachName: appointment.coach.name,
      clientName: appointment.client.name,
      surveyLink: `${process.env.NEXT_PUBLIC_APP_URL}/survey/${appointment.id}`
    });
    await sendEmail({
      to: [appointment.client.email],
      ...email
    });
    await db.notification.create({
      data: {
        userId: appointment.coachId,
        type: 'NPS',
        content: `Un e-mail NPS a été envoyé à ${appointment.client.name}.`,
        createdAt: new Date(),
        read: false
      }
    });
  }
}
