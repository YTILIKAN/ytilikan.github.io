import HeroNetwork from './HeroNetwork';

// Preuves concrètes, non chiffrées : tant que les compteurs sont petits, ils
// jouent contre le projet. On met en avant ce qui existe déjà (émissions en
// ligne, code ouvert, gratuité) plutôt que des nombres d'abonnés/vues.
const proofs = [
  { head: 'Déjà en ligne', sub: 'Émissions, débats et formations sur YouTube.' },
  { head: 'Entièrement ouvert', sub: 'Code et projets open-source sur GitHub.' },
  { head: '100 % gratuit', sub: 'Sans paiement ni abonnement, en français.' },
];

export default function Stats() {
  return (
    <section className="section stats-band">
      <HeroNetwork className="stats-band__net" variant="light" densityScale={0.5} />
      <div className="wrap">
        <div className="stats-grid reveal">
          {proofs.map((p) => (
            <div className="stat" key={p.head}>
              <span className="stat__mark" aria-hidden="true">
                <svg viewBox="0 0 12 14" width="12" height="14">
                  <path fill="currentColor" d="M0 0 12 7 0 14Z" />
                </svg>
              </span>
              <span className="stat__head">{p.head}</span>
              <span className="stat__sub">{p.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
