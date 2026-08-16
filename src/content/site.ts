/**
 * SITE CONFIG — the single source of truth for brand-level content.
 * Change values here; components read from this file. No content is
 * hardcoded inside components, so this shell scales to any future page.
 */

export const site = {
  name: "BAZALTHQ",
  wordmark: "bazalthq",
  /** One honest line about what this is right now. */
  tagline: "Solutions, carved in stone.",
  description:
    "BAZALTHQ builds open-source apps — and takes on custom commissions. High-standard software: durable, secure, and genuinely well-made.",
  url: "https://bazalthq.ch",

  /** Hero — the opening statement. */
  hero: {
    headline: ["SOLUTIONS", "CARVED IN", "STONE."],
  },

  contact: {
    email: "contact@bazalthq.eu",
  },

  /** Real links only. Leave a field out to hide it. */
  socials: [
    { label: "Reddit", handle: "r/bazalthq", href: "https://reddit.com/r/bazalthq" },
    { label: "Discord", handle: "@bazalthq", href: "https://discord.gg/bazalthq" },
    { label: "GitHub", handle: "@bazalthq", href: "https://github.com/bazalthq" },
  ],
} as const;

export type Social = (typeof site.socials)[number];
