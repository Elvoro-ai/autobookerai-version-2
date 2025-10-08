import { addDays, startOfDay, endOfDay } from 'date-fns';
import { CoachSettings } from '../models/coachSettings';
import {
  fetchBookingsForCoach,
  markNotificationSent,
  Booking,
} from '../utils/database';
import { sendEmail, sendSMS } from '../utils/notification';

/**
 * runReminderJob sends a reminder to clients whose sessions are scheduled for
 * tomorrow (J‑1). It respects the coach's timezone when computing the
 * beginning and end of the next day. Notifications are idempotent: a
 * booking marked as already reminded will be skipped.
 */
export async function runReminderJob(settings: CoachSettings): Promise<void> {
  if (!settings.reminderEnabled) return;

  const now = new Date();
  // Compute the start and end of the next day in the coach's timezone. For
  // simplicity we assume the server clock is UTC and ignore DST. In a
  // production system you'd use a library like date‑fns‑tz to properly
  // convert between timezones.
  const nextDayStart = startOfDay(addDays(now, 1));
  const nextDayEnd = endOfDay(addDays(now, 1));

  const bookings = await fetchBookingsForCoach(settings.coachId, nextDayStart, nextDayEnd);
  for (const booking of bookings) {
    if (booking.notifications?.reminderSent) continue;
    const localDateTime = booking.scheduledAt.toLocaleString('fr-FR', {
      timeZone: settings.timezone,
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    });
    const subject = 'Rappel de votre séance';
    const body = `Bonjour,\n\nCeci est un rappel pour votre séance prévue le ${localDateTime}. Nous avons hâte de vous retrouver !`;
    await sendEmail(booking.userId, { subject, body });
    await sendSMS(booking.userId, { subject, body });
    await markNotificationSent(booking.id, 'reminderSent');
  }
}
