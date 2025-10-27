'use client';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Appointment {
  id: string;
  coachId: string;
  clientId: string;
  dateTime: string;
  status: string;
}

export default function ClientPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(
        data.filter((a: Appointment) => a.clientId === clientId)
      );
    };

    fetchData();
  }, [status, session, clientId, router]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Historique du client</h1>
      <ul className="space-y-2">
        {appointments.map((a) => (
          <li key={a.id} className="border p-2 rounded-md">
            <div>
              Date :{' '}
              {new Date(a.dateTime).toLocaleString('fr-FR')}
            </div>
            <div>
              Statut : {a.status}
            </div>
            {/* Note : implémentez l'édition des notes ici */}
          </li>
        ))}
      </ul>
    </div>
  );
}
