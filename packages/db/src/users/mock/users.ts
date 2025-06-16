import type { User } from "../model/users";
import { password } from "bun";

export const initUsers = async () =>
  [
    {
      login: "user123",
      name: "Bob",
      password: await password.hash("user123"),
      role: "user",
    },
    {
      login: "admin123",
      name: "John",
      password: await password.hash("admin123"),
      role: "admin",
    },
    {
      login: "owner123",
      name: "Max",
      password: await password.hash("owner123"),
      role: "owner",
    },
  ] satisfies Omit<User, "id">[];
