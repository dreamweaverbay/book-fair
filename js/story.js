// Story parts, sentences, and the picture for every page.
// The one rule: if the words name it, the picture shows it, in that amount.
// Books are saved as choices only, so the words and pictures are always rebuilt the same way.
import { pic, figure, aspect, effect, FX_SCALE, scene, thought, zoom, GROUND as G } from './art.js';

/* ---------------- story parts ---------------- */

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
];

export const PLACES = [
  { id: 'fair', label: 'the fair', at: 'at the fair' },
  { id: 'beach', label: 'the beach', at: 'at the beach' },
  { id: 'sea', label: 'under the sea', at: 'under the sea' },
  { id: 'woods', label: 'the woods', at: 'in the woods' },
  { id: 'arena', label: 'truck arena', at: 'at the truck arena' },
  { id: 'city', label: 'big city', at: 'in the big city' },
];

export const UHOHS = [
  { id: 'lost', label: 'Lost!' },
  { id: 'storm', label: 'Silly storm!' },
  { id: 'toobig', label: 'Way too big!' },
  { id: 'stuck', label: 'Stuck!' },
  { id: 'mixup', label: 'Mix-up!' },
];

export const SILLY = [
  { id: 'sock', word: 'sock', h: 70 },
  { id: 'cottoncandy', word: 'cotton candy', h: 80 },
  { id: 'duck', word: 'duck', h: 56 },
  { id: 'beachball', word: 'beach ball', h: 54 },
  { id: 'bananapeel', word: 'banana peel', h: 40 },
];

// Everything that can fill a word slot. art = picture name, n = how many to draw, a = "a" or "an".
export const ITEMS = {
  // things he loves (page 1)
  pizza: { word: 'pizza', art: 'pizza', h: 54 },
  tacos: { word: 'tacos', art: 'taco', h: 40, n: 2 },
  icecream: { word: 'ice cream', art: 'icecream', h: 64 },
  cupcakes: { word: 'cupcakes', art: 'cupcake', h: 40, n: 3 },
  popcorn: { word: 'popcorn', art: 'popcorn', h: 60 },
  donuts: { word: 'donuts', art: 'donut', h: 36, n: 3 },
  // lost things
  ball: { word: 'ball', art: 'ball', h: 50 },
  kite: { word: 'kite', art: 'kite', h: 60 },
  hat: { word: 'hat', art: 'cap', h: 40 },
  teddy: { word: 'teddy', art: 'teddy', h: 56 },
  key: { word: 'key', art: 'key', h: 44 },
  // what the cloud rains
  rfrogs: { word: 'frogs', art: 'frog' },
  rdonuts: { word: 'donuts', art: 'donut' },
  rbugs: { word: 'bugs', art: 'ladybug' },
  rstars: { word: 'stars', art: 'star' },
  rpopcorn: { word: 'popcorn', art: 'popcorn' },
  // things that get way too big
  cake: { word: 'cake', art: 'cake' },
  bubble: { word: 'bubble', art: 'bubble' },
  egg: { word: 'egg', art: 'egg', a: 'an' },
  balloon: { word: 'balloon', art: 'balloon' },
  // rides
  train: { word: 'train', art: 'train', w: 210 },
  bigwheel: { word: 'big wheel', art: 'ferris', h: 186 },
  coaster: { word: 'roller coaster', art: 'coaster', w: 200 },
  boat: { word: 'boat', art: 'boat', h: 150 },
  bus: { word: 'bus', art: 'bus', w: 210 },
  // silly hats
  bucket: { word: 'bucket', art: 'bucket', h: 60 },
  boot: { word: 'boot', art: 'boot', h: 64 },
  pineapple: { word: 'pineapple', art: 'pineapple', h: 66 },
  fishhat: { word: 'fish', art: 'fish', h: 40 },
  pizzahat: { word: 'pizza', art: 'pizza', h: 54 },
  // places to look
  box: { word: 'box', art: 'box', h: 66 },
  tent: { word: 'tent', art: 'tent', h: 66 },
  shoe: { word: 'shoe', art: 'shoe', h: 40 },
  bag: { word: 'bag', art: 'bag', h: 56 },
  // places to hide
  tree: { word: 'tree', art: 'tree', h: 200 },
  umbrella: { word: 'umbrella', art: 'umbrella', a: 'an', h: 110 },
  sunhat: { word: 'big hat', art: 'sunhat', h: 54 },
  // things to poke with
  spoon: { word: 'spoon', art: 'spoon', h: 50 },
  pencil: { word: 'pencil', art: 'pencil', h: 50 },
  feather: { word: 'feather', art: 'feather', h: 52 },
  carrot: { word: 'carrot', art: 'carrot', h: 50 },
  // things to wave
  flag: { word: 'flag', art: 'flag', h: 46 },
  scarf: { word: 'scarf', art: 'scarf', h: 46 },
  // things to pull with
  hook: { word: 'hook', art: 'hook', h: 46 },
  rope: { word: 'rope', art: 'rope', h: 56 },
  magnet: { word: 'magnet', art: 'magnet', h: 46 },
  // helpers' tools
  map: { word: 'map', art: 'map', h: 50 },
  light: { word: 'light', art: 'flashlight', h: 50 },
  net: { word: 'net', art: 'net', h: 54 },
  basket: { word: 'basket', art: 'basket', h: 50 },
  tractor: { word: 'tractor', art: 'tractor', h: 66 },
  crane: { word: 'crane', art: 'crane', h: 92 },
  ladder: { word: 'ladder', art: 'ladder', h: 100 },
  broom: { word: 'broom', art: 'broom', h: 80 },
  // funny words for the silly thing (page 5)
  giant: { word: 'giant', fx: 'giant' },
  tiny: { word: 'tiny', fx: 'tiny' },
  stinky: { word: 'stinky', fx: 'stinky' },
  sparkly: { word: 'sparkly', fx: 'sparkly' },
  // endings (page 6)
  party: { word: 'party' },
  picnic: { word: 'picnic' },
  nap: { word: 'nap' },
  dance: { word: 'dance' },
};

