/**
 * Client API pour le landing page Y'TILIKAN.
 * Fetch les donnees depuis l'API Railway, avec fallback sur les donnees hardcodees.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://ytilikan-community-production.up.railway.app';
const API = `${API_BASE}/api/v1`;

interface ShowcaseProject {
  id: number;
  slug: string;
  title: string;
  category: string | null;
  public_summary: string | null;
  impact: string | null;
  github_url: string | null;
  team_size: number | null;
  featured: boolean;
  display_order: number;
  completed_at: string | null;
  members: { user_id: number; display_name: string | null; pseudo: string | null; avatar_url: string | null; role_in_project: string }[];
}

interface PublicEvent {
  id: number;
  type: string | null;
  format: string | null;
  title: string;
  description: string | null;
  starts_at: string | null;
  ends_at: string | null;
  timezone: string;
  visio_url: string | null;
  venue_name: string | null;
  venue_address: string | null;
}

interface PublicMember {
  user_id: number;
  display_name: string | null;
  pseudo: string | null;
  avatar_url: string | null;
  city?: string;
  country?: string;
  bio?: string;
  level?: string;
  languages?: string[];
  interests?: string[];
  links?: Record<string, string>;
}

async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      next: { revalidate: 3600 }, // ISR: revalide toutes les heures
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

/** Recupere les projets vitrine depuis l'API. */
export async function fetchShowcaseProjects(): Promise<ShowcaseProject[]> {
  return (await fetchJSON<ShowcaseProject[]>('/public/projects')) ?? [];
}

/** Recupere les evenements a venir depuis l'API. */
export async function fetchPublicEvents(): Promise<PublicEvent[]> {
  return (await fetchJSON<PublicEvent[]>('/public/events')) ?? [];
}

/** Recupere les membres publics depuis l'API. */
export async function fetchPublicMembers(): Promise<PublicMember[]> {
  return (await fetchJSON<PublicMember[]>('/public/members')) ?? [];
}

export type { ShowcaseProject, PublicEvent, PublicMember };