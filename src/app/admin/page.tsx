import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Copy, Instagram, PackageCheck, Images, Ruler, Store } from "lucide-react";
import { products } from "@/data/products";
import {
  BRAND_NAME,
  INSTAGRAM_DM_URL,
  INSTAGRAM_HANDLE,
  POLICY_PREPAID,
  POLICY_RETURNS,
} from "@/lib/site";
import { Eyebrow, Reveal } from "@/components/veloria/reveal";
import { CopyButton } from "@/components/admin/copy-button";

/* Page-level (leaf) title so the root "%s | VELORIAA" template is bypassed. */
export const metadata: Metadata = {
  title: { absolute: "Studio Admin — VELORIAA" },
};

const live = products.filter((p) => p.active);
const categories = Array.from(new Set(live.map((p) => p.tag).filter(Boolean)));
const photoCount = live.reduce((n, p) => n + p.images.length, 0);

const QUICK_REPLIES: { title: string; body: string }[] = [
  {
    title: "Greeting & availability",
    body: "Hi! Thank you for messaging VELORIAA. Yes, this piece is available — it's handmade to order. Which colour would you like it in?",
  },
  {
    title: "Confirm & payment",
    body: "Lovely choice! Your order comes to ___ (prepaid only — we don't offer cash on delivery). Pay via UPI to <your-upi-id>, then share a screenshot along with your full address, phone number and pincode, and I'll start stringing it right away.",
  },
  {
    title: "Shipping update",
    body: "Good news — your parcel is on its way! Tracking: <tracking number / link>. Metro cities usually receive orders in 2–4 days, the rest of India in 4–7 days.",
  },
  {
    title: "Defective piece — free replacement",
    body: "I'm so sorry about that! Please send a photo within 48 hours of delivery and I'll replace the piece free of charge — no questions asked.",
  },
];

export default function AdminOverview() {
  const stats = [
    { label: "Pieces live", value: String(live.length), icon: PackageCheck },
    { label: "Categories", value: String(categories.length), icon: Ruler },
    { label: "Studio photos", value: String(photoCount), icon: Images },
    { label: "Instagram", value: `@${INSTAGRAM_HANDLE}`, icon: Instagram },
  ];

  return (
    <div>
      <Eyebrow>Studio admin</Eyebrow>
      <h1 className="mt-3 font-display text-4xl font-medium text-ink">
        The <span className="italic text-clay">day at a glance</span>
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone">
        {BRAND_NAME} is a DM-first studio — there is no checkout to maintain.
        Customers pick a piece here, and every &ldquo;DM to order&rdquo; button
        opens your Instagram chat with their message already copied. Everything
        else happens personally, in the DMs.
      </p>

      {/* stats */}
      <div className="mt-9 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
        {stats.map((card, i) => (
          <Reveal key={card.label} delay={i * 0.06} y={14}>
            <div className="bg-ivory p-6 h-full">
              <card.icon className="size-5 text-clay" strokeWidth={1.25} />
              <p className="mt-4 font-display text-3xl sm:text-4xl text-ink tabular-nums break-all">
                {card.value}
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-stone">
                {card.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* quick actions */}
      <div className="mt-6 grid sm:grid-cols-3 gap-px bg-line border border-line">
        <a
          href={INSTAGRAM_DM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-ivory p-6 transition-colors hover:bg-cream"
        >
          <Instagram className="size-5 text-clay" strokeWidth={1.25} />
          <p className="mt-3 font-display text-xl text-ink">Open DM inbox</p>
          <p className="mt-1 text-xs text-stone">
            ig.me/m/{INSTAGRAM_HANDLE} — where every order begins
          </p>
          <ArrowUpRight className="mt-3 size-4 text-stone transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
        </a>
        <Link
          href="/admin/products"
          className="group bg-ivory p-6 transition-colors hover:bg-cream"
        >
          <Store className="size-5 text-clay" strokeWidth={1.25} />
          <p className="mt-3 font-display text-xl text-ink">Manage collection</p>
          <p className="mt-1 text-xs text-stone">
            {live.length} pieces · copy links and DM replies
          </p>
          <ArrowUpRight className="mt-3 size-4 text-stone transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
        </Link>
        <Link
          href="/admin/guide"
          className="group bg-ivory p-6 transition-colors hover:bg-cream"
        >
          <Copy className="size-5 text-clay" strokeWidth={1.25} />
          <p className="mt-3 font-display text-xl text-ink">Deploy guide</p>
          <p className="mt-1 text-xs text-stone">
            Environment variables, Vercel setup, editing the catalog
          </p>
          <ArrowUpRight className="mt-3 size-4 text-stone transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
        </Link>
      </div>

      {/* DM quick replies */}
      <div className="mt-12 flex items-center justify-between border-b border-line pb-4">
        <h2 className="font-display text-2xl tracking-[0.14em] text-ink">
          DM QUICK REPLIES
        </h2>
        <p className="hidden sm:block text-[11px] uppercase tracking-[0.16em] text-stone">
          Tap to copy — paste into the chat
        </p>
      </div>
      <div className="mt-2 divide-y divide-line border-b border-line">
        {QUICK_REPLIES.map((reply) => (
          <div key={reply.title} className="py-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
            <p className="sm:w-56 shrink-0 font-display text-lg text-ink">
              {reply.title}
            </p>
            <p className="flex-1 text-sm leading-relaxed text-stone">
              {reply.body}
            </p>
            <CopyButton text={reply.body} label="Copy reply" className="shrink-0 self-start" />
          </div>
        ))}
      </div>

      {/* policies */}
      <div className="mt-10 border border-clay/40 bg-clay/5 p-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-clay">
          Store policies (shown to customers)
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-ink/90">
          <li>· {POLICY_PREPAID}</li>
          <li>· {POLICY_RETURNS}</li>
        </ul>
        <p className="mt-3 text-xs text-stone">
          Edit these in <span className="font-mono text-[11px]">src/lib/site.ts</span> —
          they update on the storefront, FAQ and footer automatically.
        </p>
      </div>
    </div>
  );
}
