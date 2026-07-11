import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const routes = [
  '/',
  '/essence',
  '/participer',
  '/emissions',
  '/programmes',
  '/projets',
  '/equipe',
  '/faq',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: new URL(path, SITE_URL).href,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
