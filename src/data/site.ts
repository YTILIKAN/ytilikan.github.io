/** Constantes partagées — mettre à jour les chiffres YouTube à la main si besoin. */
export const SITE = {
  youtube: {
    url: 'https://www.youtube.com/@YTILIKAN',
    subscribers: 41,
    views: 677,
  },
  github: 'https://github.com/YTILIKAN',
  email: 'mailto:contact@ytilikan.com',
  emissionsCount: 6,
} as const;

export function formatCount(n: number): string {
  return n.toLocaleString('fr-FR');
}
