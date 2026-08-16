"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { DirectionalLink } from "@/components/ui/DirectionalLink";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { navTriggers, navColumns } from "@/content/nav";
import { projects, hasProjects } from "@/content/projects";

const panelEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openNow = useCallback((id?: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
    if (id) setActive(id);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setActive(null);
    }, 120);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <div
        className="pointer-events-auto w-full max-w-5xl"
        onPointerLeave={scheduleClose}
      >
        {/* ---------- The island ---------- */}
        <motion.nav
          className={`relative overflow-hidden rounded-[var(--radius-md)] border backdrop-blur-xl transition-colors duration-[var(--bhq-dur)] ${
            scrolled || open
              ? "border-line-strong bg-[color-mix(in_oklab,var(--bhq-surface)_88%,transparent)]"
              : "border-line bg-[color-mix(in_oklab,var(--bhq-surface)_72%,transparent)]"
          }`}
          style={{ boxShadow: "0 1px 0 0 rgba(255,255,255,0.03) inset" }}
        >
          <div className="flex h-14 items-center justify-between gap-4 pl-3 pr-2 sm:pl-4 sm:pr-2.5">
            <Logo />

            {/* Desktop triggers */}
            <div
              className="hidden items-center gap-1 md:flex"
              onPointerEnter={() => openNow()}
            >
              {navTriggers.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onPointerEnter={() => openNow(t.id)}
                  onFocus={() => openNow(t.id)}
                  aria-expanded={open}
                  className="group relative rounded-[var(--radius-xs)] px-3 py-2 font-mono text-[0.82rem] uppercase tracking-[0.12em] text-ink-dim transition-colors duration-[var(--bhq-dur-fast)] hover:text-ink"
                >
                  {t.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 -bottom-px h-px origin-center bg-ink transition-transform duration-[var(--bhq-dur)] ease-[var(--ease-brand)] ${
                      open && active === t.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <MagneticButton href="/contact" variant="solid" magnetic={false}>
                Contact
              </MagneticButton>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="grid h-10 w-10 place-items-center rounded-[var(--radius-xs)] text-ink md:hidden"
            >
              <span className="relative flex h-3 w-5 flex-col justify-between">
                <span
                  className={`h-[1.5px] w-full bg-ink transition-transform duration-[var(--bhq-dur)] ease-[var(--ease-brand)] ${
                    mobileOpen ? "translate-y-[5.25px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-[1.5px] w-full bg-ink transition-opacity duration-[var(--bhq-dur-fast)] ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-[1.5px] w-full bg-ink transition-transform duration-[var(--bhq-dur)] ease-[var(--ease-brand)] ${
                    mobileOpen ? "-translate-y-[5.25px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>

          {/* ---------- Desktop mega panel (expands the island downward) ---------- */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="mega"
                initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.36, ease: panelEase }}
                className="hidden overflow-hidden md:block"
                onPointerEnter={() => openNow()}
              >
                <div className="border-t border-line" />
                <div className="grid grid-cols-12 gap-px bg-line">
                  {/* Projects column */}
                  <div className="col-span-3 bg-surface p-6">
                    <p className="bhq-label mb-4">Projects</p>
                    {hasProjects ? (
                      <ul className="flex flex-col gap-1">
                        {projects.map((p) => (
                          <li key={p.slug}>
                            <DirectionalLink
                              href={p.href ?? `/projects/${p.slug}`}
                              external={Boolean(p.href)}
                              className="w-full rounded-[var(--radius-xs)] px-2 py-1.5 text-[0.95rem] text-ink-dim"
                              onClick={() => setOpen(false)}
                            >
                              {p.name}
                            </DirectionalLink>
                          </li>
                        ))}
                        <li>
                          <DirectionalLink
                            href="/projects"
                            className="mt-1 w-full rounded-[var(--radius-xs)] px-2 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-mute"
                            onClick={() => setOpen(false)}
                          >
                            All projects →
                          </DirectionalLink>
                        </li>
                      </ul>
                    ) : (
                      <div className="rounded-[var(--radius-sm)] border border-dashed border-line-strong p-4">
                        <p className="text-[0.95rem] text-ink">In development</p>
                        <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink-mute">
                          The apps we&rsquo;re building will be listed here soon.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Link columns */}
                  {navColumns.map((col) => (
                    <div key={col.id} className="col-span-3 bg-surface p-6">
                      <p
                        className={`bhq-label mb-4 transition-colors duration-[var(--bhq-dur-fast)] ${
                          active === col.id ? "text-ink" : ""
                        }`}
                      >
                        {col.kicker}
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {col.links.map((l) => (
                          <li key={l.label}>
                            {l.soon ? (
                              <span className="inline-flex items-start whitespace-nowrap rounded-[var(--radius-xs)] px-2 py-1.5 text-[0.95rem] text-ink-faint">
                                {l.label}
                                <sup className="ml-1 font-mono text-[0.5rem] uppercase leading-none tracking-[0.1em] text-ink-mute">
                                  soon
                                </sup>
                              </span>
                            ) : (
                              <DirectionalLink
                                href={l.href}
                                external={l.external}
                                className="w-full rounded-[var(--radius-xs)] px-2 py-1.5 text-[0.95rem] text-ink-dim"
                                onClick={() => setOpen(false)}
                              >
                                {l.label}
                              </DirectionalLink>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Contact card */}
                  <div className="col-span-3 bg-surface-2 p-6">
                    <div className="flex h-full flex-col justify-between gap-6">
                      <div>
                        <p className="bhq-label mb-3">Start a project</p>
                        <p className="text-[1.05rem] leading-snug text-ink">
                          Have a project in mind? Let&rsquo;s build it.
                        </p>
                      </div>
                      <div>
                        <MagneticButton href="/contact" variant="solid" magnetic={false}>
                          Get in touch
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---------- Mobile panel ---------- */}
          <AnimatePresence initial={false}>
            {mobileOpen && (
              <motion.div
                key="mobile"
                initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: panelEase }}
                className="overflow-hidden md:hidden"
              >
                <div className="border-t border-line px-4 py-5">
                  <p className="bhq-label mb-3">Projects</p>
                  <div className="mb-5 rounded-[var(--radius-sm)] border border-dashed border-line-strong px-3 py-2.5 text-[0.95rem] text-ink">
                    In development
                  </div>

                  {navColumns.map((col) => (
                    <div key={col.id} className="mb-5">
                      <p className="bhq-label mb-2">{col.kicker}</p>
                      <ul className="flex flex-col">
                        {col.links.map((l) => (
                          <li key={l.label}>
                            {l.soon ? (
                              <span className="inline-flex items-start py-2 text-[1rem] text-ink-faint">
                                {l.label}
                                <sup className="ml-1 font-mono text-[0.55rem] uppercase leading-none tracking-[0.1em] text-ink-mute">
                                  soon
                                </sup>
                              </span>
                            ) : (
                              <Link
                                href={l.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-[1rem] text-ink-dim transition-colors hover:text-ink"
                                {...(l.external && l.href.startsWith("http")
                                  ? { target: "_blank", rel: "noopener noreferrer" }
                                  : {})}
                              >
                                {l.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <a
                    href="/contact"
                    className="mt-2 flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-ink px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-bg"
                  >
                    Contact ↗
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </header>
  );
}
