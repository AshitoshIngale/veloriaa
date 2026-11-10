"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Bead palette straight from the design tokens — solid colors only. */
const BEADS = [
  "bg-clay",
  "bg-clay-soft",
  "bg-sage",
  "bg-clay",
  "bg-ink",
  "bg-clay-soft",
  "bg-clay",
];

const WORD = "VELORIAA".split("");

function Sparkle({
  className,
  size = 12,
  delay = 1.3,
  duration = 1.7,
}: {
  className?: string;
  size?: number;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 18, 0] }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        repeatDelay: 0.5,
        ease: "easeInOut",
      }}
    >
      <path
        d="M12 2 L14.4 9.6 L22 12 L14.4 14.4 L12 22 L9.6 14.4 L2 12 L9.6 9.6 Z"
        className="fill-clay-soft"
      />
    </motion.svg>
  );
}

/* ---------------------------------------------------------------------------
   Brand loading screen — the studio's signature keychain, hung from a strand
   of brand beads. The charm drops in on a spring, twinkles, and sways like
   it's clipped to the top of the boutique window; the wordmark rises while a
   thin clay progress line fills, then the curtain lifts away.

   Solid colors only — no gradients, no neon.
--------------------------------------------------------------------------- */
export function Intro() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    /* Long, unhurried hold — the pause is the luxury. */
    const t = setTimeout(() => setDone(true), reduce ? 0 : 2900);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && !reduce && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-ivory"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: EASE }}
          aria-hidden
        >
          {/* faint frame line, like the boutique's offset borders */}
          <div className="pointer-events-none absolute inset-4 border border-line/70 sm:inset-6" />

          {/* ---- beaded strand + the keychain charm */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <div className="flex flex-col items-center">
              {/* beads dropping in, one by one */}
              <div className="flex flex-col items-center gap-[9px]">
                {BEADS.map((bg, i) => (
                  <motion.span
                    key={i}
                    className={`size-[9px] rounded-full ${bg} ${
                      bg === "bg-clay-soft" || bg === "bg-sage"
                        ? "ring-1 ring-ink/10"
                        : ""
                    }`}
                    initial={{ opacity: 0, scale: 0, y: -12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.065,
                      duration: 0.45,
                      ease: EASE,
                    }}
                  />
                ))}
              </div>

              {/* knot bead */}
              <motion.span
                className="mt-[7px] size-[13px] rounded-full bg-ink"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.56, duration: 0.35, ease: EASE }}
              />

              {/* the charm — drops in on a spring, then sways forever */}
              <motion.div
                className="relative -mt-[7px]"
                style={{ transformOrigin: "top center" }}
                initial={{ opacity: 0, y: -30, scale: 0.7, rotate: -6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: [0, 2.2, -2.2, 0],
                }}
                transition={{
                  opacity: { delay: 0.62, duration: 0.3 },
                  y: {
                    delay: 0.62,
                    type: "spring",
                    stiffness: 220,
                    damping: 15,
                  },
                  scale: {
                    delay: 0.62,
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                  },
                  rotate: {
                    delay: 1.3,
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <Image
                  src="/images/keychain.png"
                  alt=""
                  width={801}
                  height={1509}
                  priority
                  className="h-[176px] w-auto sm:h-[204px] drop-shadow-[0_22px_26px_rgba(32,27,21,0.3)]"
                />
                <Sparkle className="-left-8 top-[26%]" size={12} delay={1.5} />
                <Sparkle
                  className="-right-9 top-[58%]"
                  size={15}
                  delay={2}
                  duration={1.9}
                />
                <Sparkle
                  className="-left-5 bottom-[2%]"
                  size={9}
                  delay={2.5}
                  duration={1.6}
                />
              </motion.div>
            </div>
          </div>

          {/* ---- wordmark + progress */}
          <div className="absolute inset-x-0 top-[max(356px,47%)] flex flex-col items-center px-6">
            <div className="flex overflow-hidden">
              {WORD.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-display text-4xl tracking-widest-xl text-ink sm:text-5xl"
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    delay: 0.8 + i * 0.07,
                    duration: 0.75,
                    ease: EASE,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="mt-6 h-px bg-clay"
              initial={{ width: 0 }}
              animate={{ width: 148 }}
              transition={{ delay: 0.6, duration: 2, ease: EASE }}
            />

            <motion.p
              className="mt-5 text-[10px] uppercase tracking-widest-xl text-stone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.7 }}
            >
              Handstrung with love — India
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
