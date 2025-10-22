# Déploiement sur Netlify — `autobooker-ai` (App Router, Next 13)

Ce projet est organisé avec l'application Next.js dans le sous-dossier **`autobooker-ai/`**.  
Netlify doit être configuré pour construire ce sous-dossier, **pas** la racine du dépôt.

## TL;DR (Netlify App)
1. **Site settings → Build & deploy → Build settings**
   - **Base directory**: `autobooker-ai`
   - **Build command**: `npm ci && npm run build`
   - **Publish directory**: `.next`
2. **Environment → Environment variables**
   - `NODE_VERSION = 20`
   - (Ajouter vos variables d'env applicatives, voir `.env.example`)
3. **Plugins → Add plugin**
   - `@netlify/plugin-nextjs`
4. Committez `netlify.toml` à la racine du dépôt.

## Via `netlify.toml`
Le fichier `netlify.toml` fourni dans ce package définit déjà ces paramètres :
```toml
[build]
  base = "autobooker-ai"
  publish = ".next"
  command = "npm ci && npm run build"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Vérification locale
- Installez la CLI : `npm i -g netlify-cli`
- Dans la racine du repo : `netlify link` (associe le répo au site)
- `netlify build` → doit réussir avec 0 erreur
- `netlify dev` → teste SSR/ISR/Routes API en local

## Notes et conseils
- La racine du dépôt contient également un `package.json` d'amorçage ; Netlify doit **ignorer** ce fichier au profit de `autobooker-ai/package.json`. Le `base = "autobooker-ai"` s'en charge.
- Vérifiez la présence de `app/` (OK) et de pages `error.tsx`/`not-found.tsx` si besoin.
- Maintenez `next.config.mjs` minimal et compatible Netlify (pas d'output=export).
- Remplissez `.env.example` et ajoutez un `README` déploiement avec les variables requises.
