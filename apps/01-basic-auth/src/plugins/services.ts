import { todosService, usersService } from "@packages/services";
import Elysia from "elysia";

export const services = () =>
  new Elysia({
    name: "services",
  }).decorate("services", {
    todos: todosService,
    users: usersService,
  });
