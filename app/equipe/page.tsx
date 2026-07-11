import type { Metadata } from 'next';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';

export const metadata: Metadata = {
  title: "Équipe · Y'TILIKAN",
  description:
    "Les visages derrière Y'TILIKAN : opérations, technique, pédagogie, médias, partenariats et données.",
  alternates: { canonical: '/equipe' },
};

const membres: {
  name: string;
  role: string;
  body: string;
  detail: string;
  tag: string;
  photo: string | null;
  linkedin: string;
}[] = [
  {
    name: 'Hamel Brayan',
    role: 'Opérations & éditorial',
    body: 'Anime les émissions comme modérateur, supervise la ligne éditoriale et coordonne les équipes.',
    detail:
      "Garant du rythme du plateau et de la cohérence éditoriale. Il s'assure que chaque émission sert la mission : clarifier la tech pour tous.",
    tag: 'Modérateur',
    photo: '/team/hamel-brayan.png',
    linkedin: '#',
  },
  {
    name: 'Michel Azarias',
    role: 'Responsable technique',
    body: 'Supervise la technique des tournages : image, son, lumière. Intervenant permanent, expertise terrain.',
    detail:
      "De la captation à la qualité d'écoute : il rend possible le plateau. Aussi contributeur technique sur les projets open-source.",
    tag: 'Production',
    photo: '/team/michel-azarias.png',
    linkedin: '#',
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
  },
  {
    name: 'Honorine Guehara',
    role: 'Relations extérieures',
    body: 'Coordonne les intervenants, gère les relations partenaires et la communication externe.',
    detail:
      "Le lien avec les invités, les écoles et les partenaires. Elle ouvre les portes pour que la mission rayonne au-delà du plateau.",
    tag: 'Partenariats',
    photo: null,
    linkedin: '#',
  },
  {
    name: 'Balla Moussa',
    role: 'Données & langues',
    body: 'Contribue aux jeux de données de langues africaines et à leur organisation pour la recherche.',
    detail:
      "Travaille à rendre les langues africaines utilisables par les modèles et les chercheurs, brique essentielle de la souveraineté numérique.",
    tag: 'Données',
    photo: '/team/balla-moussa.png',
    linkedin: '#',
  },
  {
    name: 'Hilary Madjou',
    role: 'Veille & contenus',
    body: "Pilote la veille IA du continent et la newsletter hebdomadaire de l'écosystème.",
    detail:
      "Derrière AfroTech-Pulse : une veille claire, régulière, utile. Pour que l'écosystème reste informé sans se perdre dans le bruit.",
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

export default function EquipePage() {
  return (
    <PageShell active="equipe">
      <PageHero
        eyebrow="05 / Notre équipe"
        title="Les visages derrière Y'TILIKAN."
        lead="Une structure agile où chacun tient un rôle défini, du plateau à la formation. Ensemble, une même mission : rendre la tech claire pour tous."
      />

      <section className="page-section">
        <div className="wrap">
          <div className="team-detail-grid reveal">
            {membres.map((m) => (
              <article className="team-detail" key={m.name}>
                <div className="tm__media">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="tm__img"
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      width={400}
                      height={400}
                    />
                  ) : (
                    <div className="tm__ph" aria-hidden="true">
                      <span className="tm__initials">{initials(m.name)}</span>
                    </div>
                  )}
                  <span className="tm__tag">{m.tag}</span>
                </div>
                <div className="team-detail__info">
                  <h2 className="tm__name">{m.name}</h2>
                  <p className="tm__role">{m.role}</p>
                  <p className="team-detail__body">{m.detail}</p>
                  {m.linkedin !== '#' && (
                    <a
                      href={m.linkedin}
                      className="tm__linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta-band">
        <div className="wrap page-cta-band__inner reveal">
          <h2 className="page-cta-band__title">Envie de nous rejoindre&nbsp;?</h2>
          <p className="page-cta-band__lead">
            Intervenant, invité ou partenaire : l&apos;équipe s&apos;agrandit avec ceux qui
            partagent la mission.
          </p>
          <div className="page-cta-band__actions">
            <a href="/#contact" className="btn btn--gold">
              Nous écrire
            </a>
            <a href="/participer" className="btn btn--ghost page-cta-band__ghost">
              Comment participer
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
