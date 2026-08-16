"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Footer reveal / parallax.
 *
 * The page content sits on an opaque layer above the footer, which is pinned
 * to the bottom of the viewport underneath it. A spacer the height of the
 * footer reserves the scroll distance, so as you reach the end the content
 * lifts up off the footer and the footer is revealed from below — a parallax
 * reveal, since the footer stays put while the content slides over it.
 */
export function FooterReveal({
  children,
  footer,
}: {
  children: ReactNode;
  footer: ReactNode;
}) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* Content — opaque, above the footer */}
      <div className="relative z-10 bg-bg">{children}</div>

      {/* Spacer — reserves the scroll distance to reveal the footer */}
      <div aria-hidden style={{ height }} />

      {/* Footer — pinned behind the content, revealed as content scrolls up */}
      <div
        ref={footerRef}
        className="fixed inset-x-0 bottom-0 z-0"
      >
        {footer}
      </div>
    </>
  );
}
