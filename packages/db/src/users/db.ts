import Database from "bun:sqlite";
import { initUsersDb } from "./mock/init";
import type { User } from "./model/users";

type UserResponse = User | undefined;

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

  async addUser({
    login,
    name,
    password,
    role,
  }: Omit<User, "id">): Promise<void> {
    const stmt = this.db.prepare(
      "INSERT INTO users (login, name, password, role) VALUES (?, ?, ?, ?)"
    );
    await stmt.run(login, name, password, role);
  }

  async getUser(id: string): Promise<UserResponse> {
    return (await this.db
      .query("SELECT * FROM users WHERE id = ?")
      .get(id)) as UserResponse;
  }

  async getUserByLogin(login: string): Promise<UserResponse> {
    return (await this.db
      .query("SELECT * FROM users WHERE login = ?")
      .get(login)) as UserResponse;
  }

  async deleteUser(id: string): Promise<void> {
    const stmt = this.db.prepare("DELETE FROM users WHERE id = ?");
    await stmt.run(id);
  }

  async getUsers() {
    return (await this.db.query("SELECT * FROM users").all()) as
      | User[]
      | undefined;
  }

  close(): void {
    this.db.close();
  }
}
