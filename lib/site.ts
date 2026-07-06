/** Constantes partagées — mettre à jour les chiffres YouTube à la main si besoin. */
export const SITE = {
  youtube: {
    url: 'https://www.youtube.com/@YTILIKAN',
    subscribers: 41,
    views: 677,
  },
  github: 'https://github.com/YTILIKAN',
  email: 'mailto:contact@ytilikan.com',
  emailAddress: 'contact@ytilikan.com',
  emissionsCount: 6,
  // Clé d'accès Web3Forms : active l'envoi du formulaire de contact.
  web3formsKey: '9fb72e4f-6797-44a5-9e15-bef9b54475cd',
} as const;

/** URL canonique du site — configurable via NEXT_PUBLIC_SITE_URL sur Vercel. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ytilikan.vercel.app';

export function formatCount(n: number): string {
  return n.toLocaleString('fr-FR');
}
