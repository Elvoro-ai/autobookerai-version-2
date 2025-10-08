interface NoShowEmailProps {
  coachName: string;
  clientName: string;
  date: string;
  time: string;
  rebookUrl: string;
}

export function ({ coachName, clientName, date, time, rebookUrl }: NoShowEmailProps) {
  const subject = 'Rendez-vous manqué avec ' + coachName;
  const text = 'Bonjour ' + clientName + '\n\nVous avez manqué votre rendez-vous du ' + date + ' à ' + time + ' avec ' + coachName + '. Cliquez ici pour reprogrammer : ' + rebookUrl;
  const html = '<p>Bonjour ' + clientName + ',</p><p>Vous avez manqué votre rendez-vous du <strong>' + date + '</strong> à <strong>' + time + '</strong> avec ' + coachName + '.</p><p><a href="' + rebookUrl + '">Cliquez ici pour reprogrammer</a>.</p>';
  return { subject, text, html };
}
