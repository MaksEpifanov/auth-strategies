export type Role = "user" | "admin" | "owner";

export interface User {
  id: string;
  login: string;
  name: string;
  password: string;
  role: Role;
}
