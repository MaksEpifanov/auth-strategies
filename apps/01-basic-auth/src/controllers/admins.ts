import Elysia from "elysia";
import { auth, services } from "@/plugins";

export const AdminsController = new Elysia()
  .use(services())
  .use(auth())
  .get(
    "admins",
    async ({ services }) => {
      const users = await services.users.getUsers("admin");
      return users;
    },
    {
      auth: "admin",
    },
  );
