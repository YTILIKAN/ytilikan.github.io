import { SITE, formatCount } from '@/lib/site';

const stats: { n: number; label: string; sub: string; display?: string }[] = [
  {
    n: SITE.youtube.views,
    label: 'Vues YouTube',
    sub: 'Formations et débats en ligne',
    display: formatCount(SITE.youtube.views),
  },
  { n: SITE.emissionsCount, label: 'Émissions', sub: 'Débats et formations' },
  { n: 4, label: 'Projets open-source', sub: 'AfriBench, AfroLang, AfroTech-Pulse, Dira' },
];

export default function Stats() {
  return (
    <section className="section stats-band">
      <div className="wrap">
        <div className="stats-grid reveal">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat__n" data-target={s.n} data-display={s.display}>
                {s.display ?? '0'}
              </span>
              <span className="stat__label">{s.label}</span>
              <span className="stat__sub">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
