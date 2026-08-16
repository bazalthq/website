/**
 * SITE INDEX — every real, navigable route. The 404 search reads from this,
 * so it can only ever return pages that actually exist (no fabricated hits).
 * Add a row when you add a page.
 */

export interface RouteEntry {
  title: string;
  path: string;
  description: string;
  keywords?: string[];
}

export const routes: RouteEntry[] = [
  {
    title: "Home",
    path: "/",
    description: "The BAZALTHQ landing page.",
    keywords: ["start", "index", "landing"],
  },
  {
    title: "Projects",
    path: "/projects",
    description: "The apps BAZALTHQ is building.",
    keywords: ["apps", "products", "library", "work"],
  },
  {
    title: "Status",
    path: "/status",
    description: "Live status of BAZALTHQ services and projects.",
    keywords: ["uptime", "incidents", "systems", "health"],
  },
  {
    title: "Design system",
    path: "/design",
    description: "Foundations, tokens and components of the BAZALTHQ design system.",
    keywords: ["tokens", "typography", "color", "components", "brand"],
  },
  {
    title: "About",
    path: "/about",
    description: "Why BAZALTHQ exists, what we build, and the stack we use.",
    keywords: ["company", "services", "mission", "stack", "hosting", "security"],
  },
  {
    title: "Blog",
    path: "/blog",
    description: "Announcements and perspective from BAZALTHQ.",
    keywords: ["news", "posts", "articles", "writing"],
  },
  {
    title: "Contact",
    path: "/contact",
    description: "Start a project with BAZALTHQ, or just say hello.",
    keywords: ["email", "get in touch", "hire", "enquiry", "reach"],
  },
];

export function searchRoutes(query: string): RouteEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return routes.filter((r) => {
    const hay = [r.title, r.path, r.description, ...(r.keywords ?? [])]
      .join(" ")
      .toLowerCase();
    return q.split(/\s+/).every((term) => hay.includes(term));
  });
}
