"use server";

import { checkCredentials, setSessionCookie, clearSessionCookie } from "@/lib/admin-auth";

export type SignInState = { error?: string; ok?: boolean };

export async function signIn(
  _prev: SignInState,
  formData: FormData
): Promise<SignInState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Enter your username and password." };
  }

  await new Promise((r) => setTimeout(r, 350)); // gentle pace for the form

  if (!checkCredentials(username, password)) {
    return { error: "That username and password don't match our studio records." };
  }

  await setSessionCookie(username.trim());
  return { ok: true };
}

export async function signOut(): Promise<void> {
  await clearSessionCookie();
  const { redirect } = await import("next/navigation");
  redirect("/admin");
}
