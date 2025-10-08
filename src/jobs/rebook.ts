import { subDays, startOfDay, endOfDay } from 'date-fns';
import { CoachSettings } from '../models/coachSettings';
import { fetchBookingsForCoach, markNotificationSent, Booking } from '../utils/database';
import { sendEmail, sendSMS } from '../utils/notification';

/**
 * runRebookJob contacts clients who missed their session yesterday (no‑shows)
 * and invites them to rebook. It searches for bookings scheduled one day
 * ago whose status is 'no_show'. Idempotence is ensured via the
 * notification flags on the booking.
 */
export async function runRebookJob(settings: CoachSettings): Promise<void> {
  if (!settings.rebookEnabled) return;
  const now = new Date();
  const yesterdayStart = startOfDay(subDays(now, 1));
  const yesterdayEnd = endOfDay(subDays(now, 1));
  const bookings = await fetchBookingsForCoach(settings.coachId, yesterdayStart, yesterdayEnd);
  for (const booking of bookings) {
    if (booking.notifications?.rebookSent) continue;
    if (booking.status !== 'no_show') continue;
    const subject = 'Reprogrammation de votre séance';
    const body = `Bonjour,\n\nNous sommes désolés que vous n'ayez pas pu assister à votre séance hier. Cliquez ici pour reprogrammer une nouvelle séance qui vous convient.`;
    await sendEmail(booking.userId, { subject, body });
    await sendSMS(booking.userId, { subject, body });
    await markNotificationSent(booking.id, 'rebookSent');
  }
}
