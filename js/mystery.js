// The mystery story: a snack goes missing, a clue points to who took it, and it ends with a new friend.
//   Page 1  Beginning:   the main character brings a snack
//   Page 2  Problem:     the snack is gone, and there is a clue
//   Page 3  Clues:       where the trail leads
//   Page 4  Who did it?: he thinks about which animal fits the clue
//   Page 5  Solution:    what the main character does about it
//   Page 6  Ending:      what the two of them do next
import { pic, figure, aspect, scene, shape, ell, GROUND as G } from './art.js';
import { SPOT_ART } from './spots.js';
import { hero, place, aAn, tc, cap, shuffled, sentenceMaker, ENDINGS, endProps, endCard, heroAt, puzzled, square, inner } from './cast.js';

export const id = 'mystery';
export const name = 'A mystery';
export const blurb = 'Who took the snack?';
export const parts = ['Beginning', 'Problem', 'Clues', 'Who did it?', 'Solution', 'Ending'];
export const coverPage = { missing: 1, who: 3, clue: 2, friends: 6 };
export const thinkPage = 4;

const SNACKS = {
  cake: { word: 'cake', with: 'a big cake', art: 'cake', h: 58 },
  pizza: { word: 'pizza', with: 'a pizza', art: 'pizza', h: 48 },
  popcorn: { word: 'popcorn', with: 'a bag of popcorn', art: 'popcorn', h: 54 },
  donut: { word: 'donut', with: 'a donut', art: 'donut', h: 38 },
  taco: { word: 'taco', with: 'a taco', art: 'taco', h: 38 },
  cupcake: { word: 'cupcake', with: 'a cupcake', art: 'cupcake', h: 46 },
};

const ANIMALS = {
  bird: { word: 'bird', art: 'bird' }, duck: { word: 'duck', art: 'duck' }, parrot: { word: 'parrot', art: 'parrot' },
  mouse: { word: 'mouse', art: 'mouse' }, squirrel: { word: 'squirrel', art: 'squirrel' }, crab: { word: 'crab', art: 'crab' },
  monkey: { word: 'monkey', art: 'monkey' }, snail: { word: 'snail', art: 'snail' }, worm: { word: 'worm', art: 'worm' },
};

// Each clue fits some animals and clearly rules out others. "not" lists only the clear ones.
const CLUES = {
  feather: { words: 'a feather', title: 'Feather', who: ['bird', 'duck', 'parrot'], not: ['mouse', 'squirrel', 'crab', 'monkey', 'snail', 'worm'], say: 'has no feathers' },
  prints: { words: 'tiny footprints', title: 'Footprint', who: ['mouse', 'squirrel', 'crab', 'monkey'], not: ['snail', 'worm'], say: 'has no feet' },
  slime: { words: 'a slimy trail', title: 'Slimy Trail', who: ['snail', 'worm'], not: ['bird', 'duck', 'parrot', 'mouse', 'squirrel', 'crab', 'monkey'], say: 'is not slimy' },
};

