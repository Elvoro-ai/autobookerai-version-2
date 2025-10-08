'use client';

import { useSession } from '@auth/nextjs';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Appointment {
  id: string;
  coachId: string;
  clientId: string;
  dateTime: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedClient, setSelectedClient] = useState<string>('all');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
      return;
    }
    const fetchData = async () => {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(data);
    };
    fetchData();
  }, [session, status, router]);

  const filtered = selectedClient === 'all' ? appointments : appointments.filter(a => a.clientId === selectedClient);

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);
  const weekCount = filtered.filter(a => {
    const d = new Date(a.dateTime);
    return d >= weekStart && d < weekEnd;
  }).length;
  const monthCount = filtered.filter(a => {
    const d = new Date(a.dateTime);
    return d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
  }).length;

  function generateCalendar(date: Date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const start = new Date(firstDay);
    start.setDate(firstDay.getDate() - firstDay.getDay());
    const weeks: Date[][] = [];
    let cur = new Date(start);
    for (let i = 0; i < 6; i++) {
      const week: Date[] = [];
      for (let j = 0; j < 7; j++) {
        week.push(new Date(cur));
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }

  const weeks = generateCalendar(currentMonth);

  const uniqueClientIds = Array.from(new Set(appointments.map(a => a.clientId)));

  const exportCSV = () => {
    const lines = ['date,clientId,coachId'];
    filtered.forEach(a => {
      lines.push(`${new Date(a.dateTime).toISOString()},${a.clientId},${a.coachId}`);
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'appointments.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (status === 'loading' || !session) {
    return <div className="p-4">Chargement...</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
      <div>
        <label htmlFor="client-select" className="mr-2">Filtrer par client:</label>
        <select id="client-select" value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} className="border px-2 py-1 rounded">
          <option value="all">Tous</option>
          {uniqueClientIds.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="p-4 border rounded w-full sm:w-1/2">
          <h2 className="font-semibold">RDV cette semaine</h2>
          <p className="text-3xl">{weekCount}</p>
        </div>
        <div className="p-4 border rounded w-full sm:w-1/2">
          <h2 className="font-semibold">RDV ce mois</h2>
          <p className="text-3xl">{monthCount}</p>
        </div>
      </div>
      <button onClick={exportCSV} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Exporter CSV</button>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-between my-2">
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="px-2 py-1">«</button>
          <h2 className="text-xl font-semibold">{currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="px-2 py-1">»</button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'].map(day => (
                <th key={day} className="border p-2 text-center text-xs sm:text-sm">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => {
                  const isCurrent = day.getMonth() === currentMonth.getMonth();
                  const has = filtered.some(a => {
                    const d = new Date(a.dateTime);
                    return d.toDateString() === day.toDateString();
                  });
                  return (
                    <td key={di} className={`border h-16 p-1 align-top text-xs sm:text-sm ${isCurrent ? '' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <div>{day.getDate()}</div>
                      {has && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
