import type { User } from "./model/users";
type UserResponse = User | undefined;
export declare class UsersDB {
    private db;
    constructor();
    private init;
    addUser({ login, name, password, role, }: Omit<User, "id">): Promise<void>;
    getUser(id: string): Promise<UserResponse>;
    getUserByLogin(login: string): Promise<UserResponse>;
    deleteUser(id: string): Promise<void>;
    getUsers(): Promise<User[] | undefined>;
    close(): void;
}
export {};
