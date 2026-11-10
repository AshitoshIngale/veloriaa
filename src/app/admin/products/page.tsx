import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { products } from "@/data/products";
import {
  INSTAGRAM_HANDLE,
  SITE_URL,
  dmMessageForPiece,
} from "@/lib/site";
import { Eyebrow } from "@/components/veloria/reveal";
import { CopyButton } from "@/components/admin/copy-button";

const live = products.filter((p) => p.active).sort((a, b) => a.sort - b.sort);

export default function AdminProducts() {
  return (
    <div>
      <Eyebrow>Collection</Eyebrow>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl font-medium text-ink">
          Every <span className="italic text-clay">piece</span>
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-stone">
          {live.length} pieces live, imported from the studio&rsquo;s Instagram
          grid. To add, hide or reorder pieces, edit{" "}
          <span className="font-mono text-[11px]">src/data/products.ts</span> —
          the{" "}
          <Link href="/admin/guide" className="link-underline text-ink">
            guide
          </Link>{" "}
          walks you through it.
        </p>
      </div>

      <div className="mt-9 border-t border-line">
        {live.map((p) => {
          const siteUrl = `${SITE_URL}/product/${p.slug}`;
          const dmReply = `Hi! Thank you for messaging VELORIAA. Yes — "${p.name}" is available. Would you like it in a different colour?`;
          return (
            <div
              key={p.slug}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border-b border-line py-4"
            >
              <div className="relative size-16 shrink-0 overflow-hidden bg-sand">
                <Image
                  src={p.images[0] ?? "/images/ig/post-1-1.jpg"}
                  alt={p.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-display text-xl text-ink">{p.name}</p>
                  {p.tag && (
                    <span className="text-[10px] uppercase tracking-[0.14em] border border-line px-2 py-0.5 text-stone">
                      {p.tag}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-stone truncate">
                  <span className="font-mono">{p.slug}</span>
                  {p.postLink && (
                    <>
                      {" · "}
                      <a
                        href={p.postLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-ink transition-colors"
                      >
                        Instagram post
                        <ExternalLink className="size-3" strokeWidth={1.5} />
                      </a>
                    </>
                  )}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <CopyButton text={dmReply} label="DM reply" />
                <CopyButton text={siteUrl} label="Site link" />
                <Link
                  href={`/product/${p.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] border border-line text-stone hover:border-ink hover:text-ink transition-colors"
                >
                  View page
                  <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-stone">
        Tip — the &ldquo;DM reply&rdquo; copies a ready-made answer for{" "}
        @{INSTAGRAM_HANDLE}&rsquo;s chat with the exact piece name, so customers
        always feel personally attended to.
      </p>
    </div>
  );
}
