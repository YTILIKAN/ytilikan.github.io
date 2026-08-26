/**
 * Client public de la landing Y'TILIKAN.
 *
 * La landing **lit** l’API (sans auth). Le CMS
 * (`community.ytilikan.org/admin/site`) **écrit** en PostgreSQL.
 *
 * Bundle recommandé : GET /api/v1/public/site
 * ISR : un enregistrement éditeur apparaît sans redéployer Vercel.
 */

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ?? 'https://community-api.ytilikan.org'
).replace(/\/$/, '');
const API = `${API_BASE}/api/v1`;

/** HTML régénéré toutes les 5 minutes. */
export const CMS_REVALIDATE_SECONDS = 300;

type Raw = Record<string, unknown>;

export type ShowcaseMember = {
  user_id: number;
  display_name: string | null;
  pseudo: string | null;
  avatar_url: string | null;
  role_in_project: string;
};

export type ShowcaseDeliverable = {
  kind: string;
  label: string;
  url: string;
};

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
  members: ShowcaseMember[];
  deliverables?: ShowcaseDeliverable[];
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

export type PublicMember = {
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
};

/** Contrat public (snake_case) aligné sur les mappeurs CMS `*FromApi`. */
export type PublicEmission = {
  id: number | string;
  title: string;
  format: string | null;
  duration_minutes: number | null;
  aired_on: string | null;
  status: string | null;
  youtube_url: string | null;
  youtube_id: string | null;
  view_count: number | null;
  guest: string | null;
  summary: string | null;
};

export type PublicProgramme = {
  id: number | string;
  index_label: string | null;
  kick: string | null;
  title: string;
  duration: string | null;
  body: string | null;
  points: string[];
  coming_soon: boolean;
};

export type PublicTeamMember = {
  id: number | string;
  name: string;
  role: string | null;
  tag: string | null;
  bio: string | null;
  initials: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
};

export type PublicFaqItem = {
  id: number | string;
  question: string;
  answer: string;
  is_published: boolean;
};

export type PublicSite = {
  emissions: PublicEmission[];
  programmes: PublicProgramme[];
  team: PublicTeamMember[];
  faq: PublicFaqItem[];
};

export const EMPTY_SITE: PublicSite = {
  emissions: [],
  programmes: [],
  team: [],
  faq: [],
};

function asRaw(value: unknown): Raw | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Raw)
    : null;
}

function pick(obj: Raw, ...keys: string[]): unknown {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      return obj[key];
    }
  }
  return undefined;
}

function asString(value: unknown): string | null {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  }
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function asBoolean(value: unknown): boolean {
  return value === true || value === 1 || value === '1' || value === 'true';
}

function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => asString(item))
      .filter((item): item is string => Boolean(item));
  }
  const text = asString(value);
  if (!text) return [];
  return text
    .split(/\r?\n|·|\u2022|;/g)
    .map((part) => part.replace(/^[-–•]\s*/, '').trim())
    .filter(Boolean);
}

function asId(value: unknown, fallback: string): number | string {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const text = asString(value);
  return text ?? fallback;
}

/** Identifiant YouTube depuis une URL, un id nu, ou un champ dédié. */
export function youtubeIdFrom(input: string | null | undefined): string | null {
  if (!input) return null;
  const s = input.trim();
  const fromUrl = s.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/|img\.youtube\.com\/vi\/)([\w-]{6,})/,
  );
  if (fromUrl?.[1]) return fromUrl[1];
  if (/^[\w-]{11}$/.test(s)) return s;
  return null;
}

