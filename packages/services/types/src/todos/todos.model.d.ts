export declare const TODO_CONSTRAINTS: {
    readonly TITLE_MIN_LENGTH: 4;
    readonly TITLE_MAX_LENGTH: 100;
    readonly DESCRIPTION_MIN_LENGTH: 4;
    readonly DESCRIPTION_MAX_LENGTH: 1000;
};
export declare const CompletedDTO: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<0>, import("@sinclair/typebox").TLiteral<1>]>;
export declare const TodoIdDTO: import("@sinclair/typebox").TNumber;
export type TodoId = typeof TodoIdDTO.static;
export declare const TodoDTO: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    userId: import("@sinclair/typebox").TNumber;
    title: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TString;
    completed: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<0>, import("@sinclair/typebox").TLiteral<1>]>;
}>;
export type Todo = typeof TodoDTO.static;
export declare const CreateTodoDTO: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TString;
    description: import("@sinclair/typebox").TString;
    completed: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<0>, import("@sinclair/typebox").TLiteral<1>]>;
}>;
export type CreateTodoPayload = typeof CreateTodoDTO.static;
export declare const UpdateTodoDTO: import("@sinclair/typebox").TObject<{
    title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    completed: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<0>, import("@sinclair/typebox").TLiteral<1>]>>;
}>;
export type UpdateTodoPayload = typeof UpdateTodoDTO.static;
//# sourceMappingURL=todos.model.d.ts.map