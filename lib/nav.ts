export const NAV_LINKS = [
  { href: '/essence', label: 'Essence', id: 'essence' },
  { href: '/participer', label: 'Participer', id: 'participer' },
  { href: '/emissions', label: 'Émissions', id: 'emissions' },
  { href: '/programmes', label: 'Programmes', id: 'programmes' },
  { href: '/projets', label: 'Projets', id: 'projets' },
  { href: '/equipe', label: 'Équipe', id: 'equipe' },
  { href: '/faq', label: 'FAQ', id: 'faq' },
] as const;

export type NavLinkId = (typeof NAV_LINKS)[number]['id'];
