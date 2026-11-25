// The race story: the main character races a friend, takes a tumble, and still finds a way to win.
//   Page 1  Beginning: who they race
//   Page 2  Goal:      what the winner gets
//   Page 3  Problem:   the main character trips, slips, or gets stuck
//   Page 4  Twist:     the friend is so far ahead that they stop for something silly
//   Page 5  Solution:  how the main character gets past
//   Page 6  Ending:    what the winner does next
import { pic, figure, zoom, scene, GROUND as G } from './art.js';
import { SPOT_ART, BLOCK_ART, pathBand, arcs, effort } from './spots.js';
import { HEROES, hero, place, aAn, tc, shuffled, sentenceMaker, heroAt, square, heroCard } from './cast.js';

export const id = 'race';
export const name = 'A race';
export const blurb = 'Who will win?';
export const parts = ['Beginning', 'Goal', 'Problem', 'Twist', 'Solution', 'Ending'];
export const coverPage = { race: 1, prize: 2, go: 5, friends: 6 };

const PRIZES = {
  trophy: { word: 'gold trophy', art: 'trophy', h: 56 },
  medal: { word: 'gold medal', art: 'medal', h: 50 },
  crown: { word: 'gold crown', art: 'crown', h: 38 },
  cake: { word: 'big cake', art: 'cake', h: 56 },
};

// What trips up the main character. Each setting has its own.
const TRIPS = {
  peel: { text: 'slipped on a banana peel' },
  mud: { text: 'got stuck in the mud' },
  rock: { text: 'tripped on a rock' },
  log: { text: 'tripped on a log' },
  box: { text: 'ran into a big box' },
  seaweed: { text: 'got tangled in seaweed' },
  crater: { text: 'fell into a crater' },
};
const TRIPS_AT = {
  fair: ['peel', 'mud', 'box', 'rock'], beach: ['peel', 'rock', 'log'], sea: ['seaweed', 'rock', 'peel'],
  woods: ['mud', 'log', 'rock', 'peel'], jungle: ['mud', 'log', 'peel', 'rock'], arena: ['mud', 'rock', 'box', 'peel'],
  park: ['peel', 'mud', 'box'], city: ['peel', 'box', 'rock'], space: ['crater', 'rock', 'peel'],
};

const STOPS = {
  nap: { text: 'take a nap' },
  pizza: { text: 'eat a pizza' },
  icecream: { text: 'eat an ice cream' },
  dance: { text: 'do a dance' },
};

const PASSES = { zoom: { text: 'zoomed' }, tiptoe: { text: 'tiptoed' }, hop: { text: 'hopped' } };

const ENDS = {
  share: { text: (R) => `shared it with ${R}` },
  hug: { text: (R) => `gave ${R} a hug` },
  dance: { text: () => 'did a happy dance' },
  nap: { text: () => 'took a long nap' },
};

/* ---------------- choices ---------------- */

export function choicesFor(book, i) {
  if (i === 1) return HEROES.map(h => h.id).filter(h => h !== book.hero);
  if (i === 2) return Object.keys(PRIZES);
  if (i === 3) return TRIPS_AT[book.place] || [];
  if (i === 4) return Object.keys(STOPS);
  if (i === 5) return Object.keys(PASSES);
  if (i === 6) return Object.keys(ENDS);
  return [];
}

export function poolFor(book, i, rnd = Math.random) {
  const list = choicesFor(book, i);
  return i === 6 ? list.slice() : shuffled(list, rnd).slice(0, 4);
}

export const cardNote = () => '';
export const check = () => null;

/* ---------------- words ---------------- */

export function question(book, i) {
  const H = hero(book.hero).name;
  const R = book.picks[0] ? hero(book.picks[0]).name : '';
  if (i === 1) return `Who did ${H} race?`;
  if (i === 2) return 'What would the winner get?';
  if (i === 3) return `Oh no! What happened to ${H}?`;
  if (i === 4) return `${R} was way ahead. What did ${R} stop to do?`;
  if (i === 5) return `How did ${H} get past ${R}?`;
  return `${H} won! What did ${H} do next?`;
}

