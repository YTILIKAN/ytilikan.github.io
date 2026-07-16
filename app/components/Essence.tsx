import type { CSSProperties } from 'react';
import WorldGlobe from './WorldGlobe';

const missionAxes = [
  {
    title: 'Informer',
    body: 'Émissions et débats sur ce que la tech change, ici et sur le continent.',
    href: '/emissions',
  },
  {
    title: 'Former',
    body: 'Contenus concrets et gratuits, du débutant à l’initié.',
    href: '/programmes',
  },
  {
    title: 'Partager',
    body: 'Code et données ouverts, réutilisables par tous.',
    href: '/projets',
  },
  {
    title: 'Valoriser',
    body: 'La parole aux talents tech du continent.',
    href: '/equipe',
  },
];

const values = [
  { title: 'Résilience', body: 'Tenir dans la durée, obstacle après obstacle.' },
  { title: 'Passion', body: "L'envie de comprendre, d'apprendre et de transmettre." },
  { title: 'Innovation', body: 'Des solutions locales, pensées pour nos usages.' },
  { title: 'Engagement', body: 'Informer avec honnêteté, former avec rigueur, dialoguer avec respect.' },
  { title: 'Culture', body: 'Enracinés dans nos identités africaines, ouverts sur le monde.' },
];

const R = 38;
const petals = values.map((v, i) => {
  const angle = ((-90 + i * 72) * Math.PI) / 180;
  return {
    ...v,
    x: +(50 + R * Math.cos(angle)).toFixed(2),
    y: +(50 + R * Math.sin(angle)).toFixed(2),
    delay: i * 110,
  };
});
export default function Essence() {
  return (
    <section className="section" id="essence">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">01 / Qui sommes-nous</span>
          <h2 className="sec-title">La tech, à la portée de l’Afrique.</h2>
          <p className="lead">
            Émissions, débats, formations et code ouvert. Gratuit, en français.
          </p>
        </div>

        <div className="essence-grid">
          <div className="mission">
            <span className="eyebrow mission__label">Notre mission</span>
            <ul className="axes reveal">
              {missionAxes.map((a) => (
                <li key={a.title}>
                  <a className="axis axis--link" href={a.href}>
                    <h3 className="axis__title">{a.title}</h3>
                    <p className="axis__body">{a.body}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <aside className="essence-card reveal" data-delay="120" aria-label="Le nom Y'TILIKAN">
            <span className="essence-card__label">Le nom</span>
            <p className="essence-card__word">
              Y<span className="apos">’</span>TILIKAN
            </p>
            <p className="essence-card__mean">« Ce n’est pas sorcier. »</p>
            <p className="essence-card__origin">Une expression de l’Ouest camerounais.</p>
            <p className="essence-card__def">
              Toute notre conviction tient là&nbsp;: la tech est à la portée de tous.
            </p>
            <a href="/essence" className="essence-card__link">
              Notre histoire <span className="arr" aria-hidden="true">→</span>
            </a>
          </aside>
        </div>

        <div className="vision reveal">
          <span className="eyebrow vision__label">Notre vision</span>
          <p className="vision-lead">
            Comprendre la technologie, la maîtriser, puis la créer. Pour que l’Afrique façonne la
            tech au lieu de la subir.
          </p>
          <figure className="vision-quote-wrap">
            <blockquote className="vision-quote">Le savoir, c’est le pouvoir.</blockquote>
            <figcaption className="vision-quote__author">Francis Bacon</figcaption>
          </figure>
        </div>

        <div className="values-block">
          <div className="values-block__head">
            <span className="eyebrow values-block__label">Nos valeurs</span>
            <a href="/essence" className="section-more">
              Tout sur qui nous sommes
            </a>
          </div>
          <div className="constellation" id="values-constellation">
            <div className="constellation__ring">
              <svg
                className="constellation__svg"
                viewBox="0 0 100 100"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
              >
                {petals.map((p, i) => (
                  <line
                    className="constellation__line"
                    key={p.title}
                    x1="50"
                    y1="50"
                    x2={p.x}
                    y2={p.y}
                    stroke="#E6E2DC"
                    strokeWidth="0.3"
                    pathLength={1}
                    style={{ animationDelay: `${0.35 + i * 0.1}s` } as CSSProperties}
                  />
                ))}
              </svg>
              <div className="constellation__globe" aria-label="Le monde, vue Afrique">
                <WorldGlobe variant="light" />
              </div>
              {petals.map((p) => (
                <div
                  className="petal"
                  key={p.title}
                  style={
                    {
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      '--d': `${p.delay}ms`,
                    } as CSSProperties
                  }
                >
                  <div className="petal__card">
                    <h3 className="petal__title">{p.title}</h3>
                    <p className="petal__body">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
