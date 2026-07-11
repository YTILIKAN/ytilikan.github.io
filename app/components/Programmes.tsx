const programmes = [
  {
    kick: 'Émission principale',
    title: "Y'TILIKAN",
    duration: '≈ 1 heure',
    body: "L'émission phare. Format structuré : introduction du thème et des invités, astuce tech du jour, revue de l'actualité, Grand Débat Tech, et mot de la fin.",
    points: ['Astuce tech du jour', "Revue de l'actualité", 'Grand Débat Tech'],
  },
  {
    kick: 'Pédagogie',
    title: 'Formation Tech',
    duration: '5 à 15 min',
    body: 'Courtes vidéos pour apprendre outils, concepts et pratiques : IA, programmation, cybersécurité, cloud, et outils collaboratifs.',
    points: ['IA & Python', 'Cybersécurité', 'Cloud & productivité'],
  },
  {
    kick: 'Accompagnement',
    title: 'Mentorat',
    duration: 'Programme continu',
    body: 'Un accompagnement personnalisé : des mentors expérimentés guident étudiants et jeunes talents dans leur montée en compétences tech.',
    points: ['Binôme mentor et mentoré', 'Objectifs concrets', 'Suivi dans la durée'],
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
            Des formats complémentaires pour toucher tous les publics, du simple curieux au
            professionnel du numérique.
          </p>
          <a href="/programmes" className="section-more">
            Détail des programmes →
          </a>
        </div>

        <div className="prog-grid reveal">
          {programmes.map((p) => (
            <article className="pcard card-hover" key={p.title}>
              <div className="pcard__top">
                <span className="pcard__kick">{p.kick}</span>
                <span className="pcard__dur">{p.duration}</span>
              </div>
              <h3 className="pcard__title">{p.title}</h3>
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
