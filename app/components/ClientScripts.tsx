'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function ClientScripts() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* —————————————————————— Smooth scroll (Lenis) —————————————————————— */
    let lenis: Lenis | null = null;
    if (!prefersReduced) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      let rafId = 0;
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      const navH =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
          10
        ) || 68;

      const onAnchorClick = (e: MouseEvent) => {
        const link = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!link) return;
        const hash = link.getAttribute('href');
        if (!hash || hash === '#') return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        lenis?.scrollTo(target as HTMLElement, { offset: -(navH + 12) });
      };
      document.addEventListener('click', onAnchorClick);

      cleanups.push(() => {
        cancelAnimationFrame(rafId);
        document.removeEventListener('click', onAnchorClick);
        lenis?.destroy();
      });
    }

    /* —————————————————————— Reveal on scroll —————————————————————— */
    {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduce && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                const el = e.target as HTMLElement;
                const delay = el.dataset.delay;
                if (delay) el.style.transitionDelay = delay + 'ms';
                el.classList.add('in');
                io.unobserve(el);
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -4% 0px' }
        );
        document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
          if (el.dataset.delay) {
            io.observe(el);
            return;
          }
          const children = el.querySelectorAll<HTMLElement>(':scope > *');
          if (children.length > 1) {
            children.forEach((child, i) => {
              child.style.transitionDelay = i * 60 + 'ms';
              child.classList.add('reveal');
              io.observe(child);
            });
            el.classList.add('in');
          } else {
            io.observe(el);
          }
        });
        cleanups.push(() => io.disconnect());
      } else {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      }
    }

    /* —————————————————————— Text scramble / decode —————————————————————— */
    {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*<>/{}[]';
      const isStatic = (ch: string) => /[\s'’.,!?:;—–-]/.test(ch);

      /* Decode léger : seuls ~35 % des lettres « glitchent », durée courte. */
      const scramble = (el: HTMLElement) => {
        const text = el.dataset.text ?? el.textContent ?? '';
        el.dataset.text = text;
        const chars = Array.from(text);
        const duration = 620;
        const start = performance.now();
        const scrambleIdx = new Set<number>();
        chars.forEach((ch, i) => {
          if (!isStatic(ch) && Math.random() < 0.35) scrambleIdx.add(i);
        });

        const tick = (now: number) => {
          const elapsed = now - start;
          let out = '';
          let settled = true;
          chars.forEach((ch, i) => {
            if (isStatic(ch) || !scrambleIdx.has(i)) {
              out += ch;
              return;
            }
            const revealAt = (i / chars.length) * duration * 0.55;
            if (elapsed >= revealAt + 90) {
              out += ch;
            } else {
              out += glyphs[(Math.random() * glyphs.length) | 0];
              settled = false;
            }
          });
          el.textContent = out;
          if (!settled) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = text;
          }
        };
        requestAnimationFrame(tick);
      };

      const targets = document.querySelectorAll<HTMLElement>('[data-scramble]');
      if (!reduce) {
        targets.forEach((el) => {
          const delay = parseInt(el.dataset.delay ?? '0', 10);
          const timer = window.setTimeout(() => scramble(el), delay + 80);
          cleanups.push(() => window.clearTimeout(timer));
        });
      }
    }

    /* —————————————————————— Nav —————————————————————— */
    {
      const nav = document.getElementById('nav');
      const hero = document.getElementById('top');

      const onScroll = () => {
        nav?.classList.toggle('scrolled', window.scrollY > 24);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      cleanups.push(() => window.removeEventListener('scroll', onScroll));

      if (hero && nav) {
        const navH =
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h').trim() || '68px';
        const heroObserver = new IntersectionObserver(
          ([entry]) => nav.classList.toggle('nav--hero', entry.isIntersecting),
          { threshold: 0, rootMargin: `-${navH} 0px 0px 0px` }
        );
        heroObserver.observe(hero);
        cleanups.push(() => heroObserver.disconnect());
      } else if (nav && !hero) {
        nav.classList.remove('nav--hero');
      }

      /* Scroll-spy uniquement sur l'accueil (ancres #section). */
      if (hero) {
        const sectionIds = [
          'essence',
          'participer',
          'programmes',
          'emissions',
          'projets',
          'equipe',
          'faq',
          'contact',
        ];
        const navLinks = document.querySelectorAll('[data-section]');

        const sectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const id = entry.target.id;
              navLinks.forEach((link) => {
                link.classList.toggle('is-active', link.getAttribute('data-section') === id);
              });
            });
          },
          { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );
        sectionIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) sectionObserver.observe(el);
        });
        cleanups.push(() => sectionObserver.disconnect());
      }

      const burger = document.getElementById('burger');
      const menu = document.getElementById('mobile-menu');
      const onBurger = () => {
        const open = menu?.classList.toggle('open');
        menu?.toggleAttribute('hidden', !open);
        burger?.setAttribute('aria-expanded', open ? 'true' : 'false');
      };
      burger?.addEventListener('click', onBurger);
      cleanups.push(() => burger?.removeEventListener('click', onBurger));

      const menuLinks = menu?.querySelectorAll('a') ?? [];
      const onMenuLink = () => {
        menu?.classList.remove('open');
        menu?.setAttribute('hidden', '');
        burger?.setAttribute('aria-expanded', 'false');
      };
      menuLinks.forEach((a) => a.addEventListener('click', onMenuLink));
      cleanups.push(() =>
        menuLinks.forEach((a) => a.removeEventListener('click', onMenuLink))
      );
    }

    /* —————————————————————— Stats counters —————————————————————— */
    {
      const formatStatValue = (n: number, display?: string) => display ?? String(n);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll<HTMLElement>('.stat__n[data-target]').forEach((el) => {
          const target = parseInt(el.dataset.target ?? '0', 10);
          const display = el.dataset.display;
          const isPct = el
            .closest('.stat')
            ?.querySelector('.stat__label')
            ?.textContent?.includes('%');
          el.textContent = isPct ? target + '%' : formatStatValue(target, display);
        });
      } else {
        const counters = document.querySelectorAll<HTMLElement>('.stat__n[data-target]');
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              const target = parseInt(el.dataset.target ?? '0', 10);
              const display = el.dataset.display;
              const isPct = el.textContent?.includes('%') ?? false;
              const duration = 1400;
              const start = performance.now();
              const tick = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(target * eased);
                el.textContent = isPct
                  ? current + '%'
                  : progress >= 1 && display
                    ? display
                    : String(current);
                if (progress < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
              observer.unobserve(el);
            });
          },
          { threshold: 0.4 }
        );
        counters.forEach((c) => observer.observe(c));
        cleanups.push(() => observer.disconnect());
      }
    }

    /* —————————————————————— Essence constellation —————————————————————— */
    {
      const constellation = document.getElementById('values-constellation');
      if (constellation) {
        const io = new IntersectionObserver(
          ([entry], obs) => {
            if (entry.isIntersecting) {
              constellation.classList.add('is-visible');
              obs.disconnect();
            }
          },
          { threshold: 0.3 }
        );
        io.observe(constellation);
        cleanups.push(() => io.disconnect());
      }
    }

    /* —————————————————————— Contact form —————————————————————— */
    {
      const form = document.getElementById('contact-form') as HTMLFormElement | null;
      if (form) {
        const status = form.querySelector('.cform__status') as HTMLElement | null;
        const submit = form.querySelector('.cform__submit') as HTMLButtonElement | null;
        const key = form.dataset.key ?? '';

        const setStatus = (msg: string, state: '' | 'is-success' | 'is-error') => {
          if (!status) return;
          status.textContent = msg;
          status.classList.remove('is-success', 'is-error');
          if (state) status.classList.add(state);
        };

        const onSubmit = async (e: SubmitEvent) => {
          e.preventDefault();

          if (!key || key === 'YOUR_WEB3FORMS_ACCESS_KEY') {
            setStatus(
              "Le formulaire n'est pas encore activé. Écris-nous par email en attendant.",
              'is-error'
            );
            return;
          }

          const data = Object.fromEntries(new FormData(form).entries());
          if (submit) {
            submit.disabled = true;
            submit.textContent = 'Envoi…';
          }
          setStatus('', '');

          try {
            const res = await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify(data),
            });
            const result = await res.json();
            if (res.ok && result.success) {
              form.reset();
              setStatus('Message envoyé, merci. On revient vers toi rapidement.', 'is-success');
            } else {
              setStatus("L'envoi a échoué. Réessaie ou écris-nous par email.", 'is-error');
            }
          } catch {
            setStatus('Problème de connexion. Réessaie ou écris-nous par email.', 'is-error');
          } finally {
            if (submit) {
              submit.disabled = false;
              submit.textContent = 'Envoyer le message';
            }
          }
        };

        form.addEventListener('submit', onSubmit);
        cleanups.push(() => form.removeEventListener('submit', onSubmit));
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
