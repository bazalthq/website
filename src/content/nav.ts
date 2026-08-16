/**
 * NAVIGATION MODEL — drives the island navbar and its directional mega-menu.
 * Top-level triggers open one shared mega panel of columns + a contact card.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Short right-aligned note, e.g. "soon". */
  note?: string;
  /** Non-navigating placeholder for a surface not built yet. */
  soon?: boolean;
  external?: boolean;
}

export interface NavColumn {
  id: string;
  /** Mono micro-label above the column. */
  kicker: string;
  links: NavLink[];
}

/** Visible items in the island; hovering any opens the mega panel. */
export const navTriggers: { id: string; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "company", label: "Company" },
  { id: "platform", label: "Platform" },
];

/**
 * Columns rendered inside the mega panel. The "projects" column is populated
 * from the projects dataset at render time (empty → honest in-development note),
 * so it is intentionally left without static links here.
 */
export const navColumns: NavColumn[] = [
  {
    id: "company",
    kicker: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    id: "platform",
    kicker: "Platform",
    links: [
      { label: "Status", href: "/status" },
      { label: "Design system", href: "/design" },
      { label: "Changelog", href: "/changelog", soon: true },
    ],
  },
];
