import Image from "next/image";
import { site } from "@/content/site";
import { BackToTop } from "@/components/ui/BackToTop";
import { BasaltLines } from "@/components/ui/BasaltLines";

const YEAR = 2026;

export function Footer() {
  return (
    <footer className="relative bg-bg-sink">
      {/* --- Tagline band. The grid fades in from plain color at the top and
             back out at the bottom. --- */}
      <div className="relative overflow-hidden">
        <BasaltLines className="pointer-events-none absolute inset-0 h-full w-full text-ink [mask-image:linear-gradient(to_bottom,transparent,black_40%,black_70%,transparent)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-24 sm:py-32">
          <p className="bhq-display bhq-heading-glow max-w-4xl text-center text-[clamp(1.6rem,4.5vw,3rem)] text-ink">
            {site.tagline}
          </p>
          <div className="mt-10">
            <BackToTop />
          </div>
        </div>
      </div>

      {/* --- Columns (hairline dividers only; same ground everywhere) --- */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div className="bg-bg-sink p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-[var(--radius-xs)] ring-1 ring-line">
              <Image
                src="/bazalthq_logo.png"
                alt=""
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="bhq-display text-[1.05rem] text-ink">{site.name}</span>
          </div>
          <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-ink-mute">
            {site.description}
          </p>
        </div>

        {/* Get in touch */}
        <div className="bg-bg-sink p-8">
          <p className="bhq-label mb-4">Get in touch</p>
          <p className="max-w-xs text-[0.95rem] leading-relaxed text-ink-dim">
            Have questions or a project in mind? Reach out and we&rsquo;ll get
            back to you.
          </p>
          <a
            href={`mailto:${site.contact.email}`}
            className="mt-4 inline-block font-mono text-[0.85rem] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
          >
            {site.contact.email}
          </a>
        </div>

        {/* Social */}
        <div className="bg-bg-sink p-8">
          <p className="bhq-label mb-4">We&rsquo;re social</p>
          <ul className="flex flex-col gap-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-2 text-[0.95rem] text-ink-dim transition-colors hover:text-ink"
                >
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-mute transition-colors group-hover:text-ink">
                    {s.label}
                  </span>
                  <span>{s.handle}</span>
                  <span
                    aria-hidden
                    className="translate-x-0 opacity-0 transition-all duration-[var(--bhq-dur)] ease-[var(--ease-brand)] group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- Bottom bar --- */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-8 py-5 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-mute">
            © {YEAR} {site.name}
          </p>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-faint">
            {site.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
