"use client";

/**
 * BASALT FRACTURE — the site's signature backdrop.
 *
 * A faint angular fracture network (cracked basalt). The mesh is built to a
 * FIXED pixel cell size measured against the container, so cells are the same
 * size on every page — no more giant shapes on tall pages, tiny ones on short
 * ones. Near the cursor the fragments rise out of the surface (wireframe
 * extrusion), local (Gaussian falloff) and eased in/out.
 *
 * Colour comes from `currentColor`; drive it with a text-* utility and a mask.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const CELL = 340; // target cell size (px) — consistent everywhere
const JITTER = 0.32;
const RADIUS = 240; // cursor influence (px)
const LIFT = 46; // peak rise (px)
const EASE = 0.14;

function hash(i: number, j: number, s: number) {
  const x = Math.sin(i * 127.1 + j * 311.7 + s * 74.7) * 43758.5453;
  return x - Math.floor(x);
}

interface Mesh {
  w: number;
  h: number;
  vx: number[];
  vy: number[];
  cells: { v: [number, number, number, number]; cx: number; cy: number }[];
  ambient: string;
}

function buildMesh(w: number, h: number): Mesh {
  const cols = Math.max(2, Math.round(w / CELL));
  const rows = Math.max(2, Math.round(h / CELL));
  const cw = w / cols;
  const ch = h / rows;
  const jx = cw * JITTER;
  const jy = ch * JITTER;
  const vidx = (i: number, j: number) => j * (cols + 1) + i;

  const vx: number[] = [];
  const vy: number[] = [];
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= cols; i++) {
      const idx = vidx(i, j);
      vx[idx] = i * cw + (hash(i, j, 1) - 0.5) * 2 * jx;
      vy[idx] = j * ch + (hash(i, j, 2) - 0.5) * 2 * jy;
    }
  }

  let ambient = "";
  const edge = (a: number, b: number) => {
    ambient += `M${vx[a].toFixed(1)} ${vy[a].toFixed(1)}L${vx[b].toFixed(1)} ${vy[b].toFixed(1)}`;
  };
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= cols; i++) {
      if (i < cols) edge(vidx(i, j), vidx(i + 1, j));
      if (j < rows) edge(vidx(i, j), vidx(i, j + 1));
      if (i < cols && j < rows) {
        const hh = hash(i, j, 3);
        if (hh > 0.72) edge(vidx(i, j), vidx(i + 1, j + 1));
        else if (hh > 0.42) edge(vidx(i + 1, j), vidx(i, j + 1));
      }
    }
  }

  const cells: Mesh["cells"] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const a = vidx(i, j);
      const b = vidx(i + 1, j);
      const c = vidx(i + 1, j + 1);
      const d = vidx(i, j + 1);
      cells.push({
        v: [a, b, c, d],
        cx: (vx[a] + vx[b] + vx[c] + vx[d]) / 4,
        cy: (vy[a] + vy[b] + vy[c] + vy[d]) / 4,
      });
    }
  }

  return { w, h, vx, vy, cells, ambient };
}

export function BasaltLines({
  className = "",
  ambient = 0.1,
}: {
  className?: string;
  ambient?: number;
}) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const topRef = useRef<SVGPathElement>(null);
  const sideRef = useRef<SVGPathElement>(null);
  const meshRef = useRef<Mesh | null>(null);
  const [mesh, setMesh] = useState<Mesh | null>(null);
  const cur = useRef<number[]>([]);
  const cursor = useRef({ x: 0, y: 0, active: false });
  const raf = useRef(0);

  // Measure the container and (re)build the mesh at a fixed cell size.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (w < 2 || h < 2) return;
      const m = meshRef.current;
      if (m && m.w === w && m.h === h) return;
      const next = buildMesh(w, h);
      meshRef.current = next;
      cur.current = new Array(next.cells.length).fill(0);
      setMesh(next);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Cursor-driven local extrusion.
  useEffect(() => {
    if (reduce) return;
    const tick = () => {
      const m = meshRef.current;
      if (!m) {
        raf.current = 0;
        return;
      }
      const C = cur.current;
      const { x: mx, y: my, active } = cursor.current;
      let moving = false;
      let topD = "";
      let sideD = "";
      for (let k = 0; k < m.cells.length; k++) {
        const cell = m.cells[k];
        let target = 0;
        if (active) {
          const dx = cell.cx - mx;
          const dy = cell.cy - my;
          target = Math.exp(-(dx * dx + dy * dy) / (RADIUS * RADIUS));
        }
        const next = C[k] + (target - C[k]) * EASE;
        if (Math.abs(target - next) > 0.004) moving = true;
        C[k] = next;
        if (next < 0.012) continue;
        const L = LIFT * next;
        const [a, b, c, d] = cell.v;
        const { vx, vy } = m;
        topD +=
          `M${vx[a].toFixed(1)} ${(vy[a] - L).toFixed(1)}` +
          `L${vx[b].toFixed(1)} ${(vy[b] - L).toFixed(1)}` +
          `L${vx[c].toFixed(1)} ${(vy[c] - L).toFixed(1)}` +
          `L${vx[d].toFixed(1)} ${(vy[d] - L).toFixed(1)}Z`;
        for (const n of cell.v) {
          sideD += `M${vx[n].toFixed(1)} ${vy[n].toFixed(1)}L${vx[n].toFixed(1)} ${(vy[n] - L).toFixed(1)}`;
        }
      }
      if (topRef.current) topRef.current.setAttribute("d", topD);
      if (sideRef.current) sideRef.current.setAttribute("d", sideD);
      raf.current = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const el = svgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      cursor.current.x = e.clientX - r.left;
      cursor.current.y = e.clientY - r.top;
      cursor.current.active = true;
      kick();
    };
    const onLeave = () => {
      cursor.current.active = false;
      kick();
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduce]);

  return (
    <svg
      ref={svgRef}
      viewBox={mesh ? `0 0 ${mesh.w} ${mesh.h}` : undefined}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      {mesh && (
        <>
          <path
            d={mesh.ambient}
            fill="none"
            stroke="currentColor"
            strokeOpacity={ambient}
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={sideRef}
            d=""
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.26}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={topRef}
            d=""
            fill="currentColor"
            fillOpacity={0.06}
            stroke="currentColor"
            strokeOpacity={0.6}
            strokeWidth={1}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </>
      )}
    </svg>
  );
}
