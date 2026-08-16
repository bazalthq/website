import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { BasaltLines } from "@/components/ui/BasaltLines";
import { posts, getPost, formatDate, type Block } from "@/content/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "h") {
    return (
      <h2 className="mt-12 text-[1.4rem] leading-snug tracking-[-0.01em] text-ink">
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="my-6 flex flex-col gap-3">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-ink-dim">
            <span aria-hidden className="mt-2.5 h-1 w-3 shrink-0 bg-line-strong" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-dim">{block.text}</p>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="relative min-h-[100svh] overflow-hidden pb-28 pt-28 sm:pt-32">
      <BasaltLines className="pointer-events-none absolute inset-0 h-full w-full text-ink [mask-image:radial-gradient(120%_90%_at_50%_0%,black,transparent_68%)]" />

      <article className="relative mx-auto max-w-2xl px-6">
        <Reveal>
          <Link
            href="/blog"
            className="bhq-label mb-8 inline-block text-ink-mute transition-colors hover:text-ink"
          >
            ← Blog
          </Link>

          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-mute">
              {formatDate(post.date)}
            </span>
            <span className="text-ink-faint">·</span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-mute">
              {post.readingMinutes} min read
            </span>
          </div>

          <h1 className="bhq-display text-[clamp(2.4rem,7vw,4.6rem)] leading-[0.9] tracking-[-0.03em] text-ink">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-[var(--radius-xs)] border border-line px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-mute"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 border-t border-line pt-8">
            {post.body.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
          </div>
        </Reveal>
      </article>
    </main>
  );
}
