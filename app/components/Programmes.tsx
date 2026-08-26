import { preferCmsList, type PublicProgramme } from '@/lib/api';

export type ProgrammeCard = {
  kick: string;
  title: string;
  duration: string;
  body: string;
  detail: string;
  points: string[];
  soon: boolean;
};

const FALLBACK_PROGRAMMES: ProgrammeCard[] = [
  {
    kick: 'Émission principale',
    title: "Y'TILIKAN",
    duration: '≈ 1 heure',
    body: 'Une heure. Astuce tech du jour, revue de l’actualité, Grand Débat Tech, mot de la fin.',
    detail:
      "Un rendez-vous pour comprendre ce que la tech change dans nos vies, avec des invités du terrain. Le plateau mélange pédagogie et débat : on part d'un sujet concret, on l'explique, puis on le discute.",
    points: ['Astuce tech du jour', 'Revue de l’actualité', 'Grand Débat Tech'],
    soon: false,
  },
  {
    kick: 'Pédagogie',
    title: 'Formation Tech',
    duration: '5 à 15 min',
    body: 'Courtes vidéos : IA, programmation, cybersécurité, cloud, outils collaboratifs.',
    detail:
      "Des capsules pour apprendre vite, sans se perdre. Chaque vidéo vise un geste utile : configurer un outil, comprendre un concept, ou appliquer une méthode. Idéal pour démarrer ou consolider.",
    points: ['IA & Python', 'Cybersécurité', 'Cloud & productivité'],
    soon: false,
  },
  {
    kick: 'Accompagnement',
    title: 'Mentorat',
    duration: 'En préparation',
    body: 'Un mentor accompagnera un étudiant ou un jeune talent, sur la durée.',
    detail:
      "Au-delà des vidéos : un suivi humain. Objectifs définis ensemble, échanges réguliers, et progression mesurable. Pour candidater ou proposer ton expertise de mentor, écris-nous.",
    points: ['Binôme mentor et mentoré', 'Objectifs concrets', 'Suivi dans la durée'],
    soon: true,
  },
];

export function toProgrammeCards(items: PublicProgramme[]): ProgrammeCard[] {
  return items.map((item) => ({
    kick: item.kick || 'Programme',
    title: item.title,
    duration: item.duration || '',
    body: item.body || '',
    detail: item.detail || item.body || '',
    points: item.points,
    soon: item.soon,
  }));
}

export function resolveProgrammes(items?: PublicProgramme[]): ProgrammeCard[] {
  return preferCmsList(toProgrammeCards(items ?? []), FALLBACK_PROGRAMMES);
}

export default function Programmes({ items }: { items?: PublicProgramme[] }) {
  const programmes = resolveProgrammes(items);
  return (
    <section className="section" id="programmes">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">03 / Nos programmes</span>
          <h2 className="sec-title">Informer, former, accompagner.</h2>
          <p className="lead">
            Trois formats : l’émission, les formations courtes, le mentorat.
          </p>
          <a href="/programmes" className="section-more">
            Détail des programmes
          </a>
        </div>

        <div className="prog-grid reveal">
          {programmes.map((p) => (
            <article className="pcard card-hover" key={p.title}>
              <div className="pcard__top">
                <span className="pcard__kick">{p.kick}</span>
                {p.duration ? <span className="pcard__dur">{p.duration}</span> : null}
              </div>
              <h3 className="pcard__title">
                {p.title}
                {p.soon && <span className="pcard__badge">Bientôt</span>}
              </h3>
              <p className="pcard__body">{p.body}</p>
              {p.points.length > 0 && (
                <ul className="pcard__points">
                  {p.points.map((pt) => (
                    <li key={pt}>
                      <svg className="pcard__play" viewBox="0 0 24 24" aria-hidden="true">
                        <use href="#play" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
