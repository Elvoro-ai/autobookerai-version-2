// path: autobooker-ai/app/dashboard/settings/page.tsx
'use client';

import { useSession } from '@auth/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NotificationSettings {
  reminder: boolean;
  noShow: boolean;
  rebook: boolean;
  nps: boolean;
  timezone: string;
  bookingWindow: number;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSettings>({
    reminder: true,
    noShow: true,
    rebook: true,
    nps: true,
    timezone: 'Europe/Paris',
    bookingWindow: 30,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
    } else {
      // Récupère les préférences existantes depuis l’API (facultatif)
      fetch('/api/settings/notifications')
        .then((res) => res.json())
        .then((data) => {
          if (data.settings) setSettings(data.settings);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session, status, router]);

  const handleChange = (
    key: keyof NotificationSettings,
    value: string | number | boolean
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    await fetch('/api/settings/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    alert('Préférences sauvegardées');
  };

  if (loading) return <p className="p-4">Chargement…</p>;

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Paramètres des relances</h1>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={settings.reminder}
          onChange={(e) => handleChange('reminder', e.target.checked)}
        />
        <span>Activer rappel J‑1</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={settings.noShow}
          onChange={(e) => handleChange('noShow', e.target.checked)}
        />
        <span>Activer détection no‑show</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={settings.rebook}
          onChange={(e) => handleChange('rebook', e.target.checked)}
        />
        <span>Activer rebooking J+1</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={settings.nps}
          onChange={(e) => handleChange('nps', e.target.checked)}
        />
        <span>Activer enquête NPS J+7</span>
      </label>
      <div className="flex flex-col">
        <label>Fuseau horaire</label>
        <input
          type="text"
          value={settings.timezone}
          onChange={(e) => handleChange('timezone', e.target.value)}
          className="border rounded p-2 mt-1 dark:bg-gray-800"
        />
      </div>
      <div className="flex flex-col">
        <label>Fenêtre de réservation (jours)</label>
        <input
          type="number"
          value={settings.bookingWindow}
          onChange={(e) => handleChange('bookingWindow', Number(e.target.value))}
          className="border rounded p-2 mt-1 dark:bg-gray-800"
        />
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sauvegarder
      </button>
    </div>
  );
}