export function formatDurationMinutes(total: number | null): string | null {
  if (total == null || !Number.isFinite(total) || total < 0) return null;
  const safe = Math.round(total);
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:00`;
  return `${minutes}:00`;
}

function isPublished(obj: Raw): boolean {
  const status = asString(pick(obj, 'status', 'statut'));
  if (status) {
    const normalized = status.toLowerCase();
    if (['draft', 'brouillon', 'hidden', 'masqué', 'masquee'].includes(normalized)) {
      return false;
    }
  }
  const flag = pick(obj, 'is_published', 'publiee', 'publiée', 'published', 'visible');
  if (flag === false || flag === 0 || flag === 'false') return false;
  return true;
}

export function normalizeEmission(raw: unknown, index = 0): PublicEmission | null {
  const obj = asRaw(raw);
  if (!obj || !isPublished(obj)) return null;
  const title = asString(pick(obj, 'title', 'titre', 'name'));
  if (!title) return null;
  const youtubeUrl = asString(pick(obj, 'youtube_url', 'youtubeUrl', 'url', 'video_url'));
  const youtubeId =
    youtubeIdFrom(asString(pick(obj, 'youtube_id', 'youtubeId', 'video_id'))) ??
    youtubeIdFrom(youtubeUrl);
  return {
    id: asId(pick(obj, 'id'), `emission-${index}`),
    title,
    format: asString(pick(obj, 'format', 'kick', 'category')),
    duration_minutes: asNumber(
      pick(obj, 'duration_minutes', 'duree_minutes', 'dureeMinutes', 'duree'),
    ),
    aired_on: asString(pick(obj, 'aired_on', 'date', 'published_at')),
    status: asString(pick(obj, 'status', 'statut')),
    youtube_url: youtubeUrl,
    youtube_id: youtubeId,
    view_count: asNumber(pick(obj, 'view_count', 'vues', 'views')),
    guest: asString(pick(obj, 'guest', 'invite', 'invité')),
    summary: asString(pick(obj, 'summary', 'resume', 'résumé', 'description')),
  };
}

export function normalizeProgramme(raw: unknown, index = 0): PublicProgramme | null {
  const obj = asRaw(raw);
  if (!obj || !isPublished(obj)) return null;
  const title = asString(pick(obj, 'title', 'titre', 'name'));
  if (!title) return null;
  return {
    id: asId(pick(obj, 'id'), `programme-${index}`),
    index_label: asString(pick(obj, 'index_label', 'index')),
    kick: asString(pick(obj, 'kick', 'nom', 'label', 'category', 'format')),
    title,
    duration: asString(pick(obj, 'duration', 'duree', 'meta')),
    body: asString(pick(obj, 'body', 'description', 'summary', 'resume')),
    points: asStringList(pick(obj, 'points', 'points_cles', 'pointsCles', 'highlights')),
    coming_soon: asBoolean(pick(obj, 'coming_soon', 'soon', 'bientot', 'bientôt')),
  };
}

export function normalizeTeamMember(raw: unknown, index = 0): PublicTeamMember | null {
  const obj = asRaw(raw);
  if (!obj || !isPublished(obj)) return null;
  const name = asString(pick(obj, 'name', 'nom', 'display_name', 'full_name', 'fullName'));
  if (!name) return null;
  return {
    id: asId(pick(obj, 'id', 'user_id'), `team-${index}`),
    name,
    role: asString(pick(obj, 'role', 'poste', 'title')),
    tag: asString(pick(obj, 'tag', 'pole', 'pôle', 'badge')),
    bio: asString(pick(obj, 'bio', 'body', 'description')),
    initials: asString(pick(obj, 'initials', 'initiales')),
    photo_url: asString(
      pick(obj, 'photo_url', 'photoUrl', 'photo', 'avatar_url', 'avatarUrl'),
    ),
    linkedin_url: asString(pick(obj, 'linkedin_url', 'linkedinUrl', 'linkedin')),
  };
}

export function normalizeFaqItem(raw: unknown, index = 0): PublicFaqItem | null {
  const obj = asRaw(raw);
  if (!obj || !isPublished(obj)) return null;
  const question = asString(pick(obj, 'question', 'q', 'title', 'titre'));
  const answer = asString(pick(obj, 'answer', 'reponse', 'réponse', 'a', 'body'));
  if (!question || !answer) return null;
  return {
    id: asId(pick(obj, 'id'), `faq-${index}`),
    question,
    answer,
    is_published: true,
  };
}

function unwrapList(raw: unknown): unknown {
  if (Array.isArray(raw)) return raw;
  const obj = asRaw(raw);
  if (!obj) return raw;
  return pick(obj, 'items', 'results', 'data') ?? raw;
}

function normalizeList<T>(
  raw: unknown,
  map: (item: unknown, index: number) => T | null,
): T[] {
  const list = unwrapList(raw);
  if (!Array.isArray(list)) return [];
  return list.map(map).filter((item): item is T => item != null);
}

export function normalizeSite(raw: unknown): PublicSite {
  const obj = asRaw(raw);
  if (!obj) return { ...EMPTY_SITE };
  return {
    emissions: normalizeList(pick(obj, 'emissions', 'videos', 'episodes'), normalizeEmission),
    programmes: normalizeList(pick(obj, 'programmes', 'programs'), normalizeProgramme),
    team: normalizeList(pick(obj, 'team', 'equipe', 'members'), normalizeTeamMember),
    faq: normalizeList(pick(obj, 'faq', 'faqs', 'questions'), normalizeFaqItem),
  };
}

function siteHasContent(site: PublicSite): boolean {
  return Boolean(
    site.emissions.length || site.programmes.length || site.team.length || site.faq.length,
  );
}

async function fetchJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['cms-public'] },
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Bundle éditorial public. Si l’endpoint n’est pas encore déployé,
 * retombe sur les endpoints individuels, puis sur des listes vides
 * (le contenu en dur des sections sert alors de filet).
 */
export async function fetchPublicSite(): Promise<PublicSite> {
  const bundled = await fetchJSON<unknown>('/public/site');
  const fromBundle = bundled ? normalizeSite(bundled) : null;
  if (fromBundle && siteHasContent(fromBundle)) return fromBundle;

  const [emissions, programmes, team, faq] = await Promise.all([
    fetchJSON<unknown>('/public/emissions'),
    fetchJSON<unknown>('/public/programmes'),
    fetchJSON<unknown>('/public/team'),
    fetchJSON<unknown>('/public/faq'),
  ]);

  return {
    emissions: normalizeList(emissions, normalizeEmission),
    programmes: normalizeList(programmes, normalizeProgramme),
    team: normalizeList(team, normalizeTeamMember),
    faq: normalizeList(faq, normalizeFaqItem),
  };
}

async function fetchSlice<T>(
  path: string,
  map: (item: unknown, index: number) => T | null,
  bundleKey: keyof PublicSite,
): Promise<T[]> {
  const direct = normalizeList(await fetchJSON<unknown>(path), map);
  if (direct.length) return direct;
  const bundled = await fetchJSON<unknown>('/public/site');
  return bundled ? (normalizeSite(bundled)[bundleKey] as T[]) : [];
}

export async function fetchPublicEmissions(): Promise<PublicEmission[]> {
  return fetchSlice('/public/emissions', normalizeEmission, 'emissions');
}

export async function fetchPublicProgrammes(): Promise<PublicProgramme[]> {
  return fetchSlice('/public/programmes', normalizeProgramme, 'programmes');
}

export async function fetchPublicTeam(): Promise<PublicTeamMember[]> {
  return fetchSlice('/public/team', normalizeTeamMember, 'team');
}

export async function fetchPublicFaq(): Promise<PublicFaqItem[]> {
  return fetchSlice('/public/faq', normalizeFaqItem, 'faq');
}

/** Projets vitrine (espace membre `showcased` — pas le CMS éditorial). */
export async function fetchShowcaseProjects(): Promise<ShowcaseProject[]> {
  const data = await fetchJSON<ShowcaseProject[]>('/public/projects');
  return Array.isArray(data) ? data : [];
}

/** Événements publics à venir. */
export async function fetchPublicEvents(): Promise<PublicEvent[]> {
  const data = await fetchJSON<PublicEvent[]>('/public/events');
  return Array.isArray(data) ? data : [];
}

/** Annuaire membres publics (distinct de l’équipe éditoriale). */
export async function fetchPublicMembers(): Promise<PublicMember[]> {
  const data = await fetchJSON<PublicMember[]>('/public/members');
  return Array.isArray(data) ? data : [];
}

/** Photos locales : filet si le CMS n’envoie pas encore d’image. */
const LOCAL_TEAM_PHOTOS: Record<string, string> = {
  'hamel brayan': '/team/hamel-brayan.png',
  'michel azarias': '/team/michel-azarias.png',
  'christian nebot': '/team/christian-nebot.png',
  'stelle matha': '/team/stelle-matha.png',
  'honorine guehara': '/team/honorine-guehara.jpg',
  'balla moussa': '/team/balla-moussa.png',
  'hilary madjou': '/team/hilary-madjou.jpg',
};

function nameKey(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function teamPhotoUrl(member: PublicTeamMember): string | null {
  if (member.photo_url) return member.photo_url;
  return LOCAL_TEAM_PHOTOS[nameKey(member.name)] ?? null;
}

export function teamInitials(member: { name: string; initials?: string | null }): string {
  if (member.initials?.trim()) return member.initials.trim().slice(0, 2).toUpperCase();
  return member.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

/** Liste CMS si elle contient au moins un élément, sinon le filet en dur. */
export function withCmsFallback<T>(items: T[] | null | undefined, fallback: T[]): T[] {
  return items && items.length > 0 ? items : fallback;
}
