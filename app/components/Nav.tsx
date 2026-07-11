import { NAV_LINKS } from '@/lib/nav';

type NavProps = {
  /** Page d'accueil avec hero sombre ; sinon nav claire pour les sous-pages. */
  variant?: 'home' | 'page';
  /** Section active sur les sous-pages. */
  active?: string;
};

export default function Nav({ variant = 'home', active }: NavProps) {
  const isHome = variant === 'home';

  return (
    <header className={`nav${isHome ? ' nav--hero' : ''}`} id="nav">
      <div className="wrap nav__inner">
        <a href="/" className="nav__brand" aria-label="Y'TILIKAN, accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.jpg" alt="" className="nav__logo nav__logo--light" width={34} height={34} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpeg" alt="" className="nav__logo nav__logo--dark" width={34} height={34} />
          <span className="nav__word">
            Y<span className="apos">&apos;</span>TILIKAN
          </span>
        </a>

        <nav className="nav__links" aria-label="Navigation principale">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              data-section={l.id}
              className={!isHome && active === l.id ? 'is-active' : undefined}
              aria-current={!isHome && active === l.id ? 'page' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href={isHome ? '#participer' : '/#participer'} className="nav__cta">
          Participer
        </a>

        <button
          className="nav__burger"
          aria-label="Menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
          id="burger"
        >
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="nav__mobile" id="mobile-menu" hidden>
        {NAV_LINKS.map((l) => (
          <a
            key={l.id}
            href={l.href}
            className={`nav__mobile-link${!isHome && active === l.id ? ' is-active' : ''}`}
            data-section={l.id}
            aria-current={!isHome && active === l.id ? 'page' : undefined}
          >
            {l.label}
          </a>
        ))}
        <a href={isHome ? '#participer' : '/#participer'} className="nav__mobile-link nav__mobile-cta">
          Participer
        </a>
      </div>
    </header>
  );
}
