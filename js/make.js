// Making a book: main character, setting, then six pages (the problem is page 2), then a title.
// One question per screen. Each choice is drawn from the ones before it, so the story hangs together.
// The book is saved after every tap, so nothing is lost if the app closes.
import * as store from './store.js';
import { sfx } from './sound.js';
import { el, iconButton, bigButton } from './ui.js';
import * as S from './story.js';
import { cover, sentence, pageSvg, STICKER_SIZE } from './bookview.js';

const STEPS = ['hero', 'place', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'title'];
const MAX_STICKERS = 6;

function newDraft() {
  return { v: 3, step: 'hero', hero: null, place: null, picks: [null, null, null, null, null, null], pools: {}, stickers: [[], [], [], [], [], []], title: null };
}

const draft = () => store.get().draft;
const change = (fn) => store.update(s => fn(s.draft));

export function start(app, go) {
  const d = draft();
  if (!d || d.v !== 3) store.update(s => { s.draft = newDraft(); });
  render(app, go);
}

export function hasDraft() { const d = draft(); return !!(d && d.v === 3 && d.hero); }
export function discardDraft() { store.update(s => { s.draft = null; }); }

const stepIndex = () => STEPS.indexOf(draft().step);
function goStep(step, app, go) { change(d => { d.step = step; }); render(app, go); }

function render(app, go) {
  const d = draft();
  app.innerHTML = '';
  app.className = 'screen make';
  const idx = stepIndex();
  const back = () => (idx === 0 ? go('#/') : goStep(STEPS[idx - 1], app, go));
  const dots = el('div', { class: 'dots', 'aria-hidden': 'true' }, STEPS.map((s, k) => el('span', { class: 'dot' + (k < idx ? ' done' : k === idx ? ' now' : '') })));
  app.append(el('header', { class: 'topbar' }, iconButton('back', 'Back', back), dots, iconButton('home', 'Home', () => go('#/'))));
  const body = el('main', { class: 'make-body' });
  app.append(body);
  if (['hero', 'place'].includes(d.step)) setupStep(body, d.step, app, go);
  else if (d.step.startsWith('p')) pageStep(body, +d.step.slice(1), app, go);
  else titleStep(body, app, go);
}

/* ---------------- story parts ---------------- */

function setupStep(body, step, app, go) {
  const d = draft();
  let q, hint, items;
  if (step === 'hero') {
    q = 'Pick the main character.'; hint = 'The main character is who the story is about.';
    items = S.HEROES.map(h => ({ id: h.id, label: h.name, pic: S.heroCard(h.id) }));
  }
  if (step === 'place') {
    q = 'Pick the setting.'; hint = 'The setting is where the story happens.';
    items = S.PLACES.map(p => ({ id: p.id, label: p.label, pic: S.placeCard(p.id) }));
  }
  const chosen = d[step];
  const next = bigButton('Next', () => goStep(STEPS[STEPS.indexOf(step) + 1], app, go), 'next', 'next');
  next.disabled = !chosen || !items.some(it => it.id === chosen);

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
  body.append(el('div', { class: 'setup' }, el('div', { class: 'qbox' }, el('h1', { class: 'question' }, q), el('p', { class: 'qhint' }, hint)), grid, el('div', { class: 'actions' }, next)));
}

// Changing an early choice clears the pages that depended on it.
function setPart(step, id) {
  change(d => {
    if (d[step] === id) return;
    d[step] = id;
    d.picks = [null, null, null, null, null, null];
    d.pools = {};
    d.title = null;
  });
}

function setPick(i, id) {
  change(d => {
    if (d.picks[i - 1] === id) return;
    d.picks[i - 1] = id;
    // Later pages may no longer fit, so they start fresh.
    for (let k = i + 1; k <= 6; k++) { d.picks[k - 1] = null; delete d.pools[k]; }
    d.title = null;
  });
}

/* ---------------- pages ---------------- */

function pageStep(body, i, app, go) {
  if (!draft().pools[i] || !draft().pools[i].length) change(dd => { dd.pools[i] = S.poolFor(dd, i); });
  const pool = draft().pools[i];

  const art = el('div', { class: 'bookpage-art' });
  const sent = el('div', { class: 'sentence-wrap' });
  const pageBox = el('div', { class: 'bookpage making' }, el('div', { class: 'part-tag' }, S.pageJob(i)), art, sent, el('div', { class: 'pagenum' }, String(i)));
  const side = el('div', { class: 'side' });
  body.append(el('div', { class: 'pagestep' }, pageBox, side));

  let stickerMode = false;
  const draw = () => {
    art.innerHTML = pageSvg(draft(), i);
    sent.innerHTML = '';
    sent.append(sentence(draft(), i));
    if (stickerMode) wireStickers(art, i, draw);
  };

  const showChoices = () => {
    stickerMode = false;
    pageBox.classList.remove('sticking');
    side.innerHTML = '';
    const chosen = () => draft().picks[i - 1];
    const grid = el('div', { class: 'cards cards-' + Math.min(pool.length, 4) + ' choices' });
    const next = bigButton(i < 6 ? 'Next page' : 'Pick a title', () => goStep(i < 6 ? 'p' + (i + 1) : 'title', app, go), 'next', 'next');
    const stick = el('button', { class: 'stickerbtn', onclick: () => { sfx.tap(); showStickers(); } },
      el('span', { class: 'stickerbtn-pics', html: S.stickersFor(draft().place).slice(0, 3).map(n => `<img src="art/noto/${n}.svg" alt="">`).join('') }),
      el('span', {}, 'Add stickers'));
    const sync = () => { next.disabled = !chosen(); stick.disabled = !chosen(); };
    for (const id of pool) {
      const card = el('button', { class: 'card' + (chosen() === id ? ' on' : '') },
        el('span', { class: 'card-pic', html: S.choiceCard(draft(), i, id) }), el('span', { class: 'card-word' }, S.cardWord(draft(), i, id)),
        S.cardNote(draft(), i, id) ? el('span', { class: 'card-note' }, S.cardNote(draft(), i, id)) : null);
      card.addEventListener('click', () => {
        sfx.pick();
        setPick(i, id);
        grid.querySelectorAll('.card').forEach(c => c.classList.remove('on'));
        card.classList.add('on');
        draw(); sync();
      });
      grid.append(card);
    }
    sync();
    side.append(el('p', { class: 'question' }, S.question(draft(), i)), grid, el('div', { class: 'actions' }, stick, next));
  };

  const showStickers = () => {
    stickerMode = true;
    pageBox.classList.add('sticking');
    side.innerHTML = '';
    const tray = el('div', { class: 'tray' });
    for (const n of S.stickersFor(draft().place)) {
      const tile = el('div', { class: 'tile', role: 'button', 'aria-label': n + ' sticker', 'data-n': n }, el('img', { src: `art/noto/${n}.svg`, alt: '', draggable: 'false' }));
      tile.addEventListener('pointerdown', (e) => startDrag(e, n, art, i, draw));
      tray.append(tile);
    }
    side.append(
      el('p', { class: 'question' }, 'Add stickers to your page.'),
      el('p', { class: 'hint' }, 'Tap a sticker, or drag it where you want it. Tap one on the page to take it off.'),
      tray,
      el('div', { class: 'actions' }, bigButton('Done', () => showChoices(), 'next', 'check')));
    draw();
  };

  draw();
  showChoices();
}

