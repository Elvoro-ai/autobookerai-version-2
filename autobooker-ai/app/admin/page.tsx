import { getServerSession } from "@auth/nextjs";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <p>Bienvenue dans l'interface administrateur.</p>
    </div>
  );
}
