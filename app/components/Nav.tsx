const links = [
  { href: '#essence', label: 'Essence', id: 'essence' },
  { href: '#participer', label: 'Participer', id: 'participer' },
  { href: '#emissions', label: 'Émissions', id: 'emissions' },
  { href: '#programmes', label: 'Programmes', id: 'programmes' },
  { href: '#projets', label: 'Projets', id: 'projets' },
  { href: '#equipe', label: 'Équipe', id: 'equipe' },
  { href: '#faq', label: 'FAQ', id: 'faq' },
];

export default function Nav() {
  return (
    <header className="nav nav--hero" id="nav">
      <div className="wrap nav__inner">
        <a href="#top" className="nav__brand" aria-label="Y'TILIKAN, accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.jpg" alt="" className="nav__logo nav__logo--light" width={34} height={34} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpeg" alt="" className="nav__logo nav__logo--dark" width={34} height={34} />
          <span className="nav__word">
            Y<span className="apos">&apos;</span>TILIKAN
          </span>
        </a>

        <nav className="nav__links" aria-label="Navigation principale">
          {links.map((l) => (
            <a key={l.id} href={l.href} data-section={l.id}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav__cta">
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
        {links.map((l) => (
          <a key={l.id} href={l.href} className="nav__mobile-link" data-section={l.id}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="nav__mobile-link nav__mobile-cta">
          Participer
        </a>
      </div>
    </header>
  );
}
