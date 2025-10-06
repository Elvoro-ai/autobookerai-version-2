"use client";

import { useState, FormEvent } from "react";
import { signIn } from "@auth/nextjs";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/dashboard";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    await signIn("email", { email, callbackUrl });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Connexion</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 w-full hover:bg-blue-700 transition-colors"
        >
          Se connecter
        </button>
      </form>
    </main>
  );
}
