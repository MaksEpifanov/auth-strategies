import { usersDB } from "@packages/db";
import type { Context } from "elysia";

const setStatus = ({ set, status }: Context, msg: string) => {
  set.headers["WWW-Authenticate"] = 'Basic realm="Restricted Area"';
  return status(401, { message: msg });
};

export const authGuard = async (context: Context) => {
  const authHeader = context.headers.authorization;

  if (!authHeader || authHeader.trim() === "") {
    return setStatus(context, "Missing Authorization header");
  }

  if (!authHeader.startsWith("Basic ")) {
    return setStatus(context, "Invalid Authorization header format");
  }

  const base64Credentials = authHeader.split(" ")[1];

  if (!base64Credentials) {
    return setStatus(context, "Missing credentials in Authorization header");
  }

  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [login, password] = credentials.split(":");

  if (!login || !password) {
    return setStatus(context, "Invalid credentials format");
  }

  const user = await usersDB.getUserByLogin(login);
  if (!user) {
    return setStatus(context, "User not found or invalid password");
  }

  const passwordMatch = await Bun.password.verify(password, user.password);

  if (!passwordMatch) {
    return setStatus(context, "User not found or invalid password");
  }
};
