"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, ArrowRight, ArrowUpRight, Instagram } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  BRAND_NAME,
  INSTAGRAM_DM_URL,
  INSTAGRAM_HANDLE,
  dmMessageGeneral,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Collection", href: "/shop" },
  { label: "Our Story", href: "/#story" },
  { label: "How to Order", href: "/#craft" },
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("relative block shrink-0 select-none", className)}
      aria-label="VELORIAA — home"
    >
      <Image
        src="/images/veloriaa-logo.png"
        alt="VELORIAA"
        width={160}
        height={160}
        priority
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* announcement bar */}
      <div className="bg-ink text-ivory/90 text-[11px] tracking-[0.22em] uppercase">
        <p className="mx-auto max-w-7xl px-4 py-2.5 text-center">
          Handmade to order&nbsp;&nbsp;·&nbsp;&nbsp;Ships across India&nbsp;&nbsp;·&nbsp;&nbsp;Order on Instagram DM
        </p>
      </div>

      <motion.header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ivory/90 backdrop-blur-md border-b border-line"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex h-16 sm:h-[76px] items-center justify-between">
            {/* left links (desktop) */}
            <div className="hidden lg:flex items-center gap-7 flex-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="link-underline text-[13px] tracking-[0.14em] uppercase text-ink/80 hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* mobile menu button */}
            <div className="lg:hidden flex-1">
              <button
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="p-2 -ml-2 text-ink hover:text-clay transition-colors"
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </button>
            </div>

            <Wordmark className="shrink-0" />

            {/* right links + actions */}
            <div className="hidden lg:flex items-center justify-end gap-6 flex-1">
              <Link
                href="/#faq"
                className="link-underline text-[13px] tracking-[0.14em] uppercase text-ink/80 hover:text-ink transition-colors"
              >
                FAQ
              </Link>
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(dmMessageGeneral()).catch(() => {});
                  }
                }}
                className="group inline-flex h-10 items-center gap-2 bg-ink px-5 text-[10px] uppercase tracking-[0.18em] text-ivory transition-colors duration-300 hover:bg-clay-deep"
              >
                <Instagram className="size-3.5" strokeWidth={1.5} />
                DM to order
              </a>
            </div>

            {/* mobile actions */}
            <div className="lg:hidden flex-1 flex justify-end items-center gap-1">
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DM to order on Instagram"
                className="flex size-10 items-center justify-center bg-ink text-ivory transition-colors hover:bg-clay-deep"
              >
                <Instagram className="size-4.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* mobile menu */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="left"
          className="w-full sm:max-w-sm bg-ink border-r border-ivory/10 p-0 [&>button]:text-ivory [&>button]:hover:text-clay-soft [&>button]:hover:bg-transparent [&>button]:data-[state=open]:bg-transparent"
        >
          <SheetHeader className="flex-row items-center justify-between px-6 pt-7 pb-5 border-b border-ivory/10">
            <SheetTitle className="font-display text-2xl tracking-[0.32em] text-ivory">
              {BRAND_NAME}
            </SheetTitle>
            <SheetDescription className="sr-only">
              Mobile navigation menu
            </SheetDescription>
          </SheetHeader>
          <nav className="px-6 py-8 flex flex-col" aria-label="Mobile navigation">
            {NAV_LINKS.concat([{ label: "FAQ", href: "/#faq" }]).map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between py-4 border-b border-ivory/10"
                >
                  <span className="font-display text-3xl text-ivory group-hover:text-clay-soft transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight className="size-4 text-clay-soft/70" strokeWidth={1.5} />
                </Link>
              </motion.div>
            ))}
            <motion.a
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="group mt-7 inline-flex h-12 items-center justify-center gap-2 bg-clay-soft text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ivory"
            >
              <Instagram className="size-4" strokeWidth={1.5} />
              DM @{INSTAGRAM_HANDLE} to order
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </motion.a>
            <div className="mt-8 space-y-1">
              <p className="text-[11px] uppercase tracking-widest-xl text-ivory/50">
                Customer care
              </p>
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ivory/80 hover:text-ivory transition-colors"
              >
                <Instagram className="size-4" strokeWidth={1.5} />
                DM @{INSTAGRAM_HANDLE} — a person replies, not a bot
              </a>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
