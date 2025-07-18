import { CreateTodoDTO, TodoDTO } from "@packages/service";
import { Elysia, t } from "elysia";
import { auth, services } from "@/plugins";

export const TodosController = new Elysia()
  .use(services())
  .use(auth())
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
  );
