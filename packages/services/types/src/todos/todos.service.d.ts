import type { UserId } from "../users/users.model";
import type { CreateTodoPayload, Todo, TodoId } from "./todos.model";
export declare class TodosService {
    private static instance;
    private static initPromise;
    private db;
    private constructor();
    static getInstance(): Promise<TodosService>;
    private static initialize;
    create(userId: UserId, { completed, description, title }: CreateTodoPayload): Promise<Todo | null>;
    getTodos(userId: UserId): Promise<{
        id: number;
        description: string;
        userId: number;
        title: string;
        completed: 0 | 1;
    }[]>;
    getById(userId: UserId, id: TodoId): Promise<{
        id: number;
        description: string;
        userId: number;
        title: string;
        completed: 0 | 1;
    } | null>;
    update(userId: UserId, id: TodoId, payload: CreateTodoPayload): Promise<{
        id: number;
        description: string;
        userId: number;
        title: string;
        completed: 0 | 1;
    } | null>;
    delete(userId: UserId, id: TodoId): Promise<{
        id: number;
        description: string;
        userId: number;
        title: string;
        completed: 0 | 1;
    } | null>;
    close(): void;
}
//# sourceMappingURL=todos.service.d.ts.map