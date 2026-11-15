// TEMPLATE-MANAGED (__ prefix) — do not edit. Define tables in ./schema.ts
// and query via: import { db } from "./database";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";
import * as schema from "./schema";

export function createDatabase(env: { DATABASE_URL: string; DATABASE_AUTH_TOKEN?: string }) {
  const client = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  });
  return drizzle(client, { schema });
}
