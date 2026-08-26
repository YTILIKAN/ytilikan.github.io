/**
 * Client public pour la landing Y'TILIKAN.
 *
 * La landing **lit** l’API (sans auth). Le CMS
 * (`community.ytilikan.org/admin/site`) **écrit** en PostgreSQL.
 *
 * Bundle recommandé : GET /api/v1/public/site
 * Revalidation ISR : quelques minutes — un enregistrement éditeur
 * apparaît sans redéployer GitHub Pages / Vercel.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://community-api.ytilikan.org';
const API = `${API_BASE.replace(/\/$/, '')}/api/v1`;

/** ISR : le HTML se régénère toutes les 5 minutes. */
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
  deliverables: ShowcaseDeliverable[];
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

/** Émission publiée (CMS → landing). */
export type PublicEmission = {
  id: string | number;
  title: string;
  format: string | null;
  youtube_id: string | null;
  youtube_url: string | null;
  duration: string | null;
  duration_minutes: number | null;
  guest: string | null;
  summary: string | null;
  published_at: string | null;
};

/** Programme / format éditorial. */
export type PublicProgramme = {
  id: string | number;
  kick: string | null;
  title: string;
  duration: string | null;
  body: string | null;
  detail: string | null;
  points: string[];
  soon: boolean;
};

/** Membre de l’équipe vitrine (back-office éditorial, pas l’annuaire membres). */
export type PublicTeamMember = {
  id: string | number;
  name: string;
  role: string | null;
  tag: string | null;
  bio: string | null;
  detail: string | null;
  photo_url: string | null;
  linkedin: string | null;
  initials: string | null;
};

export type PublicFaqItem = {
  id: string | number;
  question: string;
  answer: string;
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
  if (value === true || value === 1 || value === '1' || value === 'true') return true;
  return false;
}

function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => asString(item)).filter((item): item is string => Boolean(item));
  }
  const text = asString(value);
  if (!text) return [];
  return text
    .split(/\r?\n|·|\u2022|;/g)
    .map((part) => part.replace(/^[-–•]\s*/, '').trim())
    .filter(Boolean);
}

function asId(value: unknown, fallback: string): string | number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const text = asString(value);
  return text ?? fallback;
}

