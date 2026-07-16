'use client';

import { useEffect, useRef } from 'react';
import { AFRICA_ASPECT, AFRICA_EDGE, AFRICA_INTERIOR } from '@/lib/africaPoints';

/* -------------------------------------------------------------------------
   AfricaMap
   Silhouette de l'Afrique dessinée par une constellation de triangles reliés.
   Les points de côte (edge) sont en ocre, l'intérieur en teinte neutre.
   Apparition progressive au scroll, légère dérive, pause hors-écran.
   ------------------------------------------------------------------------- */

type AfricaMapProps = {
  className?: string;
  variant?: 'dark' | 'light';
};

type Node = {
  bx: number; // base normalisé 0..1
  by: number;
  phase: number;
  amp: number;
  size: number;
  accent: boolean;
  order: number; // ordre d'apparition 0..1
};

const LINK_DIST = 0.05; // seuil de connexion en coords normalisées
const PAD = 0.08; // marge relative

export default function AfricaMap({ className = 'africa-map', variant = 'light' }: AfricaMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const colors =
      variant === 'light'
        ? { line: '43, 43, 43', node: '43, 43, 43', accent: '240, 138, 0' }
        : { line: '250, 249, 246', node: '250, 249, 246', accent: '255, 167, 38' };

    // Construction des nœuds (côte = accent, intérieur = neutre).
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const raw: { x: number; y: number; accent: boolean }[] = [
      ...AFRICA_INTERIOR.map(([x, y]) => ({ x, y, accent: false })),
      ...AFRICA_EDGE.map(([x, y]) => ({ x, y, accent: true })),
    ];
    // Ordre d'apparition : de haut en bas (nord → sud).
    const sorted = [...raw].sort((a, b) => a.y - b.y);
    const nodes: Node[] = sorted.map((p, i) => ({
      bx: p.x,
      by: p.y,
      phase: rand(0, Math.PI * 2),
      amp: prefersReduced ? 0 : rand(0.002, 0.006),
      size: p.accent ? rand(3.2, 4.6) : rand(2.6, 3.8),
      accent: p.accent,
      order: i / sorted.length,
    }));

    // Connexions précalculées (positions de base fixes).
    const links: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = (nodes[i].bx - nodes[j].bx) * AFRICA_ASPECT;
        const dy = nodes[i].by - nodes[j].by;
        if (Math.hypot(dx, dy) <= LINK_DIST) links.push([i, j]);
      }
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let offX = 0;
    let offY = 0;
    let drawW = 0;
    let drawH = 0;
    let rafId = 0;
    let running = false;
    let progress = prefersReduced ? 1 : 0;
    let revealStart = 0;
    let revealed = prefersReduced;
    const REVEAL_MS = 1400;

    const layout = () => {
      const contentAspect = AFRICA_ASPECT; // largeur / hauteur
      const boxW = width * (1 - PAD * 2);
      const boxH = height * (1 - PAD * 2);
      if (boxW / boxH > contentAspect) {
        drawH = boxH;
        drawW = drawH * contentAspect;
      } else {
        drawW = boxW;
        drawH = drawW / contentAspect;
      }
      offX = (width - drawW) / 2;
      offY = (height - drawH) / 2;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    };

    const pos = (n: Node, t: number) => {
      const wobble = n.amp;
      const x = n.bx + Math.sin(t / 1600 + n.phase) * wobble;
      const y = n.by + Math.cos(t / 1900 + n.phase) * wobble;
      return { px: offX + x * drawW, py: offY + y * drawH };
    };

    const drawTri = (px: number, py: number, r: number, rot: number, fill: string, stroke?: string) => {
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
      if (stroke) {
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = stroke;
        ctx.stroke();
      } else {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      ctx.restore();
    };

    const step = (t: number) => {
      if (revealed && progress < 1) {
        progress = Math.min((t - revealStart) / REVEAL_MS, 1);
      }
      ctx.clearRect(0, 0, width, height);
      const cache = nodes.map((n) => pos(n, t));

      // Liens.
      for (const [i, j] of links) {
        const a = nodes[i];
        const b = nodes[j];
        const vis = Math.min(nodeAlpha(a), nodeAlpha(b));
        if (vis <= 0) continue;
        const accent = a.accent || b.accent;
        const rgb = accent ? colors.accent : colors.line;
        ctx.beginPath();
        ctx.moveTo(cache[i].px, cache[i].py);
        ctx.lineTo(cache[j].px, cache[j].py);
        ctx.lineWidth = accent ? 0.8 : 0.6;
        ctx.strokeStyle = `rgba(${rgb}, ${vis * (accent ? 0.35 : 0.16)})`;
        ctx.stroke();
      }

      // Triangles.
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const a = nodeAlpha(n);
        if (a <= 0) continue;
        const { px, py } = cache[i];
        const rot = t / 6000 + n.phase;
        if (n.accent) {
          drawTri(px, py, n.size, rot, `rgba(${colors.accent}, ${a * 0.95})`);
        } else {
          drawTri(px, py, n.size, rot, '', `rgba(${colors.node}, ${a * 0.6})`);
        }
      }
    };

    // Apparition échelonnée : chaque nœud se révèle selon son ordre.
    const nodeAlpha = (n: Node) => {
      if (progress >= 1) return 1;
      const local = (progress - n.order * 0.7) / 0.3;
      return Math.max(0, Math.min(1, local));
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

    // Révélation au scroll + pause hors-écran.
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

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