/* ---------------- the six pages ----------------
   Each page has one word slot. pool = the choices (four are shown).
   text uses: {H} hero, {K} helper, {P} place, {X} the page-2 thing, {T} the silly thing,
   {S} the word he picks, {aS} the word he picks with "a" or "an". */

const PAGE_JOBS = ['Meet the hero', 'Uh-oh', 'First try', 'Second try', 'The fix', 'The end'];

const PAGES = {
  1: { pool: ['pizza', 'tacos', 'icecream', 'cupcakes', 'popcorn', 'donuts'], text: '{H} lived {P} and loved {S}.' },
  2: {
    lost: { pool: ['ball', 'kite', 'hat', 'teddy', 'key'], text: 'One day, {H} lost {aS}.' },
    storm: { pool: ['rfrogs', 'rdonuts', 'rbugs', 'rstars', 'rpopcorn'], text: 'One day, a big cloud rained {S}!' },
    toobig: { pool: ['cake', 'bubble', 'egg', 'balloon'], text: 'One day, {aS} got way too big!' },
    stuck: { pool: ['train', 'bigwheel', 'coaster', 'boat', 'bus'], text: 'One day, {H} got stuck on the {S}!' },
    mixup: { pool: ['bucket', 'boot', 'pineapple', 'fishhat', 'pizzahat'], text: 'One day, {H} wore {aS} for a hat!' },
  },
  3: {
    lost: { pool: ['box', 'tent', 'bucket', 'shoe', 'bag'], text: '{H} looked in {aS}, but no {X}.' },
    storm: { pool: ['tree', 'umbrella', 'box', 'sunhat'], text: '{H} hid under {aS}, but more {X} fell!' },
    toobig: { pool: ['spoon', 'pencil', 'feather', 'carrot'], text: '{H} poked it with {aS}, and it got bigger!' },
    stuck: { pool: ['flag', 'scarf', 'balloon', 'hat'], text: '{H} waved {aS}, but no one came.' },
    mixup: { pool: ['hook', 'rope', 'magnet', 'spoon'], text: '{H} pulled it with {aS}, but it was stuck!' },
  },
  4: {
    lost: { pool: ['map', 'light', 'magnet', 'net'], text: '{K} came to help with {aS}.' },
    storm: { pool: ['net', 'bucket', 'basket', 'box'], text: '{K} came to help with {aS}.' },
    toobig: { pool: ['rope', 'tractor', 'crane', 'magnet'], text: '{K} came to help with {aS}.' },
    stuck: { pool: ['ladder', 'rope', 'tractor', 'magnet'], text: '{K} came to help with {aS}.' },
    mixup: { pool: ['ladder', 'feather', 'broom', 'rope'], text: '{K} came to help with {aS}.' },
  },
  5: {
    pool: ['giant', 'tiny', 'stinky', 'sparkly'],
    lost: { text: 'They found the {X} under a {S} {T}!' },
    storm: { text: 'A {S} {T} plugged up the cloud!' },
    toobig: { text: 'Pop! A {S} {T} made the {X} small again.' },
    stuck: { text: 'A {S} {T} gave the {X} a big push!' },
    mixup: { text: '{H} swapped the {X} for a {S} {T}!' },
  },
  6: { pool: ['party', 'picnic', 'nap', 'dance'], text: 'Then {H} and {K} had a big {S}!' },
};

