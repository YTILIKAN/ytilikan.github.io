type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
};

export default function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <header className="page-hero reveal">
      <div className="wrap">
        <a href="/" className="page-hero__back">
          ← Accueil
        </a>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__lead">{lead}</p>
      </div>
    </header>
  );
}
