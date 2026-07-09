import type { Metadata } from 'next';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: "Qui sommes-nous · Y'TILIKAN",
  description:
    "Mission, vision et valeurs de Y'TILIKAN : rendre l'Afrique technologiquement souveraine par le savoir.",
  alternates: { canonical: '/essence' },
};

const axes = [
  {
    title: 'Informer',
    body: 'Émissions, interviews et débats sur ce que la tech change dans nos vies.',
    detail:
      "Chaque semaine, on décrypte l'actualité tech et IA avec des invités du continent. Pas de jargon inutile : on explique ce qui compte, pourquoi ça compte, et ce que ça change concrètement pour l'Afrique francophone.",
    href: '/emissions',
    cta: 'Voir les émissions',
  },
  {
    title: 'Former',
    body: 'Des contenus concrets, pratiques et gratuits, pour débutants comme initiés.',
    detail:
      "Formations courtes et ateliers longs : vibe coding, productivité à l'IA, bases de la programmation. Tout est gratuit, en français, et pensé pour démarrer sans prérequis.",
    href: '/programmes',
    cta: 'Découvrir les programmes',
  },
  {
    title: 'Partager',
    body: 'Diffuser librement le savoir : outils open-source, code et données ouverts à tous.',
    detail:
      "Benchmarks, datasets de langues africaines, outils de veille : nos projets sont publics sur GitHub. Chacun peut lire, réutiliser et contribuer — c'est ainsi qu'on construit une infrastructure commune.",
    href: '/projets',
    cta: 'Explorer les projets',
  },
  {
    title: 'Valoriser',
    body: "Donner la parole aux talents tech du continent : l'Afrique innove.",
    detail:
      "Invités, mentors, contributeurs : on met en lumière celles et ceux qui inventent des solutions locales. L'innovation africaine existe déjà — notre rôle est de la rendre visible et accessible.",
    href: '/equipe',
    cta: "Rencontrer l'équipe",
  },
];

const values = [
  { title: 'Résilience', body: 'Transformer chaque obstacle en tremplin et bâtir sur le long terme.' },
  { title: 'Passion', body: "L'envie sincère de comprendre, d'apprendre et de transmettre." },
  { title: 'Innovation', body: 'Des solutions locales, créatives et taillées pour nos réalités.' },
  { title: 'Engagement', body: 'Informer avec honnêteté, former avec rigueur, dialoguer avec respect.' },
  { title: 'Culture', body: 'Enracinés dans nos identités africaines, ouverts sur le monde.' },
];

export default function EssencePage() {
  return (
    <PageShell active="essence">
      <PageHero
        eyebrow="01 / Qui sommes-nous"
        title="Rendre l'Afrique souveraine, par le savoir."
        lead="Notre objectif : donner aux Africains les moyens de rendre le continent technologiquement souverain, sur le long terme. Cela commence par comprendre, apprendre et partager."
      />

      <section className="page-section">
        <div className="wrap">
          <div className="page-split reveal">
            <div>
              <span className="eyebrow">Le nom</span>
              <h2 className="page-h2">
                Y<span className="apos">&apos;</span>tilikan
              </h2>
              <p className="page-prose">
                Une expression de l&apos;Ouest camerounais qui signifie « ce n&apos;est pas
                sorcier ». Toute notre conviction tient dans ce mot : la tech est à la portée de
                tous. Pas de magie, pas d&apos;élite fermée — seulement du savoir partagé, en
                français, pour l&apos;Afrique francophone et sa diaspora.
              </p>
            </div>
            <aside className="page-callout" aria-label="Étymologie">
              <span className="page-callout__label">Conviction</span>
              <p className="page-callout__text">
                La technologie n&apos;est pas réservée à quelques-uns. Elle se comprend, se
                maîtrise, et se crée — ici, maintenant.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="page-section page-section--alt">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Notre mission</span>
            <h2 className="sec-title">Quatre axes, une direction.</h2>
            <p className="lead">
              Informer, former, partager, valoriser : chaque action sert le même cap — une Afrique
              qui ne subit plus la technologie.
            </p>
          </div>
          <div className="detail-grid reveal">
            {axes.map((a) => (
              <article className="detail-card" key={a.title}>
                <h3 className="detail-card__title">{a.title}</h3>
                <p className="detail-card__body">{a.detail}</p>
                <a href={a.href} className="detail-card__link">
                  {a.cta} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Notre vision</span>
            <h2 className="sec-title">Souveraineté numérique.</h2>
          </div>
          <p className="page-prose page-prose--lg reveal">
            Une Afrique qui ne subit plus la technologie : elle la comprend, la maîtrise et la
            crée. C&apos;est notre définition de la souveraineté numérique — pas une abstraction,
            mais une capacité collective à décider, construire et transmettre.
          </p>
          <figure className="vision-quote-wrap reveal" style={{ marginTop: '2rem' }}>
            <blockquote className="vision-quote">Le savoir, c&apos;est le pouvoir.</blockquote>
            <figcaption className="vision-quote__author">Francis Bacon</figcaption>
          </figure>
        </div>
      </section>

      <section className="page-section page-section--alt">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Nos valeurs</span>
            <h2 className="sec-title">Cinq valeurs, un cap.</h2>
          </div>
          <ul className="values-list reveal">
            {values.map((v) => (
              <li className="values-list__item" key={v.title}>
                <h3 className="values-list__title">{v.title}</h3>
                <p className="values-list__body">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-cta-band">
        <div className="wrap page-cta-band__inner reveal">
          <h2 className="page-cta-band__title">Prêt à avancer avec nous&nbsp;?</h2>
          <p className="page-cta-band__lead">
            Regarde une émission, contribue à un projet, ou écris-nous pour collaborer.
          </p>
          <div className="page-cta-band__actions">
            <a href="/participer" className="btn btn--gold">
              Comment participer
            </a>
            <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer" className="btn btn--ghost page-cta-band__ghost">
              Voir la chaîne
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
