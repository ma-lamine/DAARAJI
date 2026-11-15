import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import type { AppEnvironment } from './env';
import type { createDatabase } from './database/__client';

export function createAuth(env: AppEnvironment, db: ReturnType<typeof createDatabase>) {
  return betterAuth({
    basePath: '/api/auth',
    baseURL: env.WEBSITE_URL,
    database: drizzleAdapter(db, { provider: 'sqlite' }),
    emailAndPassword: { enabled: true, disableSignUp: true },
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [
      env.WEBSITE_URL,
      'http://localhost:4200',
      'http://127.0.0.1:4200',
      'http://localhost:4300',
      'http://127.0.0.1:4300',
    ].map(url => new URL(url).origin),
    ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? {
          socialProviders: {
            google: {
              clientId: env.GOOGLE_CLIENT_ID,
              clientSecret: env.GOOGLE_CLIENT_SECRET,
            },
          },
        }
      : {}),
  });
}