// The animals that live in each setting, and where a trail can lead there. Settings left out have no mystery stories.
const ANIMALS_AT = {
  fair: ['bird', 'duck', 'mouse', 'snail', 'worm'], beach: ['bird', 'crab', 'snail', 'worm'], woods: ['bird', 'squirrel', 'mouse', 'snail', 'worm'],
  jungle: ['parrot', 'monkey', 'snail', 'worm'], arena: ['bird', 'mouse', 'snail', 'worm'], park: ['bird', 'squirrel', 'snail', 'worm'],
  city: ['bird', 'mouse', 'squirrel', 'snail', 'worm'],
};
const TRAILS = {
  fair: ['wheeltop', 'tentroof', 'booth', 'mud'], beach: ['palmtop', 'tower', 'crabhole', 'boardwalk'], woods: ['treetop', 'bigrock', 'rabbithole', 'hollowlog'],
  jungle: ['jungletree', 'junglerock', 'junglelog', 'junglemud'], arena: ['lightpole', 'stands', 'tire', 'mudpit'], park: ['backboard', 'scoreboard', 'bleachers', 'drain'],
  city: ['lamppost', 'roof', 'drain', 'undercar'],
};
const SPOT_NAME = {
  wheeltop: 'the big wheel', tentroof: 'the tent roof', booth: 'the ticket booth', palmtop: 'a palm tree', tower: 'the lifeguard tower',
  crabhole: 'a crab hole', boardwalk: 'the boardwalk', treetop: 'a tall tree', bigrock: 'a tall rock', rabbithole: 'a rabbit hole',
  hollowlog: 'a hollow log', jungletree: 'a jungle tree', junglerock: 'a tall rock', junglelog: 'a hollow log', lightpole: 'a light pole',
  stands: 'the stands', tire: 'a giant tire', backboard: 'the backboard', scoreboard: 'the scoreboard', bleachers: 'the bleachers',
  drain: 'a drain', lamppost: 'a lamp post', roof: 'a tall roof', undercar: 'a parked car',
  mud: 'a mud puddle', junglemud: 'some sticky mud', mudpit: 'the mud pit',
};
// A trail on the ground can only lead somewhere up high if the one who left it can fly.
const UP_HIGH = ['wheeltop', 'tentroof', 'palmtop', 'tower', 'treetop', 'bigrock', 'jungletree', 'junglerock', 'lightpole', 'stands', 'backboard', 'scoreboard', 'lamppost', 'roof'];

const FIXES = {
  share: { text: (O) => `shared the ${O}` },
  hug: { text: (O, C) => `gave the ${C} a hug` },
  keep: { text: (O, C) => `let the ${C} keep it` },
};

export const fits = (book) => !!ANIMALS_AT[book.place];

/* ---------------- choices ---------------- */

const here = (book, list) => list.filter(a => ANIMALS_AT[book.place].includes(a));

export function choicesFor(book, i) {
  if (i === 1) return Object.keys(SNACKS);
  if (i === 2) return Object.keys(CLUES);
  if (i === 3) return (TRAILS[book.place] || []).filter(sp => book.picks[1] === 'feather' || !UP_HIGH.includes(sp));
  if (i === 4) return here(book, CLUES[book.picks[1]].who);
  if (i === 5) return Object.keys(FIXES);
  if (i === 6) return Object.keys(ENDINGS);
  return [];
}

export function poolFor(book, i, rnd = Math.random) {
  const list = choicesFor(book, i);
  if (i === 4) {
    // One or two animals that fit the clue, plus animals the clue rules out.
    const can = shuffled(list, rnd).slice(0, 2);
    const cannot = shuffled(here(book, CLUES[book.picks[1]].not), rnd);
    return shuffled([...can, ...cannot.slice(0, 4 - can.length)], rnd);
  }
  if (i === 5 || i === 6) return list.slice();
  return shuffled(list, rnd).slice(0, 4);
}

// Page 4 is the thinking page: does this animal fit the clue?
export function check(book, i, pick) {
  if (i !== 4 || choicesFor(book, 4).includes(pick)) return null;
  return { say: `${cap(aAn(ANIMALS[pick].word))} ${CLUES[book.picks[1]].say}!`, ask: 'Who else could it be?' };
}

export const cardNote = () => '';

/* ---------------- words ---------------- */

export function question(book, i) {
  const H = hero(book.hero).name;
  const O = book.picks[0] ? SNACKS[book.picks[0]].word : '';
  const C = book.picks[3] ? ANIMALS[book.picks[3]].word : '';
  if (i === 1) return `What snack did ${H} take ${place(book.place).to}?`;
  if (i === 2) return `Oh no! The ${O} is gone! What clue did ${H} find?`;
  if (i === 3) return 'Where did the trail lead?';
  if (i === 4) return `${H} found ${CLUES[book.picks[1]].words}. Who took the ${O}?`;
  if (i === 5) return `The ${C} was just hungry. What did ${H} do?`;
  return `What did ${H} and the ${C} do next?`;
}

