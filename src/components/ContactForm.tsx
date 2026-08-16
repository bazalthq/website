"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.company) return; // honeypot — silently drop bots
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error — please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 border border-line-strong bg-surface-2 p-8">
        <p className="bhq-label text-signal">Message sent</p>
        <p className="text-[1.05rem] leading-relaxed text-ink">
          Thanks — we&rsquo;ve got it and will be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-mute transition-colors hover:text-ink"
        >
          Send another ↗
        </button>
      </div>
    );
  }

  const sending = status === "sending";
  const cellCls = "bg-bg-sink p-5 transition-colors focus-within:bg-surface";
  const labelCls = "bhq-label text-ink-faint";
  const fieldCls =
    "mt-3 w-full bg-transparent text-[0.95rem] text-ink placeholder:text-ink-faint";

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {/* table-style bordered grid — solid cells, hairline dividers */}
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
        <label className={`${cellCls} flex flex-col`}>
          <span className={labelCls}>Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            style={{ outline: "none" }}
            className={fieldCls}
          />
        </label>
        <label className={`${cellCls} flex flex-col`}>
          <span className={labelCls}>Email *</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            style={{ outline: "none" }}
            className={fieldCls}
          />
        </label>
        <label className={`${cellCls} flex flex-col sm:col-span-2`}>
          <span className={labelCls}>Message *</span>
          <textarea
            name="message"
            required
            rows={6}
            placeholder="What are you looking to build?"
            style={{ outline: "none" }}
            className={`${fieldCls} resize-y`}
          />
        </label>
      </div>

      {status === "error" && (
        <p className="mt-5 text-[0.9rem] leading-relaxed text-signal-down">
          {error}{" "}
          <a
            href={`mailto:${site.contact.email}`}
            className="underline decoration-line-strong underline-offset-2 hover:text-ink"
          >
            Email us directly.
          </a>
        </p>
      )}

      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-ink px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {sending ? "Sending…" : "Send message"}
          <span className="transition-transform group-hover:translate-x-0.5">↗</span>
        </button>
        <span className="font-mono text-[0.68rem] text-ink-faint">
          * required
        </span>
      </div>
    </form>
  );
}
