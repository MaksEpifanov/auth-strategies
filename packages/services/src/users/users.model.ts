import { t } from "elysia";

export const USER_CONSTRAINTS = {
  LOGIN_MIN_LENGTH: 4,
  LOGIN_MAX_LENGTH: 40,
  NAME_MIN_LENGTH: 4,
  NAME_MAX_LENGTH: 100,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 100,
} as const;

export const RoleDTO = t.Union([t.Literal("user"), t.Literal("admin")]);
export type Role = typeof RoleDTO.static;

export const UserIdDTO = t.Number({
  minLength: 1,
  error: "User ID is required",
});
export type UserId = typeof UserIdDTO.static

export const UserDTO = t.Object({
  id: UserIdDTO,
  login: t.String(),
  name: t.String(),
  password: t.String(),
  role: RoleDTO,
});
export type User = typeof UserDTO.static;

const UserNameDto = t.String({
  minLength: USER_CONSTRAINTS.LOGIN_MIN_LENGTH,
  maxLength: USER_CONSTRAINTS.LOGIN_MAX_LENGTH,
  error: `Login must be between ${USER_CONSTRAINTS.LOGIN_MIN_LENGTH} and ${USER_CONSTRAINTS.LOGIN_MAX_LENGTH} characters`,
});

export const CreateUserDTO = t.Object({
  login: t.String({
    minLength: USER_CONSTRAINTS.LOGIN_MIN_LENGTH,
    maxLength: USER_CONSTRAINTS.LOGIN_MAX_LENGTH,
    error: `Login must be between ${USER_CONSTRAINTS.LOGIN_MIN_LENGTH} and ${USER_CONSTRAINTS.LOGIN_MAX_LENGTH} characters`,
  }),
  name: UserNameDto,
  password: t.String({
    minLength: USER_CONSTRAINTS.PASSWORD_MIN_LENGTH,
    maxLength: USER_CONSTRAINTS.PASSWORD_MAX_LENGTH,
    error: `Password must be between ${USER_CONSTRAINTS.PASSWORD_MIN_LENGTH} and ${USER_CONSTRAINTS.PASSWORD_MAX_LENGTH} characters`,
  }),
  role: RoleDTO,
});
export type CreateUserPayload = typeof CreateUserDTO.static;

export const UpdateUserDTO = t.Object({
  name: UserNameDto,
});
export type UpdateUserPayload = typeof UpdateUserDTO.static;
