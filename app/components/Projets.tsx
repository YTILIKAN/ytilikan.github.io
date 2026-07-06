const projetlist: {
  name: string;
  tag: string;
  desc: string;
  authors: string;
  github: string;
  site: string | null;
  status: string;
}[] = [
  {
    name: 'AfriBench',
    tag: 'ML · Benchmark',
    desc: 'Un benchmark ouvert pour évaluer les grands modèles de langage sur des connaissances africaines francophones. QCM multi-catégories, reproductible.',
    authors: 'Christian NEBOT (Lead) · Michel NIPBIEBA',
    github: 'https://github.com/YTILIKAN/AfriBench',
    site: 'https://ytilikan.github.io/AfriBench',
    status: 'Open-source',
  },
  {
    name: 'AfroLang-Library',
    tag: 'Data · NLP',
    desc: 'Une bibliothèque organisée de datasets de langues africaines. Navigable, filtrable, ouverte aux contributions.',
    authors: 'Stelle Matha (Lead) · Balla Moussa Keita · Bayard Ombgwa Kuddy',
    github: 'https://github.com/YTILIKAN/AfroLang-Library',
    site: null,
    status: 'Public',
  },
  {
    name: 'AfroTech-Pulse',
    tag: 'Veille · Newsletter',
    desc: 'Dashboard de veille IA pour le continent africain + pipeline newsletter automatisée publiée chaque lundi.',
    authors: 'Hilary Cynthia (Lead) · Brayan Tagakou · Steeve Junix',
    github: 'https://github.com/YTILIKAN/AfroTech-Pulse',
    site: null,
    status: 'Public',
  },
  {
    name: 'Dira Browser',
    tag: 'Navigateur · Apprentissage',
    desc: "Un projet d'apprentissage : comprendre comment se construit un navigateur en partant de Chromium, avec un focus sur la confidentialité. Dira, la boussole en swahili.",
    authors: 'Christian NEBOT (Lead) · YTILIKAN',
    github: 'https://github.com/YTILIKAN/brave-core',
    site: null,
    status: 'En dev',
  },
];

export default function Projets() {
  return (
    <section className="section" id="projets">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">04 / Initiatives &amp; projets open-source</span>
          <h2 className="sec-title">Notre écosystème open-source.</h2>
          <p className="lead">
            Tous nos projets sont ouverts, documentés et prêts aux contributions. De l&apos;évaluation
            des LLMs aux datasets de langues africaines : l&apos;infrastructure d&apos;une IA
            africaine se construit ici.
          </p>
        </div>

        <div className="pj-grid reveal">
          {projetlist.map((p) => (
            <article className="pj card-hover" key={p.name}>
              <div className="pj__top">
                <span className="pj__tag">{p.tag}</span>
                <span className="pj__status">{p.status}</span>
              </div>
              <h3 className="pj__name">{p.name}</h3>
              <p className="pj__desc">{p.desc}</p>
              <p className="pj__authors">{p.authors}</p>
              <div className="pj__links">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener"
                  className="pj__link pj__link--gh"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                {p.site && (
                  <a
                    href={p.site}
                    target="_blank"
                    rel="noopener"
                    className="pj__link pj__link--web"
                  >
                    Voir le site
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
