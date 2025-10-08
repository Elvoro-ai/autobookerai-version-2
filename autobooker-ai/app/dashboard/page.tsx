"use client";
import { useEffect, useState } from 'react';

interface Notification {
  id: string;
  type: string;
  status: 'sent' | 'pending' | 'failed';
  createdAt: string;
  details: string;
}

/**
 * Dashboard page that displays the history and status of notification jobs.
 * In the real application this page would fetch notifications via
 * server‑side functions (e.g. using the Next.js App Router's fetch API or
 * react‑query) from the Notification table. For the moment we show
 * placeholder data.
 */
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Fetch notifications from API. Here we populate mock data.
    const mock: Notification[] = [
      {
        id: '1',
        type: 'reminder',
        status: 'sent',
        createdAt: new Date().toISOString(),
        details: 'Rappel envoyé pour la séance de demain',
      },
      {
        id: '2',
        type: 'no_show',
        status: 'pending',
        createdAt: new Date().toISOString(),
        details: 'En attente de vérification du no‑show',
      },
    ];
    setNotifications(mock);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Centre de notifications</h1>
      <p className="mb-4">Historique des relances et leur statut.</p>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Statut</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Détails</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((n) => (
            <tr key={n.id} className="border-t">
              <td className="px-4 py-2">{n.type}</td>
              <td className="px-4 py-2">{n.status}</td>
              <td className="px-4 py-2">{new Date(n.createdAt).toLocaleString('fr-FR')}</td>
              <td className="px-4 py-2">{n.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}