// Making a book: story parts first, then six pages, then a title.
// One question per screen. The book is saved after every tap, so nothing is lost if the app closes.
import * as store from './store.js';
import { sfx } from './sound.js';
import { el, iconButton, bigButton } from './ui.js';
import * as S from './story.js';
import { cover, sentence, pageSvg, STICKER_SIZE } from './bookview.js';

const STEPS = ['hero', 'side', 'place', 'uhoh', 'silly', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'title'];
const MAX_STICKERS = 6;

function newDraft() {
  return { step: 'hero', hero: null, side: null, place: null, uhoh: null, silly: null, picks: [null, null, null, null, null, null], pools: {}, stickers: [[], [], [], [], [], []], title: { a: null, n: null } };
}

const draft = () => store.get().draft;
const change = (fn) => store.update(s => fn(s.draft));

export function start(app, go) {
  if (!draft()) store.update(s => { s.draft = newDraft(); });
  render(app, go);
}

export function hasDraft() {
  const d = draft();
  return !!(d && d.hero);
}

export function discardDraft() { store.update(s => { s.draft = null; }); }

function stepIndex() { return STEPS.indexOf(draft().step); }

function goStep(step, app, go) {
  change(d => { d.step = step; });
  render(app, go);
}

function render(app, go) {
  const d = draft();
  app.innerHTML = '';
  app.className = 'screen make';
  const idx = stepIndex();
  const back = () => (idx === 0 ? go('#/') : goStep(STEPS[idx - 1], app, go));
  const dots = el('div', { class: 'dots', 'aria-hidden': 'true' }, STEPS.map((s, k) => el('span', { class: 'dot' + (k < idx ? ' done' : k === idx ? ' now' : '') })));
  const top = el('header', { class: 'topbar' },
    iconButton('back', 'Back', back),
    dots,
    iconButton('home', 'Home', () => go('#/')));
  app.append(top);
  const body = el('main', { class: 'make-body' });
  app.append(body);
  const step = d.step;
  if (['hero', 'side', 'place', 'uhoh', 'silly'].includes(step)) setupStep(body, step, app, go);
  else if (step.startsWith('p')) pageStep(body, +step.slice(1), app, go);
  else if (step === 'title') titleStep(body, app, go);
}

/* ---------------- story parts ---------------- */

function setupStep(body, step, app, go) {
  const d = draft();
  let q, items, chosen = d[step];
  if (step === 'hero') { q = 'Who is your hero?'; items = S.HEROES.map(h => ({ id: h.id, label: h.name, pic: S.heroCard(h.id) })); }
  if (step === 'side') { q = `Who helps ${S.hero(d.hero).name}?`; items = S.HEROES.filter(h => h.id !== d.hero).map(h => ({ id: h.id, label: h.name, pic: S.heroCard(h.id) })); }
  if (step === 'place') { q = `Where does ${S.hero(d.hero).name} live?`; items = S.PLACES.map(p => ({ id: p.id, label: p.label, pic: S.placeCard(p.id), wide: true })); }
  if (step === 'uhoh') { q = 'What goes wrong?'; items = S.UHOHS.map(u => ({ id: u.id, label: u.label, pic: S.uhohCard(d, u.id) })); }
  if (step === 'silly') { q = 'Pick a silly thing. It will matter later!'; items = S.SILLY.map(s => ({ id: s.id, label: s.word, pic: S.sillyCard(s.id) })); }

  const next = bigButton('Next', () => {
    const order = STEPS.indexOf(step);
    goStep(STEPS[order + 1], app, go);
  }, 'next', 'next');
  next.disabled = !chosen;

  const grid = el('div', { class: 'cards cards-' + items.length + (step === 'place' ? ' places' : '') });
  for (const it of items) {
    const card = el('button', { class: 'card' + (chosen === it.id ? ' on' : ''), 'aria-pressed': chosen === it.id ? 'true' : 'false' },
      el('span', { class: 'card-pic', html: it.pic }), el('span', { class: 'card-word' }, it.label));
    card.addEventListener('click', () => {
      sfx.pick();
      setPart(step, it.id);
      grid.querySelectorAll('.card').forEach(c => { c.classList.remove('on'); c.setAttribute('aria-pressed', 'false'); });
      card.classList.add('on'); card.setAttribute('aria-pressed', 'true');
      next.disabled = false;
    });
    grid.append(card);
  }
  body.append(el('div', { class: 'setup' }, el('h1', { class: 'question' }, q), grid, el('div', { class: 'actions' }, next)));
}

