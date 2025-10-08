import { subDays, startOfDay, endOfDay } from 'date-fns';
import { CoachSettings } from '../models/coachSettings';
import { fetchBookingsForCoach, markNotificationSent, Booking } from '../utils/database';
import { sendEmail, sendSMS } from '../utils/notification';

/**
 * runNpsJob sends a Net Promoter Score (NPS) survey seven days after a
 * session has been completed. Only sessions with status 'completed'
 * are considered. Idempotence is ensured via the notification flags on
 * the booking.
 */
export async function runNpsJob(settings: CoachSettings): Promise<void> {
  if (!settings.npsEnabled) return;
  const now = new Date();
  const targetStart = startOfDay(subDays(now, 7));
  const targetEnd = endOfDay(subDays(now, 7));
  const bookings = await fetchBookingsForCoach(settings.coachId, targetStart, targetEnd);
  for (const booking of bookings) {
    if (booking.notifications?.npsSent) continue;
    if (booking.status !== 'completed') continue;
    const subject = 'Votre avis compte\u00a0!';
    const body = `Bonjour,\n\nIl y a une semaine, vous avez participé à une séance. Pourriez-vous prendre une minute pour répondre à notre questionnaire de satisfaction\u00a0? Votre retour nous aide à nous améliorer.`;
    await sendEmail(booking.userId, { subject, body });
    await sendSMS(booking.userId, { subject, body });
    await markNotificationSent(booking.id, 'npsSent');
  }
}
