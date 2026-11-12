# DAARA JI — Direction validée

Référence : composition éditoriale aérée, titres massifs à gauche, alternance de sections claires et vertes, règles fines et blocs rectilignes. Adapter sans copier les textes ni les captures d’écran.

Palette : crème papier #f6f3e9, vert forêt #183f35, vert pâle #e8eee5, or mat #a78043. Texte #223b32. Aucune ombre, aucun gradient, aucun angle arrondi, aucune grille de cartes de fonctionnalités ou de tarifs.

Typographie : Manrope pour le corps et la navigation, Lora pour les titres éditoriaux, Noto Naskh Arabic pour les lettres arabes. Titres à gauche, lignes courtes, corps 16–18 px, interligne 1.7.

Mise en page : largeur maximale 1180 px, marges latérales généreuses, hero en deux colonnes avec portrait fourni, rubrique pédagogique sur panneau vert pâle. Sections séparées par règles, listes numérotées plutôt que cartes. Tarifs sous forme de tableau responsif.

UX : six pages, menu mobile accessible, liens visibles, focus clavier contrasté, réduction des animations. Exercices de lettres uniquement, objectifs simples et progression descriptive sans promesses. Tous les champs inconnus entre crochets. Portrait sur accueil et À propos.

Administration : identité vérifiée et adresse autorisée côté serveur. Contenus et demandes dans Turso. Aucun contenu personnel publié via les procédures publiques. Formulaire explicite sur la conservation privée et le contact du responsable pour les mineurs.
# <App Name> — Design

> Starter design brief. Replace this content with the app you're building before writing any UI.
> Keep it short and concrete — it's the single source of truth for palette, typography, pages,
> screens, and flows across web, mobile, and desktop.

One-line description of the app, the platforms it ships on, the visual direction (style, feel), and the core job it does for the user.

## Brand & Colors

One token set, consumed per platform:

- **Web & desktop**: CSS variables in `packages/web/src/web/styles.css` (desktop loads the web UI).
- **Mobile**: `Colors.light` / `Colors.dark` in `packages/mobile/constants/theme.ts`, read via `useColors()`; `userInterfaceStyle: "automatic"` follows the system light/dark setting.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| primary | #1F1F1F | #E5E5E5 | Buttons, active tab, accents |
| background | #FFFFFF | #0A0A0A | Page/screen background |
| card | #FFFFFF | #1A1A1A | Cards, surfaces |
| foreground | #171717 | #FAFAFA | Primary text |
| mutedForeground | #737373 | #A3A3A3 | Secondary text |
| border | #E5E5E5 | #262626 | Hairlines |
| destructive | #DC2626 | #EF4444 | Delete / errors |

## Typography

Name the display + body pairing here. Web: set font families in `styles.css` (self-hosted files go in `packages/web/public/fonts/`). Mobile: system font by default; load custom fonts with `useFonts` from `expo-font` and reference them via `Fonts` in `constants/theme.ts`.

## Pages & Screens

List each page/screen, its route file, and what it shows. Example:

- **Web — Home** (`packages/web/src/web/pages/index.tsx`) — what the user sees first.
- **Mobile — Home** (`packages/mobile/app/(tabs)/index.tsx`) — main tab.
- Add web pages under `src/web/pages/` (+ route in `app.tsx`); mobile tabs under `app/(tabs)/`, stack/modal screens under `app/`.

## Key User Flows

1. Describe the primary flow end to end (open → action → result).
2. ...

## Architecture

- **API**: typed oRPC client (`lib/api.ts` in each package) → the backend in `@template/web`. Query/mutation hooks live in `queries/` (one file per feature); pages/screens call them with `@tanstack/react-query`.
- **State/sync**: TanStack Query with optimistic updates for instant-feel interactions.
- **Auth / payments / uploads**: see `skills/app/references/` when those features are needed.
