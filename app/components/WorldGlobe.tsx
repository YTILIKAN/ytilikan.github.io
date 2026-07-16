'use client';

import { useEffect, useRef } from 'react';
import { WORLD_POINTS } from '@/lib/worldPoints';

/* -------------------------------------------------------------------------
   WorldGlobe
   Le globe terrestre dessiné par une constellation de triangles, cadré sur
   l'Afrique (en ocre). L'hémisphère avant est net, l'arrière reste fantôme
   pour l'effet de sphère. Léger balancement autour de l'Afrique + graticule.
   Apparition au scroll, pause hors-écran, respect de prefers-reduced-motion.
   ------------------------------------------------------------------------- */

type WorldGlobeProps = {
  className?: string;
  variant?: 'dark' | 'light';
};

const CENTER_LON = 18; // longitude qui fait face au regard (cœur de l'Afrique)
const TILT_X = -0.16; // inclinaison de l'axe (nord légèrement vers le haut)
const SWING = 0.42; // amplitude du balancement (rad, ~24°)
const SWING_MS = 20000; // période du balancement
const REVEAL_MS = 1300;
const DEG = Math.PI / 180;

type Vec = { x: number; y: number; z: number };

export default function WorldGlobe({ className = 'world-globe', variant = 'light' }: WorldGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const colors =
      variant === 'light'
        ? { land: '43, 43, 43', accent: '223, 120, 0', grid: '43, 43, 43' }
        : { land: '250, 249, 246', accent: '255, 167, 38', grid: '250, 249, 246' };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // Vecteurs unitaires de base, cadrés sur CENTER_LON.
    const land = WORLD_POINTS.map(([lon, lat, africa]) => {
      const lo = (lon - CENTER_LON) * DEG;
      const la = lat * DEG;
      const cl = Math.cos(la);
      return {
        v: { x: cl * Math.sin(lo), y: Math.sin(la), z: cl * Math.cos(lo) } as Vec,
        accent: africa === 1,
        size: africa === 1 ? rand(2.6, 3.6) : rand(2.0, 2.9),
        phase: rand(0, Math.PI * 2),
      };
    });

    // Graticule (méridiens + parallèles) échantillonné une fois.
    const graticule: Vec[][] = [];
    const addArc = (fn: (t: number) => [number, number], from: number, to: number, stepDeg: number) => {
      const arc: Vec[] = [];
      for (let d = from; d <= to + 0.001; d += stepDeg) {
        const [lon, lat] = fn(d);
        const lo = (lon - CENTER_LON) * DEG;
        const la = lat * DEG;
        const cl = Math.cos(la);
        arc.push({ x: cl * Math.sin(lo), y: Math.sin(la), z: cl * Math.cos(lo) });
      }
      graticule.push(arc);
    };
    for (let lat = -60; lat <= 60; lat += 30) addArc((lon) => [lon, lat], -180, 180, 6);
    for (let lon = -180; lon < 180; lon += 45) addArc((lat) => [lon, lat], -80, 80, 6);

    // Liens du réseau : voisins proches en distance 3D sur la sphère (fixes,
    // indépendants de la rotation). On ne dessinera que ceux côté avant.
    const LINK3D = 0.1;
    const links: [number, number][] = [];
    for (let i = 0; i < land.length; i++) {
      for (let j = i + 1; j < land.length; j++) {
        const a = land[i].v;
        const b = land[j].v;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        if (dx * dx + dy * dy + dz * dz <= LINK3D * LINK3D) links.push([i, j]);
      }
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let rafId = 0;
    let running = false;
    let revealed = prefersReduced;
    let revealStart = 0;
    let progress = prefersReduced ? 1 : 0;
    const pointer = { x: -9999, y: -9999, active: false };
    const HOVER_R = 120; // rayon d'influence du curseur (px logiques)

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
      R = Math.min(width, height) * 0.46;
    };

    const drawTri = (px: number, py: number, r: number, rot: number, fill: string) => {
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.restore();
    };

    const step = (t: number) => {
      if (revealed && progress < 1) progress = Math.min((t - revealStart) / REVEAL_MS, 1);
      const ease = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1;
      const scale = 0.9 + 0.1 * ease;
      const rr = R * scale;

      const ry = prefersReduced ? 0 : Math.sin((t / SWING_MS) * Math.PI * 2) * SWING;
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosT = Math.cos(TILT_X);
      const sinT = Math.sin(TILT_X);

      const project = (v: Vec) => {
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;
        const y1 = v.y;
        const y2 = y1 * cosT - z1 * sinT;
        const z2 = y1 * sinT + z1 * cosT;
        return { px: cx + rr * x1, py: cy - rr * y2, depth: z2 };
      };

      ctx.clearRect(0, 0, width, height);

      // Disque + limbe.
      ctx.beginPath();
      ctx.arc(cx, cy, rr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors.grid}, ${0.022 * ease})`;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${colors.grid}, ${0.22 * ease})`;
      ctx.stroke();

      // Graticule (segments côté avant uniquement).
      ctx.lineWidth = 0.6;
      for (const arc of graticule) {
        let prev: { px: number; py: number; depth: number } | null = null;
        for (const v of arc) {
          const p = project(v);
          if (prev && prev.depth > 0 && p.depth > 0) {
            const vis = Math.min(prev.depth, p.depth);
            ctx.beginPath();
            ctx.moveTo(prev.px, prev.py);
            ctx.lineTo(p.px, p.py);
            ctx.strokeStyle = `rgba(${colors.grid}, ${0.08 * vis * ease})`;
            ctx.stroke();
          }
          prev = p;
        }
      }

      // Projection de tous les points (réutilisée pour liens + triangles).
      const proj = land.map((n) => project(n.v));

      // Proximité du curseur par point (0 = loin, 1 = sous le curseur).
      const near = proj.map((p) => {
        if (!pointer.active || p.depth <= 0) return 0;
        const d = Math.hypot(p.px - pointer.x, p.py - pointer.y);
        return d < HOVER_R ? 1 - d / HOVER_R : 0;
      });

      // Mailles du réseau (extrémités côté avant uniquement).
      for (const [i, j] of links) {
        const a = proj[i];
        const b = proj[j];
        if (a.depth <= 0 || b.depth <= 0) continue;
        const vis = Math.min(a.depth, b.depth);
        const accent = land[i].accent || land[j].accent;
        const boost = Math.max(near[i], near[j]);
        const base = accent ? 0.26 : 0.13;
        const alpha = (vis * base + boost * 0.5) * ease;
        if (alpha <= 0.01) continue;
        const rgb = accent || boost > 0.05 ? colors.accent : colors.grid;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.lineWidth = accent ? 0.85 : 0.6;
        ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
        ctx.stroke();
      }

      // Liens souris → points proches (rappel du hero).
      if (pointer.active) {
        for (let i = 0; i < proj.length; i++) {
          if (near[i] <= 0) continue;
          const p = proj[i];
          ctx.beginPath();
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.lineWidth = 0.8;
          ctx.strokeStyle = `rgba(${colors.accent}, ${near[i] * 0.45 * ease})`;
          ctx.stroke();
        }
      }

      // Points terrestres (au-dessus des lignes).
      for (let i = 0; i < land.length; i++) {
        const n = land[i];
        const { px, py, depth } = proj[i];
        const front = depth >= 0;
        const alpha = (front ? 0.5 + 0.5 * depth : 0.12 * (1 + depth)) * ease;
        if (alpha <= 0.02) continue;
        const hover = near[i];
        const sizeScale = (front ? 0.7 + 0.45 * depth : 0.6) * (1 + hover * 0.7);
        const rot = t / 7000 + n.phase;
        const accent = n.accent || hover > 0.05;
        const rgb = accent ? colors.accent : colors.land;
        let a = n.accent ? alpha * (front ? 1 : 0.6) : alpha * 0.85;
        a = Math.min(1, a + hover * 0.4);
        drawTri(px, py, n.size * sizeScale, rot, `rgba(${rgb}, ${a})`);
      }
    };

    const loop = (t: number) => {
      step(t);
      if (!prefersReduced) rafId = requestAnimationFrame(loop);
      else running = false;
    };

    const start = () => {
      if (running || prefersReduced) {
        if (prefersReduced) step(0);
        return;
      }
      running = true;
      rafId = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    resize();
    step(0);

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) step(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!revealed) {
            revealed = true;
            revealStart = performance.now();
          }
          start();
        } else {
          stop();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Pointeur (desktop uniquement, pas en reduced-motion).
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (fine && !prefersReduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      canvas.parentElement?.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      canvas.parentElement?.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
