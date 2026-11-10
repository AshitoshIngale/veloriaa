"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookOpen, LayoutDashboard, LogOut, ShoppingBag } from "lucide-react";
import { signOut } from "./actions";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Collection", href: "/admin/products", icon: ShoppingBag },
  { label: "Guide", href: "/admin/guide", icon: BookOpen },
];

export function AdminShell({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      {/* admin top bar */}
      <header className="bg-ink text-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Link
                href="/admin"
                className="font-display text-xl tracking-[0.3em] text-ivory whitespace-nowrap"
              >
                VELORIAA
                <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-clay-soft align-middle">
                  Studio
                </span>
              </Link>
              <nav className="hidden sm:flex items-center gap-5" aria-label="Admin navigation">
                {NAV.map((item) => {
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] transition-colors",
                        active ? "text-clay-soft" : "text-ivory/60 hover:text-ivory"
                      )}
                    >
                      <item.icon className="size-3.5" strokeWidth={1.5} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-ivory/60 hover:text-ivory transition-colors"
              >
                View store
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </Link>
              <span className="text-[11px] uppercase tracking-[0.14em] text-ivory/40 hidden md:inline">
                {username}
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  aria-label="Sign out of the studio"
                  className="p-2 text-ivory/60 hover:text-ivory transition-colors"
                >
                  <LogOut className="size-4" strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>
          {/* mobile nav */}
          <nav className="sm:hidden flex gap-5 pb-3" aria-label="Admin mobile navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] uppercase tracking-[0.16em] text-ivory/70 hover:text-ivory transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
}