// Changing a story part keeps the rest of the book that still fits.
function setPart(step, id) {
  change(d => {
    const before = d[step];
    d[step] = id;
    if (step === 'hero' && d.side === id) d.side = null;
    if (step === 'uhoh' && before && before !== id) {
      for (let i = 2; i <= 5; i++) { d.picks[i - 1] = null; delete d.pools[i]; }
      if (d.title && d.title.n === 'thing') d.title.n = null;
    }
    if ((step === 'hero' || step === 'side') && id === 'fish' && d.picks[1] === 'fishhat') { d.picks[1] = null; delete d.pools[2]; }
    if ((step === 'hero' || step === 'side') && id === 'fish' && d.pools[2]) delete d.pools[2];
  });
}

/* ---------------- pages ---------------- */

function pageStep(body, i, app, go) {
  const d = draft();
  if (!d.pools[i]) change(dd => { dd.pools[i] = S.poolFor(dd, i); });
  const pool = draft().pools[i];

  const art = el('div', { class: 'bookpage-art' });
  const sent = el('div', { class: 'sentence-wrap' });
  const pageBox = el('div', { class: 'bookpage making' }, art, sent, el('div', { class: 'pagenum' }, String(i)));
  const side = el('div', { class: 'side' });
  body.append(el('div', { class: 'pagestep' }, pageBox, side));

  let stickerMode = false;
  const draw = () => {
    art.innerHTML = pageSvg(draft(), i);
    sent.innerHTML = '';
    sent.append(sentence(draft(), i));
    if (stickerMode) wireStickerDrag(art, i, draw);
  };

  const showChoices = () => {
    stickerMode = false;
    pageBox.classList.remove('sticking');
    side.innerHTML = '';
    const chosen = () => draft().picks[i - 1];
    const grid = el('div', { class: 'cards cards-4 choices' });
    const next = bigButton(i < 6 ? 'Next page' : 'Name my book', () => goStep(i < 6 ? 'p' + (i + 1) : 'title', app, go), 'next', 'next');
    const stick = bigButton('Stickers', () => showStickers(), 'ghost', 'star');
    const sync = () => { next.disabled = !chosen(); stick.disabled = !chosen(); };
    for (const id of pool) {
      const it = S.ITEMS[id];
      const card = el('button', { class: 'card' + (chosen() === id ? ' on' : '') },
        el('span', { class: 'card-pic', html: S.choiceCard(draft(), i, id) }), el('span', { class: 'card-word' }, it.word));
      card.addEventListener('click', () => {
        sfx.pick();
        change(dd => { dd.picks[i - 1] = id; });
        grid.querySelectorAll('.card').forEach(c => c.classList.remove('on'));
        card.classList.add('on');
        draw(); sync();
      });
      grid.append(card);
    }
    sync();
    side.append(el('p', { class: 'question' }, 'Pick a picture to finish the page.'), grid, el('div', { class: 'actions' }, stick, next));
  };

  const showStickers = () => {
    stickerMode = true;
    pageBox.classList.add('sticking');
    side.innerHTML = '';
    const tray = el('div', { class: 'tray' });
    for (const n of S.STICKERS) {
      const tile = el('div', { class: 'tile', 'data-n': n, role: 'button', 'aria-label': n + ' sticker' }, el('img', { src: `art/noto/${n}.svg`, alt: '', draggable: 'false' }));
      tile.addEventListener('pointerdown', (e) => startDrag(e, n, art, i, draw));
      tray.append(tile);
    }
    side.append(
      el('p', { class: 'question' }, 'Drag stickers onto your page.'),
      el('p', { class: 'hint' }, 'Drag one off the page to take it away.'),
      tray,
      el('div', { class: 'actions' }, bigButton('Done', () => showChoices(), 'next', 'check')));
    draw();
  };

  draw();
  showChoices();
}

// Dragging a sticker from the tray (or one already on the page) with a finger.
function startDrag(e, name, art, i, draw, fromIndex = null) {
  e.preventDefault();
  const svg = art.querySelector('svg');
  const rect = svg.getBoundingClientRect();
  const px = (rect.width / 400) * STICKER_SIZE;
  const ghost = el('img', { src: `art/noto/${name}.svg`, class: 'drag-ghost', alt: '', style: { width: px + 'px', height: px + 'px' } });
  document.body.append(ghost);
  const move = (ev) => { ghost.style.left = ev.clientX - px / 2 + 'px'; ghost.style.top = ev.clientY - px / 2 + 'px'; };
  move(e);
  if (fromIndex !== null) { change(dd => { dd.stickers[i - 1].splice(fromIndex, 1); }); draw(); }
  const up = (ev) => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
    ghost.remove();
    const r = art.querySelector('svg').getBoundingClientRect();
    const inside = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
    const list = draft().stickers[i - 1];
    if (inside && list.length < MAX_STICKERS) {
      const pt = toPage(art.querySelector('svg'), ev.clientX, ev.clientY);
      const h = STICKER_SIZE / 2;
      change(dd => { dd.stickers[i - 1].push({ n: name, x: clamp(pt.x, h, 400 - h), y: clamp(pt.y, h, 300 - h) }); });
      sfx.sticker();
    } else if (fromIndex !== null || !inside) {
      if (fromIndex !== null) sfx.unstick();
    }
    draw();
  };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
}

