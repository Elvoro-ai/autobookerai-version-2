import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendEmail(to: string, subject: string, text: string, html: string) {
  if (!resend) {
    // fallback to console log when no API key
    console.log('Sending email (dev mode):', { to, subject, text, html });
    return;
  }
  await resend.emails.send({
    from: process.env.RESEND_SENDER || 'no-reply@autobooker.ai',
    to,
    subject,
    text,
    html,
  });
}
