"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Eyebrow, Reveal } from "./reveal";
import { INSTAGRAM_DM_URL, INSTAGRAM_HANDLE, INSTAGRAM_PROFILE_URL } from "@/lib/site";
import type { Product } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Real Instagram posts, straight from the studio grid. */
export function DmBand({ products }: { products: Product[] }) {
  const tiles = products
    .filter((p) => p.images[0] && p.postLink)
    .slice(0, 6);

  return (
    <section className="bg-cream border-y border-line py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <Eyebrow>From the grid</Eyebrow>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-medium leading-[1.06] text-ink">
              Follow the <span className="italic text-clay">making</span>
            </h2>
          </div>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 border border-ink/70 px-6 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-ivory"
              >
                <Instagram className="size-4" strokeWidth={1.5} />
                Follow @{INSTAGRAM_HANDLE}
              </a>
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 bg-ink px-6 text-[11px] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-clay-deep"
              >
                DM to order
              </a>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {tiles.map((p, i) => (
            <motion.a
              key={p.slug}
              href={p.postLink ?? INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${p.name} on Instagram`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: EASE }}
              className="group relative aspect-square overflow-hidden bg-sand"
            >
              <Image
                src={p.images[0]}
                alt={p.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/35 group-hover:opacity-100">
                <Instagram className="size-6 text-ivory" strokeWidth={1.5} />
              </span>
            </motion.a>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-sm text-stone max-w-md mx-auto leading-relaxed">
            New drops, restocks and behind-the-scenes land on Instagram first —
            and every order begins with a simple DM.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