export function words(book, i) {
  const H = hero(book.hero).name;
  const R = book.picks[0] ? hero(book.picks[0]).name : '';
  const prize = book.picks[1] ? PRIZES[book.picks[1]] : null;
  const pick = book.picks[i - 1];
  const { out, t, slot } = sentenceMaker();
  if (i === 1) { t(`${H} went ${place(book.place).to} to race `); slot(pick && hero(pick).name); t('.'); }
  else if (i === 2) { t('The winner would get '); slot(pick && aAn(PRIZES[pick].word)); t('.'); }
  else if (i === 3) { t(`Go! ${R} zoomed ahead, but ${H} `); slot(pick && TRIPS[pick].text); t('!'); }
  else if (i === 4) { t(`${R} was way ahead. So ${R} stopped to `); slot(pick && STOPS[pick].text); t('.'); }
  else if (i === 5) { t(`${H} got up and `); slot(pick && PASSES[pick].text); t(` past ${R}!`); }
  else if (i === 6) { t(`${H} won the ${prize.word}! Then ${H} `); slot(pick && ENDS[pick].text(R)); t('!'); }
  return out;
}

export function titleOptions(book) {
  const H = hero(book.hero).name;
  return [
    { id: 'race', text: `${H} and the Big Race` },
    { id: 'prize', text: `The Race for the ${tc(PRIZES[book.picks[1]].word)}` },
    { id: 'go', text: `Go, ${H}, Go!` },
    { id: 'friends', text: `${H} and ${hero(book.picks[0]).name}` },
  ];
}

/* ---------------- pictures ---------------- */

const flag = (x, mode) => pic('checkered', x, G, 66, { mode });
const shift = (dx, svg) => `<g transform="translate(${dx} 0)">${svg}</g>`;
const shrink = (x, s, svg) => `<g transform="translate(${x} ${G}) scale(${s}) translate(${-x} ${-G})">${svg}</g>`;

// The main character taking a tumble at x.
function tumble(book, trip, x, mode) {
  const dizzy = (f) => pic('dizzy', f.x, f.top - 2, 30, { mode });
  if (trip === 'mud' || trip === 'crater' || trip === 'seaweed') {
    const sp = SPOT_ART[trip === 'seaweed' ? 'seaweed' : trip](mode);
    const dx = x - 292;
    const sunk = trip === 'seaweed' ? heroAt(book, x, mode) : figure(book.hero, x, G + (trip === 'mud' ? 12 : 16), { mode, face: 'right', scale: trip === 'crater' ? 0.85 : 1 });
    return shift(dx, sp.back) + sunk.svg + shift(dx, sp.front || '') + effort(sunk.right + 2, sunk.top + 14, mode);
  }
  const f = heroAt(book, x, mode, { rot: trip === 'box' ? -8 : 24 });
  const upright = heroAt(book, x, mode);
  let thing = '';
  if (trip === 'peel') thing = pic('bananapeel', x + upright.w * 0.42 + 8, G + 3, 24, { mode });
  if (trip === 'rock') thing = pic('rock', x + upright.w * 0.42 + 14, G + 3, 36, { mode });
  if (trip === 'log') thing = shrink(x + upright.w * 0.42 + 40, 0.45, BLOCK_ART.log(x + upright.w * 0.42 + 40, mode));
  if (trip === 'box') thing = pic('box', x + upright.w * 0.5 + 22, G + 3, 60, { mode });
  return thing + f.svg + dizzy(upright);
}

// The friend who stopped, with what they stopped for.
function stopped(book, x, mode, scale = 1) {
  const f = figure(book.picks[0], x, G, { mode, face: 'right', scale });
  const s = book.picks[3];
  let prop = '';
  if (s === 'nap') prop = pic('zzz', f.x + f.w * 0.32, f.top - 2, 34 * scale, { mode });
  if (s === 'pizza') prop = pic('pizza', f.right + 16 * scale, G - f.h * 0.3, 40 * scale, { mode });
  if (s === 'icecream') prop = pic('icecream', f.right + 12 * scale, G - f.h * 0.3, 46 * scale, { mode });
  if (s === 'dance') prop = pic('notes', f.x + f.w * 0.2, f.top - 4, 40 * scale, { mode }) + arcs(f.x, G + 12, f.w * 0.8, mode);
  return f.svg + prop;
}

const steps = (x, mode) => [0, 1, 2, 3].map(k => `<ellipse cx="${x - k * 20}" cy="${G + 10 + (k % 2) * 6}" rx="5" ry="2.6" fill="${mode === 'line' ? 'none' : '#8a7563'}" stroke="${mode === 'line' ? '#3a3a3a' : 'none'}" stroke-width="1" opacity=".8"/>`).join('');

