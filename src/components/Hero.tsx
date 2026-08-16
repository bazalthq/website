"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { site } from "@/content/site";
import { BasaltLines } from "@/components/ui/BasaltLines";

const LINES = site.hero.headline;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.8, ease: EASE, delay: 0.15 + i * 0.09 },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="bhq-grain relative flex min-h-[100svh] items-center overflow-hidden">
      {/* basalt flow-line backdrop — the wordmark's texture, faded at the edges */}
      <BasaltLines className="pointer-events-none absolute inset-0 h-full w-full text-ink [mask-image:radial-gradient(120%_120%_at_50%_45%,black,transparent_75%)]" />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* the statement */}
        <h1 className="bhq-display select-none text-ink">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                custom={i}
                variants={rise}
                initial={reduce ? "show" : "hidden"}
                animate="show"
                className="block text-[clamp(2.6rem,10vw,8.5rem)] leading-[0.9] tracking-[-0.03em]"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* sub line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          className="mt-10 flex max-w-2xl flex-col gap-4 border-l border-line-strong pl-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="text-[1rem] leading-relaxed text-ink-dim">
            {site.description.split(/(?<=\.)\s+/).map((s, i) => (
              <span key={i} className="block">
                {s}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
