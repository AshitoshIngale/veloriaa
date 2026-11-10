"use client";

import Link from "next/link";
import type { Product } from "@/lib/site";
import { Eyebrow, Reveal, SplitWords } from "./reveal";
import { ProductCard } from "./product-card";

export function Products({ products }: { products: Product[] }) {
  return (
    <section id="shop" className="py-20 sm:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <Eyebrow>The Collection</Eyebrow>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] text-ink">
              <SplitWords text="Worn close," stagger={0.07} />
              <br />
              <span className="italic text-clay">
                <SplitWords text="loved loudly" delay={0.15} stagger={0.07} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-stone mb-2">
              Straight from our Instagram — every piece photographed exactly as
              it will reach you. No prices here; just DM us.
            </p>
            <Link
              href="/shop"
              className="link-underline text-[11px] uppercase tracking-[0.18em] text-ink"
            >
              See the full collection
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {products.slice(0, 6).map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex h-12 items-center rounded-none border border-ink/70 bg-transparent px-10 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-ivory"
          >
            View all pieces
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
