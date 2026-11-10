import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/* ---------------------------------------------------------------------------
   VELORIAA studio admin — database-free authentication.

   Credentials come from environment variables (set them in Vercel →
   Project → Settings → Environment Variables):

     ADMIN_USERNAME          (default: admin)
     ADMIN_PASSWORD          (default: veloriaa@2026 — CHANGE ON VERCEL)
     ADMIN_SESSION_SECRET    (default: a dev secret — CHANGE ON VERCEL)

   The session is a stateless, HMAC-signed cookie. No database involved:
   verifying the signature is the only check needed on every request.
--------------------------------------------------------------------------- */

const COOKIE_NAME = "veloriaa_studio";
const SESSION_DAYS = 7;

function adminUsername(): string {
  return process.env.ADMIN_USERNAME ?? "admin";
}

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "veloriaa@2026";
}

function sessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    "veloriaa-studio-dev-secret-change-me-in-production"
  );
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function checkCredentials(username: string, password: string): boolean {
  return (
    safeEqual(username.trim(), adminUsername()) &&
    safeEqual(password, adminPassword())
  );
}

function sign(payload: string): string {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function createSessionToken(username: string): string {
  const payload = Buffer.from(
    JSON.stringify({ u: username, e: Date.now() + SESSION_DAYS * 86400_000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifySessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payload);
  if (!safeEqual(signature, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.u !== "string" || typeof data.e !== "number") return null;
    if (Date.now() > data.e) return null;
    return data.u;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<{ username: string } | null> {
  const store = await cookies();
  const username = verifySessionToken(store.get(COOKIE_NAME)?.value);
  return username ? { username } : null;
}

export async function setSessionCookie(username: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, createSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