function passing(book, x, mode, move) {
  if (move === 'hop') { const f = figure(book.hero, x, G - 24, { mode, face: 'right' }); return f.svg + arcs(x, G + 2, f.w * 0.8, mode); }
  const f = heroAt(book, x, mode);
  if (move === 'zoom') return zoom(f.left - 6, G - f.h * 0.62, 30, mode) + f.svg;
  if (move === 'tiptoe') return steps(f.left - 4, mode) + f.svg;
  return f.svg;
}

export function pageScene(book, i, mode = 'color', bgMode) {
  const [rival, prizeId, trip, , move, end] = book.picks;
  const track = pathBand(mode, book.place);
  let body = track;

  if (i === 1) {
    body += heroAt(book, 110, mode).svg + (rival ? figure(rival, 232, G, { mode, face: 'right' }).svg : '') + flag(356, mode);
  } else if (i === 2) {
    body += heroAt(book, 92, mode, { scale: 0.92 }).svg + figure(rival, 200, G, { mode, face: 'right', scale: 0.92 }).svg;
    if (prizeId) body += pic('box', 326, G + 2, 40, { mode }) + pic(PRIZES[prizeId].art, 326, G - 36, PRIZES[prizeId].h * 1.15, { mode });
  } else if (i === 3) {
    const r = figure(rival, 334, G, { mode, face: 'right', scale: 0.9 });
    body += (trip ? tumble(book, trip, 132, mode) : heroAt(book, 132, mode).svg) + zoom(r.left - 6, G - r.h * 0.62, 26, mode) + r.svg;
  } else if (i === 4) {
    body += stopped(book, 210, mode) + flag(364, mode);
  } else if (i === 5) {
    body += stopped(book, 112, mode, 0.82) + passing(book, 276, mode, move) + flag(372, mode);
  } else if (i === 6) {
    const prize = PRIZES[prizeId];
    const hug = end === 'hug';
    const f = heroAt(book, hug ? 150 : 124, mode);
    const k = figure(rival, hug ? 256 : 290, G, { mode, face: 'left' });
    const px = hug ? 352 : 207;
    body += f.svg + k.svg + pic(prize.art, px, G + 2, prize.h, { mode });
    if (end === 'share') body += pic('heart', 207, G - prize.h - 10, 30, { mode });
    if (end === 'hug') body += pic('heart', 203, Math.min(f.top, k.top) + 8, 34, { mode });
    if (end === 'dance') body += pic('notes', f.x + f.w * 0.15, f.top - 4, 40, { mode }) + arcs(f.x, G + 12, f.w * 0.8, mode);
    if (end === 'nap') body += pic('zzz', f.x + f.w * 0.3, f.top - 2, 36, { mode });
  }
  return scene(book.place, body, { mode, bgMode });
}

/* ---------------- cards ---------------- */

export function choiceCard(book, i, pick) {
  if (i === 1) return heroCard(pick);
  if (i === 2) { const p = PRIZES[pick]; return square(pic(p.art, 60, 92, p.h * 1.3)); }
  if (i === 3) return `<svg viewBox="30 96 230 192" class="cardpic" xmlns="http://www.w3.org/2000/svg">${tumble(book, pick, 132, 'color')}</svg>`;
  if (i === 4) {
    if (pick === 'nap') return square(pic('zzz', 60, 76, 52));
    if (pick === 'pizza') return square(pic('pizza', 60, 92, 76));
    if (pick === 'icecream') return square(pic('icecream', 60, 94, 84));
    return square(pic('notes', 60, 84, 64));
  }
  if (i === 5) return `<svg viewBox="150 110 230 192" class="cardpic" xmlns="http://www.w3.org/2000/svg">${passing(book, 276, 'color', pick)}</svg>`;
  if (i === 6) {
    const p = PRIZES[book.picks[1]];
    if (pick === 'share') return square(pic(p.art, 60, 96, 54) + pic('heart', 60, 36, 26));
    if (pick === 'hug') return square(pic('heart', 60, 84, 62));
    if (pick === 'dance') return square(pic('notes', 60, 84, 64));
    return square(pic('zzz', 60, 76, 52));
  }
  return square('');
}

export function kindCard(book) {
  const f = figure(book.hero, 34, 96, { h: 56, face: 'right' });
  return square(f.svg + pic('checkered', 86, 96, 58) + pic('trophy', 104, 50, 30));
}
