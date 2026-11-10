"use client";

import { Gift, HeartHandshake, Instagram, Truck } from "lucide-react";
import { Eyebrow, Reveal, SplitWords } from "./reveal";
import { INSTAGRAM_DM_URL, INSTAGRAM_HANDLE } from "@/lib/site";

const STEPS = [
  {
    num: "01",
    title: "Find your piece",
    copy: "Browse the collection — every photo is the real thing, exactly as it will reach you. No filters, no surprises.",
  },
  {
    num: "02",
    title: "DM us on Instagram",
    copy: `Tap “DM to order” and say hello — we'll confirm availability, sizes and colours with you personally on @${INSTAGRAM_HANDLE}.`,
  },
  {
    num: "03",
    title: "Strung & shipped",
    copy: "Your piece is made fresh, packed with a bow and a note, and shipped across India with tracking shared on DM.",
  },
];

const VALUES = [
  {
    icon: Instagram,
    title: "Personal, always",
    copy: "You order through a real conversation — never a checkout form.",
  },
  {
    icon: Gift,
    title: "Gift-ready by heart",
    copy: "Bows, tissue and little notes, included with every order.",
  },
  {
    icon: Truck,
    title: "Ships across India",
    copy: "Tracked delivery to your doorstep, updates over DM.",
  },
  {
    icon: HeartHandshake,
    title: "Care that lasts",
    copy: "Arrived damaged or defective? We replace it — free.",
  },
];

export function Craft() {
  return (
    <section id="craft" className="py-20 sm:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow className="justify-center">How to order</Eyebrow>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] text-ink">
            <SplitWords text="One DM," stagger={0.07} />{" "}
            <span className="italic text-clay">
              <SplitWords text="and it's yours" delay={0.12} stagger={0.07} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-stone">
              No cart, no forms — just a conversation. Ordering from Veloriaa
              feels like buying from a friend.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 sm:mt-20 grid md:grid-cols-3 gap-10 md:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.12}>
              <div className="border-t border-ink/80 pt-8 group">
                <span className="font-display text-6xl text-clay/35 leading-none transition-colors duration-500 group-hover:text-clay">
                  {step.num}
                </span>
                <h3 className="mt-6 font-display text-2xl sm:text-[28px] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-stone">
                  {step.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08} y={16}>
              <div className="group h-full bg-ivory p-6 sm:p-8 transition-colors duration-500 hover:bg-cream">
                <value.icon
                  className="size-6 text-clay transition-transform duration-500 group-hover:-translate-y-1"
                  strokeWidth={1.25}
                />
                <h3 className="mt-5 font-display text-xl text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {value.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <a
            href={INSTAGRAM_DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-3 bg-ink px-10 text-[11px] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-clay-deep"
          >
            <Instagram className="size-4" strokeWidth={1.5} />
            Start a DM — @{INSTAGRAM_HANDLE}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
