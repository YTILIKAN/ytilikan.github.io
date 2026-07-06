import { SITE } from '@/lib/site';

const steps = [
  {
    n: '01',
    title: 'Regarder & apprendre',
    body: 'Émissions, débats et formations gratuites publiés sur notre chaîne YouTube, en français et sans prérequis.',
    cta: 'Voir la chaîne',
    href: SITE.youtube.url,
    external: true,
  },
  {
    n: '02',
    title: 'Contribuer au code',
    body: 'Benchmarks, datasets, outils de veille : nos projets sont ouverts. Issues, pull requests et données bienvenues.',
    cta: 'Ouvrir GitHub',
    href: SITE.github,
    external: true,
  },
  {
    n: '03',
    title: 'Collaborer',
    body: 'Intervenant, invité, partenaire ou école : écris-nous pour construire quelque chose ensemble.',
    cta: 'Nous écrire',
    href: SITE.email,
    external: false,
  },
];

export default function CommentParticiper() {
  return (
    <section className="section steps" id="participer" aria-labelledby="participer-title">
      <div className="wrap">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Comment participer</span>
          <h2 className="sec-title" id="participer-title">
            Trois étapes, dès aujourd&apos;hui.
          </h2>
          <p className="lead">
            Pas de formulaire d&apos;inscription : regarde, contribue ou écris-nous. Chaque voie est
            concrète et gratuite.
          </p>
        </div>

        <ol className="steps-grid reveal">
          {steps.map((s) => (
            <li className="step card-hover" key={s.n}>
              <span className="step__n" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__body">{s.body}</p>
              <a
                className="step__cta"
                href={s.href}
                target={s.external ? '_blank' : undefined}
                rel={s.external ? 'noopener noreferrer' : undefined}
              >
                {s.cta}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
