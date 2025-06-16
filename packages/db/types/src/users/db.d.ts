import type { User } from "./model/users";
export declare class UsersDB {
    private db;
    constructor();
    private init;
    addUser({ login, name, password, role }: Omit<User, "id">): void;
    getUser(id: string): User | undefined;
    deleteUser(id: string): void;
    getUsers(): Promise<User[] | undefined>;
    close(): void;
}
