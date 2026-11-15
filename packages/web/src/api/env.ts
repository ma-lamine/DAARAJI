export interface AppEnvironment {
  WEBSITE_URL: string;
  BETTER_AUTH_SECRET: string;
  DATABASE_URL: string;
  DATABASE_AUTH_TOKEN?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
}

export function getLocalEnvironment(): AppEnvironment {
  const websiteUrl = process.env.WEBSITE_URL;
  const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
  const databaseUrl = process.env.DATABASE_URL;

  if (!websiteUrl) throw new Error("Missing required environment variable: WEBSITE_URL");
  if (!betterAuthSecret) throw new Error("Missing required environment variable: BETTER_AUTH_SECRET");
  if (!databaseUrl) throw new Error("Missing required environment variable: DATABASE_URL");

  return {
    WEBSITE_URL: websiteUrl,
    BETTER_AUTH_SECRET: betterAuthSecret,
    DATABASE_URL: databaseUrl,
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  };
}