function wireStickerDrag(art, i, draw) {
  art.querySelectorAll('g.st').forEach(g => {
    g.addEventListener('pointerdown', (e) => {
      const k = +g.dataset.k;
      const s = draft().stickers[i - 1][k];
      if (s) startDrag(e, s.n, art, i, draw, k);
    });
  });
}

function toPage(svg, cx, cy) {
  const p = svg.createSVGPoint();
  p.x = cx; p.y = cy;
  const m = svg.getScreenCTM();
  const q = p.matrixTransform(m.inverse());
  return { x: q.x, y: q.y };
}
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ---------------- title ---------------- */

function titleStep(body, app, go) {
  const d = draft();
  const nouns = S.titleNouns(d);
  if (d.title.n && !nouns.some(n => n.id === d.title.n)) change(dd => { dd.title.n = null; });

  const preview = el('div', { class: 'title-preview' });
  const side = el('div', { class: 'side' });
  body.append(el('div', { class: 'pagestep titlestep' }, preview, side));

  const finish = bigButton('Finish my book', () => finishBook(app, go), 'next', 'check');
  const drawCover = () => {
    preview.innerHTML = '';
    preview.append(cover(draft(), { size: 'big' }));
    finish.disabled = !(draft().title.a && draft().title.n);
    buildLine();
  };

  const line = el('div', { class: 'title-build' });
  const buildLine = () => {
    line.innerHTML = '';
    const t = draft().title;
    const nWord = t.n ? nouns.find(n => n.id === t.n).word : null;
    line.append(el('span', {}, 'The'),
      el('span', { class: 'tslot g1' + (t.a ? ' filled' : '') }, t.a || '1'),
      el('span', { class: 'tslot g2' + (nWord ? ' filled' : '') }, nWord || '2'));
  };

  const group = (n, label, list, key) => {
    const box = el('div', { class: 'wordgroup g' + n },
      el('div', { class: 'wordgroup-head' }, el('span', { class: 'num' }, String(n)), label));
    const wrap = el('div', { class: 'words' });
    for (const w of list) {
      const id = key === 'a' ? w : w.id;
      const text = key === 'a' ? w : w.word;
      const b = el('button', { class: 'word' + (draft().title[key] === id ? ' on' : '') }, text);
      b.addEventListener('click', () => {
        sfx.pick();
        change(dd => { dd.title[key] = id; });
        wrap.querySelectorAll('.word').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        drawCover();
      });
      wrap.append(b);
    }
    box.append(wrap);
    return box;
  };

  const surprise = el('button', { class: 'smallbtn', onclick: () => {
    sfx.pick();
    change(dd => { dd.title.a = S.TITLE_WORDS[Math.floor(Math.random() * S.TITLE_WORDS.length)]; dd.title.n = nouns[Math.floor(Math.random() * nouns.length)].id; });
    render(app, go);
  } }, 'Surprise me');

  side.append(
    el('p', { class: 'question' }, 'Name your book. Pick a funny word and a second word.'),
    el('div', { class: 'title-line' }, line, surprise),
    group(1, 'Funny word', S.TITLE_WORDS, 'a'),
    group(2, 'Who or what', nouns, 'n'),
    el('div', { class: 'actions' }, finish));
  drawCover();
}

function finishBook(app, go) {
  const d = draft();
  const book = {
    id: store.newId(), made: Date.now(),
    hero: d.hero, side: d.side, place: d.place, uhoh: d.uhoh, silly: d.silly,
    picks: d.picks.slice(), stickers: d.stickers.map(s => s.slice()), title: { ...d.title }, sold: 0,
  };
  store.addBook(book);
  sfx.done();
  go('#/done/' + book.id);
}

export function doneScreen(app, go, id) {
  const book = store.book(id);
  if (!book) { go('#/shelf'); return; }
  app.innerHTML = '';
  app.className = 'screen done';
  app.append(
    el('header', { class: 'topbar' }, iconButton('home', 'Home', () => go('#/')), el('span'), el('span')),
    el('main', { class: 'done-body' },
      el('div', { class: 'done-cover' }, cover(book, { size: 'big' })),
      el('div', { class: 'done-side' },
        el('h1', { class: 'theend big' }, 'The End!'),
        el('p', { class: 'lead' }, 'Your book is on your shelf.'),
        el('div', { class: 'stack' },
          bigButton('Read it', () => go('#/read/' + id), '', 'read'),
          bigButton('My shelf', () => go('#/shelf'), 'ghost'),
          bigButton('Make another book', () => go('#/make'), 'ghost', 'plus')))));
}

