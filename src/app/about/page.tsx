import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { BasaltLines } from "@/components/ui/BasaltLines";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "BAZALTHQ builds open-source apps and takes on custom commissions — high-standard software for teams and individuals alike.",
};

const SERVICES = [
  {
    title: "Private data storage",
    body: "Private, affordable storage — self-hostable and encrypted, so your data stays yours.",
  },
  {
    title: "Hosting",
    body: "Reliable hosting tuned for uptime and performance, without the enterprise price tag.",
  },
  {
    title: "Web development",
    body: "Fast, accessible websites built on a foundation that holds up under real use.",
  },
  {
    title: "Application development",
    body: "Applications engineered to last — from mobile to desktop, stable by design.",
  },
  {
    title: "Workflow automation",
    body: "Private workflow automation for teams — the repetitive work, handled quietly and securely.",
  },
  {
    title: "End-to-end coverage",
    body: "Backend and frontend, from data model to interface — full-stack, one accountable team.",
  },
];

const STACK = ["Java", "Kotlin", "Rust", "TypeScript", "Next.js", "MySQL / MariaDB"];

export default function AboutPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden pb-28 pt-28 sm:pt-32">
      <BasaltLines className="pointer-events-none absolute inset-0 h-full w-full text-ink [mask-image:radial-gradient(120%_100%_at_50%_0%,black,transparent_72%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Intro */}
        <Reveal>
          <p className="bhq-label mb-4 text-ink-mute">Company · About</p>
          <h1 className="bhq-display max-w-4xl text-[clamp(2.2rem,6.5vw,4.5rem)] leading-[0.9] tracking-[-0.03em] text-ink">
            Open-source apps,
            <br />
            and custom builds.
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 max-w-2xl border-l border-line-strong pl-5">
            <p className="text-[1.1rem] leading-relaxed text-ink-dim">
              BAZALTHQ builds open-source apps — software we design, ship and
              maintain in the open. Alongside them we take on custom commissions:
              bespoke tools built to the same high standard. Stable, secure and
              genuinely well-made — for companies and individuals alike, at a
              scale and price that actually fit.
            </p>
          </div>
        </Reveal>

        {/* Services */}
        <section className="mt-24">
          <Reveal>
            <div className="mb-8 flex flex-col gap-3 border-t border-line-strong pt-6 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="bhq-display text-[clamp(1.5rem,4vw,2.4rem)] leading-none tracking-[-0.02em] text-ink">
                What you can count on us for
              </h2>
              <p className="bhq-label text-ink-mute">Services</p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <div key={s.title} className="flex flex-col gap-3 bg-bg p-7">
                  <span className="font-mono text-[0.7rem] tracking-[0.1em] text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.15rem] leading-snug text-ink">
                    {s.title}
                  </h3>
                  <p className="text-[0.92rem] leading-relaxed text-ink-mute">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Stack */}
        <section className="mt-24">
          <Reveal>
            <div className="mb-8 flex flex-col gap-3 border-t border-line-strong pt-6 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="bhq-display text-[clamp(1.5rem,4vw,2.4rem)] leading-none tracking-[-0.02em] text-ink">
                Built with
              </h2>
              <p className="bhq-label text-ink-mute">Stack</p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex flex-wrap gap-3">
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded-[var(--radius-sm)] border border-line-strong bg-surface px-4 py-2 font-mono text-[0.8rem] uppercase tracking-[0.08em] text-ink-dim transition-colors duration-[var(--bhq-dur-fast)] hover:border-ink hover:text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <Reveal delay={0.06}>
          <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-line-strong pt-10 sm:flex-row sm:items-end">
            <p className="max-w-xl text-[1.25rem] leading-snug text-ink">
              Whether you&rsquo;re a company or a single person — if it&rsquo;s
              worth building well, it&rsquo;s our kind of work.
            </p>
            <MagneticButton href="/contact" variant="solid" magnetic={false}>
              Start a project
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
