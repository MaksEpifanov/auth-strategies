import { password } from "bun";

export const initUsers = async () => [
  {
    login: "user1",
    name: "Bob",
    password: await password.hash("user1"),
    role: "user",
  },
  {
    login: "user2",
    name: "John",
    password: await password.hash("user2"),
    role: "user",
  },
  {
    login: "admin",
    name: "Max",
    password: await password.hash("admin"),
    role: "admin",
  },
];
