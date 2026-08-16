"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="group grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-bg/40 text-ink-dim transition-colors duration-[var(--bhq-dur)] hover:border-ink hover:text-ink"
    >
      <span
        aria-hidden
        className="translate-y-0 transition-transform duration-[var(--bhq-dur)] ease-[var(--ease-brand)] group-hover:-translate-y-0.5"
      >
        ↑
      </span>
    </button>
  );
}
