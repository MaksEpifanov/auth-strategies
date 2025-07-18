import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { AdminsController } from "./controllers/admins";
import { TodosController } from "./controllers/todos";
import { UsersController } from "./controllers/users";

const app = new Elysia({
  prefix: "/api",
})
  .use(cors())
  .use(swagger())
  .use(UsersController)
  .use(AdminsController)
  .use(TodosController)
  .get("status", ({ status }) => status(200, { message: "Server is running!" }))
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
