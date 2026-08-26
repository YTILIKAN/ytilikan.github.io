import {
  normalizeEmission,
  normalizeFaqItem,
  normalizeProgramme,
  normalizeSite,
  normalizeTeamMember,
  preferCmsList,
  youtubeIdFrom,
} from '../lib/api.ts';

function assert(cond: unknown, message: string) {
  if (!cond) throw new Error(message);
}

assert(youtubeIdFrom('https://www.youtube.com/watch?v=4zQ-YN_SvlU') === '4zQ-YN_SvlU', 'youtube url');
assert(youtubeIdFrom('4zQ-YN_SvlU') === '4zQ-YN_SvlU', 'youtube id');

const published = normalizeEmission({
  titre: 'Vibe Coding',
  format: 'Formation',
  dureeMinutes: 95,
  youtubeUrl: 'https://www.youtube.com/watch?v=4zQ-YN_SvlU',
  statut: 'publié',
});
assert(published?.title === 'Vibe Coding', 'emission title');
assert(published?.youtube_id === '4zQ-YN_SvlU', 'emission youtube');
assert(published?.duration === '1:35:00', 'emission duration');

const draft = normalizeEmission({
  titre: 'Brouillon',
  youtube_id: 'aaaaaaaaaaa',
  statut: 'brouillon',
});
assert(draft === null, 'drafts are hidden');

const programme = normalizeProgramme({
  nom: 'Pédagogie',
  titre: 'Formation Tech',
  meta: '5 à 15 min',
  description: 'Capsules',
  pointsCles: ['IA', 'Cloud'],
  bientot: false,
});
assert(programme?.kick === 'Pédagogie', 'programme kick');
assert(programme?.points.length === 2, 'programme points');

const soon = normalizeProgramme({ title: 'Mentorat', bientot: true });
assert(soon?.soon === true, 'programme soon');

const member = normalizeTeamMember({
  nom: 'Hamel Brayan',
  pole: 'Modérateur',
  role: 'Opérations',
  bio: 'Anime les émissions',
  initiales: 'HB',
});
assert(member?.name === 'Hamel Brayan', 'team name');
assert(member?.tag === 'Modérateur', 'team tag');

const hiddenFaq = normalizeFaqItem({
  question: 'Secret ?',
  reponse: 'Non.',
  publiee: false,
});
assert(hiddenFaq === null, 'hidden faq');

const faq = normalizeFaqItem({ question: 'Gratuit ?', reponse: 'Oui.', publiee: true });
assert(faq?.question === 'Gratuit ?', 'faq q');

const site = normalizeSite({
  emissions: [{ title: 'A', youtube_id: 'bbbbbbbbbbb', status: 'published' }],
  team: [{ name: 'Alice', role: 'Lead' }],
  faq: [{ q: 'Q', a: 'A' }],
});
assert(site.emissions.length === 1 && site.team.length === 1 && site.faq.length === 1, 'bundle');

assert(preferCmsList([], ['x']).join() === 'x', 'empty uses fallback');
assert(preferCmsList(['cms'], ['x']).join() === 'cms', 'cms wins');

console.log('cms-client ok');
