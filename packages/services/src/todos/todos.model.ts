import { t } from "elysia";
import { UserIdDTO } from "../users/users.model";

export const TODO_CONSTRAINTS = {
  TITLE_MIN_LENGTH: 4,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MIN_LENGTH: 4,
  DESCRIPTION_MAX_LENGTH: 1000,
} as const;

export const CompletedDTO = t.Union([t.Literal(0), t.Literal(1)], {
  description: "Whether the todo is completed or not",
  error: "Invalid completed status",
});

export const TodoIdDTO = t.Number({
  minLength: 1,
  error: "Todo ID is required",
  description: "Unique identifier for a todo item",
});
export type TodoId = typeof TodoIdDTO.static;

const TitleFieldDTO = t.String({
  minLength: TODO_CONSTRAINTS.TITLE_MIN_LENGTH,
  maxLength: TODO_CONSTRAINTS.TITLE_MAX_LENGTH,
  error: `Title must be between ${TODO_CONSTRAINTS.TITLE_MIN_LENGTH} and ${TODO_CONSTRAINTS.TITLE_MAX_LENGTH} characters`,
  description: "Title of the todo item",
});

const DescriptionFieldDTO = t.String({
  minLength: TODO_CONSTRAINTS.DESCRIPTION_MIN_LENGTH,
  maxLength: TODO_CONSTRAINTS.DESCRIPTION_MAX_LENGTH,
  error: `Description must be between ${TODO_CONSTRAINTS.DESCRIPTION_MIN_LENGTH} and ${TODO_CONSTRAINTS.DESCRIPTION_MAX_LENGTH} characters`,
  description: "Description of the todo item",
});

export const TodoDTO = t.Object({
  id: TodoIdDTO,
  userId: UserIdDTO,
  title: TitleFieldDTO,
  description: DescriptionFieldDTO,
  completed: CompletedDTO,
});
export type Todo = typeof TodoDTO.static;

export const CreateTodoDTO = t.Object({
  title: TitleFieldDTO,
  description: DescriptionFieldDTO,
  completed: CompletedDTO,
});
export type CreateTodoPayload = typeof CreateTodoDTO.static;

export const UpdateTodoDTO = t.Partial(CreateTodoDTO);
export type UpdateTodoPayload = typeof UpdateTodoDTO.static;
