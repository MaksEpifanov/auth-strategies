import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import { usersDB } from "@packages/db";

import { authGuard } from "./authGuard";

const app = new Elysia({
  prefix: "/api",
})
  .use(cors())
  .get("status", ({ status }) => status(200, { message: "Server is running!" }))
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
