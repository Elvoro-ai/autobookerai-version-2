import { sendReminderJob } from './reminder';
import { checkNoShowJob } from './checkNoShow';
import { sendRebookJob } from './rebook';
import { sendNpsJob } from './nps';

/**
 * Initializes all cron jobs.
 * Each job is scheduled using simple intervals. For production, consider using a more robust
 * scheduler like node-cron or an external worker (e.g. Upstash/Cloudflare cron).
 */
export function startJobs() {
  // Reminder (J-1): run once every day
  setInterval(() => {
    sendReminderJob().catch((err) => console.error('Reminder job error:', err));
  }, 24 * 60 * 60 * 1000);

  // No-show check (30 minutes after appointment): run every 30 minutes
  setInterval(() => {
    checkNoShowJob().catch((err) => console.error('No-show job error:', err));
  }, 30 * 60 * 1000);

  // Rebook (J+1): run daily
  setInterval(() => {
    sendRebookJob().catch((err) => console.error('Rebook job error:', err));
  }, 24 * 60 * 60 * 1000);

  // NPS survey (J+7): run daily
  setInterval(() => {
    sendNpsJob().catch((err) => console.error('NPS job error:', err));
  }, 24 * 60 * 60 * 1000);
}
