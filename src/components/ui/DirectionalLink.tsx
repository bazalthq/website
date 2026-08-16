"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";

type Dir = "left" | "right" | "top" | "bottom";

const OFFSET: Record<Dir, string> = {
  left: "translate(-101%, 0)",
  right: "translate(101%, 0)",
  top: "translate(0, -101%)",
  bottom: "translate(0, 101%)",
};

function edgeFrom(e: PointerEvent<HTMLElement>, el: HTMLElement): Dir {
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  const d = { left: x, right: r.width - x, top: y, bottom: r.height - y };
  return (Object.keys(d) as Dir[]).reduce((a, b) => (d[b] < d[a] ? b : a));
}

export interface DirectionalLinkProps {
  href?: string;
  external?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

/**
 * A link whose fill wipes in from the edge the cursor enters, and out toward
 * the edge it leaves. Text inverts to the ground color while hovered.
 */
export function DirectionalLink({
  href = "#",
  external,
  disabled,
  className = "",
  children,
  onClick,
}: DirectionalLinkProps) {
  const fill = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  const move = (e: PointerEvent<HTMLElement>, entering: boolean) => {
    const el = e.currentTarget;
    const dir = edgeFrom(e, el);
    const f = fill.current;
    if (!f) return;
    if (entering) {
      f.style.transition = "none";
      f.style.transform = OFFSET[dir];
      // force reflow so the following transition runs from the offset
      void f.offsetWidth;
      f.style.transition = "transform var(--bhq-dur) var(--bhq-ease)";
      f.style.transform = "translate(0, 0)";
      setHovered(true);
    } else {
      f.style.transition = "transform var(--bhq-dur) var(--bhq-ease)";
      f.style.transform = OFFSET[dir];
      setHovered(false);
    }
  };

  const inner = (
    <>
      <span
        ref={fill}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-ink"
        style={{ transform: OFFSET.left }}
      />
      <span
        className="relative z-10 transition-colors duration-[var(--bhq-dur-fast)]"
        style={{ color: hovered ? "var(--bhq-bg)" : undefined }}
      >
        {children}
      </span>
    </>
  );

  const base = `relative isolate inline-flex items-center overflow-hidden ${className}`;

  if (disabled) {
    return (
      <span className={`${base} cursor-not-allowed opacity-55`} aria-disabled>
        <span className="relative z-10">{children}</span>
      </span>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        className={base}
        onPointerEnter={(e) => move(e, true)}
        onPointerLeave={(e) => move(e, false)}
        onClick={onClick}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={base}
      onPointerEnter={(e) => move(e, true)}
      onPointerLeave={(e) => move(e, false)}
      onClick={onClick}
    >
      {inner}
    </Link>
  );
}