/* ---------------- stickers ----------------
   Tap a sticker to drop it in an open spot, or drag it where you want it.
   Tap one on the page to take it off, or drag it to move it. */

const OPEN_SPOTS = [[46, 40], [354, 40], [200, 28], [120, 34], [280, 34], [46, 150], [354, 150]];

function addSticker(i, name, x, y) {
  if (draft().stickers[i - 1].length >= MAX_STICKERS) return false;
  const h = STICKER_SIZE / 2;
  change(dd => { dd.stickers[i - 1].push({ n: name, x: clamp(x, h, 400 - h), y: clamp(y, h, 300 - h) }); });
  return true;
}

function startDrag(e, name, art, i, draw, fromIndex = null) {
  e.preventDefault();
  const rect = art.querySelector('svg').getBoundingClientRect();
  const px = (rect.width / 400) * STICKER_SIZE;
  const sx = e.clientX, sy = e.clientY;
  let moved = false, ghost = null;
  const move = (ev) => {
    if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
      moved = true;
      ghost = el('img', { src: `art/noto/${name}.svg`, class: 'drag-ghost', alt: '', style: { width: px + 'px', height: px + 'px' } });
      document.body.append(ghost);
      if (fromIndex !== null) { change(dd => { dd.stickers[i - 1].splice(fromIndex, 1); }); draw(); }
    }
    if (ghost) { ghost.style.left = ev.clientX - px / 2 + 'px'; ghost.style.top = ev.clientY - px / 2 + 'px'; }
  };
  const up = (ev) => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
    if (ghost) ghost.remove();
    if (!moved) {
      if (fromIndex !== null) { change(dd => { dd.stickers[i - 1].splice(fromIndex, 1); }); sfx.unstick(); }
      else {
        const used = draft().stickers[i - 1];
        const spot = OPEN_SPOTS.find(([x, y]) => !used.some(s => Math.hypot(s.x - x, s.y - y) < 30)) || OPEN_SPOTS[used.length % OPEN_SPOTS.length];
        if (addSticker(i, name, spot[0], spot[1])) sfx.sticker();
      }
      draw();
      return;
    }
    const svgNow = art.querySelector('svg');
    const r = svgNow.getBoundingClientRect();
    const inside = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
    if (inside) { const pt = toPage(svgNow, ev.clientX, ev.clientY); if (addSticker(i, name, pt.x, pt.y)) sfx.sticker(); }
    else if (fromIndex !== null) sfx.unstick();
    draw();
  };
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
}

function wireStickers(art, i, draw) {
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
  return p.matrixTransform(svg.getScreenCTM().inverse());
}
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ---------------- title ---------------- */

function titleStep(body, app, go) {
  const preview = el('div', { class: 'title-preview' });
  const side = el('div', { class: 'side' });
  body.append(el('div', { class: 'pagestep titlestep' }, preview, side));
  const finish = bigButton('Finish my book', () => finishBook(go), 'next', 'check');
  const drawCover = () => {
    preview.innerHTML = '';
    preview.append(cover(draft(), { size: 'big' }));
    finish.disabled = !draft().title;
  };
  const list = el('div', { class: 'titles' });
  for (const o of S.titleOptions(draft())) {
    const b = el('button', { class: 'titlechoice' + (draft().title === o.id ? ' on' : '') }, o.text);
    b.addEventListener('click', () => {
      sfx.pick();
      change(dd => { dd.title = o.id; });
      list.querySelectorAll('.titlechoice').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      drawCover();
    });
    list.append(b);
  }
  side.append(
    el('p', { class: 'question' }, 'Pick a title for your book.'),
    el('p', { class: 'qhint left' }, 'A good title tells what the story is about.'),
    list,
    el('div', { class: 'actions' }, finish));
  drawCover();
}

function finishBook(go) {
  const d = draft();
  const book = {
    v: 2, id: store.newId(), made: Date.now(),
    hero: d.hero, place: d.place, uhoh: S.typeOf(d),
    picks: d.picks.slice(), stickers: d.stickers.map(s => s.slice()), title: d.title, sold: 0,
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
