import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { BasaltLines } from "@/components/ui/BasaltLines";
import { projects, hasProjects, statusLabel } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "The apps BAZALTHQ is building.",
};

const DOT: Record<string, string> = {
  operational: "bg-signal",
  beta: "bg-signal-warn",
  building: "bg-signal-warn",
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden pb-28 pt-28 sm:pt-32">
      <BasaltLines className="pointer-events-none absolute inset-0 h-full w-full text-ink [mask-image:radial-gradient(120%_100%_at_50%_0%,black,transparent_72%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="bhq-label mb-4 text-ink-mute">Projects</p>
          <h1 className="bhq-display text-[clamp(2.4rem,8vw,5rem)] leading-[0.88] tracking-[-0.03em] text-ink">
            What we&rsquo;re building
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-dim">
            Durable, self-hostable tools — each one engineered to last.
          </p>
        </Reveal>

        {hasProjects ? (
          <Reveal delay={0.08}>
            <ul className="mt-16 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group flex h-full flex-col gap-5 bg-bg p-8 transition-colors hover:bg-surface"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="bhq-display text-[1.6rem] leading-none tracking-[-0.01em] text-ink">
                        {p.name}
                      </h2>
                      <span className="flex items-center gap-2 text-ink-mute">
                        <span className={`h-1.5 w-1.5 rounded-full ${DOT[p.status]}`} />
                        <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em]">
                          {statusLabel(p.status)}
                        </span>
                      </span>
                    </div>
                    <p className="text-[0.98rem] leading-relaxed text-ink-dim">
                      {p.summary}
                    </p>
                    <span
                      aria-hidden
                      className="mt-auto font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-mute transition-all duration-[var(--bhq-dur)] ease-[var(--ease-brand)] group-hover:translate-x-0.5 group-hover:text-ink"
                    >
                      View project ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : (
          <Reveal delay={0.08}>
            <div className="mt-16 border border-dashed border-line-strong p-10 text-center">
              <p className="text-[1.05rem] text-ink">In development</p>
              <p className="mx-auto mt-2 max-w-md text-[0.9rem] leading-relaxed text-ink-mute">
                The apps we&rsquo;re building will be listed here soon.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}