export function words(book, i) {
  const H = hero(book.hero).name;
  const O = book.picks[0] ? SNACKS[book.picks[0]].word : '';
  const C = book.picks[3] ? ANIMALS[book.picks[3]].word : '';
  const pick = book.picks[i - 1];
  const { out, t, slot } = sentenceMaker();
  if (i === 1) { t(`${H} went ${place(book.place).to} with `); slot(pick && SNACKS[pick].with); t('.'); }
  else if (i === 2) { t(`Oh no! The ${O} was gone! ${H} found `); slot(pick && CLUES[pick].words); t('.'); }
  else if (i === 3) { t('The trail led to '); slot(pick && SPOT_NAME[pick]); t('!'); }
  else if (i === 4) { t('It was '); slot(pick && aAn(ANIMALS[pick].word)); t(pick ? `! The ${C} had the ${O}.` : '!'); }
  else if (i === 5) { t(`The ${C} was just hungry. So ${H} `); slot(pick && FIXES[pick].text(O, C)); t('.'); }
  else if (i === 6) { t(`Then ${H} and the ${C} `); slot(pick && ENDINGS[pick].text); t('!'); }
  return out;
}

export function titleOptions(book) {
  const H = hero(book.hero).name;
  const O = tc(SNACKS[book.picks[0]].word);
  return [
    { id: 'missing', text: `${H} and the Missing ${O}` },
    { id: 'who', text: `Who Took the ${O}?` },
    { id: 'clue', text: `The ${CLUES[book.picks[1]].title} Mystery` },
    { id: 'friends', text: `${H} and the ${tc(ANIMALS[book.picks[3]].word)}` },
  ];
}

/* ---------------- pictures ---------------- */

const snackPic = (book, x, y, mode, s = 1) => { const sn = SNACKS[book.picks[0]]; return pic(sn.art, x, y, sn.h * s, { mode }); };

// An animal on the ground (or on a spot), built like a character so the shared layouts can use it.
function animalAt(name, x, ground, h, mode) {
  const w = h * aspect(ANIMALS[name].art);
  return { svg: pic(ANIMALS[name].art, x, ground, h, { mode }), x, w, h, top: ground - h, left: x - w / 2, right: x + w / 2 };
}

// The clue, drawn along the ground from x1 to x2.
function clueArt(clue, x1, x2, mode) {
  const dark = mode === 'line' ? '#3a3a3a' : '#6b4a2e';
  if (clue === 'feather') {
    const n = x2 - x1 > 80 ? 2 : 1;
    return [...Array(n)].map((_, k) => pic('feather', n === 1 ? (x1 + x2) / 2 : x1 + 14 + k * (x2 - x1 - 28), G + 12, 30, { mode, rot: k ? 20 : -10 })).join('');
  }
  if (clue === 'prints') {
    let s = '';
    for (let x = x1, k = 0; x <= x2; x += 20, k++) {
      const y = G + 10 + (k % 2) * 9;
      s += `<ellipse cx="${x}" cy="${y}" rx="4" ry="3" fill="${dark}"/>` + [-3, 0, 3].map(d => `<circle cx="${x + 5}" cy="${y + d}" r="1.3" fill="${dark}"/>`).join('');
    }
    return s;
  }
  // slimy trail
  let d = `M${x1} ${G + 14}`;
  for (let x = x1; x < x2; x += 24) d += ` q6 -6 12 0 t12 0`;
  return mode === 'line'
    ? `<path d="${d}" fill="none" stroke="#3a3a3a" stroke-width="5" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`
    : `<path d="${d}" fill="none" stroke="#a6d96a" stroke-width="7" stroke-linecap="round" opacity=".9"/><path d="${d}" fill="none" stroke="#e3f5c4" stroke-width="2" stroke-linecap="round"/>`;
}

