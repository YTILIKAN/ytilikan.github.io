const items = [
  'Intelligence artificielle',
  'Formations gratuites',
  'Open-source',
  'Émissions & débats',
  'Souveraineté numérique',
  'Vibe coding',
  'Afrique francophone',
  'Le savoir, c’est le pouvoir',
];

export default function Marquee() {
  const track = [...items, ...items];
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {track.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__dot">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
