"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Instagram, ArrowUpRight } from "lucide-react";
import { SplitWords } from "./reveal";
import { INSTAGRAM_DM_URL } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

function RotatingBadge() {
  return (
    <div className="absolute -right-3 top-9 z-10 hidden sm:-right-8 sm:top-14 sm:block">
      <div className="relative size-28 sm:size-32">
        <div className="absolute inset-0 rounded-full bg-ink" />
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 animate-spin-slow"
          aria-hidden
        >
          <defs>
            <path
              id="badge-circle"
              d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
            />
          </defs>
          <text className="fill-ivory" style={{ fontSize: "8.2px", letterSpacing: "2.6px" }}>
            <textPath href="#badge-circle">
              HANDSTRUNG · BEADS · PEARLS · CHARMS ·
            </textPath>
          </text>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl text-clay-soft italic">
          V
        </span>
      </div>
    </div>
  );
}

/* Trust chips under the copy — tiny beads instead of bullets. */
const NOTES = [
  { dot: "bg-clay", label: "One of a kind" },
  { dot: "bg-clay-soft", label: "Made to order" },
  { dot: "bg-sage", label: "Ships across India" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  /* Frame-level parallax (not image-level) so the composed 4:5 photo is
     never re-cropped — the arch simply drifts slower than the copy. */
  const archY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const echoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  /* Delays are tuned to the Intro curtain (it starts lifting at ~2.9s —
     the offset lets the hero entrance play as the curtain reveals it). */
  const t = (base: number) => (reduce ? 0.1 : base + 1.35);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.04fr_0.96fr] gap-12 lg:gap-8 items-center pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24">
          {/* ---- visual — leads the page, first on mobile too */}
          <div className="relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: t(1.85), duration: 1.1, ease: EASE }}
              className="relative mx-auto w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px]"
            >
              <motion.div style={{ y: archY }} className="relative">
                {/* offset arch echo */}
                <motion.div
                  aria-hidden
                  style={{ y: echoY }}
                  className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-t-full border border-clay/40 sm:translate-x-4 sm:translate-y-4"
                />
                {/* the arch — iPhone with its beaded charm, the page's hero shot */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-sand shadow-[0_40px_80px_-48px_rgba(32,27,21,0.45)] ring-1 ring-ink/5">
                  <Image
                    src="/images/ig/post-21-1-hero.jpg"
                    alt="White iPhone carrying a hand-beaded pink bow phone charm from Veloriaa"
                    fill
                    priority
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 60vw, 460px"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* floating studio card — the keychain side of the house */}
              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 18, rotate: -9 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                transition={{ delay: t(2.5), duration: 0.9, ease: EASE }}
                className="absolute -left-3 bottom-8 sm:-left-10 sm:bottom-12"
              >
                <div className="w-[92px] border border-line bg-cream p-1.5 pb-0 shadow-[0_24px_48px_-24px_rgba(32,27,21,0.5)] sm:w-[112px]">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src="/images/ig/post-20-1.jpg"
                      alt="Handmade glass cherry keychain on marble"
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <p className="py-2 text-center text-[8px] uppercase tracking-[0.16em] text-stone sm:text-[9px]">
                    Keychains too
                  </p>
                </div>
              </motion.div>

              <RotatingBadge />
            </motion.div>
          </div>

          {/* ---- copy */}
          <motion.div
            style={{ y: textY }}
            className="relative z-10 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: t(2), duration: 0.8, ease: EASE }}
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-widest-xl text-clay font-medium"
            >
              <span aria-hidden className="inline-block h-px w-8 bg-clay/60" />
              Handcrafted in small batches — India
            </motion.div>

            <h1 className="mt-6 font-display text-[13.5vw] leading-[0.95] sm:text-7xl lg:text-[86px] xl:text-[96px] text-ink font-medium">
              <SplitWords text="Strung by hand," delay={t(2.1)} stagger={0.09} />
              <br />
              <span className="italic text-clay">
                <SplitWords text="worn with love." delay={t(2.32)} stagger={0.09} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: t(2.62), duration: 0.9, ease: EASE }}
              className="mt-7 max-w-md text-base sm:text-lg leading-relaxed text-stone"
            >
              Veloriaa hand-strings beaded bracelets, pearl pieces, bag charms
              and phone candy — colour therapy for your wrist, matching sets
              for favourite people, a little everyday luxury. Every strand is
              strung to order and sent to you with a bow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: t(2.82), duration: 0.9, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-6"
            >
              <Link
                href="/shop"
                className="group inline-flex h-12 items-center gap-3 rounded-none bg-ink px-8 text-[11px] uppercase tracking-[0.18em] text-ivory transition-colors duration-300 hover:bg-clay-deep"
              >
                Explore the collection
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink"
              >
                DM to order
                <ArrowUpRight
                  className="size-4 text-clay transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: t(3.05), duration: 1 }}
              className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              {NOTES.map((note) => (
                <li key={note.label} className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className={`inline-block size-1.5 rounded-full ${note.dot}`}
                  />
                  <span className="text-sm text-stone">{note.label}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: t(3.4), duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-widest-xl text-stone">
          Scroll
        </span>
        <span className="block h-10 w-px origin-top overflow-hidden bg-ink/20">
          <span className="block h-full w-full origin-top animate-breathe bg-ink" />
        </span>
      </motion.div>
    </section>
  );
}