const plate = (x, mode) => ell(x, G + 4, 30, 7, '#ffffff', mode, mode === 'line' ? '' : 'stroke="#d8cfbd" stroke-width="2"') +
  [[-12, 2], [4, 5], [15, 1]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${G + 2 + dy}" r="1.8" fill="${mode === 'line' ? '#3a3a3a' : '#c9853f'}"/>`).join('');

// The animal at the spot, with the snack if it is the one who took it.
function atSpot(book, animal, withSnack, mode) {
  const sp = SPOT_ART[book.picks[2]](mode);
  const [ox, oy] = sp.obj;
  const h = Math.max(28, Math.min(40, sp.size));
  const a = animalAt(animal, ox, oy, h, mode);
  const snack = withSnack ? snackPic(book, ox + a.w * 0.5 + 8, oy, mode, 0.55) : '';
  return { svg: sp.back + snack + a.svg + (sp.front || ''), a };
}

export function pageScene(book, i, mode = 'color', bgMode, flop) {
  const [snack, clue, spot, animal, fix, end] = book.picks;
  let body = '';

  if (i === 1) {
    body = heroAt(book, 140, mode).svg + (snack ? snackPic(book, 268, G + 2, mode) : '');
  } else if (i === 2) {
    body = heroAt(book, 112, mode).svg + plate(250, mode) + (clue ? clueArt(clue, 296, 384, mode) : '');
  } else if (i === 3) {
    const sp = spot ? SPOT_ART[spot](mode) : null;
    body = (sp ? sp.back + (sp.front || '') : '') + clueArt(clue, 132, sp ? 226 : 384, mode) + heroAt(book, 66, mode, { scale: 0.92 }).svg;
  } else if (i === 4) {
    const who = flop || animal;
    if (who) {
      const s = atSpot(book, who, !flop, mode);
      body = s.svg + (flop ? puzzled(s.a, mode) : '');
    } else { const sp = SPOT_ART[spot](mode); body = sp.back + (sp.front || '') + clueArt(clue, 132, 226, mode); }
    body += heroAt(book, 66, mode, { scale: 0.92 }).svg;
  } else if (i === 5) {
    const hug = fix === 'hug';
    const f = heroAt(book, hug ? 142 : 112, mode);
    const a = animalAt(animal, hug ? 236 : 270, G, 50, mode);
    body = f.svg + a.svg;
    if (fix === 'share') body += snackPic(book, 200, G + 4, mode, 0.9);
    if (fix === 'hug') body += pic('heart', 196, f.top + 6, 34, { mode }) + snackPic(book, 340, G + 2, mode, 0.8);
    if (fix === 'keep') body += snackPic(book, a.right + 34, G + 2, mode, 0.9);
  } else if (i === 6) {
    const f = heroAt(book, 128, mode);
    const a = animalAt(animal, 286, G, 56, mode);
    const ex = (end && endProps(end, f, a, mode)) || { under: '', over: '' };
    body = ex.under + f.svg + a.svg + ex.over;
  }
  return scene(book.place, body, { mode, bgMode });
}

/* ---------------- cards ---------------- */

export function choiceCard(book, i, pick) {
  if (i === 1) { const sn = SNACKS[pick]; return square(pic(sn.art, 60, 92, Math.min(80, 96 / aspect(sn.art)))); }
  if (i === 2) return `<svg viewBox="286 ${G - 56} 110 92" class="cardpic" xmlns="http://www.w3.org/2000/svg">${clueArt(pick, 300, 380, 'color')}</svg>`;
  if (i === 3) {
    const b = { ...book, picks: [book.picks[0], book.picks[1], pick, null, null, null] };
    return `<svg viewBox="150 0 250 300" class="cardpic" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">${inner(pageScene(b, 3))}</svg>`;
  }
  if (i === 4) return square(pic(ANIMALS[pick].art, 60, 92, 74));
  if (i === 5) {
    const sn = SNACKS[book.picks[0]];
    const an = ANIMALS[book.picks[3]].art;
    if (pick === 'share') return square(pic(sn.art, 60, 92, 60) + pic('heart', 98, 34, 22));
    if (pick === 'hug') return square(pic(an, 60, 96, 50) + pic('heart', 60, 40, 30));
    return square(pic(an, 40, 94, 54) + pic(sn.art, 90, 94, 40));
  }
  if (i === 6) return endCard(pick);
  return square('');
}

export function kindCard(book) {
  const f = figure(book.hero, 34, 96, { h: 56, face: 'right' });
  return square(f.svg + pic('question', 92, 60, 44) + `<g transform="translate(-236 -176)">${clueArt('prints', 300, 350, 'color')}</g>`);
}
