import type { Metadata } from 'next';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: "Comment participer · Y'TILIKAN",
  description:
    "Trois façons concrètes de rejoindre Y'TILIKAN : regarder, contribuer au code, ou collaborer.",
  alternates: { canonical: '/participer' },
};

const paths = [
  {
    n: '01',
    title: 'Regarder & apprendre',
    body: 'Émissions, débats et formations gratuites publiés sur notre chaîne YouTube, en français et sans prérequis.',
    detail:
      "Abonne-toi à la chaîne, regarde les Grand Débat Tech et les formations (vibe coding, productivité à l'IA…). Tout est libre d'accès. Tu peux aussi proposer un sujet ou poser une question en commentaire.",
    cta: 'Voir la chaîne',
    href: SITE.youtube.url,
    external: true,
    tips: ['Aucun compte payant', 'Contenus en français', 'Du débutant à l’initié'],
  },
  {
    n: '02',
    title: 'Contribuer au code',
    body: 'Benchmarks, datasets, outils de veille : nos projets sont ouverts. Issues, pull requests et données bienvenues.',
    detail:
      "Sur GitHub, chaque dépôt a des issues ouvertes. Tu peux corriger un bug, ajouter un dataset, améliorer la doc, ou simplement signaler un problème. Le niveau technique n'est pas un filtre : la clarté et la bonne volonté comptent.",
    cta: 'Ouvrir GitHub',
    href: SITE.github,
    external: true,
    tips: ['AfriBench, AfroLang, AfroTech-Pulse…', 'Issues & pull requests', 'Données et doc bienvenues'],
  },
  {
    n: '03',
    title: 'Collaborer',
    body: 'Intervenant, invité, partenaire ou école : écris-nous pour construire quelque chose ensemble.',
    detail:
      "Tu as une expertise à partager, une école à connecter, un partenariat à proposer ? On cherche régulièrement des invités pour le plateau, des mentors, et des structures qui partagent la mission.",
    cta: 'Nous écrire',
    href: '/#contact',
    external: false,
    tips: ['Invités & intervenants', 'Écoles & partenaires', 'Réponse sous quelques jours'],
  },
];

export default function ParticiperPage() {
  return (
    <PageShell active="participer">
      <PageHero
        eyebrow="Comment participer"
        title="Trois étapes, dès aujourd'hui."
        lead="Pas de formulaire d'inscription : regarde, contribue ou écris-nous. Chaque voie est concrète et gratuite."
      />

      <section className="page-section">
        <div className="wrap">
          <div className="path-list">
            {paths.map((p) => (
              <article className="path-card reveal" key={p.n}>
                <span className="path-card__n" aria-hidden="true">
                  {p.n}
                </span>
                <div className="path-card__content">
                  <h2 className="path-card__title">{p.title}</h2>
                  <p className="path-card__body">{p.detail}</p>
                  <ul className="path-card__tips">
                    {p.tips.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a
                    className="btn btn--indigo"
                    href={p.href}
                    target={p.external ? '_blank' : undefined}
                    rel={p.external ? 'noopener noreferrer' : undefined}
                  >
                    {p.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta-band">
        <div className="wrap page-cta-band__inner reveal">
          <h2 className="page-cta-band__title">Une question avant de te lancer&nbsp;?</h2>
          <p className="page-cta-band__lead">
            La FAQ répond aux points les plus fréquents. Sinon, le formulaire de contact est là.
          </p>
          <div className="page-cta-band__actions">
            <a href="/faq" className="btn btn--gold">
              Lire la FAQ
            </a>
            <a href="/#contact" className="btn btn--ghost page-cta-band__ghost">
              Nous écrire
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
