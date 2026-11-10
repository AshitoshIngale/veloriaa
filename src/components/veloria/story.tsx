"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Reveal, SplitWords } from "./reveal";

const MARKS = [
  { value: "One of one", label: "no two strands are alike" },
  { value: "Made to order", label: "strung fresh for you" },
  { value: "India-wide", label: "we ship everywhere" },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="story"
      ref={ref}
      className="bg-ink py-20 sm:py-28 text-ivory scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* image */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-soft max-w-[480px] mx-auto lg:mx-0">
              <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
                <Image
                  src="/images/ig/post-4-2.jpg"
                  alt="Pastel beaded bracelets in lilac, blue and rose, strung by hand"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ivory/50">
              The studio table — where every strand begins
            </p>
          </Reveal>

          {/* copy */}
          <div className="order-1 lg:order-2">
            <Eyebrow light>Our Story</Eyebrow>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[56px] font-medium leading-[1.08] text-ivory">
              <SplitWords text="Small hands," stagger={0.07} />
              <br />
              <span className="italic text-clay-soft">
                <SplitWords text="happy colours" delay={0.12} stagger={0.07} />
              </span>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-7 text-base sm:text-lg leading-relaxed text-ivory/70 max-w-lg">
                Veloriaa began with a simple love for tiny, beautiful things —
                beads in every shade, pearls that catch the light, charms with
                meaning. What started as gifts for friends became a little
                studio with a big soft spot for colour.
              </p>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-ivory/70 max-w-lg">
                Every bracelet and necklace is still strung by hand, one bead
                at a time — photographed exactly as it is, made in small
                batches, and sent to you like the gift it is. When you DM us,
                you reach the same hands that made your piece.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-ivory/15 pt-8">
              {MARKS.map((mark, i) => (
                <Reveal key={mark.value} delay={0.25 + i * 0.1}>
                  <p className="font-display text-2xl sm:text-3xl text-clay-soft">
                    {mark.value}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-ivory/50 leading-relaxed">
                    {mark.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