export const pageJob = (i) => PAGE_JOBS[i - 1];

function pageDef(book, i) {
  const p = PAGES[i];
  if (i === 1 || i === 6) return p;
  if (i === 5) return { pool: p.pool, text: p[book.uhoh].text };
  return p[book.uhoh];
}

export const hero = (id) => HEROES.find(h => h.id === id);
export const place = (id) => PLACES.find(p => p.id === id);
export const silly = (id) => SILLY.find(s => s.id === id);

// The choices to show for page i (four, in a mixed order). Fish can't be a hat when Fish is in the story.
export function poolFor(book, i, rnd = Math.random) {
  let pool = pageDef(book, i).pool.slice();
  if (book.hero === 'fish' || book.side === 'fish') pool = pool.filter(id => id !== 'fishhat');
  for (let k = pool.length - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [pool[k], pool[j]] = [pool[j], pool[k]]; }
  return pool.slice(0, 4);
}

/* ---------------- words ---------------- */

const art = (word) => (/^[aeiou]/i.test(word) ? 'an' : 'a');

// The sentence for page i as a list of pieces: { t: text } or { t, slot: true } or { blank: true }.
export function words(book, i) {
  const def = pageDef(book, i);
  const pick = book.picks[i - 1];
  const item = pick ? ITEMS[pick] : null;
  const vals = {
    H: hero(book.hero).name,
    K: book.side ? hero(book.side).name : '',
    P: place(book.place).at,
    X: book.picks[1] ? ITEMS[book.picks[1]].word : '',
    T: silly(book.silly).word,
  };
  const out = [];
  const re = /\{(aS|S|H|K|P|X|T)\}/g;
  let last = 0, m;
  const pushText = (s) => { if (s) out.push({ t: s }); };
  while ((m = re.exec(def.text))) {
    pushText(def.text.slice(last, m.index));
    const key = m[1];
    if (key === 'S' || key === 'aS') {
      if (!item) out.push({ blank: true });
      else {
        if (key === 'aS') out.push({ t: (item.a || art(item.word)) + ' ' });
        out.push({ t: item.word, slot: true });
      }
    } else pushText(vals[key]);
    last = re.lastIndex;
  }
  pushText(def.text.slice(last));
  return out;
}

export const plainText = (book, i) => words(book, i).map(p => (p.blank ? '___' : p.t)).join('');

/* ---------------- titles ---------------- */

export const TITLE_WORDS = ['Giant', 'Tiny', 'Stinky', 'Sparkly', 'Soggy', 'Sleepy', 'Dizzy', 'Bouncy'];

// Second words come from the book itself, so the cover can show them.
export function titleNouns(book) {
  const list = [
    { id: 'hero', word: hero(book.hero).name },
    { id: 'side', word: hero(book.side).name },
    { id: 'silly', word: cap(silly(book.silly).word) },
  ];
  const food = book.picks[0] && ITEMS[book.picks[0]];
  if (food) list.push({ id: 'food', word: cap(food.word) });
  const thing = book.picks[1] && ITEMS[book.picks[1]];
  if (thing && thing.word !== (food && food.word)) list.push({ id: 'thing', word: cap(thing.word) });
  return list;
}

const cap = (s) => s.replace(/\b\w/g, c => c.toUpperCase());

export function titleText(book) {
  if (!book.title || !book.title.a || !book.title.n) return '';
  const n = titleNouns(book).find(x => x.id === book.title.n);
  return `The ${book.title.a} ${n ? n.word : ''}`.trim();
}

/* ---------------- pictures ---------------- */

