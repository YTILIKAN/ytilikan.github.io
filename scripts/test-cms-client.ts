import { extractYoutubeId, formatDuration } from '../lib/api.ts';

function assert(cond: unknown, message: string) {
  if (!cond) throw new Error(message);
}

assert(extractYoutubeId('https://www.youtube.com/watch?v=4zQ-YN_SvlU') === '4zQ-YN_SvlU', 'youtube watch');
assert(extractYoutubeId('https://youtu.be/4zQ-YN_SvlU') === '4zQ-YN_SvlU', 'youtu.be');
assert(extractYoutubeId('https://www.youtube.com/embed/4zQ-YN_SvlU') === '4zQ-YN_SvlU', 'embed');
assert(formatDuration(95) === '1:35:00', 'duration hours');
assert(formatDuration(8) === '8:00', 'duration minutes');
assert(formatDuration(0) === '', 'duration empty');

console.log('cms-client ok');
