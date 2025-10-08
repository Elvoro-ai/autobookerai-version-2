import { subMinutes, addMinutes, isAfter, isBefore } from 'date-fns';
import { CoachSettings } from '../models/coachSettings';
import { fetchBookingsForCoach, markNotificationSent, Booking } from '../utils/database';
import { sendEmail, sendSMS } from '../utils/notification';

/**
 * runNoShowJob identifies sessions that were scheduled to start 30 minutes ago
 * and checks whether the booking status remains 'scheduled'. If so, it marks
 * them as no-show and notifies the coach. In a real system you might also
 * flag the user account or apply penalties. Idempotence is ensured via
 * notification flags on the booking.
 */
export async function runNoShowJob(settings: CoachSettings): Promise<void> {
  if (!settings.noShowEnabled) return;
  const now = new Date();
  // Look back 30 minutes ago to detect sessions that should have started.
  const startWindow = subMinutes(now, 40); // small buffer
  const endWindow = subMinutes(now, 20);

  const bookings = await fetchBookingsForCoach(settings.coachId, startWindow, endWindow);
  for (const booking of bookings) {
    if (booking.notifications?.noShowChecked) continue;
    // Only consider bookings still marked as scheduled
    if (booking.status !== 'scheduled') continue;
    const localTime = booking.scheduledAt.toLocaleString('fr-FR', {
      timeZone: settings.timezone,
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    });
    const subject = 'Vérification de présence';
    const body = `La séance prévue à ${localTime} semble être un no‑show. Merci de vérifier la présence du client.`;
    await sendEmail(settings.coachId, { subject, body });
    await sendSMS(settings.coachId, { subject, body });
    await markNotificationSent(booking.id, 'noShowChecked');
  }
}
