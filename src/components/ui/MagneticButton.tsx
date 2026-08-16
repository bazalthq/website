"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode, type PointerEvent } from "react";

interface MagneticButtonProps {
  href: string;
  external?: boolean;
  variant?: "solid" | "ghost";
  className?: string;
  children: ReactNode;
  /** How far the button drifts toward the cursor, in px. */
  strength?: number;
  /** Set false for a static button (no magnetic pull). */
  magnetic?: boolean;
}

/**
 * Button/link with a magnetic pull toward the pointer — a restrained,
 * brutalist micro-interaction (sharp edges, small displacement).
 */
export function MagneticButton({
  href,
  external,
  variant = "solid",
  className = "",
  children,
  strength = 6,
  magnetic = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent) => {
    if (reduce || !magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set((relX / (r.width / 2)) * strength);
    y.set((relY / (r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles =
    variant === "solid"
      ? "bg-ink text-bg hover:bg-white"
      : "bg-transparent text-ink ring-1 ring-line-strong hover:ring-ink";

  const content = (
    <motion.span
      style={{ x: sx, y: sy }}
      className={`group inline-flex items-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-[var(--bhq-dur-fast)] ${styles} ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-[var(--bhq-dur)] ease-[var(--ease-brand)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
    </motion.span>
  );

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="inline-flex"
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-flex"
    >
      {content}
    </Link>
  );
}
