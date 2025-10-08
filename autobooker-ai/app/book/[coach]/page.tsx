'use client'
import { useState } from 'react';

export default function Page({ params }: { params: { coach: string } }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coachId: params.coach,
          clientName: name,
          clientEmail: email,
          dateTime: new Date(`${date}T${time}:00`).toISOString()
        })
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Erreur');
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Réservation confirmée</h1>
        <p>Merci {name}, un email de confirmation vous a été envoyé.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 1 && (
        <div>
          <h1 className="text-xl font-bold mb-4">Choisir la date</h1>
          <input
            type="date"
            className="p-2 border rounded mb-4 w-full dark:bg-gray-900"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            disabled={!date}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            onClick={() => setStep(2)}
          >
            Suivant
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h1 className="text-xl font-bold mb-4">Choisir l’heure</h1>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((t) => (
              <button
                key={t}
                className={`p-2 border rounded ${time === t ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800'}`}
                onClick={() => setTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            disabled={!time}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            onClick={() => setStep(3)}
          >
            Suivant
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h1 className="text-xl font-bold mb-4">Vos informations</h1>
          <input
            type="text"
            placeholder="Nom"
            className="p-2 border rounded mb-2 w-full dark:bg-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded mb-4 w-full dark:bg-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            disabled={!name || !email || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            onClick={handleCreate}
          >
            {loading ? 'Envoi...' : 'Confirmer'}
          </button>
        </div>
      )}
    </div>
  );
}
