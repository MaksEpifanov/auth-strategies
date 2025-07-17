import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { CreateTodoDTO, TodoDTO } from "@packages/service";
import { Elysia, t } from "elysia";
import { auth } from "./plugins/auth";
import { services } from "./plugins/services";

const app = new Elysia({
  prefix: "/api",
})
  .use(cors())
  .use(swagger())
  .use(services())
  .use(auth())
  .get("status", ({ status }) => status(200, { message: "Server is running!" }))
  .get(
    "todos",
    async ({ user, services }) => {
      const userId = user.id;
      const todos = await services.todos.getTodos(userId);
      return todos;
    },
    {
      response: t.Array(TodoDTO),
      auth: "user",
    },
  )
  .post(
    "todos",
    async ({ body, user, services }) => {
      const userId = user.id;
      const todo = await services.todos.create(userId, { ...body });
      return todo;
    },
    {
      body: CreateTodoDTO,
      auth: "user",
    },
  )
  .get(
    "admins",
    async ({ services }) => {
      const users = await services.users.getUsers("admin");
      return users;
    },
    {
      auth: "admin",
    },
  )
  .get(
    "users",
    async ({ services }) => {
      const users = await services.users.getUsers();
      return users;
    },
    { auth: "admin" },
  )

  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
