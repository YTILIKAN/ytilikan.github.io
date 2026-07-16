'use client';

import { useEffect, useRef } from 'react';

/* -------------------------------------------------------------------------
   HeroNetwork
   Réseau de triangles flottants relié par des lignes (« le savoir en réseau »).
   Inspiré des constellations de particules triangulaires : nœuds qui dérivent
   lentement, se connectent quand ils sont proches, chacun marqué d'un petit
   triangle contour. Une minorité de nœuds « accent » sont en ocre.

   - Canvas 2D, DPR-aware, ResizeObserver.
   - Respecte prefers-reduced-motion (rend une frame statique, sans boucle).
   - Se met en pause quand l'onglet est masqué ou le hero hors-écran.
   ------------------------------------------------------------------------- */

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vrot: number;
  accent: boolean;
};

const LINK_DIST = 168; // distance max de connexion (px logiques)
const ACCENT_RATIO = 0.16; // part de nœuds ocre
const DENSITY = 1 / 15500; // nœuds par px² (borné plus bas)

type HeroNetworkProps = {
  className?: string;
  /** Multiplicateur de densité (1 = hero, <1 = plus aéré pour sections secondaires). */
  densityScale?: number;
  /** 'dark' = triangles clairs sur fond sombre ; 'light' = triangles sombres sur fond clair. */
  variant?: 'dark' | 'light';
};

export default function HeroNetwork({
  className = 'cover__net',
  densityScale = 1,
  variant = 'dark',
}: HeroNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const colors =
      variant === 'light'
        ? {
            line: '43, 43, 43', // charbon
            node: '43, 43, 43',
            accent: '240, 138, 0', // ocre foncé
          }
        : {
            line: '250, 249, 246', // ivoire
            node: '250, 249, 246',
            accent: '255, 167, 38', // ocre
          };
    const alphaScale = variant === 'light' ? 0.55 : 1;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let rafId = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999, active: false };

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const buildNodes = () => {
      const target = Math.round(width * height * DENSITY * densityScale);
      const count = Math.max(16, Math.min(84, target));
      nodes = Array.from({ length: count }, () => {
        const speed = prefersReduced ? 0 : rand(0.08, 0.28);
        const angle = rand(0, Math.PI * 2);
        return {
          x: rand(0, width),
          y: rand(0, height),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: rand(3.5, 8),
          rot: rand(0, Math.PI * 2),
          vrot: prefersReduced ? 0 : rand(-0.004, 0.004),
          accent: Math.random() < ACCENT_RATIO,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const drawTriangle = (n: Node, alpha: number) => {
      const r = n.size;
      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate(n.rot);
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      const rgb = n.accent ? colors.accent : colors.node;
      if (n.accent) {
        ctx.fillStyle = `rgba(${rgb}, ${alpha * 0.9 * alphaScale})`;
        ctx.fill();
      } else {
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = `rgba(${rgb}, ${alpha * alphaScale})`;
        ctx.stroke();
      }
      ctx.restore();
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      // Déplacement + rebond doux sur les bords.
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.rot += n.vrot;
        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        else if (n.y > height + 20) n.y = -20;
      }

      // Connexions.
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DIST) continue;
          const t = 1 - dist / LINK_DIST;
          const accent = a.accent || b.accent;
          const rgb = accent ? colors.accent : colors.line;
          const alpha = t * (accent ? 0.32 : 0.2) * alphaScale;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineWidth = accent ? 0.9 : 0.7;
          ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
          ctx.stroke();
        }

        // Lien vers le curseur (interaction douce).
        if (pointer.active) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST * 1.4) {
            const t = 1 - dist / (LINK_DIST * 1.4);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = `rgba(${colors.accent}, ${t * 0.4})`;
            ctx.stroke();
          }
        }
      }

      // Triangles (au-dessus des lignes).
      for (const n of nodes) {
        drawTriangle(n, n.accent ? 0.85 : 0.55);
      }
    };

    const loop = () => {
      step();
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || prefersReduced) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    resize();
    step(); // première frame immédiate (utile aussi en reduced-motion)
    start();

    // Redimensionnement.
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    // Pause hors-écran.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    // Pause onglet masqué.
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Pointeur (desktop uniquement, pas en reduced-motion).
    const onPointerMove = (e: PointerEvent) => {
      if (prefersReduced) return;
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
  }, [densityScale, variant]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
