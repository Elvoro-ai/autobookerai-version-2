import { getServerSession } from 'next-auth/next';
import { redirect } from "next/navigation";
import { db } from "@prisma/client";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/login");
  }
  const notifications = await db.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>Vous n'avez aucune notification pour le moment.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="border rounded-md p-3 dark:border-gray-700"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {new Date(n.createdAt).toLocaleString("fr-FR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
              <p>{n.message}</p>
              {n.link && (
                <a
                  href={n.link}
                  className="text-blue-600 hover:underline"
                >
                  Voir plus
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
