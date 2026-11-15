import type { RouterClient } from "@orpc/server";
import { createApp } from "./__core/app";
import { ping } from "./routes/ping";
import { createSchool } from "./routes/school";
import { createAuth } from "./auth";
import { createDatabase } from "./database/__client";
import type { AppEnvironment } from "./env";

function createRouter(db: ReturnType<typeof createDatabase>, auth: ReturnType<typeof createAuth>) {
  return {
    ping,
    school: createSchool(db, auth),
  };
}

export type AppRouter = ReturnType<typeof createRouter>;
/** Typed client for the router — used by the web and mobile api clients. */
export type AppRouterClient = RouterClient<AppRouter>;

export function createApi(env: AppEnvironment) {
  const db = createDatabase(env);
  const auth = createAuth(env, db);
  const app = createApp(createRouter(db, auth), env.WEBSITE_URL);
  app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));
  return app;
}
