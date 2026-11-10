"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/lib/site";
import { Eyebrow, Reveal, SplitWords } from "@/components/veloria/reveal";
import { ProductCard } from "@/components/veloria/product-card";
import { cn } from "@/lib/utils";

export function ShopClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.tag).filter((t): t is string => Boolean(t))))],
    [products]
  );

  const filtered = useMemo(() => {
    let list = [...products];
    if (tag !== "All") list = list.filter((p) => p.tag === tag);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.blurb.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, query, tag]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
      <div className="pt-12 sm:pt-16 pb-10">
        <Eyebrow>The Collection</Eyebrow>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] text-ink">
            <SplitWords text="Every piece," stagger={0.07} />{" "}
            <span className="italic text-clay">
              <SplitWords text="hand-strung" delay={0.12} stagger={0.07} />
            </span>
          </h1>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-stone">
              Beads, pearls and charms — strung to order in small batches. See
              something you love? DM us on Instagram and it&apos;s yours.
            </p>
          </Reveal>
        </div>
      </div>

      {/* controls */}
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border-y border-line py-4 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-0 top-1/2 -translate-y-1/2 size-4 text-stone"
              strokeWidth={1.5}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pieces — pearls, daisy, pastel…"
              aria-label="Search pieces"
              className="w-full bg-transparent border-b border-transparent focus:border-clay outline-none pl-7 py-2 text-sm text-ink placeholder:text-stone/70 transition-colors"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                aria-pressed={tag === t}
                className={cn(
                  "px-4 py-2 text-[10px] uppercase tracking-[0.16em] border transition-colors",
                  tag === t
                    ? "bg-ink text-ivory border-ink"
                    : "border-line text-stone hover:border-ink hover:text-ink"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-2xl italic text-ink">
            Nothing strung that way — yet.
          </p>
          <p className="mt-2 text-sm text-stone">
            Try another search, or browse everything.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
