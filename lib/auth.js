import { Lucia } from "lucia";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import db from "./db";
import { cookies } from "next/headers";

const adapter = betterSqlite3(db, { user: "users", session: "sessions" });

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
