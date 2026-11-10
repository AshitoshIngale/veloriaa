"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRight } from "lucide-react";
import { INSTAGRAM_DM_URL, INSTAGRAM_HANDLE } from "@/lib/site";
import { faqs } from "@/lib/content";
import { Eyebrow, Reveal, SplitWords } from "./reveal";

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-cream border-y border-line scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          <div>
            <Eyebrow>Quiet questions</Eyebrow>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-medium leading-[1.06] text-ink">
              <SplitWords text="Before you" stagger={0.07} />
              <br />
              <span className="italic text-clay">
                <SplitWords text="begin" delay={0.1} stagger={0.07} />
              </span>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-stone">
                Everything makers usually ask before their first box arrives.
                For anything else, DM us on Instagram — a person, not a bot,
                replies.
              </p>
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink"
              >
                DM @{INSTAGRAM_HANDLE}
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-line"
                >
                  <AccordionTrigger className="py-6 text-left font-display text-xl sm:text-[22px] text-ink hover:text-clay-deep hover:no-underline transition-colors [&[data-state=open]]:text-clay-deep">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[15px] leading-relaxed text-stone">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
