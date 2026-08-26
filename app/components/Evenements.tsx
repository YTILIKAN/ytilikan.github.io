'use client';

import type { PublicEvent } from '@/lib/api';

function formatDate(iso: string | null, timezone: string): string {
  if (!iso) return 'Date a confirmer';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  });
}

function typeLabel(type: string | null): string {
  switch (type) {
    case 'webinaire': return 'Webinaire';
    case 'talk_membre': return 'Talk membre';
    case 'atelier': return 'Atelier';
    case 'meetup': return 'Meetup';
    case 'conference': return 'Conference';
    default: return 'Evenement';
  }
}

function formatLabel(format: string | null): string {
  switch (format) {
    case 'en_ligne': return 'En ligne';
    case 'presentiel': return 'Presentiel';
    case 'hybride': return 'Hybride';
    default: return '';
  }
}

export default function Evenements({ events }: { events: PublicEvent[] }) {
  if (events.length === 0) return null;

  return (
    <section className="section" id="evenements">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Evenements a venir</span>
          <h2 className="sec-title">Nos prochains evenements.</h2>
          <p className="lead">
            Webinaires, ateliers et conferences pour apprendre et echanger.
          </p>
        </div>

        <div className="pj-list reveal">
          {events.map((evt) => (
            <article className="pj" key={evt.id}>
              <div className="pj__top">
                <span className="pj__tag">{typeLabel(evt.type)}</span>
                <span className="pj__status pj__status--live">
                  {formatLabel(evt.format)}
                </span>
              </div>
              <h3 className="pj__name">{evt.title}</h3>
              {evt.description && <p className="pj__desc">{evt.description}</p>}
              <p className="pj__authors" style={{ color: 'var(--ocre)', fontWeight: 500 }}>
                {formatDate(evt.starts_at, evt.timezone)}
              </p>
              {evt.visio_url && (
                <div className="pj__foot" style={{ marginTop: '0.75rem' }}>
                  <div className="pj__links">
                    <a
                      href={evt.visio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pj__link pj__link--web"
                    >
                      Lien visio
                    </a>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}