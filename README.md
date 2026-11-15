# Daaraji

Un monorepo Bun et Turborepo pour le site web, l'API, l'application mobile et l'application de bureau de Daaraji.

## Développement

Installez Bun 1.3.14 ou une version plus récente, puis exécutez `bun install` depuis la racine du dépôt.

Copiez `.env.template` vers `.env` pour les commandes du serveur local. Pour l'environnement Cloudflare Vite, copiez `packages/web/.dev.vars.example` vers `packages/web/.dev.vars` et remplissez la URL de la base de données, le jeton de la base de données, le secret d'authentification et les identifiants Google OAuth.

- `bun run dev` démarre l'application web et l'API localement.
- `bun run dev:desktop` et `bun run dev:mobile` démarrent les clients de plateforme.
- `bun run build` construit tous les paquets.
- `bun run start` et `bun run stop` exécutent le serveur Bun local via PM2.
- `bun run lint` et `bun run typecheck` valident le projet.
- `bun run db:generate`, `bun run db:migrate` et `bun run db:push` gèrent la base de données Turso/libSQL.

## Déployer le site web et l'API

L'application web est configurée pour Cloudflare Workers avec le plugin Cloudflare Vite.
Le plan gratuit inclut actuellement jusqu'à 100 000 requêtes Worker par jour, avec une limite CPU de 10 ms par invocation. Dépasser les limites gratuites ou avoir besoin de plus de CPU nécessite un plan payant. Consultez [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

1. Créez un compte Cloudflare, puis exécutez `bunx wrangler login` depuis `packages/web`.
2. Exécutez `bun run deploy` depuis la racine du dépôt. Le Worker se nomme `daaraji-app`; Cloudflare affichera son URL `workers.dev`.
3. Depuis `packages/web`, définissez les secrets Worker `WEBSITE_URL`, `BETTER_AUTH_SECRET`, `DATABASE_URL` et `DATABASE_AUTH_TOKEN` avec `bunx wrangler secret put <NAME>`. Définissez également `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` de la même manière pour activer la connexion Google.
4. Configurez le callback Google OAuth comme `<WEBSITE_URL>/api/auth/callback/google`, puis exécutez `bun run deploy` à nouveau.

L'application continue d'utiliser Turso/libSQL pour les données persistantes ; Cloudflare héberge l'application web et l'API, mais ne migre pas et ne remplace pas cette base de données. Configurez `EXPO_PUBLIC_API_URL` avec l'URL du Worker déployé lors de la construction de l'application mobile.

## Structure du projet

- `packages/web` contient le site React, l'API Hono, la configuration Better Auth et le point d'entrée Cloudflare Worker.
- `packages/mobile` contient le client Expo.
- `packages/desktop` contient le client Electron.
