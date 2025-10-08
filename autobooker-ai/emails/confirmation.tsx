interface ConfirmationEmailProps {
  coachName: string;
  clientName: string;
  date: string;
  time: string;
  rebookUrl: string;
  cancelUrl: string;
}

export function generateConfirmationEmail({ coachName, clientName, date, time, rebookUrl, cancelUrl }: ConfirmationEmailProps) {
  const subject = `Votre rendez-vous avec ${coachName} est confirmé`;
  const text = `Bonjour ${clientName},\n\nVotre rendez-vous le ${date} à ${time} est confirmé.\n\nPour reprogrammer : ${rebookUrl}\nPour annuler : ${cancelUrl}\n\nÀ bientôt,\nAutoBooker AI`;
  const html = `<p>Bonjour ${clientName},</p><p>Votre rendez-vous le <strong>${date}</strong> à <strong>${time}</strong> avec ${coachName} est confirmé.</p><p><a href="${rebookUrl}">Reprogrammer</a> | <a href="${cancelUrl}">Annuler</a></p><p>À bientôt,<br/>AutoBooker AI</p>`;
  return { subject, text, html };
}
