# BAZALTHQ — Website & Design System

Brutalist, matte, basalt-dark marketing site + a reusable design system for
every future BAZALTHQ page and app. Built to deploy on Vercel.

## Stack

- **Next.js 15** (App Router, TypeScript) — native Vercel hosting, built-in
  routing & 404, static prerender.
- **Tailwind CSS v4** — design tokens exposed as utilities via `@theme`.
- **Motion** (`motion/react`) — micro-interactions, directional hover, panels.
- **Fonts:** Space Grotesk (display/body) + JetBrains Mono (micro-labels).

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Deploy: import the repo on Vercel (root = this `website/` folder). Zero config.

## Design system (reuse this everywhere)

All tokens live in [`src/app/globals.css`](src/app/globals.css). **Never
hardcode a hex value in a component** — use the tokens.

### Color tokens → Tailwind utilities

| Token (CSS var)        | Utility            | Use                                   |
| ---------------------- | ------------------ | ------------------------------------- |
| `--bhq-bg`             | `bg-bg`            | near-black ground                     |
| `--bhq-bg-sink`        | `bg-bg-sink`       | deepest ground (footer)               |
| `--bhq-surface[-2/-3]` | `bg-surface[-2/-3]`| raised panels                         |
| `--bhq-ink`            | `text-ink`         | egg-white primary text                |
| `--bhq-ink-dim`        | `text-ink-dim`     | beige-grey secondary                  |
| `--bhq-ink-mute`       | `text-ink-mute`    | muted labels                          |
| `--bhq-ink-faint`      | `text-ink-faint`   | faint / disabled                      |
| `--bhq-line[-strong]`  | `border-line[-strong]` | hairline structure                |
| `--bhq-signal`         | `bg-signal` etc.   | operational / warn / down             |

Radii: `rounded-[var(--radius-xs..lg)]` (sharp by default; only the nav island
is slightly rounded). Motion: `--bhq-ease`, `--bhq-dur*`.

### CSS primitives

- `.bhq-label` — mono, wide-tracked micro-caps label.
- `.bhq-display` — tight uppercase display heading.
- `.bhq-grid-lines` — graph-paper backdrop (`--cell` controls spacing).
- `.bhq-grain` — fine matte film grain (needs `position: relative`).
- `.bhq-swipe` — directional hover fill (CSS-only variant).

### React primitives (`src/components/ui`)

- `DirectionalLink` — link whose fill wipes in from the cursor's entry edge.
- `MagneticButton` — magnetic pull toward the pointer (`solid` / `ghost`).
- `Logo`, `BackToTop`.

## Content — single sources of truth (no mock data)

| File                          | Drives                                   |
| ----------------------------- | ---------------------------------------- |
| `src/content/site.ts`         | brand name, tagline, contact, socials    |
| `src/content/projects.ts`     | the apps we build (empty → "in development") |
| `src/content/nav.ts`          | navbar triggers + mega-menu columns      |
| `src/content/routes.ts`       | site index used by the 404 search        |

### Add a project

Append to `projects` in `src/content/projects.ts`. It appears automatically in
the mega-menu and `/status`. No placeholders — an empty list renders an honest
in-development state.

### Add a page

1. Create `src/app/<name>/page.tsx` (reuse `Navbar` + `Footer`).
2. Add a row to `src/content/routes.ts` so the 404 search can find it.
3. Optionally add a link in `src/content/nav.ts`.

## Routing & 404

`src/app/not-found.tsx` catches every unknown URL, shows the requested path, and
offers a search that only ever returns **real** routes from `routes.ts`.