// Draw an item (with its count) standing on the ground at x.
function item(id, x, ground, mode, o = {}) {
  const it = ITEMS[id];
  const n = o.n || it.n || 1;
  let h = o.h || it.h || 56;
  if (it.w && !o.h) h = it.w / aspect(it.art);
  const w = h * aspect(it.art);
  const gap = o.gap || w * 0.95;
  const total = w + gap * (n - 1);
  if (o.clamp !== false) x = Math.max(total / 2 + 4, Math.min(396 - total / 2, x));
  let s = '';
  for (let k = 0; k < n; k++) s += pic(it.art, x + (k - (n - 1) / 2) * gap, ground, h, { mode, rot: o.rot, flip: o.flip });
  return { svg: s, h, w: w + gap * (n - 1), x, ground, top: ground - h };
}

// A silly thing with its funny word (bigger, smaller, stinky or sparkly).
function sillyThing(book, x, ground, mode, baseH, adjId) {
  const sv = silly(book.silly);
  const fx = adjId ? ITEMS[adjId].fx : null;
  const h = (baseH || sv.h) * (FX_SCALE[fx] || 1);
  const w = h * aspect(sv.id);
  return { svg: pic(sv.id, x, ground, h, { mode }) + (fx ? effect(fx, x, ground, w, h, mode) : ''), w, h, top: ground - h, x };
}

const RAIN_SPOTS = [[52, 124], [112, 176], [76, 234], [348, 120], [300, 170], [354, 232], [138, 112], [264, 112]];
function rain(id, mode, spots = RAIN_SPOTS) {
  const it = ITEMS[id];
  return spots.map(([x, y], k) => pic(it.art, x, y, 30, { mode, rot: (k % 3 - 1) * 14 })).join('');
}
const cloud = (mode, y = 96, h = 92) => pic('cloud', 200, y, h, { mode });

// Where a rider sits on each ride (share of the picture's width and height, from the top-left).
const SEAT = { train: [0.66, 0.3], bigwheel: [0.5, 0.1], coaster: [0.66, 0.16], boat: [0.4, 0.8], bus: [0.4, 0.18] };

function ride(book, rideId, x, mode, o = {}) {
  const it = item(rideId, x, o.ground || G, mode, o.h ? { h: o.h } : {});
  const [fx, fy] = SEAT[rideId];
  const left = x - it.w / 2;
  const sx = left + it.w * fx, sy = it.top + it.h * fy;
  const rider = figure(book.hero, sx, sy, { h: o.riderH || 46 * riderScale(book.hero), mode, face: 'right' });
  return { svg: it.svg + rider.svg, rider, box: it };
}
const riderScale = (id) => ({ truck: 1, fish: 0.9, lizard: 1.15 }[id] || 1);

// Something worn on the head.
function onHead(f, artName, mode, h) {
  const hh = h || Math.max(30, Math.min(56, f.w * 0.55));
  return pic(artName, f.headX, f.headY + hh * 0.28, hh, { mode });
}

// Figures facing each other.
const heroAt = (book, x, mode, o = {}) => figure(book.hero, x, G, { mode, face: 'right', ...o });
const sideAt = (book, x, mode, o = {}) => figure(book.side, x, G, { mode, face: 'left', ...o });

