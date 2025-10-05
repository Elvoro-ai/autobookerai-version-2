import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'AutoBooker AI',
  description: 'Gagnez 10 heures/semaine gr\u00e2ce \u00e0 l\u2019IA',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