/** Extrait un identifiant YouTube depuis une URL, un id nu, ou un champ dédié. */
export function youtubeIdFrom(input: string | null | undefined): string | null {
  if (!input) return null;
  const s = input.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/|img\.youtube\.com\/vi\/)([\w-]{11})/,
    /^([\w-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = s.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

function formatMinutes(total: number): string {
  const safe = Math.max(0, Math.round(total));
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:00`;
  return `${minutes}:00`;
}

function isPublished(obj: Raw): boolean {
  const statut = asString(pick(obj, 'statut', 'status'));
  if (statut) {
    const normalized = statut.toLowerCase();
    if (['brouillon', 'draft', 'masqué', 'masquee', 'hidden'].includes(normalized)) {
      return false;
    }
  }
  const flag = pick(
    obj,
    'publiee',
    'publiée',
    'published',
    'is_published',
    'visible',
  );
  if (flag === false || flag === 0 || flag === 'false') return false;
  return true;
}

export function normalizeEmission(raw: unknown, index = 0): PublicEmission | null {
  const obj = asRaw(raw);
  if (!obj || !isPublished(obj)) return null;
  const title = asString(pick(obj, 'title', 'titre', 'name'));
  if (!title) return null;
  const youtubeUrl = asString(
    pick(obj, 'youtube_url', 'youtubeUrl', 'url', 'video_url'),
  );
  const youtubeId =
    youtubeIdFrom(asString(pick(obj, 'youtube_id', 'youtubeId', 'video_id'))) ??
    youtubeIdFrom(youtubeUrl);
  const minutes = asNumber(
    pick(obj, 'duration_minutes', 'duree_minutes', 'dureeMinutes', 'duree'),
  );
  const duration =
    asString(pick(obj, 'duration', 'duree_label', 'meta')) ??
    (minutes != null ? formatMinutes(minutes) : null);

  return {
    id: asId(pick(obj, 'id'), `emission-${index}`),
    title,
    format: asString(pick(obj, 'format', 'kick', 'category')),
    youtube_id: youtubeId,
    youtube_url: youtubeUrl,
    duration,
    duration_minutes: minutes,
    guest: asString(pick(obj, 'guest', 'invite', 'invité')),
    summary: asString(pick(obj, 'summary', 'resume', 'résumé', 'description')),
    published_at: asString(pick(obj, 'published_at', 'date', 'publishedAt')),
  };
}

export function normalizeProgramme(raw: unknown, index = 0): PublicProgramme | null {
  const obj = asRaw(raw);
  if (!obj || !isPublished(obj)) return null;
  const title = asString(pick(obj, 'title', 'titre', 'name'));
  if (!title) return null;
  const body = asString(pick(obj, 'body', 'description', 'summary', 'resume'));
  const detail = asString(pick(obj, 'detail', 'long_description', 'texte'));
  return {
    id: asId(pick(obj, 'id'), `programme-${index}`),
    kick: asString(pick(obj, 'kick', 'nom', 'label', 'category', 'format')),
    title,
    duration: asString(pick(obj, 'duration', 'duree', 'meta')),
    body,
    detail: detail ?? body,
    points: asStringList(pick(obj, 'points', 'points_cles', 'pointsCles', 'highlights')),
    soon: asBoolean(pick(obj, 'soon', 'bientot', 'bientôt')),
  };
}

export function normalizeTeamMember(raw: unknown, index = 0): PublicTeamMember | null {
  const obj = asRaw(raw);
  if (!obj || !isPublished(obj)) return null;
  const name = asString(
    pick(obj, 'name', 'nom', 'display_name', 'full_name', 'fullName'),
  );
  if (!name) return null;
  const bio = asString(pick(obj, 'bio', 'body', 'description'));
  const detail = asString(pick(obj, 'detail', 'long_bio', 'texte'));
  return {
    id: asId(pick(obj, 'id', 'user_id'), `team-${index}`),
    name,
    role: asString(pick(obj, 'role', 'poste', 'title')),
    tag: asString(pick(obj, 'tag', 'pole', 'pôle', 'badge')),
    bio,
    detail: detail ?? bio,
    photo_url: asString(
      pick(obj, 'photo_url', 'photoUrl', 'photo', 'avatar_url', 'avatarUrl'),
    ),
    linkedin: asString(pick(obj, 'linkedin', 'linkedin_url', 'linkedinUrl')),
    initials: asString(pick(obj, 'initials', 'initiales')),
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
  };
}

function normalizeList<T>(
  raw: unknown,
  map: (item: unknown, index: number) => T | null,
): T[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(map).filter((item): item is T => item != null);
}

export function normalizeSite(raw: unknown): PublicSite {
  const obj = asRaw(raw);
  if (!obj) return { ...EMPTY_SITE };
  return {
    emissions: normalizeList(
      pick(obj, 'emissions', 'videos', 'episodes'),
      normalizeEmission,
    ),
    programmes: normalizeList(
      pick(obj, 'programmes', 'programs'),
      normalizeProgramme,
    ),
    team: normalizeList(pick(obj, 'team', 'equipe', 'members'), normalizeTeamMember),
    faq: normalizeList(pick(obj, 'faq', 'faqs', 'questions'), normalizeFaqItem),
  };
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
  if (
    fromBundle &&
    (fromBundle.emissions.length ||
      fromBundle.programmes.length ||
      fromBundle.team.length ||
      fromBundle.faq.length)
  ) {
    return fromBundle;
  }

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

export function preferCmsList<T>(items: T[] | null | undefined, fallback: T[]): T[] {
  return items && items.length > 0 ? items : fallback;
}
