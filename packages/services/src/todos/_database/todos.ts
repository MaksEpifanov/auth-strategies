import type { Todo } from "../todos.model";

export const initTodos = async () =>
  [
    {
      title: "Todo 1",
      userId: 1,
      description: "Description for Todo 1",
      completed: 0,
    },
    {
      title: "Todo 2",
      userId: 1,
      description: "Description for Todo 2",
      completed: 0,
    },
    {
      title: "Todo 3",
      userId: 2,
      description: "Description for Todo 3",
      completed: 0,
    },
  ] satisfies Omit<Todo, "id">[];
