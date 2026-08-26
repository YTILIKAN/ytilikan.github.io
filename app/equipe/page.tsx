import type { Metadata } from 'next';
import PageShell from '@/app/components/PageShell';
import PageHero from '@/app/components/PageHero';
import { resolveTeam } from '@/app/components/Equipe';
import { fetchPublicTeam } from '@/lib/api';

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Équipe · Y'TILIKAN",
  description:
    "Les visages derrière Y'TILIKAN : opérations, technique, pédagogie, médias, partenariats, compétitions et team building.",
  alternates: { canonical: '/equipe' },
};

export default async function EquipePage() {
  const membres = resolveTeam(await fetchPublicTeam());
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
                      <span className="tm__initials">{m.initials}</span>
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
            <a href="https://community.ytilikan.org/connexion" className="btn btn--ghost page-cta-band__ghost">
              Rejoindre l&apos;espace membre
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
