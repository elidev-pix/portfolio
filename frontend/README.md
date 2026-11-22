# Portfolio — frontend

React + Vite (JavaScript), Three.js (fond « dotted grid » du Hero), prévu pour un déploiement sur Vercel.
Le backend Spring Boot et la base Neon PostgreSQL viendront dans `../backend`.

## Lancer en local

```bash
cd frontend
npm install
npm run dev
```

## Variables d'environnement (voir `.env.example`)

| Variable | Rôle |
|---|---|
| `VITE_API_URL` | URL de l'API Spring Boot, sans slash final. Vide : le site utilise son contenu intégré (`src/data/content.js`). |
| `VITE_SITE_URL` | URL publique du site (canonical, sitemap, Open Graph). Vide sur Vercel : le domaine de production est utilisé. |

## Déployer sur Vercel

1. Importer le dépôt GitHub dans Vercel.
2. **Root Directory** : `frontend`. Framework : Vite (détecté automatiquement).
3. Ajouter `VITE_API_URL` quand le backend sera en ligne.
4. `vercel.json` gère la réécriture SPA, le cache des assets et les en-têtes de sécurité.

## Où modifier le contenu

- Textes, projets, compétences, expériences : `src/data/content.js` (source : CV du 20/11/2026).
- Les sections « Difficultés » et « Solutions » d'un projet restent masquées tant que les tableaux `difficulties` et `solutions` sont vides : à remplir avec du contenu réel.
- Photo : `public/eliel.jpg`. CV : `public/CV_ElielSawadogo.pdf`.

## Contrat d'API attendu (backend à venir)

- `GET /api/posts`, `GET /api/posts/{slug}` : `{ slug, title, excerpt, category, tags[], publishedAt, readingTime, coverUrl, coverAlt, seoTitle, seoDescription, content (JSON Tiptap) }`
- `GET /api/tutorials`, `GET /api/tutorials/{slug}` : `{ slug, title, excerpt, difficulty, technologies[], publishedAt, objective, prerequisites[], steps[{ title, content }], result, troubleshooting[{ error, solution }] }`
- `POST /api/contact` : `{ name, email, subject, message, website, elapsedMs }` (`website` est un champ piège anti-spam, doit rester vide).

## Limites connues

- Application monopage : les aperçus sociaux (Open Graph) par article demanderont un prérendu ou une fonction serveur. Les moteurs de recherche, eux, exécutent le JavaScript.
- Le sitemap généré au build ne contient que les pages statiques et les projets ; les articles seront ajoutés avec le backend.
