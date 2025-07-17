import Database from "bun:sqlite";
import type { UserId } from "../users/users.model";
import { initTodosDb } from "./_database/init";
import type { CreateTodoPayload, Todo, TodoId } from "./todos.model";

export class TodosService {
  private static instance: TodosService | null = null;
  private static initPromise: Promise<TodosService> | null = null;
  private db: Database;

  private constructor(db: Database) {
    this.db = db;
  }

  static async getInstance(): Promise<TodosService> {
    if (TodosService.instance) {
      return TodosService.instance;
    }

    // Если инициализация уже в процессе, ждем её завершения
    if (TodosService.initPromise) {
      return TodosService.initPromise;
    }

    // Запускаем инициализацию
    TodosService.initPromise = TodosService.initialize();
    TodosService.instance = await TodosService.initPromise;
    TodosService.initPromise = null;

    return TodosService.instance;
  }

  private static async initialize(): Promise<TodosService> {
    const db = new Database(`${import.meta.dir}/_database/todos.db`, {
      create: true,
    });

    await initTodosDb(db);
    return new TodosService(db);
  }

  async create(
    userId: UserId,
    { completed, description, title }: CreateTodoPayload,
  ): Promise<Todo | null> {
    try {
      const todoPayload = {
        $userId: userId,
        $completed: completed,
        $description: description,
        $title: title,
      };
      const todo = this.db
        .query(
          `INSERT INTO todos (userId, completed, description, title) VALUES ($userId, $completed, $description, $title) RETURNING *`,
        )
        .get(todoPayload);
      return todo as Todo | null;
    } catch (e) {
      console.error("Error creating todo:", e);
      return null;
    }
  }
  async getTodos(userId: UserId) {
    try {
      const todos = this.db
        .query(`SELECT * FROM todos WHERE userId = $userId`)
        .all({ $userId: userId });
      return todos as Todo[];
    } catch (e) {
      console.error("Error get todos:", e);
      return [];
    }
  }
  async getById(userId: UserId, id: TodoId) {
    try {
      const todo = this.db
        .query(`SELECT * FROM todos WHERE userId = $userId AND id = $id`)
        .get({ $userId: userId, $id: id });
      return (todo ?? null) as Todo | null;
    } catch (e) {
      console.error("Error get todo:", e);
      return null;
    }
  }
  async update(userId: UserId, id: TodoId, payload: CreateTodoPayload) {
    try {
      const todoPayload = {
        $id: id,
        $userId: userId,
        $completed: payload.completed,
        $description: payload.description,
        $title: payload.title,
      };

      const todo = this.db
        .query(
          `UPDATE todos SET completed = $completed, description = $description, title = $title WHERE id = $id AND userId = $userId RETURNING *`,
        )
        .get(todoPayload);
      return todo as Todo | null;
    } catch (e) {
      console.error("Error update todo:", e);
      return null;
    }
  }
  async delete(userId: UserId, id: TodoId) {
    try {
      const todo = this.db
        .query(
          `DELETE FROM todos WHERE id = $id AND userId = $userId RETURNING *`,
        )
        .get({ $id: id, $userId: userId });
      return todo as Todo | null;
    } catch (e) {
      console.error("Error delete todo:", e);
      return null;
    }
  }

  close(): void {
    try {
      this.db.close();
    } catch (error) {
      console.error("Error closing database connection", error);
    }
  }
}
