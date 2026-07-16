import Symbols from './Symbols';
import Nav from './Nav';
import ClientScripts from './ClientScripts';
import type { NavLinkId } from '@/lib/nav';

type PageShellProps = {
  active: NavLinkId;
  children: React.ReactNode;
};

export default function PageShell({ active, children }: PageShellProps) {
  return (
    <>
      <Symbols />
      <Nav variant="page" active={active} />
      <main id="main" className="page-main">
        {children}
      </main>
      <footer className="page-footer">
        <div className="wrap page-footer__inner">
          <a href="/" className="page-footer__brand">
            Y<span className="apos">’</span>TILIKAN
          </a>
          <a href="/#contact" className="page-footer__cta">
            Nous écrire
          </a>
        </div>
      </footer>
      <ClientScripts />
    </>
  );
}
