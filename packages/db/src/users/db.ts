import Database from "bun:sqlite";
import { initUsersDb } from "./mock/init";
import type { User } from "./model/users";

export class UsersDB {
  private db: Database = new Database(`${import.meta.dir}/users.db`, {
    create: true,
  });

  constructor() {
    this.init();
  }

  private async init() {
    await initUsersDb(this.db);
  }

  addUser({ login, name, password, role }: Omit<User, "id">): void {
    const stmt = this.db.prepare(
      "INSERT INTO users (login, name, password, role) VALUES (?, ?, ?, ?)"
    );
    stmt.run(login, name, password, role);
  }

  getUser(id: string): User | undefined {
    return this.db.query("SELECT * FROM users WHERE id = ?").get(id) as
      | User
      | undefined;
  }

  deleteUser(id: string): void {
    const stmt = this.db.prepare("DELETE FROM users WHERE id = ?");
    stmt.run(id);
  }

  async getUsers() {
    return this.db.query("SELECT * FROM users").all() as User[] | undefined;
  }

  close(): void {
    this.db.close();
  }
}
