import type { Metadata } from 'next';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import { resolveProgrammes } from '@/app/components/Programmes';
import { SITE } from '@/lib/site';
import { fetchPublicProgrammes } from '@/lib/api';

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Programmes · Y'TILIKAN",
  description:
    "Émission phare, formations tech et mentorat : les formats Y'TILIKAN pour informer, former et accompagner.",
  alternates: { canonical: '/programmes' },
};

export default async function ProgrammesPage() {
  const programmes = resolveProgrammes(await fetchPublicProgrammes());
  return (
    <PageShell active="programmes">
      <PageHero
        eyebrow="03 / Nos programmes"
        title="Informer, former, accompagner."
        lead="Des formats complémentaires pour toucher tous les publics, du simple curieux au professionnel du numérique."
      />

      <section className="page-section">
        <div className="wrap">
          <div className="prog-detail-list">
            {programmes.map((p, i) => (
              <article className="prog-detail reveal" key={p.title}>
                <div className="prog-detail__meta">
                  <span className="prog-detail__n">0{i + 1}</span>
                  <span className="pcard__kick">{p.kick}</span>
                  <span className="pcard__dur">{p.duration}</span>
                </div>
                <h2 className="prog-detail__title">
                  {p.title}
                  {p.soon && <span className="pcard__badge">Bientôt</span>}
                </h2>
                <p className="prog-detail__body">{p.detail}</p>
                <p className="prog-detail__summary">{p.body}</p>
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

      <section className="page-cta-band">
        <div className="wrap page-cta-band__inner reveal">
          <h2 className="page-cta-band__title">Suivre ou rejoindre un programme</h2>
          <p className="page-cta-band__lead">
            Les formations et débats sont sur YouTube. Pour le mentorat ou une intervention, contacte-nous.
          </p>
          <div className="page-cta-band__actions">
            <a href={SITE.youtube.url} target="_blank" rel="noopener noreferrer" className="btn btn--gold">
              Voir la chaîne
            </a>
            <a href="/#contact" className="btn btn--ghost page-cta-band__ghost">
              Candidater / collaborer
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
