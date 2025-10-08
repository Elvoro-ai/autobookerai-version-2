interface NpsEmailProps {
  coachName: string;
  clientName: string;
  surveyUrl: string;
}

export function generateNpsEmail({ coachName, clientName, surveyUrl }: NpsEmailProps) {
  const subject = 'Votre avis compte – AutoBooker';
  const text = 'Bonjour ' + clientName + ',\n\nMerci d\'avoir effectu\u00e9 votre rendez-vous avec ' + coachName + '. Nous serions ravis de conna\u00eetre votre avis. Veuillez cliquer sur ce lien pour r\u00e9pondre \u00e0 un court sondage : ' + surveyUrl;
  const html = '<p>Bonjour ' + clientName + ',</p><p>Merci d\'avoir effectu\u00e9 votre rendez-vous avec ' + coachName + '. Nous serions ravis de conna\u00eetre votre avis.</p><p><a href="' + surveyUrl + '">R\u00e9pondre au sondage</a></p>';
  return { subject, text, html };
}
