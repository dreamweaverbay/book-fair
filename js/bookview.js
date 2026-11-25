// Showing a book: covers, pages, sentences, stickers.
import { el } from './ui.js';
import { pic } from './art.js';
import { words, pageScene, coverScene, titleText } from './story.js';
import * as store from './store.js';

export const STICKER_SIZE = 44;

// Stickers sit inside the page picture, centered on (x, y) in page units.
export function stickersSvg(list = [], mode = 'color') {
  return list.map((s, k) => `<g class="st" data-k="${k}">${pic(s.n, s.x, s.y + STICKER_SIZE / 2, STICKER_SIZE, { mode })}</g>`).join('');
}

export function pageSvg(book, i, mode = 'color', bgMode) {
  const svg = pageScene(book, i, mode, bgMode);
  const st = (book.stickers && book.stickers[i - 1]) || [];
  return st.length ? svg.replace(/<\/svg>$/, stickersSvg(st, mode) + '</svg>') : svg;
}

// The sentence, one tappable word at a time. Tapping a word lights it up; nothing is read aloud.
export function sentence(book, i, { tappable = true } = {}) {
  const p = el('p', { class: 'sentence' });
  for (const piece of words(book, i)) {
    if (piece.blank) { p.append(el('span', { class: 'blank', 'aria-label': 'blank' }, ' ')); continue; }
    const parts = piece.t.split(/(\s+)/);
    for (const part of parts) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { p.append(document.createTextNode(' ')); continue; }
      const w = el('span', { class: 'w' + (piece.slot ? ' slot' : '') }, part);
      if (tappable) w.addEventListener('click', () => w.classList.toggle('lit'));
      p.append(w);
    }
  }
  return p;
}

export function byLine() {
  const n = store.authorName();
  return el('p', { class: 'byline' }, 'by ', n ? el('span', { class: 'author' }, n) : el('span', { class: 'author blankname' }, ' '));
}

// Each book's cover color follows its hero.
const COVER = { robot: '#2f8fa8', monster: '#7d55bd', truck: '#c9433a', shark: '#4a6f93', fish: '#2f7fc1', strawberry: '#c94a5a', sam: '#3a74b8', dragon: '#2f8a4e', lizard: '#4f8f3e', dino: '#3f8f6a', astronaut: '#3b4a7a', superhero: '#b8433f' };

export function cover(book, { size = '', showSold = false } = {}) {
  const t = titleText(book);
  return el('div', { class: 'cover ' + size, style: { '--cv': COVER[book.hero] || '#3a74b8' } },
    el('h2', { class: 'cover-title' }, t || el('span', { class: 'placeholder' }, 'My Book')),
    el('div', { class: 'cover-art', html: coverScene(book) }),
    byLine(),
    showSold && book.sold ? el('div', { class: 'sold-tag', 'aria-label': 'Sold at the fair' }, 'SOLD') : null);
}

export function page(book, i, { tappable = true } = {}) {
  return el('div', { class: 'bookpage' },
    el('div', { class: 'bookpage-art', html: pageSvg(book, i) }),
    sentence(book, i, { tappable }),
    el('div', { class: 'pagenum' }, String(i)));
}

export function endPage() {
  return el('div', { class: 'bookpage endpage' }, el('p', { class: 'theend' }, 'The End'), byLine());
}