// The picture for page i. Leave out the pick to draw the page before he chooses.
export function pageScene(book, i, mode = 'color', bgMode) {
  const pick = book.picks[i - 1];
  let body = '';
  const u = book.uhoh;
  const X = book.picks[1];

  if (i === 1) {
    const h = heroAt(book, 150, mode);
    body = h.svg + (pick ? item(pick, 285, G, mode).svg : '');
  }

  else if (i === 2) {
    if (u === 'lost') {
      const h = heroAt(book, 125, mode);
      body = h.svg;
      if (pick) body += thought(282, 92, 160, 112, h.x + h.w * 0.2, h.top - 4, mode) + item(pick, 258, 124, mode, { h: Math.min(62, ITEMS[pick].h * 1.1) }).svg + pic('question', 318, 124, 52, { mode });
    } else if (u === 'storm') {
      body = cloud(mode) + (pick ? rain(pick, mode) : '') + heroAt(book, 200, mode).svg;
    } else if (u === 'toobig') {
      body = heroAt(book, 92, mode).svg + (pick ? item(pick, 268, G, mode, { h: 176 }).svg : '');
    } else if (u === 'stuck') {
      body = pick ? ride(book, pick, 205, mode).svg : heroAt(book, 200, mode).svg;
    } else if (u === 'mixup') {
      const h = heroAt(book, 200, mode);
      body = h.svg + (pick ? onHead(h, ITEMS[pick].art, mode) : '');
    }
  }

  else if (i === 3) {
    if (u === 'lost') {
      body = heroAt(book, 120, mode).svg + (pick ? item(pick, 288, G, mode, { h: Math.max(ITEMS[pick].h, 64) * 1.2 }).svg : '');
    } else if (u === 'storm') {
      const h = heroAt(book, 200, mode);
      let shelterBack = '', shelterFront = '';
      if (pick === 'tree') shelterBack = item('tree', 200, G + 2, mode).svg;
      else if (pick === 'umbrella') shelterFront = pic('umbrella', h.x + 6, h.top + h.h * 0.62, 112, { mode });
      else if (pick === 'box') shelterFront = pic('box', h.x, h.top + 6, 72, { mode });
      else if (pick === 'sunhat') shelterFront = onHead(h, 'sunhat', mode, Math.max(46, h.w * 0.8));
      body = cloud(mode) + rain(X, mode) + shelterBack + h.svg + shelterFront;
    } else if (u === 'toobig') {
      const h = heroAt(book, 82, mode);
      body = (pick ? item(X, 270, G, mode, { h: 208 }).svg : item(X, 268, G, mode, { h: 176 }).svg) + h.svg;
      if (pick) body += pic(ITEMS[pick].art, h.right + 14, G - h.h * 0.35, ITEMS[pick].h, { mode, rot: 35 });
    } else if (u === 'stuck') {
      const rd = ride(book, X, 205, mode);
      body = rd.svg;
      if (pick) body += pic(ITEMS[pick].art, rd.rider.right + 10, rd.rider.top + 16, 38, { mode });
    } else if (u === 'mixup') {
      const h = heroAt(book, 170, mode);
      body = h.svg + onHead(h, ITEMS[X].art, mode);
      if (pick) body += pic(ITEMS[pick].art, h.right + 34, h.headY + 40, ITEMS[pick].h, { mode });
    }
  }

  else if (i === 4) {
    const helper = (k, x) => (pick ? item(pick, x, G, mode).svg : '');
    if (u === 'lost') {
      body = heroAt(book, 110, mode).svg + sideAt(book, 270, mode).svg + helper(0, 355);
    } else if (u === 'storm') {
      body = cloud(mode) + rain(X, mode, RAIN_SPOTS.slice(0, 6)) + heroAt(book, 120, mode).svg + sideAt(book, 265, mode).svg + helper(0, 350);
    } else if (u === 'toobig') {
      body = item(X, 195, G, mode, { h: 190 }).svg + heroAt(book, 62, mode, { scale: 0.85 }).svg + sideAt(book, 325, mode, { scale: 0.85 }).svg + (pick ? item(pick, 378, G, mode, { h: Math.min(ITEMS[pick].h, 70) }).svg : '');
    } else if (u === 'stuck') {
      body = ride(book, X, 140, mode, { h: Math.min(130, 180 * aspectInv(X)) }).svg + sideAt(book, 300, mode, { scale: 0.9 }).svg + helper(0, 368);
    } else if (u === 'mixup') {
      const h = heroAt(book, 120, mode);
      body = h.svg + onHead(h, ITEMS[X].art, mode) + sideAt(book, 270, mode).svg + helper(0, 355);
    }
  }

  else if (i === 5) {
    if (u === 'lost') {
      let mid = '';
      if (pick) {
        const st = sillyThing(book, 205, G, mode, null, pick);
        const lostH = Math.max(26, Math.min(48, st.h * 0.55));
        const lw = lostH * aspect(ITEMS[X].art);
        mid = item(X, 205 + st.w / 2 + lw * 0.2, G, mode, { h: lostH }).svg + st.svg;
      }
      body = heroAt(book, 92, mode).svg + sideAt(book, 322, mode).svg + mid;
    } else if (u === 'storm') {
      body = cloud(mode, 100, 96) + (pick ? sillyThing(book, 200, 112, mode, 52, pick).svg : rain(X, mode, RAIN_SPOTS.slice(0, 6))) + heroAt(book, 110, mode).svg + sideAt(book, 295, mode).svg;
    } else if (u === 'toobig') {
      body = heroAt(book, 78, mode).svg + sideAt(book, 332, mode).svg;
      body += pick ? item(X, 165, G, mode, { h: 52 }).svg + sillyThing(book, 238, G, mode, 58, pick).svg : item(X, 205, G, mode, { h: 176 }).svg;
    } else if (u === 'stuck') {
      const rd = ride(book, X, 250, mode, { h: Math.min(130, 170 * aspectInv(X)) });
      body = rd.svg;
      if (pick) {
        const st = sillyThing(book, 0, G, mode, 62, pick);
        const sx = rd.box.x - rd.box.w / 2 - st.w / 2 + 6;
        body = sillyThing(book, sx, G, mode, 62, pick).svg + rd.svg + zoom(sx - st.w / 2 - 6, G - st.h * 0.7, 28, mode);
      }
    } else if (u === 'mixup') {
      const h = heroAt(book, 150, mode);
      body = h.svg + sideAt(book, 320, mode).svg;
      if (pick) {
        const fx = ITEMS[pick].fx;
        const sv = silly(book.silly);
        const hh = Math.max(28, Math.min(52, h.w * 0.5)) * (FX_SCALE[fx] || 1);
        const ww = hh * aspect(sv.id);
        body += pic(sv.id, h.headX, h.headY + hh * 0.25, hh, { mode }) + (FX_SCALE[fx] ? '' : effect(fx, h.headX, h.headY + hh * 0.25, ww, hh, mode));
        body += item(X, 238, G, mode, { h: 40 }).svg;
      } else body += onHead(h, ITEMS[X].art, mode);
    }
  }

  else if (i === 6) {
    const h = heroAt(book, 128, mode), k = sideAt(book, 282, mode);
    let extra = '', under = '';
    if (pick === 'party') extra = pic('balloon', 44, 168, 84, { mode }) + pic('balloon', 362, 160, 84, { mode, flip: true }) + pic('confetti', 205, 112, 74, { mode });
    if (pick === 'picnic') { under = pic('blanket', 205, G + 10, 34, { mode }); extra = pic('basket', 205, G + 2, 48, { mode }) + pic('watermelon', 362, G, 40, { mode }); }
    if (pick === 'nap') extra = effect('sleepy', h.x, G, h.w, h.h, mode) + effect('sleepy', k.x, G, k.w, k.h, mode);
    if (pick === 'dance') extra = `<line x1="205" y1="0" x2="205" y2="22" stroke="#8a7563" stroke-width="2"/>` + pic('discoball', 205, 70, 50, { mode }) + pic('notes', 205, 150, 52, { mode });
    body = under + h.svg + k.svg + extra;
  }

  return scene(book.place, body, { mode, bgMode });
}

