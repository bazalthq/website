/**
 * PROJECTS — the apps BAZALTHQ develops. Real products only.
 * The mega-menu, /projects and /status all render from this list.
 */

export type ProjectStatus = "operational" | "beta" | "building";

export interface ProjectFeature {
  title: string;
  body: string;
}

export interface Project {
  /** Stable slug, used in URLs and as the repo name. */
  slug: string;
  /** Display name. */
  name: string;
  /** One-line description. */
  summary: string;
  status: ProjectStatus;
  /** Public URL, if live. */
  href?: string;

  /* --- Detail (project page) --- */
  tagline?: string;
  description?: string;
  highlights?: string[];
  features?: ProjectFeature[];
  stack?: string[];
}

// The Library app is in development — publish it by moving it into `projects`.
export const upcomingProjects: Project[] = [
  {
    slug: "bazalthq-library",
    name: "Library",
    status: "building",
    summary:
      "Self-hostable, AI-powered file manager. Instant in Docker, built to scale.",
    tagline: "Your files — organized, searchable, and private.",
    description:
      "Library is a self-hostable file manager you can spin up instantly in Docker and scale cleanly as you grow. It handles images, video, PDFs — anything you throw at it — with a local, fine-tuned AI that organizes and finds your files fast and simply. No cloud dependency: your data stays on your server, and stays yours.",
    highlights: [
      "Instant in Docker",
      "Self-hostable",
      "Scales cleanly",
      "Local, private AI",
      "CLI included",
    ],
    features: [
      {
        title: "Everything, in one place",
        body: "Images, video, PDFs and more — one library for every file type you can throw at it.",
      },
      {
        title: "Local AI, fine-tuned",
        body: "A private, on-device model tuned for organizing and retrieving your files fast — no data ever leaves your server.",
      },
      {
        title: "Three-pane workspace",
        body: "Categories on the left, file lists in the center, a live preview of what you opened on the right — everything visible at once.",
      },
      {
        title: "Ask your library",
        body: "An expandable chat in the corner to search, ask and talk about your files in plain language.",
      },
      {
        title: "CLI included",
        body: "Full command-line support for scripting, automation and headless setups.",
      },
      {
        title: "Docker-native & scalable",
        body: "One command to run; designed to scale from a single laptop to a cluster.",
      },
    ],
    stack: ["Docker", "Rust", "TypeScript", "Next.js", "Local AI"],
  },
];

// In development — nothing is listed publicly yet.
export const projects: Project[] = [];

export const hasProjects = projects.length > 0;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

const STATUS_LABEL: Record<ProjectStatus, string> = {
  operational: "Operational",
  beta: "Beta",
  building: "Building",
};

export function statusLabel(status: ProjectStatus): string {
  return STATUS_LABEL[status];
}
