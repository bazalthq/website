import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { BasaltLines } from "@/components/ui/BasaltLines";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { projects, getProject, statusLabel } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: p.name,
    description: p.summary,
    openGraph: { title: p.name, description: p.summary, type: "website" },
  };
}

/** Schematic wireframe of the workspace: categories · files · preview · chat. */
function InterfacePreview() {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-line-strong bg-bg-sink">
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="bhq-label ml-3 text-ink-faint">library</span>
      </div>

      <div className="relative grid h-[22rem] grid-cols-12">
        {/* Left — categories */}
        <div className="col-span-3 border-r border-line p-4">
          <p className="bhq-label mb-4 text-ink-faint">Categories</p>
          <div className="flex flex-col gap-2.5">
            {["Images", "Video", "PDFs", "Documents", "Audio"].map((c, i) => (
              <div
                key={c}
                className={`rounded-[var(--radius-xs)] px-2 py-1.5 text-[0.8rem] ${
                  i === 0 ? "bg-surface-2 text-ink" : "text-ink-mute"
                }`}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Center — file list */}
        <div className="col-span-5 border-r border-line p-4">
          <p className="bhq-label mb-4 text-ink-faint">Files</p>
          <div className="grid grid-cols-3 gap-2.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-[var(--radius-xs)] border border-line ${
                  i === 1 ? "bg-surface-2 ring-1 ring-line-strong" : "bg-surface/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right — preview */}
        <div className="col-span-4 p-4">
          <p className="bhq-label mb-4 text-ink-faint">Preview</p>
          <div className="h-[9rem] rounded-[var(--radius-xs)] border border-line bg-surface/50" />
          <div className="mt-3 h-2 w-2/3 rounded-full bg-line-strong" />
          <div className="mt-2 h-2 w-1/2 rounded-full bg-line" />
        </div>

        {/* Bottom-left — expandable chat */}
        <div className="absolute bottom-4 left-4 w-52 rounded-[var(--radius-sm)] border border-line-strong bg-surface-2/90 p-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            <span className="bhq-label text-ink">Ask Library</span>
          </div>
          <div className="mt-2.5 rounded-[var(--radius-xs)] border border-line bg-bg px-2 py-1.5 text-[0.72rem] text-ink-faint">
            Find last week&rsquo;s invoices…
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const dot =
    p.status === "operational" ? "bg-signal" : "bg-signal-warn";

  return (
    <main className="relative min-h-[100svh] overflow-hidden pb-28 pt-28 sm:pt-32">
      <BasaltLines className="pointer-events-none absolute inset-0 h-full w-full text-ink [mask-image:radial-gradient(120%_90%_at_50%_0%,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <Reveal>
          <Link
            href="/projects"
            className="bhq-label mb-8 inline-block text-ink-mute transition-colors hover:text-ink"
          >
            ← Projects
          </Link>

          <div className="mb-5 flex items-center gap-3">
            <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-mute">
              {statusLabel(p.status)}
            </span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-faint">
              {p.slug}
            </span>
          </div>

          <h1 className="bhq-display text-[clamp(2.4rem,8vw,5rem)] leading-[0.88] tracking-[-0.03em] text-ink">
            {p.name}
          </h1>
          {p.tagline && (
            <p className="mt-5 max-w-2xl text-[1.2rem] leading-snug text-ink-dim">
              {p.tagline}
            </p>
          )}
        </Reveal>

        {/* Highlights */}
        {p.highlights && (
          <Reveal delay={0.06}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {p.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-[var(--radius-sm)] border border-line-strong bg-surface px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink-dim"
                >
                  {h}
                </span>
              ))}
            </div>
          </Reveal>
        )}

        {/* Interface preview */}
        <Reveal delay={0.08}>
          <div className="mt-14">
            <p className="bhq-label mb-4 text-ink-mute">The workspace</p>
            <InterfacePreview />
            <p className="mt-4 max-w-2xl text-[0.9rem] leading-relaxed text-ink-mute">
              Categories on the left, file lists in the center, a live preview of
              whatever you opened on the right — with an expandable chat in the
              corner to search and ask about your library.
            </p>
          </div>
        </Reveal>

        {/* Description */}
        {p.description && (
          <Reveal delay={0.06}>
            <div className="mt-16 max-w-2xl border-l border-line-strong pl-5">
              <p className="text-[1.1rem] leading-relaxed text-ink-dim">
                {p.description}
              </p>
            </div>
          </Reveal>
        )}

        {/* Features */}
        {p.features && (
          <section className="mt-20">
            <Reveal>
              <div className="mb-8 flex items-baseline justify-between border-t border-line-strong pt-6">
                <h2 className="bhq-display text-[clamp(1.5rem,4vw,2.4rem)] leading-none tracking-[-0.02em] text-ink">
                  Features
                </h2>
                <p className="bhq-label text-ink-mute">Detail</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {p.features.map((f, i) => (
                  <div key={f.title} className="flex flex-col gap-3 bg-bg p-7">
                    <span className="font-mono text-[0.7rem] tracking-[0.1em] text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[1.1rem] leading-snug text-ink">
                      {f.title}
                    </h3>
                    <p className="text-[0.9rem] leading-relaxed text-ink-mute">
                      {f.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* Stack + CTA */}
        <Reveal delay={0.06}>
          <div className="mt-20 flex flex-col gap-8 border-t border-line-strong pt-10">
            {p.stack && (
              <div>
                <p className="bhq-label mb-4 text-ink-mute">Built with</p>
                <div className="flex flex-wrap gap-2.5">
                  {p.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-[var(--radius-sm)] border border-line px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink-dim"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
              <p className="max-w-lg text-[1.15rem] leading-snug text-ink">
                Interested in {p.name}, or want early access? Get in touch.
              </p>
              <MagneticButton href="/contact" variant="solid" magnetic={false}>
                Get in touch
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
