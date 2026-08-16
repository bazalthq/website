/**
 * BLOG — real posts, authored content (no placeholders).
 * Post bodies are structured blocks so they render through one typed renderer
 * and stay reusable. Add an entry to publish; sorted newest-first at read time.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  readingMinutes: number;
  tags: string[];
  body: Block[];
}

const POSTS: Post[] = [
  {
    slug: "bazalthq-is-live",
    title: "BAZALTHQ is live",
    excerpt:
      "The site is up. A short note on what we're building, and what's carved in stone next.",
    date: "2026-08-15",
    readingMinutes: 2,
    tags: ["Announcement"],
    body: [
      {
        type: "p",
        text: "BAZALTHQ is online. This is the foundation — a small, deliberate starting point for everything we're going to ship from here.",
      },
      {
        type: "p",
        text: "We build durable software: stable, secure, and engineered to last. The kind of systems that hold up under real use, not just a demo. That standard is the whole reason this exists, and it runs through every project we take on.",
      },
      {
        type: "p",
        text: "For now the site is intentionally sparse. As products ship, they'll appear under Projects, each with its own live status. If you have something that needs to be built to last, the door is open — reach out any time.",
      },
    ],
  },
  {
    slug: "enterprise-security-for-everyone",
    title: "Enterprise-grade security isn't just for enterprises",
    excerpt:
      "Strong encryption and private data storage shouldn't be a privilege of large corporations. Here's why we build to that bar for smaller teams and individuals too.",
    date: "2026-08-13",
    readingMinutes: 4,
    tags: ["Security", "Perspective"],
    body: [
      {
        type: "p",
        text: "For a long time, serious security was treated as something only large corporations could afford or justify. Dedicated infrastructure, encryption at rest and in transit, private data storage, audited access — the full stack of protection sat behind enterprise budgets. Everyone else made do with whatever a generic platform handed them by default.",
      },
      {
        type: "p",
        text: "That gap made sense once. It doesn't anymore. Smaller companies and private individuals hold data that is every bit as sensitive — customer records, financial details, health information, private correspondence — and they are targeted precisely because attackers expect weaker defenses. The stakes are the same; only the protection has been unequal.",
      },
      {
        type: "h",
        text: "The same bar, for everyone",
      },
      {
        type: "p",
        text: "We don't run two tiers of quality. The security posture we'd build for a large organization is the one we bring to a five-person team or a single person who simply wants their data to stay theirs:",
      },
      {
        type: "ul",
        items: [
          "Private, self-hostable data storage — your data lives where you control it, not scattered across services you can't audit.",
          "Encryption by default — in transit and at rest, not as an upsell.",
          "Least-privilege access and a clear, minimal attack surface.",
          "Systems designed to be understood and maintained, so security doesn't rot the moment the project ships.",
        ],
      },
      {
        type: "h",
        text: "Affordable, not diluted",
      },
      {
        type: "p",
        text: "Bringing this standard to smaller teams isn't about stripping it down until it's cheap. It's about engineering it well enough that it's affordable without being diluted — sensible architecture, the right tools, and no wasted complexity. Durable software is, in the long run, the economical choice: it breaks less, leaks less, and outlives the quick fix.",
      },
      {
        type: "p",
        text: "That's the standard we hold, and it's why BAZALTHQ exists. If security and privacy matter to what you're building — at any size — that's exactly the work we want to do.",
      },
    ],
  },
];

export const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Format a YYYY-MM-DD string as "Month D, YYYY" without locale/timezone drift. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
