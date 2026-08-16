import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { BasaltLines } from "@/components/ui/BasaltLines";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with BAZALTHQ, or just say hello.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden pb-28 pt-28 sm:pt-32">
      <BasaltLines className="pointer-events-none absolute inset-0 h-full w-full text-ink [mask-image:radial-gradient(120%_100%_at_50%_0%,black,transparent_72%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="bhq-label mb-4 text-ink-mute">Company · Contact</p>
          <h1 className="bhq-display text-[clamp(2.4rem,9vw,5.5rem)] leading-[0.86] tracking-[-0.03em] text-ink">
            Start a
            <br />
            project
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-dim">
            Have a project in mind, or want a custom build? Tell us what
            you&rsquo;re after and we&rsquo;ll get back to you.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal delay={0.06}>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-col gap-8 border-t border-line-strong pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-1">
              <div>
                <p className="bhq-label mb-3 text-ink-faint">Direct</p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-[1.05rem] text-ink-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
                >
                  {site.contact.email}
                </a>
              </div>

              <div>
                <p className="bhq-label mb-3 text-ink-faint">Social</p>
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
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="bhq-label mb-3 text-ink-faint">Response</p>
                <p className="text-[0.95rem] leading-relaxed text-ink-mute">
                  We read every message and usually reply within a couple of days.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
