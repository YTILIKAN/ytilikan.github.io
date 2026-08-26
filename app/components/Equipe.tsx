import { teamInitials, teamPhotoUrl, preferCmsList, type PublicTeamMember } from '@/lib/api';

export type TeamCard = {
  name: string;
  role: string;
  body: string;
  detail: string;
  tag: string;
  photo: string | null;
  linkedin: string;
  initials: string;
};

// Pour afficher une vraie photo : dépose le fichier dans /public/team/
// puis renseigne le chemin dans `photo` (ex. '/team/brayan.jpg').
// Tant que `photo` est null, la silhouette par défaut s'affiche.
const FALLBACK_MEMBERS: TeamCard[] = [
  {
    name: 'Hamel Brayan',
    role: 'Opérations & éditorial',
    body: 'Anime les émissions comme modérateur, supervise la ligne éditoriale et coordonne les équipes.',
    detail:
      "Garant du rythme du plateau et de la cohérence éditoriale. Il s'assure que chaque émission sert la mission : clarifier la tech pour tous.",
    tag: 'Modérateur',
    photo: '/team/hamel-brayan.png',
    linkedin: '#',
    initials: 'HB',
  },
  {
    name: 'Michel Azarias',
    role: 'Responsable technique',
    body: 'Supervise l’image, le son et la lumière des tournages.',
    detail:
      "De la captation à la qualité d'écoute : il rend possible le plateau. Aussi contributeur technique sur les projets open-source.",
    tag: 'Production',
    photo: '/team/michel-azarias.png',
    linkedin: '#',
    initials: 'MA',
  },
  {
    name: 'Christian NEBOT',
    role: 'Responsable pédagogique',
    body: 'Garant de la validité scientifique et technique des contenus, élabore la ligne de formation tech.',
    detail:
      "Conçoit les parcours de formation et veille à la rigueur des contenus. Lead sur AfriBench et Dira Browser.",
    tag: 'Formation',
    photo: '/team/christian-nebot.png',
    linkedin: '#',
    initials: 'CN',
  },
  {
    name: 'Stelle Matha',
    role: 'Communication & journalisme',
    body: 'Prépare et présente la revue de presse, assure la veille tech et gère les réseaux sociaux.',
    detail:
      "La voix de l'actualité tech sur le plateau. Lead sur AfroLang-Library : données et langues africaines.",
    tag: 'Médias',
    photo: '/team/stelle-matha.png',
    linkedin: '#',
    initials: 'SM',
  },
  {
    name: 'Honorine Guehara',
    role: 'Relations extérieures',
    body: 'Coordonne les intervenants, gère les relations partenaires et la communication externe.',
    detail:
      "Le lien avec les invités, les écoles et les partenaires. Elle ouvre les portes pour que la mission rayonne au-delà du plateau.",
    tag: 'Partenariats',
    photo: '/team/honorine-guehara.jpg',
    linkedin: '#',
    initials: 'HG',
  },
  {
    name: 'Balla Moussa',
    role: 'Compétitions & hackathons',
    body: 'Coordonne nos participations aux challenges externes et nos hackathons internes.',
    detail:
      "Il repère les challenges externes pertinents, coordonne la participation de l'équipe, et prépare les hackathons internes à venir.",
    tag: 'Compétitions',
    photo: '/team/balla-moussa.png',
    linkedin: '#',
    initials: 'BM',
  },
  {
    name: 'Hilary Madjou',
    role: 'Team Building',
    body: 'Pilote le team building : cohésion de l’équipe, rituels collectifs et dynamique de groupe.',
    detail:
      "Elle tisse le lien entre les membres : moments partagés, énergie collective et une équipe qui avance ensemble.",
    tag: 'Team Building',
    photo: '/team/hilary-madjou.jpg',
    linkedin: '#',
    initials: 'HM',
  },
];

export function toTeamCards(members: PublicTeamMember[]): TeamCard[] {
  return members.map((member) => ({
    name: member.name,
    role: member.role || '',
    body: member.bio || '',
    detail: member.detail || member.bio || '',
    tag: member.tag || member.role || 'Équipe',
    photo: teamPhotoUrl(member),
    linkedin: member.linkedin && member.linkedin !== '#' ? member.linkedin : '#',
    initials: teamInitials(member),
  }));
}

export function resolveTeam(members?: PublicTeamMember[]): TeamCard[] {
  return preferCmsList(toTeamCards(members ?? []), FALLBACK_MEMBERS);
}

export default function Equipe({ members }: { members?: PublicTeamMember[] }) {
  const membres = resolveTeam(members);
  return (
    <section className="section team" id="equipe">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">05 / Notre équipe</span>
          <h2 className="sec-title">Les visages derrière Y’TILIKAN.</h2>
          <p className="lead">
            Sept personnes, du plateau à la formation. Chacun un rôle.
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
                    <span className="tm__initials">{m.initials}</span>
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
                Intervenant, invité ou partenaire&nbsp;? Écris-nous.
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
