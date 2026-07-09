import type { Metadata } from 'next';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: "Émissions · Y'TILIKAN",
  description:
    "Débats et formations Y'TILIKAN déjà en ligne : IA à l'école, vibe coding, productivité, place de l'Afrique dans la tech.",
  alternates: { canonical: '/emissions' },
};

const CHANNEL = SITE.youtube.url;

const formats = [
  {
    title: 'Grand Débat Tech',
    body: "Des conversations longues avec des invités : l'IA à l'école, l'emploi, la souveraineté numérique. On confronte les points de vue sans caricature.",
  },
  {
    title: 'Formations',
    body: "Ateliers pratiques filmés : vibe coding, productivité à l'IA, bases pour démarrer. Tu peux suivre à ton rythme, gratuitement.",
  },
  {
    title: 'Analyses',
    body: "Formats courts pour décrypter un sujet d'actualité avec des données et une lecture claire — sans bruit inutile.",
  },
];

const videos = [
  { kick: 'Formation', title: "Formation : Vibe Coding avec l'IA", meta: '1:35:04', id: '4zQ-YN_SvlU' },
  {
    kick: 'Grand Débat Tech',
    title: "Faut-il craindre l'intelligence artificielle en milieu scolaire ?",
    meta: '1:16:07',
    id: 'nu59ufftqZ4',
  },
  { kick: 'Formation', title: "Augmenter sa productivité avec l'IA", meta: '1:08:22', id: 'i_7SlR1bUEk' },
  {
    kick: 'Grand Débat Tech',
    title: "L'IA va-t-elle détruire nos emplois ou créer de nouvelles opportunités ?",
    meta: '35:00',
    id: 'hbLpDjowqDo',
  },
  {
    kick: 'Analyse IA',
    title: 'Présidentielle 2025 : ce que pensent vraiment les Camerounais (Analyse IA exclusive)',
    meta: '8:47',
    id: 'wLXOB2W-s6Y',
  },
  {
    kick: 'Formation',
    title: "Apprendre à coder avec l'IA ? Voici la formation Vibe Coding",
    meta: '1:34',
    id: 'hVGZZT45Qxs',
  },
];

export default function EmissionsPage() {
  return (
    <PageShell active="emissions">
      <PageHero
        eyebrow="02 / Nos émissions"
        title="La marque, en action."
        lead="Débats et formations, déjà en ligne sur notre chaîne. L'IA à l'école, le vibe coding, la productivité, la place de l'Afrique dans la tech."
      />

      <section className="page-section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Formats</span>
            <h2 className="sec-title">Trois façons de regarder.</h2>
          </div>
          <div className="detail-grid detail-grid--3 reveal">
            {formats.map((f) => (
              <article className="detail-card" key={f.title}>
                <h3 className="detail-card__title">{f.title}</h3>
                <p className="detail-card__body">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--alt">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Sur YouTube</span>
            <h2 className="sec-title">Épisodes récents.</h2>
            <p className="lead">
              Clique pour ouvrir sur YouTube. La chaîne reste la source à jour — abonne-toi pour ne
              rien manquer.
            </p>
          </div>

          <div className="em-grid reveal">
            {videos.map((v) => (
              <a
                className="em card-hover"
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="em__thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="em__img"
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    width={480}
                    height={360}
                  />
                  <div className="em__play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width={22} height={22}>
                      <path fill="currentColor" d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="em__dur">{v.meta}</span>
                </div>
                <div className="em__body">
                  <span className="em__kick">{v.kick}</span>
                  <h3 className="em__title">{v.title}</h3>
                </div>
              </a>
            ))}
          </div>

          <div className="em-cta reveal">
            <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="btn btn--indigo">
              Voir la chaîne · {videos.length} vidéos
            </a>
          </div>
        </div>
      </section>

      <section className="page-cta-band">
        <div className="wrap page-cta-band__inner reveal">
          <h2 className="page-cta-band__title">Envie d&apos;intervenir sur le plateau&nbsp;?</h2>
          <p className="page-cta-band__lead">
            Propose un sujet, candidature d&apos;invité, ou partenariat média — on lit chaque message.
          </p>
          <div className="page-cta-band__actions">
            <a href="/#contact" className="btn btn--gold">
              Nous écrire
            </a>
            <a href="/programmes" className="btn btn--ghost page-cta-band__ghost">
              Voir les programmes
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
