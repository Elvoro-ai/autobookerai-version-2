import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AutoBooker AI - Réservation Intelligente',
  description: 'Système de réservation automatisé avec intelligence artificielle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}