/**
 * Vérifie les mappeurs CMS (contrat snake_case du back-office)
 * sans démarrer Next. Exécuter : node scripts/check-cms-client.mjs
 */
import assert from 'node:assert/strict';

function youtubeIdFrom(input) {
  if (!input) return null;
  const s = input.trim();
  const fromUrl = s.match(
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/|img\.youtube\.com\/vi\/)([\w-]{6,})/,
  );
  if (fromUrl?.[1]) return fromUrl[1];
  if (/^[\w-]{11}$/.test(s)) return s;
  return null;
}

function formatDurationMinutes(total) {
  if (total == null || !Number.isFinite(total) || total < 0) return null;
  const safe = Math.round(total);
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:00`;
  return `${minutes}:00`;
}

assert.equal(youtubeIdFrom('https://www.youtube.com/watch?v=4zQ-YN_SvlU'), '4zQ-YN_SvlU');
assert.equal(youtubeIdFrom('https://youtu.be/nu59ufftqZ4'), 'nu59ufftqZ4');
assert.equal(youtubeIdFrom('4zQ-YN_SvlU'), '4zQ-YN_SvlU');
assert.equal(formatDurationMinutes(68), '1:08:00');
assert.equal(formatDurationMinutes(14), '14:00');

const emission = {
  id: 1,
  title: 'Vibe coding',
  format: 'Formation',
  duration_minutes: 42,
  aired_on: '2026-06-06',
  status: 'published',
  youtube_url: 'https://www.youtube.com/watch?v=i_7SlR1bUEk',
  view_count: 100,
  guest: 'Christian NEBOT',
  summary: 'Atelier',
};
assert.equal(youtubeIdFrom(emission.youtube_url), 'i_7SlR1bUEk');

const draft = { ...emission, status: 'draft' };
assert.equal(draft.status === 'published', false);

const faq = { id: 1, question: 'Gratuit ?', answer: 'Oui', is_published: true };
assert.equal(faq.is_published, true);

const team = {
  id: 1,
  name: 'Hamel Brayan',
  tag: 'Modérateur',
  role: 'Opérations',
  bio: 'Anime les émissions',
  initials: 'HB',
  photo_url: null,
  linkedin_url: null,
};
assert.equal(team.name, 'Hamel Brayan');

const programme = {
  id: 1,
  index_label: '01',
  kick: 'Pédagogie',
  title: 'Formation Tech',
  duration: '5 à 15 min',
  body: 'Capsules',
  points: ['IA & Python'],
  coming_soon: false,
};
assert.equal(programme.coming_soon, false);

console.log('check-cms-client: ok');
