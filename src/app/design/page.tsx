import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DirectionalLink } from "@/components/ui/DirectionalLink";
import { BasaltLines } from "@/components/ui/BasaltLines";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "The BAZALTHQ design system — foundations, tokens and components.",
};

/* ---- Data ---- */

const GROUNDS = [
  { label: "bg", varName: "--bhq-bg", hex: "#0a0a0b", cls: "bg-bg" },
  { label: "bg-sink", varName: "--bhq-bg-sink", hex: "#060607", cls: "bg-bg-sink" },
  { label: "surface", varName: "--bhq-surface", hex: "#101012", cls: "bg-surface" },
  { label: "surface-2", varName: "--bhq-surface-2", hex: "#17171a", cls: "bg-surface-2" },
  { label: "surface-3", varName: "--bhq-surface-3", hex: "#202024", cls: "bg-surface-3" },
];

const INKS = [
  { label: "ink", varName: "--bhq-ink", hex: "#ece6d8", cls: "bg-ink" },
  { label: "ink-dim", varName: "--bhq-ink-dim", hex: "#b3ada0", cls: "bg-ink-dim" },
  { label: "ink-mute", varName: "--bhq-ink-mute", hex: "#78736a", cls: "bg-ink-mute" },
  { label: "ink-faint", varName: "--bhq-ink-faint", hex: "#4a4842", cls: "bg-ink-faint" },
];

const SIGNALS = [
  { label: "signal", varName: "--bhq-signal", hex: "#8fb59a", cls: "bg-signal" },
  { label: "signal-warn", varName: "--bhq-signal-warn", hex: "#c9a15f", cls: "bg-signal-warn" },
  { label: "signal-down", varName: "--bhq-signal-down", hex: "#b5726b", cls: "bg-signal-down" },
];

const WEIGHTS = [
  { w: 400, name: "Regular" },
  { w: 500, name: "Medium — wordmark" },
  { w: 600, name: "Semibold — headings" },
  { w: 700, name: "Bold" },
  { w: 800, name: "Extra" },
];

/* ---- Small building blocks ---- */

function Swatch({
  label,
  varName,
  hex,
  cls,
}: {
  label: string;
  varName: string;
  hex: string;
  cls: string;
}) {
  return (
    <div className="bg-bg p-4">
      <div className={`h-16 w-full rounded-[var(--radius-xs)] ring-1 ring-line ${cls}`} />
      <p className="mt-3 text-[0.9rem] text-ink">{label}</p>
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-mute">
        {hex}
      </p>
      <p className="font-mono text-[0.62rem] tracking-[0.06em] text-ink-faint">
        {varName}
      </p>
    </div>
  );
}

function SectionHead({
  index,
  kicker,
  title,
  children,
}: {
  index: string;
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 border-t border-line-strong pt-6 sm:flex-row sm:items-baseline sm:justify-between">
      <div>
        <p className="bhq-label mb-2 text-ink-mute">
          {index} · {kicker}
        </p>
        <h2 className="bhq-display text-[clamp(1.5rem,4vw,2.4rem)] leading-none tracking-[-0.02em] text-ink">
          {title}
        </h2>
      </div>
      {children && (
        <p className="max-w-sm text-[0.9rem] leading-relaxed text-ink-mute">
          {children}
        </p>
      )}
    </div>
  );
}

/* ---- Page ---- */