const aspectInv = (id) => 1 / aspect(ITEMS[id].art);

// The cover picture: hero and helper, plus the thing in the title, with its funny word.
export function coverScene(book, mode = 'color', bgMode, titleOverride) {
  const t = titleOverride || book.title || {};
  const fx = (t.a || '').toLowerCase();
  const sc = FX_SCALE[fx] || 1;
  const lift = fx === 'bouncy' ? 16 : 0;
  const deco = (x, ground, w, h) => (FX_SCALE[fx] ? '' : effect(fx, x, ground, w, h, mode));
  const fig = (who, x, face) => {
    const isIt = t.n === who;
    const g = G - (isIt ? lift : 0);
    const f = figure(who === 'hero' ? book.hero : book.side, x, g, { mode, face, scale: isIt ? (sc > 1 ? 1.3 : sc < 1 ? 0.5 : 1) : 1 });
    return f.svg + (isIt ? deco(f.x, g, f.w, f.h) : '');
  };
  const hasThing = ['silly', 'food', 'thing'].includes(t.n);
  const H = fig('hero', hasThing ? 92 : 115, 'right'), K = fig('side', hasThing ? 316 : 292, 'left');
  let body = t.n === 'hero' && sc > 1 ? K + H : H + K;
  const g = G + 4 - lift;
  if (t.n === 'silly') {
    const sv = silly(book.silly);
    const h = Math.min(sv.h, 60) * sc;
    body += pic(sv.id, 205, g, h, { mode }) + deco(205, g, h * aspect(sv.id), h);
  } else if (t.n === 'food' || t.n === 'thing') {
    const id = t.n === 'food' ? book.picks[0] : book.picks[1];
    const it = ITEMS[id];
    const h = Math.min(it.h || 56, 64) * sc * (it.n ? 0.8 : 1);
    const drawn = item(id, 205, g, mode, { h, clamp: false });
    body += drawn.svg + deco(205, g, drawn.w, h);
  }
  return scene(book.place, body, { mode, bgMode });
}

