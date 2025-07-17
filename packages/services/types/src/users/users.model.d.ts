export declare const USER_CONSTRAINTS: {
    readonly LOGIN_MIN_LENGTH: 4;
    readonly LOGIN_MAX_LENGTH: 40;
    readonly NAME_MIN_LENGTH: 4;
    readonly NAME_MAX_LENGTH: 100;
    readonly PASSWORD_MIN_LENGTH: 8;
    readonly PASSWORD_MAX_LENGTH: 100;
};
export declare const RoleDTO: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"user">, import("@sinclair/typebox").TLiteral<"admin">]>;
export type Role = typeof RoleDTO.static;
export declare const UserIdDTO: import("@sinclair/typebox").TNumber;
export type UserId = typeof UserIdDTO.static;
export declare const UserDTO: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TNumber;
    login: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    password: import("@sinclair/typebox").TString;
    role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"user">, import("@sinclair/typebox").TLiteral<"admin">]>;
}>;
export type User = typeof UserDTO.static;
export declare const CreateUserDTO: import("@sinclair/typebox").TObject<{
    login: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    password: import("@sinclair/typebox").TString;
    role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"user">, import("@sinclair/typebox").TLiteral<"admin">]>;
}>;
export type CreateUserPayload = typeof CreateUserDTO.static;
export declare const UpdateUserDTO: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TString;
}>;
export type UpdateUserPayload = typeof UpdateUserDTO.static;
//# sourceMappingURL=users.model.d.ts.map