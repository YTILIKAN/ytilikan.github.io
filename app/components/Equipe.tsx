// Pour afficher une vraie photo : dépose le fichier dans /public/team/
// puis renseigne le chemin dans `photo` (ex. '/team/brayan.jpg').
// Tant que `photo` est null, la silhouette par défaut s'affiche.
const membres: {
  name: string;
  role: string;
  body: string;
  tag: string;
  photo: string | null;
  linkedin: string;
}[] = [
  {
    name: 'Hammel Tagakou',
    role: 'Opérations & éditorial',
    body: 'Anime les émissions comme modérateur, supervise la ligne éditoriale et coordonne les équipes.',
    tag: 'Modérateur',
    photo: null,
    linkedin: '#',
  },
  {
    name: 'Michel NIPBIEBA',
    role: 'Responsable technique',
    body: 'Supervise la technique des tournages : image, son, lumière. Intervenant permanent, expertise terrain.',
    tag: 'Production',
    photo: null,
    linkedin: '#',
  },
  {
    name: 'Christian NEBOT',
    role: 'Responsable pédagogique',
    body: 'Garant de la validité scientifique et technique des contenus, élabore la ligne de formation tech.',
    tag: 'Formation',
    photo: null,
    linkedin: '#',
  },
  {
    name: 'Stelle Matha',
    role: 'Communication & journalisme',
    body: 'Prépare et présente la revue de presse, assure la veille tech et gère les réseaux sociaux.',
    tag: 'Médias',
    photo: null,
    linkedin: '#',
  },
  {
    name: 'Honorine Guehara',
    role: 'Relations extérieures',
    body: 'Coordonne les intervenants, gère les relations partenaires et la communication externe.',
    tag: 'Partenariats',
    photo: null,
    linkedin: '#',
  },
  {
    name: 'Balla Moussa',
    role: 'Données & langues',
    body: 'Contribue aux jeux de données de langues africaines et à leur organisation pour la recherche.',
    tag: 'Données',
    photo: null,
    linkedin: '#',
  },
  {
    name: 'Hilary Madjou',
    role: 'Veille & contenus',
    body: "Pilote la veille IA du continent et la newsletter hebdomadaire de l'écosystème.",
    tag: 'Veille',
    photo: null,
    linkedin: '#',
  },
];

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export default function Equipe() {
  return (
    <section className="section team" id="equipe">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">05 / Notre équipe</span>
          <h2 className="sec-title">Les visages derrière Y&apos;TILIKAN.</h2>
          <p className="lead">
            Une structure agile où chacun tient un rôle défini, du plateau à la formation. Ensemble,
            une même mission : rendre la tech claire pour tous.
          </p>
        </div>

        <div className="tm-grid reveal">
          {membres.map((m) => (
            <article className="tm card-hover" key={m.name}>
              <div className="tm__media">
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="tm__img" src={m.photo} alt={m.name} loading="lazy" width={400} height={400} />
                ) : (
                  <div className="tm__ph" aria-hidden="true">
                    <span className="tm__initials">{initials(m.name)}</span>
                  </div>
                )}
                <span className="tm__tag">{m.tag}</span>
              </div>
              <div className="tm__info">
                <h3 className="tm__name">{m.name}</h3>
                <p className="tm__role">{m.role}</p>
                <p className="tm__body">{m.body}</p>
                {m.linkedin !== '#' && (
                  <a
                    href={m.linkedin}
                    className="tm__linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </article>
          ))}
          <article className="tm tm--join">
            <div className="tm__info">
              <h3 className="tm__name">Envie de nous rejoindre&nbsp;?</h3>
              <p className="tm__body">
                Intervenant, invité ou partenaire : l&apos;équipe s&apos;agrandit avec ceux qui
                partagent la mission.
              </p>
              <a href="#contact" className="tm__join-cta">
                Nous écrire
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