/* ---------------- pictures for the choice cards ---------------- */

const square = (body, vb = '0 0 120 100') => `<svg viewBox="${vb}" class="cardpic" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

export function heroCard(id) {
  const f = figure(id, 60, 96, { h: id === 'truck' ? 62 : id === 'lizard' ? 92 : id === 'fish' ? 54 : 86, face: 'right' });
  return square(f.svg);
}

export function placeCard(id) {
  return `<svg viewBox="0 0 400 300" class="cardpic place" xmlns="http://www.w3.org/2000/svg">${scene(id, '').replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>`;
}

export function sillyCard(id, adj) {
  const sv = silly(id);
  const fx = adj ? ITEMS[adj].fx : null;
  const baseH = 62 * (sv.id === 'bananapeel' ? 0.7 : 1);
  const h = baseH * (fx === 'giant' ? 1.28 : fx === 'tiny' ? 0.45 : fx ? 0.85 : 1);
  const w = h * aspect(sv.id);
  return square(pic(sv.id, 60, 92, h) + (fx && !FX_SCALE[fx] ? effect(fx, 60, 92, w, h) : ''));
}

// Card for one choice on page i.
export function choiceCard(book, i, id) {
  const it = ITEMS[id];
  if (i === 5) return sillyCard(book.silly, id);
  if (i === 6) {
    if (id === 'party') return square(pic('balloon', 42, 80, 60) + pic('balloon', 78, 74, 60, { flip: true }) + pic('confetti', 60, 98, 34));
    if (id === 'picnic') return square(pic('blanket', 60, 96, 16) + pic('basket', 48, 90, 46) + pic('watermelon', 88, 92, 28));
    if (id === 'nap') return square(pic('zzz', 60, 76, 52));
    if (id === 'dance') return square(`<line x1="60" y1="0" x2="60" y2="10" stroke="#8a7563" stroke-width="2"/>` + pic('discoball', 60, 44, 36) + pic('notes', 60, 96, 40));
  }
  if (book.uhoh === 'storm' && i === 2) {
    return square([[30, 44], [62, 34], [92, 46], [44, 82], [78, 88]].map(([x, y], k) => pic(it.art, x, y, 30, { rot: (k % 3 - 1) * 14 })).join(''));
  }
  const n = it.n || 1;
  const maxH = 80, maxW = 106;
  let h = maxH;
  const a = aspect(it.art);
  const totalW = (k) => k * a * (n > 1 ? (n - 1) * 0.95 + 1 : 1);
  if (totalW(h) > maxW) h = maxW / (a * (n > 1 ? (n - 1) * 0.95 + 1 : 1));
  if (n > 1) h = Math.min(h, 52);
  return square(item(id, 60, 90, 'color', { h }).svg);
}

// Uh-oh cards show the chosen hero in the trouble.
export function uhohCard(book, id) {
  const hid = book.hero;
  const H = (x, h, face = 'right') => figure(hid, x, 96, { h, face });
  if (id === 'lost') { const f = H(36, 62); return square(f.svg + thought(84, 32, 56, 44, 50, f.top, 'color') + pic('question', 84, 50, 32)); }
  if (id === 'storm') return square(pic('cloud', 60, 34, 32) + [[34, 54], [60, 50], [86, 56]].map(([x, y]) => pic('droplet', x, y, 12)).join('') + H(60, 50).svg);
  if (id === 'toobig') return square(H(26, 34).svg + pic('cake', 78, 96, 84));
  if (id === 'stuck') return square(ride({ hero: hid }, 'coaster', 60, 'color', { h: 76, ground: 96, riderH: 30 }).svg);
  if (id === 'mixup') { const f = H(60, 72); return square(f.svg + onHead(f, 'bucket', 'color', 30)); }
  return square('');
}

export const STICKERS = ['star', 'heart', 'rainbow', 'sparkles', 'blossom', 'butterfly', 'ladybug', 'mushroom', 'sun', 'moon', 'note', 'crown'];
