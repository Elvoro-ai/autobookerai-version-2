export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-8">
            AutoBooker AI
          </h1>
          <p className="text-xl mb-12 opacity-90">
            Réservation intelligente automatisée pour votre business
          </p>
          <div className="space-y-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Commencer maintenant
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Réservation Automatique</h3>
                <p className="opacity-80">IA avancée pour gérer vos rendez-vous</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Interface Simple</h3>
                <p className="opacity-80">Dashboard intuitif pour vos clients</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Analytics Temps Réel</h3>
                <p className="opacity-80">Suivi complet de votre activité</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}