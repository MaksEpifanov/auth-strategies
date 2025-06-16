import { type Context, Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import { usersDB } from "@packages/db";

const authGuard = async ({ headers, set, status }: Context) => {
  const authHeader = headers.authorization;
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    set.headers["WWW-Authenticate"] = 'Basic realm="Restricted Area"';
    return status(401, { message: "Missing or invalid Authorization header" });
  }
};

const app = new Elysia({
  prefix: "/api",
})
  .use(cors())
  .get("signup", () => {})
  .get("users", async () => {
    const users = await usersDB.getUsers();
    return users;
  })
  .guard(
    {
      beforeHandle: authGuard,
    },
    (app) =>
      app.get("admins", () => {
        return { message: "Welcome, Admin!" };
      })
  )

  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
