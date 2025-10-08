interface RebookEmailProps {
  coachName: string;
  clientName: string;
  rebookUrl: string;
}

export function generateRebookEmail({ coachName, clientName, rebookUrl }: RebookEmailProps) {
  const subject = 'Proposition de nouveau rendez-vous avec ' + coachName;
  const text = 'Bonjour ' + clientName + '\n\nNous n\'avons pas pu confirmer votre reprogrammation. Cliquez sur ce lien pour choisir un nouveau créneau : ' + rebookUrl;
  const html = '<p>Bonjour ' + clientName + ',</p><p>Nous n\'avons pas pu confirmer votre reprogrammation. Cliquez sur le lien ci-dessous pour choisir un nouveau créneau avec ' + coachName + '.</p><p><a href="' + rebookUrl + '">Choisir un nouveau créneau</a>.</p>';
  return { subject, text, html };
}
