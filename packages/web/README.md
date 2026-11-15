# Web application

The React single-page app and Hono API are built and deployed together as a
Cloudflare Worker using the Cloudflare Vite plugin.

## Run locally

```bash
bun run dev
```

Set local Worker bindings in `.dev.vars` (copy `.dev.vars.example` first).

## Typecheck, build, and deploy

```bash
bun run typecheck
bun run build
bun run deploy
```

The Worker uses Turso/libSQL for persistent storage. Configure
`WEBSITE_URL`, `BETTER_AUTH_SECRET`, `DATABASE_URL`, and
`DATABASE_AUTH_TOKEN` as Cloudflare Worker bindings. Add Google OAuth
credentials to enable Google sign-in.
