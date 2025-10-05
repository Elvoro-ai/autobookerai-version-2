# AutoBooker AI

Bienvenue dans **AutoBooker AI**, le SaaS d’autobooking pour coachs qui fait gagner 10 heures par semaine grâce à l’intelligence artificielle. Ce dépôt contient le code source d’une application Next.js (App Router) écrite en TypeScript avec Tailwind CSS, shadcn/ui, Radix et Framer Motion【502835188354405†L0-L2】.

## Setup en 5 minutes

1. **Installez les dépendances :**

   ```bash
   npm install
   ```

2. **Configurez vos variables d’environnement :**
   - Copiez le fichier `.env.example` en `.env` et remplissez les valeurs selon vos fournisseurs (voir ci‑dessous).

3. **Appliquez la première migration Prisma et générez le client :**

   ```bash
   npx prisma migrate dev --name init
   npm run seed
   ```

4. **Démarrez le serveur de développement :**

   ```bash
   npm run dev
   ```

5. Rendez‑vous sur `http://localhost:3000`. L’API de healthcheck est disponible sur `/api/health` et retourne un JSON `{ "status": "ok" }`.

### Tests

Exécutez les tests unitaires avec :

```bash
npm run test
```

Exécutez les tests end‑to‑end (E2E) avec Playwright :

```bash
npm run e2e
```

## One‑click Docker

Pour démarrer l’application et la base PostgreSQL en un seul clic :

```bash
docker-compose up --build
```

Cette commande construit l’image, démarre PostgreSQL et lance l’application en mode production sur le port `3000`. Vous pouvez ensuite accéder à l’URL `http://localhost:3000` et vérifier l’API via `/api/health`.
