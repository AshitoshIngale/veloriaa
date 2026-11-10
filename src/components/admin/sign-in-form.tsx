"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, LockKeyhole } from "lucide-react";
import { signIn, type SignInState } from "@/app/admin/actions";

const initial: SignInState = {};

export function AdminSignIn() {
  const [state, formAction, pending] = useActionState(signIn, initial);
  const router = useRouter();

  useEffect(() => {
    if (state.ok) {
      router.replace("/admin");
      router.refresh();
    }
  }, [state.ok, router]);

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/veloriaa-logo.png"
              alt="VELORIAA"
              width={120}
              height={120}
              priority
              className="h-24 w-auto"
            />
            <p className="mt-5 text-[11px] uppercase tracking-widest-xl text-clay font-medium">
              Studio access
            </p>
            <h1 className="mt-3 font-display text-3xl text-ink">
              The <span className="italic text-clay">studio desk</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-stone">
              This space belongs to the maker — sign in to manage the
              collection and your DM templates.
            </p>
          </div>

          <form action={formAction} className="mt-9 space-y-5">
            <div>
              <label
                htmlFor="username"
                className="text-[11px] uppercase tracking-[0.16em] text-stone"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                autoComplete="username"
                required
                className="mt-2 w-full h-11 bg-cream border border-line px-4 text-sm text-ink outline-none transition-colors focus:border-clay"
                placeholder="admin"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-[11px] uppercase tracking-[0.16em] text-stone"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 w-full h-11 bg-cream border border-line px-4 text-sm text-ink outline-none transition-colors focus:border-clay"
                placeholder="••••••••••"
              />
            </div>

            {state.error && (
              <p role="alert" className="text-sm text-destructive">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full h-12 inline-flex items-center justify-center gap-2 bg-ink text-[11px] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-clay-deep disabled:opacity-60"
            >
              {pending ? (
                <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
              ) : (
                <LockKeyhole className="size-4" strokeWidth={1.5} />
              )}
              Enter the studio
            </button>
          </form>

          <p className="mt-8 text-center text-xs leading-relaxed text-stone/70">
            Credentials live in two environment variables —{" "}
            <span className="font-mono text-[11px]">ADMIN_USERNAME</span> and{" "}
            <span className="font-mono text-[11px]">ADMIN_PASSWORD</span>. No
            database, nothing to maintain.
          </p>
        </div>
      </main>
      <footer className="pb-8 text-center">
        <p className="text-xs text-stone/60 tracking-wide">
          VELORIAA Studio — made in India
        </p>
      </footer>
    </div>
  );
}
