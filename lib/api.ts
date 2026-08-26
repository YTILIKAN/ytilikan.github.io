/**
 * Client API landing ← CMS Y'TILIKAN.
 *
 * La landing (repo ytilikan.github.io) lit l'API publique du CMS, qui lit/écrit
 * PostgreSQL (repo ytilikan-community). Contenu éditorial + projets + événements.
 *
 * Variable d'environnement Vercel / Railway de la landing :
 *   NEXT_PUBLIC_API_URL=https://community-api.ytilikan.org
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://community-api.ytilikan.org";
const API = `${API_BASE.replace(/\/$/, "")}/api/v1`;

export type ShowcaseProject = {
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
  members: {
    user_id: number;
    display_name: string | null;
    pseudo: string | null;
    avatar_url: string | null;
    role_in_project: string;
  }[];
};

export type PublicEvent = {
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
};

export type SiteEmission = {
  id: number;
  title: string;
  format: string;
  duration_minutes: number;
  aired_on: string | null;
  youtube_url: string;
  youtube_id: string | null;
  view_count: number;
  guest: string | null;
  summary: string | null;
};

export type SiteProgramme = {
  id: number;
  index_label: string;
  kick: string;
  title: string;
  duration: string;
  body: string;
  points: string[];
  coming_soon: boolean;
};

export type SiteTeamMember = {
  id: number;
  name: string;
  role: string;
  tag: string;
  bio: string;
  initials: string;
  photo_url: string | null;
  linkedin_url: string | null;
};

export type SiteFaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type PublicSiteContent = {
  emissions: SiteEmission[];
  programmes: SiteProgramme[];
  team: SiteTeamMember[];
  faq: SiteFaqItem[];
};

async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      next: { revalidate: 300, tags: ["site-content"] },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchPublicSite(): Promise<PublicSiteContent> {
  return (
    (await fetchJSON<PublicSiteContent>("/public/site")) ?? {
      emissions: [],
      programmes: [],
      team: [],
      faq: [],
    }
  );
}

export async function fetchShowcaseProjects(): Promise<ShowcaseProject[]> {
  return (await fetchJSON<ShowcaseProject[]>("/public/projects")) ?? [];
}

export async function fetchPublicEvents(): Promise<PublicEvent[]> {
  return (await fetchJSON<PublicEvent[]>("/public/events")) ?? [];
}

/** Formate une durée en minutes vers "H:MM:SS" (ou "M:SS"). */
export function formatDuration(min: number): string {
  if (!min) return '';
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:00`;
  return `${m}:00`;
}

/** Extrait l'identifiant YouTube d'une URL (watch, youtu.be, embed). */
export function extractYoutubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|\/embed\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}