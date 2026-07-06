import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE_URL } from '@/lib/site';

const title = "Y'TILIKAN · La tech et l'IA à la portée de l'Afrique francophone";
const description =
  "Formations gratuites, émissions et outils open-source pour rendre l'Afrique francophone technologiquement souveraine. Comprendre, maîtriser et créer la tech et l'IA.";
const ogImage = '/logo.jpeg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: '/' },
  icons: { icon: '/logo.jpeg' },
  openGraph: {
    type: 'website',
    url: '/',
    title,
    description,
    images: [{ url: ogImage }],
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0806',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: "Y'TILIKAN",
  url: SITE_URL,
  logo: new URL('/logo.jpeg', SITE_URL).href,
  description,
  sameAs: ['https://www.youtube.com/@YTILIKAN'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap"
        />
        <link rel="preload" as="image" href="/hero-bg.jpg" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
