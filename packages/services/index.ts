import { TodosService } from "./src/todos/todos.service";
import { UsersService } from "./src/users/users.service";

export const usersService = await UsersService.getInstance();
export const todosService = await TodosService.getInstance();

export type { CreateTodoPayload, Todo } from "./src/todos/todos.model";
export { CreateTodoDTO, TodoDTO } from "./src/todos/todos.model";

export type { CreateUserPayload, Role, User } from "./src/users/users.model";
export { CreateUserDTO, RoleDTO, UserDTO } from "./src/users/users.model";
