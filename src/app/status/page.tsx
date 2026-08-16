import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { BasaltLines } from "@/components/ui/BasaltLines";
import { projects, hasProjects, type ProjectStatus } from "@/content/projects";

export const metadata: Metadata = {
  title: "Status",
  description: "Live status of BAZALTHQ services and projects.",
};

const STATUS_META: Record<
  ProjectStatus,
  { label: string; dot: string; text: string }
> = {
  operational: { label: "Operational", dot: "bg-signal", text: "text-signal" },
  beta: { label: "Beta", dot: "bg-signal-warn", text: "text-signal-warn" },
  building: { label: "Building", dot: "bg-signal-warn", text: "text-signal-warn" },
};

export default function StatusPage() {
  const allOperational =
    hasProjects && projects.every((p) => p.status === "operational");

  return (
    <main className="relative min-h-[100svh] overflow-hidden pb-24 pt-28 sm:pt-32">
      <BasaltLines className="pointer-events-none absolute inset-0 h-full w-full text-ink [mask-image:radial-gradient(120%_100%_at_50%_0%,black,transparent_72%)]" />
      <div className="relative mx-auto w-full max-w-4xl px-6">
        <Reveal>
          <p className="bhq-label mb-5 text-ink-mute">Platform · Status</p>
          <h1 className="bhq-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.03em] text-ink">
            System status
          </h1>
        </Reveal>

        {/* Overall banner */}
        <Reveal delay={0.09} className="mt-10">
          <div className="flex items-center justify-between gap-4 border border-line-strong bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${
                    hasProjects
                      ? allOperational
                        ? "bg-signal"
                        : "bg-signal-warn"
                      : "bg-signal"
                  }`}
                />
                <span
                  className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                    hasProjects
                      ? allOperational
                        ? "bg-signal"
                        : "bg-signal-warn"
                      : "bg-signal"
                  }`}
                />
              </span>
              <span className="text-[1.05rem] text-ink">
                {hasProjects
                  ? allOperational
                    ? "All systems operational"
                    : "Some services are in progress"
                  : "No incidents"}
              </span>
            </div>
            <span className="bhq-label hidden sm:block">Live</span>
          </div>
        </Reveal>

        {/* Services */}
        <Reveal delay={0.18} className="mt-12">
          <p className="bhq-label mb-4">Services</p>
          {hasProjects ? (
            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {projects.map((p) => {
                const meta = STATUS_META[p.status];
                return (
                  <li
                    key={p.slug}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div>
                      <p className="text-[1rem] text-ink">{p.name}</p>
                      <p className="text-[0.85rem] text-ink-mute">{p.summary}</p>
                    </div>
                    <span className={`flex items-center gap-2 ${meta.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                      <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em]">
                        {meta.label}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="border border-dashed border-line-strong p-8 text-center">
              <p className="text-[1rem] text-ink">No services are deployed yet.</p>
              <p className="mx-auto mt-2 max-w-md text-[0.9rem] leading-relaxed text-ink-mute">
                BAZALTHQ is under construction. As projects ship, their live
                status will appear here.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </main>
  );
}
