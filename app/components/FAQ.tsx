const faqs = [
  {
    q: 'Est-ce vraiment gratuit ?',
    a: 'Oui, entièrement. Émissions, formations et outils sont accessibles sans paiement ni abonnement. Notre modèle repose sur le partage, pas sur la vente.',
  },
  {
    q: 'Faut-il des connaissances en informatique pour suivre ?',
    a: "Non. Nos contenus partent de zéro et expliquent étape par étape, sans jargon. « Ce n'est pas sorcier » n'est pas qu'un slogan : c'est notre méthode.",
  },
  {
    q: 'Que veut dire « open-source » concrètement ?',
    a: 'Notre code et nos jeux de données sont publics sur GitHub. Chacun peut les consulter, les réutiliser et les améliorer librement.',
  },
  {
    q: "À qui s'adresse Y'TILIKAN ?",
    a: 'À toute l\'Afrique francophone et sa diaspora : étudiants, professionnels, curieux. Nos contenus sont en français et pensés pour les réalités du continent, du Cameroun au Sénégal.',
  },
  {
    q: 'Comment participer à une émission ou proposer un sujet ?',
    a: 'Écris-nous via le formulaire ci-dessous ou par email. Nous cherchons régulièrement des invités, des intervenants et des partenaires.',
  },
  {
    q: 'Comment contribuer aux projets ?',
    a: 'Rends-toi sur notre GitHub : les issues, pull requests et jeux de données sont ouverts aux contributions, quel que soit ton niveau.',
  },
];

export default function FAQ() {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">06 / Questions fréquentes</span>
          <h2 className="sec-title" id="faq-title">
            Ce que vous nous demandez.
          </h2>
          <p className="lead">
            Les réponses aux questions qu&apos;on nous pose le plus souvent. Une autre en tête ?
            Écris-nous.
          </p>
          <a href="/faq" className="section-more">
            FAQ complète →
          </a>
        </div>

        <ul className="faq-list reveal">
          {faqs.map((item) => (
            <li className="faq-item" key={item.q}>
              <details className="faq-details">
                <summary className="faq-q">
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true"></span>
                </summary>
                <p className="faq-a">{item.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
