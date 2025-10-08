/**
 * CoachSettings defines per-coach configuration for which follow‑up
 * notifications should run and how far in advance clients are allowed to
 * book. Settings are stored in UTC but interpreted relative to a coach's
 * timezone when computing job windows.
 */

export interface CoachSettings {
  coachId: string;
  /** Enable/disable reminder notifications (J‑1). */
  reminderEnabled: boolean;
  /** Enable/disable no‑show check notifications (J+30 min). */
  noShowEnabled: boolean;
  /** Enable/disable rebooking outreach (J+1). */
  rebookEnabled: boolean;
  /** Enable/disable NPS survey (J+7). */
  npsEnabled: boolean;
  /** IANA timezone name (e.g. "Europe/Paris") for this coach. */
  timezone: string;
  /** Maximum hours prior to the session that a client may book. */
  bookingWindowHours: number;
}
