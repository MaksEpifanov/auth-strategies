import Database from "bun:sqlite";
import { initUsersDb } from "./_database/init";
import type { CreateUserPayload, Role, User, UserId } from "./users.model";

export class UsersService {
  private static instance: UsersService | null = null;
  private static initPromise: Promise<UsersService> | null = null;
  private db: Database;

  private constructor(db: Database) {
    this.db = db;
  }
  static async getInstance(): Promise<UsersService> {
    if (UsersService.instance) {
      return UsersService.instance;
    }

    // Если инициализация уже в процессе, ждем её завершения
    if (UsersService.initPromise) {
      return UsersService.initPromise;
    }

    // Запускаем инициализацию
    UsersService.initPromise = UsersService.initialize();
    UsersService.instance = await UsersService.initPromise;
    UsersService.initPromise = null;

    return UsersService.instance;
  }

  private static async initialize(): Promise<UsersService> {
    const db = new Database(`${import.meta.dir}/_database/users.db`, {
      create: true,
    });

    await initUsersDb(db);
    return new UsersService(db);
  }

  async create({ login, name, password, role }: CreateUserPayload) {
    try {
      const hashedPassword = await Bun.password.hash(password);

      const userPayload = {
        $login: login,
        $name: name,
        $password: hashedPassword,
        $role: role,
      };
      const user = this.db
        .query(
          `INSERT INTO users (login, name, password, role) VALUES ($login, $name, $password, $role) RETURNING *;`,
        )
        .get(userPayload);
      return (user as User) ?? null;
    } catch (e) {
      console.error("Error creating user:", e);
      return null;
    }
  }
  async getUsers(role?: Role) {
    try {
      if (role) {
        const users = this.db
          .query(`SELECT * FROM users WHERE role = $role`)
          .all({ $role: role });
        return users as User[];
      }
      const users = this.db.query(`SELECT * FROM users`).all();
      return (users as User[]) ?? [];
    } catch (e) {
      console.error("Error get users:", e);
      return [];
    }
  }
  async getById(id: UserId) {
    try {
      const user = this.db
        .query(`SELECT * FROM users WHERE id = $id`)
        .get({ $id: id });
      return (user as User) ?? null;
    } catch (e) {
      console.error("Error get user:", e);
      return null;
    }
  }
  async getByLogin(login: string) {
    try {
      const user = this.db
        .query(`SELECT * FROM users WHERE login = $login`)
        .get({ $login: login });
      return (user as User) ?? null;
    } catch (e) {
      console.error("Error get user:", e);
      return null;
    }
  }
  async update(id: UserId, payload: CreateUserPayload) {
    try {
      const userPayload = {
        $id: id,
        $login: payload.login,
        $name: payload.name,
        $password: payload.password,
        $role: payload.role,
      };
      const user = this.db
        .query(
          `UPDATE users SET login = $login, name = $name, password = $password, role = $role WHERE id = $id RETURNING *;`,
        )
        .get(userPayload);
      return (user as User) ?? null;
    } catch (e) {
      console.error("Error update user:", e);
      return null;
    }
  }
  async delete(id: string) {
    try {
      this.db.query(`DELETE FROM users WHERE id = $id`).run({ $id: id });
    } catch (e) {
      console.error("Error deleting user:", e);
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
