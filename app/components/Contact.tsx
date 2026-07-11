import { SITE } from '@/lib/site';

const CHANNEL = SITE.youtube.url;
const EMAIL = SITE.email;

const footLinks = [
  { href: '/essence', label: 'Essence' },
  { href: '/participer', label: 'Participer' },
  { href: '/emissions', label: 'Émissions' },
  { href: '/programmes', label: 'Programmes' },
  { href: '/projets', label: 'Projets' },
  { href: '/equipe', label: 'Équipe' },
  { href: '/faq', label: 'FAQ' },
];

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <>
      <section className="contact" id="contact" aria-labelledby="contact-title">
        <svg className="contact__pattern" aria-hidden="true">
          <rect width="100%" height="100%" fill="url(#maskpat)" />
        </svg>
        <div className="wrap contact__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-white.jpg"
            alt=""
            className="contact__logo reveal"
            width={76}
            height={76}
            loading="lazy"
            decoding="async"
          />
          <h2 className="contact__title reveal" id="contact-title" data-delay="80">
            Construisons une Afrique qui comprend
            <br />
            la technologie <em>parce qu&apos;on y participe pleinement.</em>
          </h2>
          <p className="contact__lead reveal" data-delay="160">
            Une question, une idée, une proposition de collaboration : le formulaire ci-dessous nous
            arrive directement.
          </p>

          <div className="cform-block reveal">
            <h3 className="cform-block__title">Une question, une idée ? Écris-nous.</h3>
            <p className="cform-block__sub">On répond à chaque message, toujours.</p>

            <form className="cform" id="contact-form" data-key={SITE.web3formsKey}>
              <input type="hidden" name="access_key" defaultValue={SITE.web3formsKey} />
              <input type="hidden" name="from_name" defaultValue="Formulaire Y'TILIKAN" />
              <input
                type="checkbox"
                name="botcheck"
                className="cform__hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="cform__grid">
                <div className="cform__field">
                  <label htmlFor="cf-name">Nom</label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Ton nom"
                  />
                </div>
                <div className="cform__field">
                  <label htmlFor="cf-email">Email</label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="toi@exemple.com"
                  />
                </div>
              </div>

              <div className="cform__field">
                <label htmlFor="cf-subject">Sujet</label>
                <select id="cf-subject" name="subject" required defaultValue="">
                  <option value="" disabled>
                    Choisis un sujet
                  </option>
                  <option value="invite">Devenir invité ou intervenant</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="ecole">École ou institution</option>
                  <option value="contribuer">Contribuer aux projets</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="cform__field">
                <label htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Dis-nous tout…"
                ></textarea>
              </div>

              <button type="submit" className="btn btn--gold cform__submit">
                Envoyer le message
              </button>
              <p className="cform__status" role="status" aria-live="polite"></p>
            </form>

            <p className="cform-block__fallback">
              Ou directement par email : <a href={EMAIL}>{SITE.emailAddress}</a>
            </p>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap foot__grid">
          <div className="foot__brand">
            <div className="foot__lock">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-white.jpg"
                alt=""
                className="foot__logo"
                width={52}
                height={52}
                loading="lazy"
                decoding="async"
              />
              <span className="foot__wm">Y&apos;TILIKAN</span>
            </div>
            <p className="foot__desc">
              Y&apos;TILIKAN rend la tech et l&apos;IA accessibles à l&apos;Afrique francophone.
              Émissions, formations et projets open-source, gratuits et en français.
            </p>
          </div>
          <nav className="foot__nav" aria-label="Liens du pied de page">
            {footLinks.map((l) => (
              <a href={l.href} key={l.href}>
                {l.label}
              </a>
            ))}
            <a href={CHANNEL} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
            <a href="mailto:contact@ytilikan.com">Contact</a>
          </nav>
        </div>
        <div className="wrap foot__row">
          <span className="foot__meta">© {year} Y&apos;TILIKAN · Tous droits réservés</span>
          <span className="foot__meta foot__meta--gold">La connaissance, c&apos;est le pouvoir.</span>
        </div>
      </footer>
    </>
  );
}
