import type { CSSProperties } from 'react';

const missionAxes = [
  {
    title: 'Informer',
    body: 'Émissions, interviews et débats sur ce que la tech change dans nos vies.',
    href: '/emissions',
  },
  {
    title: 'Former',
    body: 'Des contenus concrets, pratiques et gratuits, pour débutants comme initiés.',
    href: '/programmes',
  },
  {
    title: 'Partager',
    body: 'Diffuser librement le savoir : outils open-source, code et données ouverts à tous.',
    href: '/projets',
  },
  {
    title: 'Valoriser',
    body: "Donner la parole aux talents tech du continent : l'Afrique innove.",
    href: '/equipe',
  },
];

const values = [
  { title: 'Résilience', body: 'Transformer chaque obstacle en tremplin et bâtir sur le long terme.' },
  { title: 'Passion', body: "L'envie sincère de comprendre, d'apprendre et de transmettre." },
  { title: 'Innovation', body: 'Des solutions locales, créatives et taillées pour nos réalités.' },
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
const polygonPoints = petals.map((p) => `${p.x},${p.y}`).join(' ');

export default function Essence() {
  return (
    <section className="section" id="essence">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">01 / Qui sommes-nous</span>
          <h2 className="sec-title">Rendre l&apos;Afrique souveraine, par le savoir.</h2>
          <p className="lead">
            Notre objectif : donner aux Africains les moyens de rendre le continent
            technologiquement souverain, sur le long terme. Cela commence par comprendre, apprendre
            et partager.
          </p>
        </div>

        <div className="essence-grid reveal">
          <div className="mission">
            <span className="eyebrow mission__label">Notre mission</span>
            <ul className="axes">
              {missionAxes.map((a) => (
                <li key={a.title}>
                  <a className="axis axis--link" href={a.href}>
                    <h3 className="axis__title">{a.title}</h3>
                    <p className="axis__body">{a.body}</p>
                    <span className="axis__more">En savoir plus →</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <aside className="essence-card" aria-label="Étymologie du nom">
            <span className="essence-card__label">Le nom</span>
            <p className="essence-card__word">
              Y<span className="apos">&apos;</span>tilikan
            </p>
            <p className="essence-card__def">
              Une expression de l&apos;Ouest camerounais qui signifie « ce n&apos;est pas sorcier ».
              Toute notre conviction tient dans ce mot : la tech est à la portée de tous.
            </p>
            <a href="/essence" className="essence-card__link">
              Notre histoire →
            </a>
          </aside>
        </div>

        <div className="vision reveal">
          <span className="eyebrow vision__label">Notre vision</span>
          <p className="vision-lead">
            Une Afrique qui ne subit plus la technologie : elle la comprend, la maîtrise et la crée.
            C&apos;est notre définition de la souveraineté numérique.
          </p>
          <figure className="vision-quote-wrap">
            <blockquote className="vision-quote">Le savoir, c&apos;est le pouvoir.</blockquote>
            <figcaption className="vision-quote__author">Francis Bacon</figcaption>
          </figure>
        </div>

        <div className="values-block">
          <div className="values-block__head">
            <span className="eyebrow values-block__label">Nos valeurs</span>
            <a href="/essence" className="section-more">
              Tout sur qui nous sommes →
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
                <polygon
                  className="constellation__poly"
                  points={polygonPoints}
                  fill="none"
                  stroke="#E6E2DC"
                  strokeWidth="0.4"
                  strokeLinejoin="round"
                  pathLength={1}
                />
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
              <div className="constellation__center">
                <span className="constellation__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>5 valeurs, 1 cap</span>
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