export default function DesignPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden pb-28 pt-28 sm:pt-32">
      <BasaltLines className="pointer-events-none absolute inset-0 h-full w-full text-ink [mask-image:radial-gradient(120%_100%_at_50%_0%,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Hero */}
        <Reveal>
          <p className="bhq-label mb-4 text-ink-mute">Platform · Reference</p>
          <h1 className="bhq-display text-[clamp(2.4rem,9vw,5.5rem)] leading-[0.86] tracking-[-0.03em] text-ink">
            Design
            <br />
            system
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-dim">
            The foundations every BAZALTHQ page and app is built from. Brutalist,
            matte, basalt — one set of tokens, reused everywhere. Never hardcode a
            value; pull from here.
          </p>
        </Reveal>

        {/* 01 — Typography */}
        <section className="mt-24">
          <Reveal>
            <SectionHead index="01" kicker="Foundations" title="Typography">
              Syne for display and body, JetBrains Mono for micro-labels.
              Strong-lined, uppercase, tight.
            </SectionHead>
          </Reveal>

          <Reveal delay={0.06}>
            {/* Scale */}
            <div className="flex flex-col divide-y divide-line border-y border-line">
              <div className="flex items-baseline justify-between gap-6 py-5">
                <span className="bhq-display text-[clamp(2.5rem,8vw,5rem)] leading-none tracking-[-0.03em] text-ink">
                  Aa
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-mute">
                  Syne · display
                </span>
              </div>
              <p className="bhq-display py-5 text-[clamp(1.6rem,5vw,3rem)] leading-[0.95] tracking-[-0.02em] text-ink">
                Solutions, carved in stone
              </p>
            </div>

            {/* Weights */}
            <div className="mt-6 flex flex-col divide-y divide-line border-y border-line">
              {WEIGHTS.map((wt) => (
                <div
                  key={wt.w}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <span
                    className="text-[1.6rem] uppercase leading-none tracking-[0.03em] text-ink"
                    style={{ fontWeight: wt.w }}
                  >
                    BAZALTHQ
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-mute">
                    {wt.w} · {wt.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Body + mono */}
            <div className="mt-6 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
              <div className="bg-bg p-6">
                <p className="bhq-label mb-3 text-ink-faint">Body</p>
                <p className="text-[0.98rem] leading-relaxed text-ink-dim">
                  {site.description} Carved in stone, built to last —
                  0123456789.
                </p>
              </div>
              <div className="bg-bg p-6">
                <p className="bhq-label mb-3 text-ink-faint">Mono label</p>
                <p className="bhq-label text-ink">The quick basalt · 2026</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 02 — Color */}
        <section className="mt-24">
          <Reveal>
            <SectionHead index="02" kicker="Foundations" title="Color">
              Near-black grounds, warm egg-white ink, hairline structure, one
              restrained signal set.
            </SectionHead>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="bhq-label mb-3 text-ink-faint">Grounds &amp; surfaces</p>
            <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
              {GROUNDS.map((s) => (
                <Swatch key={s.label} {...s} />
              ))}
            </div>

            <p className="bhq-label mb-3 mt-8 text-ink-faint">Ink</p>
            <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {INKS.map((s) => (
                <Swatch key={s.label} {...s} />
              ))}
            </div>

            <p className="bhq-label mb-3 mt-8 text-ink-faint">Signal</p>
            <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
              {SIGNALS.map((s) => (
                <Swatch key={s.label} {...s} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* 03 — Components */}
        <section className="mt-24">
          <Reveal>
            <SectionHead index="03" kicker="Primitives" title="Components">
              The reusable parts — buttons, directional links, labels and status
              markers.
            </SectionHead>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
              {/* Buttons */}
              <div className="bg-bg p-8">
                <p className="bhq-label mb-5 text-ink-faint">Buttons</p>
                <div className="flex flex-wrap items-center gap-4">
                  <MagneticButton href="/contact" variant="solid" magnetic={false}>
                    Solid
                  </MagneticButton>
                  <MagneticButton href="/" variant="ghost" magnetic={false}>
                    Ghost
                  </MagneticButton>
                </div>
              </div>

              {/* Directional links */}
              <div className="bg-bg p-8">
                <p className="bhq-label mb-5 text-ink-faint">
                  Directional link · hover
                </p>
                <div className="flex flex-col gap-1">
                  {["Projects", "Status", "Contact"].map((l) => (
                    <DirectionalLink
                      key={l}
                      href="/"
                      className="w-full rounded-[var(--radius-xs)] px-2 py-1.5 text-[1rem] text-ink-dim"
                    >
                      {l}
                    </DirectionalLink>
                  ))}
                </div>
              </div>

              {/* Labels */}
              <div className="bg-bg p-8">
                <p className="bhq-label mb-5 text-ink-faint">Labels</p>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  <span className="bhq-label text-ink">Platform</span>
                  <span className="bhq-label text-ink-dim">Company</span>
                  <span className="bhq-label text-ink-mute">Resources</span>
                </div>
              </div>

              {/* Status markers */}
              <div className="bg-bg p-8">
                <p className="bhq-label mb-5 text-ink-faint">Status markers</p>
                <div className="flex flex-col gap-3">
                  {SIGNALS.map((s) => (
                    <span
                      key={s.label}
                      className="flex items-center gap-2 text-[0.95rem] text-ink-dim"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${s.cls}`} />
                      {s.label}
                    </span>
                  ))}
                  <div className="mt-2 rounded-[var(--radius-sm)] border border-dashed border-line-strong p-4">
                    <p className="text-[0.95rem] text-ink">In development</p>
                    <p className="mt-1 text-[0.8rem] text-ink-mute">
                      Dashed placeholder — honest empty state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
