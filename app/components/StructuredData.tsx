import { SITE, SITE_URL } from '@/lib/site';

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: "Y'TILIKAN",
  url: SITE_URL,
  description: "La tech et l'IA à la portée de l'Afrique francophone",
  logo: new URL('/logo.jpeg', SITE_URL).href,
  sameAs: [SITE.youtube.url, SITE.github],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
    />
  );
}
