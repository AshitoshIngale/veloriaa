"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gem, Instagram, Sparkles } from "lucide-react";
import {
  INSTAGRAM_DM_URL,
  INSTAGRAM_HANDLE,
  dmMessageForPiece,
  type Product,
} from "@/lib/site";
import { copyOrderMessage } from "@/lib/dm";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

/* The two claims the site already makes everywhere, staged like the modern
   reference card's stat pair — icon + value on top, muted label beneath,
   separated by a hairline. */
const STATS = [
  { icon: Gem, value: "1 of 1", label: "One of a kind" },
  { icon: Sparkles, value: "Handmade", label: "Made to order" },
];

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const cover = product.images[0] ?? "";
  const second = product.images[1] ?? cover;
  /* Only cross-fade when a genuinely different photo exists — otherwise the
     hover would fade the only image out and leave a blank card. */
  const hasAlt = product.images.length > 1 && second !== cover;

  async function dmToOrder() {
    await copyOrderMessage(dmMessageForPiece(product.name, product.postLink));
    window.open(INSTAGRAM_DM_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-cream transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-clay/40 hover:shadow-[0_34px_60px_-32px_rgba(32,27,21,0.42)]">
        {/* full-bleed photo — the reference card's hero half */}
        <div className="relative aspect-[4/5] bg-sand">
          <Link
            href={`/product/${product.slug}`}
            className="absolute inset-0"
            aria-label={`View ${product.name}`}
          >
            <Image
              src={cover}
              alt={product.name}
              fill
              loading={index < 3 ? "eager" : "lazy"}
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 46vw, 30vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            {hasAlt && (
              <Image
                src={second}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 46vw, 30vw"
                className="scale-[1.06] object-cover opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
              />
            )}
          </Link>

          {/* pill badge, "Prime Pick" style — carries the real category tag */}
          {product.tag && (
            <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-ivory px-3.5 py-2 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink shadow-[0_10px_24px_-12px_rgba(32,27,21,0.45)]">
              <Sparkles className="size-3 text-clay" strokeWidth={1.75} />
              {product.tag}
            </span>
          )}
        </div>

        {/* body — title left, stat pair right (stacked under on phones) */}
        <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <h3 className="w-full font-display text-[21px] leading-[1.15] text-ink sm:w-auto sm:flex-1 sm:text-[22px]">
              <Link
                href={`/product/${product.slug}`}
                className="transition-colors duration-300 group-hover:text-clay-deep"
              >
                {product.name}
              </Link>
            </h3>

            <div className="flex items-center gap-3 sm:gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "flex flex-col",
                    i > 0 && "border-l border-line pl-3 sm:pl-4"
                  )}
                >
                  <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink">
                    <stat.icon className="size-3.5 text-clay" strokeWidth={1.5} />
                    {stat.value}
                  </span>
                  <span className="mt-0.5 whitespace-nowrap text-[8.5px] uppercase tracking-[0.14em] text-stone">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-stone">
            {product.blurb}
          </p>

          {/* DM footer — always visible, the card's call to action.
              Primary: DM deep link with the order message pre-copied.
              Fallback: the piece's own Instagram post, in case the DM
              deep link doesn't open on the customer's device. */}
          <div className="mt-auto pt-5">
            <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  dmToOrder();
                }}
                className="group/dm inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-ink"
                aria-label={`DM to order ${product.name} on Instagram`}
              >
                <Instagram className="size-4 text-clay" strokeWidth={1.5} />
                DM @{INSTAGRAM_HANDLE}
                <ArrowUpRight
                  className="size-3.5 text-clay-deep transition-transform duration-300 group-hover/dm:translate-x-0.5 group-hover/dm:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </button>
              {product.postLink ? (
                <a
                  href={product.postLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/post inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-stone transition-colors duration-300 hover:text-clay-deep"
                  aria-label={`View ${product.name} on Instagram`}
                >
                  View post
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 group-hover/post:translate-x-0.5 group-hover/post:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    dmToOrder();
                  }}
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-stone transition-colors duration-300 hover:text-clay-deep"
                  aria-label={`Order ${product.name} on Instagram`}
                >
                  Order
                  <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
