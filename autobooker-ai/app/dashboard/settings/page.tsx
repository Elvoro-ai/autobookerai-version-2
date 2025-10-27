// path: autobooker-ai/app/dashboard/settings/page.tsx
'use client';

import { useSession } from 'next-auth/react';
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
  const sessionData = useSession();
  const session = sessionData?.data ?? null;
  const status = sessionData?.status;
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
      // Récupère les préférences existantes depuis l'API (facultatif)
      fetch('/api/settings/notifications')
        .then((res) => res.json())
        .then((data) => {
          if (data) setSettings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Erreur récupération settings:', err);
          setLoading(false);
        });
    }
  }, [session, status, router]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Échec de mise à jour');
      alert('Paramètres sauvegardés avec succès !');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div>Chargement...</div>;
  }

  if (!session) {
    return <div>Non authentifié</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Paramètres de Notification</h1>
      <form>
        <label>
          <input
            type="checkbox"
            checked={settings.reminder}
            onChange={(e) => setSettings({ ...settings, reminder: e.target.checked })}
          />
          Rappel de rendez-vous
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={settings.noShow}
            onChange={(e) => setSettings({ ...settings, noShow: e.target.checked })}
          />
          Notification en cas de no-show
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={settings.rebook}
            onChange={(e) => setSettings({ ...settings, rebook: e.target.checked })}
          />
          Relance pour reprendre RDV
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            checked={settings.nps}
            onChange={(e) => setSettings({ ...settings, nps: e.target.checked })}
          />
          Sondage NPS
        </label>
        <br />

        <label>
          Fuseau horaire:
          <select
            value={settings.timezone}
            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
          >
            <option value="Europe/Paris">Europe/Paris</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
          </select>
        </label>
        <br />

        <label>
          Fenêtre de réservation (jours):
          <input
            type="number"
            value={settings.bookingWindow}
            onChange={(e) => setSettings({ ...settings, bookingWindow: parseInt(e.target.value, 10) })}
          />
        </label>
        <br />

        <button type="button" onClick={handleSave} disabled={loading}>
          Sauvegarder
        </button>
      </form>
    </div>
  );
}
