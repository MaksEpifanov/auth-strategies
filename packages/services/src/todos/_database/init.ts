import type { Database } from "bun:sqlite";
import { initTodos } from "./todos";

export const initTodosDb = async (db: Database) => {
  try {
    // Проверяем существование таблицы todos
    const tableExists = db
      .query(
        `
          SELECT name FROM sqlite_master
          WHERE type='table' AND name='todos'
        `,
      )
      .get();

    if (!tableExists) {
      // Создаем таблицу users, если она не существует
      db.exec(
        `
          CREATE TABLE todos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          completed BOOLEAN NOT NULL DEFAULT 0
          )
        `,
      );
      console.log("Table todos created successfully");
    }
    const todosCount = db
      .query("SELECT COUNT(*) as count FROM todos")
      .get() as {
      count: number;
    };
    // Проверяем, есть ли уже пользователи в таблице и инициализируем их, если нет
    if (todosCount.count === 0) {
      const insert = db.prepare(
        "INSERT INTO todos (userId, title, description, completed) VALUES (?, ?, ?, ?)",
      );
      const insertTranc = db.transaction((todos) => {
        for (const user of todos) {
          insert.run(user.userId, user.title, user.description, user.completed);
        }
      });
      const defaultTodos = await initTodos();
      insertTranc(defaultTodos);
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};
