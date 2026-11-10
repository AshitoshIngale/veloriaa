"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Instagram, ScrollText } from "lucide-react";
import {
  INSTAGRAM_DM_URL,
  INSTAGRAM_HANDLE,
  dmMessageForPiece,
  type Product,
} from "@/lib/site";
import { copyOrderMessage } from "@/lib/dm";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function ProductView({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<"ok" | "fail" | null>(null);
  const images = product.images.length > 0 ? product.images : ["/images/ig/post-1-1.jpg"];

  async function dmToOrder() {
    const msg = dmMessageForPiece(product.name, product.postLink);
    const ok = await copyOrderMessage(msg);
    setCopied(ok ? "ok" : "fail");
    setTimeout(() => setCopied(null), 3200);
    window.open(INSTAGRAM_DM_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* gallery */}
      <Reveal className="relative">
        <div
          aria-hidden
          className="hidden sm:block absolute -inset-3 border border-clay/40 translate-x-4 translate-y-4"
        />
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <motion.div
            key={active}
            initial={{ opacity: 0.4, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${product.name} — photo ${active + 1} of ${images.length}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          {product.tag && (
            <span className="absolute left-5 top-5 bg-ivory/95 px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] text-ink">
              {product.tag}
            </span>
          )}
          {images.length > 1 && (
            <span className="absolute right-5 top-5 bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-ivory tabular-nums">
              {active + 1} / {images.length}
            </span>
          )}
        </div>

        {/* thumbnails */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto scroll-quiet pb-1">
            {images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setActive(i)}
                aria-label={`View photo ${i + 1}`}
                aria-pressed={active === i}
                className={cn(
                  "relative size-20 shrink-0 overflow-hidden bg-sand transition-all duration-300",
                  active === i
                    ? "ring-1 ring-ink ring-offset-2 ring-offset-ivory"
                    : "opacity-70 hover:opacity-100"
                )}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </Reveal>

      {/* details */}
      <div>
        <Reveal>
          <p className="text-[11px] uppercase tracking-widest-xl text-clay font-medium">
            Handmade to order
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-medium leading-[1.06] text-ink">
            {product.name}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 font-display text-xl italic text-clay-deep">
            {product.blurb}
          </p>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-stone">
            {product.description}
          </p>
        </Reveal>

        {/* DM CTA */}
        <Reveal delay={0.15} className="mt-9">
          <div className="border border-clay/40 bg-clay/5 p-6 sm:p-7">
            <p className="text-[11px] uppercase tracking-[0.2em] text-clay">
              One of one — no cart, just a DM
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone">
              Tap below and we&apos;ll open Instagram with a message for this
              piece already copied — confirm availability, sizes and colours
              with us personally. Prepaid via UPI; nothing is charged here.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <button
                onClick={dmToOrder}
                className="group inline-flex h-12 items-center gap-3 bg-ink px-8 text-[11px] uppercase tracking-[0.18em] text-ivory transition-colors duration-300 hover:bg-clay-deep"
              >
                <Instagram className="size-4" strokeWidth={1.5} />
                DM to order — @{INSTAGRAM_HANDLE}
              </button>
              {product.postLink && (
                <a
                  href={product.postLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 border border-ink/30 px-6 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-sand"
                >
                  <ScrollText className="size-4" strokeWidth={1.5} />
                  View post
                  <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                </a>
              )}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-stone/80">
              {copied === "ok" ? (
                <>
                  <Check className="size-3.5 text-clay" strokeWidth={2} />
                  Message copied — just paste it into the DM
                </>
              ) : copied === "fail" ? (
                <>
                  <Copy className="size-3.5" strokeWidth={1.5} />
                  Instagram is opening — tell us the piece name in the DM
                </>
              ) : (
                <>
                  <Copy className="size-3.5" strokeWidth={1.5} />
                  Your message is copied automatically when you tap
                </>
              )}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 text-xs leading-relaxed text-stone/80 max-w-md">
            Every piece is strung fresh for you, so small variations in beads
            and charms are part of the charm. Arrived damaged or defective?
            Message us within 48 hours — we replace it free.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
