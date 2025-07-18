import Elysia from "elysia";
import { auth, services } from "@/plugins";

export const UsersController = new Elysia()
  .use(services())
  .use(auth())
  .get(
    "users",
    async ({ services }) => {
      const users = await services.users.getUsers();
      return users;
    },
    { auth: "admin" },
  );
