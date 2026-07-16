const programmes = [
  {
    kick: 'Émission principale',
    title: "Y'TILIKAN",
    duration: '≈ 1 heure',
    body: 'Une heure. Astuce tech du jour, revue de l’actualité, Grand Débat Tech, mot de la fin.',
    points: ['Astuce tech du jour', 'Revue de l’actualité', 'Grand Débat Tech'],
    soon: false,
  },
  {
    kick: 'Pédagogie',
    title: 'Formation Tech',
    duration: '5 à 15 min',
    body: 'Courtes vidéos : IA, programmation, cybersécurité, cloud, outils collaboratifs.',
    points: ['IA & Python', 'Cybersécurité', 'Cloud & productivité'],
    soon: false,
  },
  {
    kick: 'Accompagnement',
    title: 'Mentorat',
    duration: 'En préparation',
    body: 'Un mentor accompagnera un étudiant ou un jeune talent, sur la durée.',
    points: ['Binôme mentor et mentoré', 'Objectifs concrets', 'Suivi dans la durée'],
    soon: true,
  },
];

export default function Programmes() {
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
                <span className="pcard__dur">{p.duration}</span>
              </div>
              <h3 className="pcard__title">
                {p.title}
                {p.soon && <span className="pcard__badge">Bientôt</span>}
              </h3>
              <p className="pcard__body">{p.body}</p>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
