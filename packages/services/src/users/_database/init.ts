import type { Database } from "bun:sqlite";
import { initUsers } from "./user.example";

export const initUsersDb = async (db: Database) => {
  try {
    // Проверяем существование таблицы users
    const tableExists = db
      .query(
        `
          SELECT name FROM sqlite_master
          WHERE type='table' AND name='users'
        `,
      )
      .get();

    if (!tableExists) {
      // Создаем таблицу users, если она не существует
      db.exec(
        `
          CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          login TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL CHECK(role IN ('user', 'admin'))
          )
        `,
      );
      console.log("Table users created successfully");
    }
    const userCount = db.query("SELECT COUNT(*) as count FROM users").get() as {
      count: number;
    };
    // Проверяем, есть ли уже пользователи в таблице и инициализируем их, если нет
    if (userCount.count === 0) {
      const users = await initUsers();
      const insert = db.prepare(
        "INSERT INTO users ( login, name, password, role) VALUES (?, ?, ?, ?)",
      );
      const insertUsers = db.transaction((usersTranc) => {
        for (const user of usersTranc) {
          insert.run(user.login, user.name, user.password, user.role);
        }
      });
      insertUsers(users);
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};
