import { Lucia } from "lucia";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import db from "./db";

const adapter = betterSqlite3(db, { user: "users", session: "sessions" });

export const auth = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});
