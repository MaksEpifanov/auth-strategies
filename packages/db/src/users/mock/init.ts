import { Database } from "bun:sqlite";
import type { User } from "../model/users";
import { initUsers } from "./users";

export const initUsersDb = async (db: Database) => {
  try {
    // Проверяем существование таблицы users
    const tableExists = db
      .query(
        `
          SELECT name FROM sqlite_master 
          WHERE type='table' AND name='users'
        `
      )
      .get();

    if (!tableExists) {
      // Создаем таблицу users, если она не существует
      db.exec(
        `
          CREATE TABLE users (
          id INTEGER PRIMARY KEY,
          login TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL CHECK(role IN ('user', 'admin', 'owner'))
          )
        `
      );
      console.log("Table users created successfully");
    }
    const userCount = db.query("SELECT COUNT(*) as count FROM users").get() as {
      count: number;
    };

    if (userCount.count === 0) {
      const users = await initUsers();
      const insert = db.prepare(
        "INSERT INTO users ( login, name, password, role) VALUES (?, ?, ?, ?)"
      );
      const insertUsers = db.transaction((users) => {
        for (const user of users as User[]) {
          insert.run(user.login, user.name, user.password, user.role);
        }
      });
      insertUsers(users);
    }
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};
