import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { BasaltLines } from "@/components/ui/BasaltLines";
import { posts, formatDate } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from BAZALTHQ — announcements and perspective.",
};

export default function BlogPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden pb-28 pt-28 sm:pt-32">
      <BasaltLines className="pointer-events-none absolute inset-0 h-full w-full text-ink [mask-image:radial-gradient(120%_100%_at_50%_0%,black,transparent_72%)]" />

      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="bhq-label mb-4 text-ink-mute">Company · Blog</p>
          <h1 className="bhq-display text-[clamp(2.4rem,8vw,5rem)] leading-[0.88] tracking-[-0.03em] text-ink">
            Blog
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-dim">
            Announcements and perspective from the workshop.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-16 flex flex-col border-t border-line">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-4 border-b border-line py-8 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
                >
                  <div className="sm:max-w-2xl">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-mute">
                        {formatDate(post.date)}
                      </span>
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-[var(--radius-xs)] border border-line px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-mute"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-[1.5rem] leading-tight text-ink transition-colors group-hover:text-white">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-mute">
                      {post.excerpt}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-mute transition-all duration-[var(--bhq-dur)] ease-[var(--ease-brand)] group-hover:translate-x-0.5 group-hover:text-ink"
                  >
                    Read ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </main>
  );
}
