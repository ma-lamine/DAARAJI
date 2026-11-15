import { createApi } from "./api";
import type { AppEnvironment } from "./api/env";

export default {
  fetch(request: Request, env: AppEnvironment) {
    return createApi(env).fetch(request);
  },
};
