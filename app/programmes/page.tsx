import type { Metadata } from 'next';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: "Programmes · Y'TILIKAN",
  description:
    "Émission phare, formations tech et mentorat : les formats Y'TILIKAN pour informer, former et accompagner.",
  alternates: { canonical: '/programmes' },
};

const programmes = [
  {
    kick: 'Émission principale',
    title: "Y'TILIKAN",
    duration: '≈ 1 heure',
    body: "L'émission phare. Format structuré : introduction du thème et des invités, astuce tech du jour, revue de l'actualité, Grand Débat Tech, et mot de la fin.",
    points: ['Astuce tech du jour', "Revue de l'actualité", 'Grand Débat Tech'],
    detail:
      "Un rendez-vous pour comprendre ce que la tech change dans nos vies, avec des invités du terrain. Le plateau mélange pédagogie et débat : on part d'un sujet concret, on l'explique, puis on le discute.",
  },
  {
    kick: 'Pédagogie',
    title: 'Formation Tech',
    duration: '5 à 15 min',
    body: 'Courtes vidéos pour apprendre outils, concepts et pratiques : IA, programmation, cybersécurité, cloud, et outils collaboratifs.',
    points: ['IA & Python', 'Cybersécurité', 'Cloud & productivité'],
    detail:
      "Des capsules pour apprendre vite, sans se perdre. Chaque vidéo vise un geste utile : configurer un outil, comprendre un concept, ou appliquer une méthode. Idéal pour démarrer ou consolider.",
  },
  {
    kick: 'Accompagnement',
    title: 'Mentorat',
    duration: 'Programme continu',
    body: 'Un accompagnement personnalisé : des mentors expérimentés guident étudiants et jeunes talents dans leur montée en compétences tech.',
    points: ['Binôme mentor et mentoré', 'Objectifs concrets', 'Suivi dans la durée'],
    detail:
      "Au-delà des vidéos : un suivi humain. Objectifs définis ensemble, échanges réguliers, et progression mesurable. Pour candidater ou proposer ton expertise de mentor, écris-nous.",
  },
];

export default function ProgrammesPage() {
  return (
    <PageShell active="programmes">
      <PageHero
        eyebrow="03 / Nos programmes"
        title="Informer, former, accompagner."
        lead="Des formats complémentaires pour toucher tous les publics, du simple curieux au professionnel du numérique."
      />

      <section className="page-section">
        <div className="wrap">
          <div className="prog-detail-list">
            {programmes.map((p, i) => (
              <article className="prog-detail reveal" key={p.title}>
                <div className="prog-detail__meta">
                  <span className="prog-detail__n">0{i + 1}</span>
                  <span className="pcard__kick">{p.kick}</span>
                  <span className="pcard__dur">{p.duration}</span>
                </div>
                <h2 className="prog-detail__title">{p.title}</h2>
                <p className="prog-detail__body">{p.detail}</p>
                <p className="prog-detail__summary">{p.body}</p>
                <ul className="pcard__points">
                  {p.points.map((pt) => (
                    <li key={pt}>
                      <svg className="pcard__eye" viewBox="0 0 100 60">
                        <use href="#eye" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta-band">
        <div className="wrap page-cta-band__inner reveal">
          <h2 className="page-cta-band__title">Suivre ou rejoindre un programme</h2>
          <p className="page-cta-band__lead">
            Les formations et débats sont sur YouTube. Pour le mentorat ou une intervention, contacte-nous.
          </p>
          <div className="page-cta-band__actions">
            <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer" className="btn btn--gold">
              Voir la chaîne
            </a>
            <a href="/#contact" className="btn btn--ghost page-cta-band__ghost">
              Candidater / collaborer
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
