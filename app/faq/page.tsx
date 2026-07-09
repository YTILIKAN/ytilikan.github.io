import type { Metadata } from 'next';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: "FAQ · Y'TILIKAN",
  description:
    "Questions fréquentes sur Y'TILIKAN : gratuité, prérequis, open-source, public cible et comment participer.",
  alternates: { canonical: '/faq' },
};

const faqs = [
  {
    q: 'Est-ce vraiment gratuit ?',
    a: 'Oui, entièrement. Émissions, formations et outils sont accessibles sans paiement ni abonnement. Notre modèle repose sur le partage, pas sur la vente.',
  },
  {
    q: 'Faut-il des connaissances en informatique pour suivre ?',
    a: "Non. Nos contenus partent de zéro et expliquent étape par étape, sans jargon. « Ce n'est pas sorcier » n'est pas qu'un slogan : c'est notre méthode.",
  },
  {
    q: 'Que veut dire « open-source » concrètement ?',
    a: 'Notre code et nos jeux de données sont publics sur GitHub. Chacun peut les consulter, les réutiliser et les améliorer librement.',
  },
  {
    q: "À qui s'adresse Y'TILIKAN ?",
    a: "À toute l'Afrique francophone et sa diaspora : étudiants, professionnels, curieux. Nos contenus sont en français et pensés pour les réalités du continent, du Cameroun au Sénégal.",
  },
  {
    q: 'Comment participer à une émission ou proposer un sujet ?',
    a: 'Écris-nous via le formulaire de contact ou par email. Nous cherchons régulièrement des invités, des intervenants et des partenaires.',
  },
  {
    q: 'Comment contribuer aux projets ?',
    a: 'Rends-toi sur notre GitHub : les issues, pull requests et jeux de données sont ouverts aux contributions, quel que soit ton niveau.',
  },
  {
    q: 'Où regarder les émissions ?',
    a: "Sur notre chaîne YouTube @YTILIKAN. Tu y trouveras les Grand Débat Tech, les formations et les analyses — tout en accès libre.",
  },
  {
    q: 'Puis-je devenir mentor ou proposer un partenariat école ?',
    a: "Oui. Décris ton profil ou ta structure via le formulaire de contact : on revient vers toi pour voir comment coller au programme de mentorat ou à une collaboration.",
  },
];

export default function FaqPage() {
  return (
    <PageShell active="faq">
      <PageHero
        eyebrow="06 / Questions fréquentes"
        title="Ce que vous nous demandez."
        lead="Les réponses aux questions qu'on nous pose le plus souvent. Une autre en tête ? Écris-nous."
      />

      <section className="page-section">
        <div className="wrap">
          <ul className="faq-list reveal">
            {faqs.map((item) => (
              <li className="faq-item" key={item.q}>
                <details className="faq-details">
                  <summary className="faq-q">
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true"></span>
                  </summary>
                  <p className="faq-a">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-cta-band">
        <div className="wrap page-cta-band__inner reveal">
          <h2 className="page-cta-band__title">Pas trouvé ta réponse&nbsp;?</h2>
          <p className="page-cta-band__lead">
            Écris-nous — ou commence par regarder une émission / ouvrir un dépôt.
          </p>
          <div className="page-cta-band__actions">
            <a href="/#contact" className="btn btn--gold">
              Nous écrire
            </a>
            <a
              href={SITE.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost page-cta-band__ghost"
            >
              Voir la chaîne
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
