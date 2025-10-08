interface ReminderEmailProps {
  coachName: string;
  clientName: string;
  date: string;
  time: string;
  cancelUrl: string;
}

export function generateReminderEmail({ coachName, clientName, date, time, cancelUrl }: ReminderEmailProps) {
  const subject = 'Rappel de votre rendez-vous avec ' + coachName + ' le ' + date + ' \u00e0 ' + time;
  const text = 'Bonjour ' + clientName + ',\n\nCeci est un rappel pour votre rendez-vous avec ' + coachName + ' pr\u00e9vu le ' + date + ' \u00e0 ' + time + '. Si vous souhaitez annuler, veuillez cliquer sur ce lien : ' + cancelUrl;
  const html = '<p>Bonjour ' + clientName + ',</p><p>Ceci est un rappel pour votre rendez-vous avec ' + coachName + ' pr\u00e9vu le ' + date + ' \u00e0 ' + time + '.</p><p>Si vous souhaitez annuler, veuillez cliquer sur ce lien : <a href="' + cancelUrl + '">Annuler le rendez-vous</a></p>';
  return { subject, text, html };
}
