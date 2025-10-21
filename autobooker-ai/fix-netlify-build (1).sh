#!/usr/bin/env bash
set -euo pipefail

echo "==> 1) Vérification du package.json"
if [ ! -f package.json ]; then
  echo "Erreur: package.json introuvable à la racine."
  exit 1
fi

node_json () {
  node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));$1"
}

HAS_DEP () {
  node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));const d={...p.dependencies,...p.devDependencies};process.exit(d && d['$1'] ? 0 : 1)"
}

echo "==> 2) Détection du framework"
FRAMEWORK="unknown"
if HAS_DEP next; then FRAMEWORK="next"
elif HAS_DEP vite; then FRAMEWORK="vite"
elif HAS_DEP react-scripts; then FRAMEWORK="cra"
elif HAS_DEP astro; then FRAMEWORK="astro"
elif HAS_DEP nuxt || HAS_DEP nuxt3; then FRAMEWORK="nuxt"
elif HAS_DEP "@sveltejs/kit"; then FRAMEWORK="sveltekit"
fi
echo "Framework détecté: $FRAMEWORK"

echo "==> 3) Ajout/MAJ du script build dans package.json"
node <<'NODE'
const fs = require('fs');
const path = 'package.json';
const pkg = JSON.parse(fs.readFileSync(path,'utf8'));

pkg.scripts ||= {};
const deps = {...pkg.dependencies, ...pkg.devDependencies};

function ensure(k,v){ if(!pkg.scripts[k]) pkg.scripts[k]=v; }

let framework = 'unknown';
if (deps.next) framework = 'next';
else if (deps.vite) framework = 'vite';
else if (deps['react-scripts']) framework = 'cra';
else if (deps.astro) framework = 'astro';
else if (deps.nuxt || deps.nuxt3) framework = 'nuxt';
else if (deps['@sveltejs/kit']) framework = 'sveltekit';

switch(framework){
  case 'next':
    ensure('dev','next dev');
    pkg.scripts.build = 'next build';
    ensure('start','next start');
    break;
  case 'vite':
    ensure('dev','vite');
    pkg.scripts.build = 'vite build';
    ensure('preview','vite preview');
    break;
  case 'cra':
    pkg.scripts.build = 'react-scripts build';
    ensure('start','react-scripts start');
    break;
  case 'astro':
    ensure('dev','astro dev');
    pkg.scripts.build = 'astro build';
    ensure('preview','astro preview');
    break;
  case 'nuxt':
    ensure('dev','nuxt dev');
    pkg.scripts.build = 'nuxt build';
    ensure('start','nuxt start');
    break;
  case 'sveltekit':
    ensure('dev','vite dev');
    pkg.scripts.build = 'vite build';
    ensure('preview','vite preview');
    break;
  default:
    if(!pkg.scripts.build) pkg.scripts.build = "echo 'Build OK'";
}

if (deps.prisma) {
  if (!pkg.scripts.postinstall || !pkg.scripts.postinstall.includes('prisma generate')) {
    pkg.scripts.postinstall = "prisma generate || echo no-prisma";
  }
}

fs.writeFileSync(path, JSON.stringify(pkg, null, 2));
NODE

echo "==> 4) Verrouillage Node en 20 (fichier .nvmrc)"
echo "20" > .nvmrc

echo "==> 5) Création/MAJ du netlify.toml"
PUBLISH=""
PLUGIN=""
case "$FRAMEWORK" in
  next)
    PUBLISH=""
    PLUGIN='
[[plugins]]
  package = "@netlify/plugin-nextjs"
'
    ;;
  vite)      PUBLISH="dist" ;;
  cra)       PUBLISH="build" ;;
  astro)     PUBLISH="dist" ;;
  nuxt)      PUBLISH=".output/public" ;;
  sveltekit) PUBLISH="build" ;;
  *)         PUBLISH="" ;;
esac

cat > netlify.toml <<TOML
[build]
  command = "npm run build"
${PUBLISH:+  publish = "${PUBLISH}"}
$PLUGIN
TOML

echo "==> 6) Installation éventuelle du plugin Next (si Next détecté)"
if [ "$FRAMEWORK" = "next" ]; then
  npm i -D @netlify/plugin-nextjs || true
fi

echo "==> 7) Git add/commit (sans push auto)"
git add package.json .nvmrc netlify.toml || true
if git diff --cached --quiet; then
  echo "Aucun changement à commit."
else
  git commit -m "chore(netlify): add build script, set Node 20, and netlify.toml"
  echo "Commit créé. Pense à 'git push'."
fi

echo "==> 8) Rappel Netlify: définis l'env NODE_VERSION=20 (UI)"
echo "✅ Terminé"
