"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { DirectionalLink } from "@/components/ui/DirectionalLink";
import { searchRoutes } from "@/content/routes";

export function NotFoundSearch() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchRoutes(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <div className="w-full max-w-xl">
      {/* attempted path */}
      <p className="bhq-label mb-6 break-all text-ink-mute">
        Requested&nbsp;·&nbsp;
        <span className="text-ink-dim">{pathname}</span>
      </p>

      {/* search field — deliberate bordered box; focus brightens the frame */}
      <label className="group flex items-center gap-3 rounded-[var(--radius-sm)] border border-line-strong bg-surface/40 px-4 py-3 transition-colors focus-within:border-ink">
        <span aria-hidden className="text-ink-mute">
          ⌕
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a page…"
          aria-label="Search the site"
          style={{ outline: "none" }}
          className="w-full bg-transparent font-mono text-[0.95rem] text-ink placeholder:text-ink-faint"
        />
      </label>

      {/* results — absolutely positioned so they never affect the layout;
          the field above cannot shift (vertically or horizontally) while typing */}
      <div className="relative mt-6">
        <div className="absolute inset-x-0 top-0">
        <AnimatePresence mode="wait">
          {!searching ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[0.9rem] text-ink-mute"
            >
              Type to find an existing page, or head back to the start.
            </motion.p>
          ) : results.length > 0 ? (
            <motion.ul
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col divide-y divide-line"
            >
              {results.map((r) => (
                <li key={r.path}>
                  <DirectionalLink
                    href={r.path}
                    className="w-full items-baseline justify-between px-2 py-3"
                  >
                    <span className="flex w-full items-baseline justify-between gap-4">
                      <span className="text-[1rem]">{r.title}</span>
                      <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] opacity-60">
                        {r.path}
                      </span>
                    </span>
                  </DirectionalLink>
                </li>
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 text-[0.95rem] text-ink-dim"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-signal-down" />
              No page found for &ldquo;{query.trim()}&rdquo;.
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
