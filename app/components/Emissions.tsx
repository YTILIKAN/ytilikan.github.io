import { SITE } from '@/lib/site';

const CHANNEL = SITE.youtube.url;

const videos = [
  { kick: 'Formation', title: 'Formation : Vibe Coding avec l’IA', meta: '1:35:04', id: '4zQ-YN_SvlU' },
  {
    kick: 'Grand Débat Tech',
    title: 'Faut-il craindre l’intelligence artificielle en milieu scolaire ?',
    meta: '1:16:07',
    id: 'nu59ufftqZ4',
  },
  { kick: 'Formation', title: 'Augmenter sa productivité avec l’IA', meta: '1:08:22', id: 'i_7SlR1bUEk' },
  {
    kick: 'Grand Débat Tech',
    title: 'L’IA va-t-elle détruire nos emplois ou créer de nouvelles opportunités ?',
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
    title: 'Apprendre à coder avec l’IA ? Voici la formation Vibe Coding',
    meta: '1:34',
    id: 'hVGZZT45Qxs',
  },
];

export default function Emissions() {
  return (
    <section className="section" id="emissions">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">02 / Nos émissions</span>
          <h2 className="sec-title">Nos émissions, déjà en ligne.</h2>
          <p className="lead">
            Débats et formations, déjà en ligne sur notre chaîne. L’IA à l’école, le vibe
            coding, la productivité, la place de l’Afrique dans la tech.
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
                  <svg viewBox="0 0 24 24" width="22" height="22">
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
          <a href="/emissions" className="btn btn--indigo">
            Toutes les émissions
          </a>
          <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="btn btn--gold">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"
              />
            </svg>
            Chaîne YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
