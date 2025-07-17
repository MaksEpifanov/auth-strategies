import type { CreateUserPayload, Role, UserId } from "./users.model";
export declare class UsersService {
    private static instance;
    private static initPromise;
    private db;
    private constructor();
    static getInstance(): Promise<UsersService>;
    private static initialize;
    create({ login, name, password, role }: CreateUserPayload): Promise<{
        id: number;
        login: string;
        name: string;
        password: string;
        role: "user" | "admin";
    } | null>;
    getUsers(role?: Role): Promise<{
        id: number;
        login: string;
        name: string;
        password: string;
        role: "user" | "admin";
    }[]>;
    getById(id: UserId): Promise<{
        id: number;
        login: string;
        name: string;
        password: string;
        role: "user" | "admin";
    } | null>;
    getByLogin(login: string): Promise<{
        id: number;
        login: string;
        name: string;
        password: string;
        role: "user" | "admin";
    } | null>;
    update(id: UserId, payload: CreateUserPayload): Promise<{
        id: number;
        login: string;
        name: string;
        password: string;
        role: "user" | "admin";
    } | null>;
    delete(id: string): Promise<void>;
    close(): void;
}
//# sourceMappingURL=users.service.d.ts.map