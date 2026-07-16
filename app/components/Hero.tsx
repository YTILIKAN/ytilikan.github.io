import { SITE } from '@/lib/site';
import HeroNetwork from './HeroNetwork';

export default function Hero() {
  return (
    <header className="cover" id="top">
      <HeroNetwork />
      <div className="cover__overlay" aria-hidden="true"></div>

      <div className="wrap cover__inner">
        <div className="cover__content">
          <p className="cover__eyebrow reveal" data-delay="40">
            <svg viewBox="0 0 12 14" width="11" height="13" aria-hidden="true">
              <path fill="currentColor" d="M0 0 12 7 0 14Z" />
            </svg>
            Tech &amp; IA · Afrique francophone
          </p>

          <h1 className="cover__headline reveal" data-delay="80" data-scramble>Le savoir, en réseau.{'\n'}Pour toute l’Afrique.</h1>

          <p className="cover__hook reveal" data-delay="160">
            <em>«&nbsp;Ce n’est pas sorcier.&nbsp;»</em>
          </p>

          <p className="cover__sub reveal" data-delay="240">
            Une communauté qui relie les talents, le code ouvert et la connaissance. Gratuit, en
            français.
          </p>

          <p className="cover__proof reveal" data-delay="320">
            <a
              href={SITE.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cover__proof-link"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"
                />
              </svg>
              Émissions, débats et formations, en français, pour l’Afrique.
            </a>
          </p>

          <div className="cover__cta reveal" data-delay="400">
            <a href="/emissions" className="btn btn--gold">
              Voir les émissions
            </a>
            <a href="/participer" className="cover__cta-secondary">
              Comment participer
            </a>
          </div>
        </div>
      </div>

      <a href="#essence" className="cover__scroll" aria-label="Défiler vers le contenu">
        <span>Découvrir</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </header>
  );
}
