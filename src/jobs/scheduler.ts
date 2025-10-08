import { schedule } from 'node-cron';
import { CoachSettings } from '../models/coachSettings';
import { enqueue } from './queue';
import { runReminderJob } from './reminder';
import { runNoShowJob } from './checkNoShow';
import { runRebookJob } from './rebook';
import { runNpsJob } from './nps';

/**
 * Register cron schedules for all background jobs. The cron expressions are
 * expressed in UTC; they will trigger periodic scans of the database. Each
 * invocation enqueues a corresponding job into the lightweight queue. Jobs
 * themselves inspect per‑booking flags to avoid duplicate notifications.
 *
 * @param settings - Settings for the coach whose jobs are being scheduled
 */
export function registerJobSchedules(settings: CoachSettings): void {
  // Reminder J‑1: run every day at 09:00 UTC. It will send reminders for
  // sessions scheduled for the next day (in the coach's timezone). Adjust
  // the hour to suit your business (e.g. midday). Cron format: minute hour day month day‑of‑week
  schedule('0 9 * * *', () => {
    enqueue(() => runReminderJob(settings));
  });

  // No‑show check J+0:30. Runs every 15 minutes to capture sessions that
  // started 30 minutes ago.
  schedule('*/15 * * * *', () => {
    enqueue(() => runNoShowJob(settings));
  });

  // Rebook J+1: run once daily at 10:00 UTC.
  schedule('0 10 * * *', () => {
    enqueue(() => runRebookJob(settings));
  });

  // NPS J+7: run once daily at 11:00 UTC.
  schedule('0 11 * * *', () => {
    enqueue(() => runNpsJob(settings));
  });
}
