import type { Metadata } from "next";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NotFoundSearch } from "@/components/NotFoundSearch";
import { BasaltLines } from "@/components/ui/BasaltLines";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="bhq-grain relative flex min-h-[100svh] items-center overflow-hidden">
        <BasaltLines className="pointer-events-none absolute inset-0 h-full w-full text-ink [mask-image:radial-gradient(120%_120%_at_50%_45%,black,transparent_76%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-32 lg:grid-cols-2 lg:gap-8">
          <div>
            <p className="bhq-label mb-6 text-ink-mute">Error · 404</p>
            <h1 className="bhq-display text-[clamp(4rem,16vw,13rem)] leading-[0.82] tracking-[-0.03em] text-ink">
              404
            </h1>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-ink-dim">
              This page doesn&rsquo;t exist — it may have moved, or it was never
              carved in stone. Search for what you need below.
            </p>
            <div className="mt-8">
              <MagneticButton href="/" variant="ghost" magnetic={false}>
                Back to home
              </MagneticButton>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <NotFoundSearch />
          </div>
        </div>
    </main>
  );
}
