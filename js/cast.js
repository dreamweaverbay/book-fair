// The cast and the settings, plus the small helpers every kind of story shares.
import { pic, figure, scene, GROUND as G } from './art.js';

export const HEROES = [
  { id: 'robot', name: 'Robot' },
  { id: 'monster', name: 'Monster' },
  { id: 'truck', name: 'Monster Truck' },
  { id: 'shark', name: 'Shark' },
  { id: 'fish', name: 'Fish' },
  { id: 'strawberry', name: 'Berry' },
  { id: 'sam', name: 'Sam' },
  { id: 'dragon', name: 'Dragon' },
  { id: 'lizard', name: 'Big Lizard' },
  { id: 'dino', name: 'Dino' },
  { id: 'astronaut', name: 'Astronaut' },
  { id: 'superhero', name: 'Superhero' },
];

export const PLACES = [
  { id: 'fair', label: 'the fair', to: 'to the fair' },
  { id: 'beach', label: 'the beach', to: 'to the beach' },
  { id: 'sea', label: 'under the sea', to: 'under the sea' },
  { id: 'woods', label: 'the woods', to: 'to the woods' },
  { id: 'jungle', label: 'the jungle', to: 'to the jungle' },
  { id: 'arena', label: 'truck arena', to: 'to the truck arena' },
  { id: 'park', label: 'ball park', to: 'to the ball park' },
  { id: 'city', label: 'big city', to: 'to the big city' },
  { id: 'space', label: 'the moon', to: 'to the moon' },
];

export const hero = (id) => HEROES.find(h => h.id === id);
export const place = (id) => PLACES.find(p => p.id === id);

// What each character is best known for. Shown on cards when he is choosing who can help.
export const MAIN_SKILL = {
  robot: 'has stretchy arms', monster: 'is very strong', truck: 'can pull hard', shark: 'is a fast swimmer', fish: 'is a good swimmer',
  strawberry: 'is very small', sam: 'is good at climbing', dragon: 'can fly', lizard: 'is big and strong', dino: 'has a long, long neck',
  astronaut: 'has a jet pack', superhero: 'can fly',
};

// Stickers that fit each setting, plus a star and a heart everywhere.
const STICKERS = {
  fair: ['balloon', 'popcorn', 'ticket', 'confetti', 'crown', 'sparkles'],
  beach: ['sun', 'shell', 'crab', 'coconut', 'wave', 'tropicalfish'],
  sea: ['tropicalfish', 'octopus', 'crab', 'shell', 'coral', 'bubbles'],
  woods: ['mushroom', 'leaf', 'butterfly', 'squirrel', 'bird', 'blossom'],
  jungle: ['parrot', 'monkey', 'hibiscus', 'butterfly', 'frog', 'coconut'],
  arena: ['checkered', 'trophy', 'medal', 'sparkles', 'crown', 'flag'],
  park: ['trophy', 'medal', 'basketball', 'baseball', 'sun', 'sparkles'],
  city: ['bird', 'balloon', 'blossom', 'sun', 'car', 'bus'],
  space: ['planet', 'comet', 'rocket', 'satellite', 'earth', 'sparkles'],
};
export const stickersFor = (placeId) => [...(STICKERS[placeId] || []), 'star', 'heart'];

/* ---------------- words ---------------- */

export const aAn = (word) => `${/^[aeiou]/i.test(word) ? 'an' : 'a'} ${word}`;
export const tc = (s) => s.replace(/\b\w/g, c => c.toUpperCase());
export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export function shuffled(list, rnd = Math.random) {
  const a = list.slice();
  for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; }
  return a;
}

// Builds a sentence as pieces: { t } plain words, { t, slot: true } the picked words, { blank: true } not picked yet.
export function sentenceMaker() {
  const out = [];
  return { out, t: (s) => out.push({ t: s }), slot: (s) => out.push(s ? { t: s, slot: true } : { blank: true }) };
}

/* ---------------- endings every story can use ---------------- */

export const ENDINGS = { picnic: { text: 'had a picnic' }, party: { text: 'had a party' }, nap: { text: 'took a nap' } };

// What to draw for a picnic, a party, or a nap. f and k are the two friends on the page.
export function endProps(e, f, k, mode) {
  if (e === 'picnic') return { under: pic('blanket', 205, G + 10, 34, { mode }), over: pic('basket', 205, G + 2, 46, { mode }) + pic('watermelon', 364, G, 38, { mode }) };
  if (e === 'party') return { under: '', over: pic('balloon', 44, 168, 84, { mode }) + pic('balloon', 362, 160, 84, { mode, flip: true }) + pic('confetti', 205, 104, 70, { mode }) };
  if (e === 'nap') return { under: '', over: pic('zzz', f.x + f.w * 0.3, f.top - 2, 32, { mode }) + pic('zzz', k.x + k.w * 0.3, k.top - 2, 32, { mode }) };
  return null;
}

export function endCard(id) {
  if (id === 'party') return square(pic('balloon', 42, 80, 60) + pic('balloon', 78, 74, 60, { flip: true }) + pic('confetti', 60, 98, 34));
  if (id === 'picnic') return square(pic('blanket', 60, 96, 16) + pic('basket', 48, 90, 46) + pic('watermelon', 88, 92, 28));
  if (id === 'nap') return square(pic('zzz', 60, 76, 52));
  return null;
}

/* ---------------- pictures ---------------- */

export const heroAt = (book, x, mode, o = {}) => figure(book.hero, x, G, { mode, face: 'right', ...o });
export const handOf = (f) => [f.x + f.w * 0.42 * f.face, f.top + f.h * 0.45];

export function onHead(f, artName, mode, h) {
  const hh = h || Math.max(26, Math.min(44, f.w * 0.5));
  return pic(artName, f.headX, f.headY + hh * 0.3, hh, { mode });
}

// A puzzled question mark over someone's head.
export const puzzled = (f, mode) => pic('question', f.x + f.w * 0.1, f.top - 4, 34, { mode });

export const square = (body, vb = '0 0 120 100') => `<svg viewBox="${vb}" class="cardpic" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
export const inner = (svg) => svg.replace(/^<svg[^>]*>|<\/svg>$/g, '');

export function heroCard(id) {
  const h = { truck: 62, lizard: 92, fish: 54, dino: 84, strawberry: 74 }[id] || 86;
  return square(figure(id, 60, 96, { h, face: 'right' }).svg);
}

export function placeCard(id) {
  return `<svg viewBox="0 0 400 300" class="cardpic place" xmlns="http://www.w3.org/2000/svg">${inner(scene(id, ''))}</svg>`;
}
