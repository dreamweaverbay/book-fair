// Printing a book as a fold-up mini-book: one sheet of letter paper, one cut, eight panels
// (cover, six pages, back). Black-and-white outlines by default; color keeps the background as outlines.
//
// Panel layout on the sheet (landscape). The top row prints upside down so it reads right way up once folded.
//   top:    page 4 | page 3 | page 2 | page 1
//   bottom: page 5 | page 6 | back   | cover
import * as store from './store.js';
import { el, iconButton, bigButton, picturesReady, toast } from './ui.js';
import { words, coverScene, titleText } from './story.js';
import { pageSvg } from './bookview.js';

function sentenceText(book, i) {
  return words(book, i).map(p => (p.blank ? '____' : p.t)).join('');
}

function panel(cls, ...kids) { return el('div', { class: 'panel ' + cls }, ...kids); }

export function buildSheet(book, color) {
  const mode = color ? 'color' : 'line';
  const name = store.authorName();
  const pg = (i) => panel('pg', el('div', { class: 'p-art', html: pageSvg(book, i, mode, 'line') }), el('p', { class: 'p-text' }, sentenceText(book, i)), el('div', { class: 'p-num' }, String(i)));
  const front = panel('front',
    el('h1', { class: 'p-title' }, titleText(book)),
    el('div', { class: 'p-art', html: coverScene(book, mode, 'line') }),
    el('p', { class: 'p-by' }, 'by ', name ? el('b', {}, name) : el('span', { class: 'p-blank' }, ' ')));
  const back = panel('back',
    el('p', { class: 'p-end' }, 'The End'),
    el('div', { class: 'p-tag' }, el('span', {}, 'Price:'), el('span', { class: 'p-line' }, ' '), el('span', {}, 'coins')),
    el('p', { class: 'p-small' }, 'A Book Fair book'));
  const top = el('div', { class: 'row-top' }, pg(4), pg(3), pg(2), pg(1));
  const bottom = el('div', { class: 'row-bottom' }, pg(5), pg(6), back, front);
  return el('div', { class: 'sheet ' + (color ? 'color' : 'bw') },
    top, bottom,
    el('div', { class: 'cutline', 'aria-hidden': 'true' }, el('span', { class: 'scissors' }, '✂ cut')));
}

const STEPS = [
  'Fold the paper in half the long way, then open it.',
  'Fold it in half the short way, then in half again. Open it up.',
  'Fold it in half the short way. Cut along the dotted line in the middle, from the fold to the next crease.',
  'Open it, then fold it the long way. Push the ends together so the cut opens up.',
  'Fold the pages around so the cover is on the front.',
];

export function printScreen(app, go, id) {
  const book = store.book(id);
  if (!book) { go('#/shelf'); return; }
  let color = false;
  app.innerHTML = '';
  app.className = 'screen printscreen';
  const wrap = el('div', { class: 'sheet-wrap' });
  const scaler = el('div', { class: 'sheet-scaler' }, wrap);
  const bw = el('button', { class: 'choice on' }, 'Black and white', el('small', {}, 'Outlines to color. Uses the least ink.'));
  const co = el('button', { class: 'choice' }, 'Color', el('small', {}, 'Color characters, outline backgrounds.'));
  const draw = () => {
    wrap.innerHTML = '';
    wrap.append(buildSheet(book, color));
    bw.classList.toggle('on', !color); co.classList.toggle('on', color);
    fit();
  };
  const fit = () => {
    const w = scaler.clientWidth;
    const s = Math.min(1, w / 1056);
    wrap.style.transform = `scale(${s})`;
    scaler.style.height = 816 * s + 'px';
  };
  bw.addEventListener('click', () => { color = false; draw(); });
  co.addEventListener('click', () => { color = true; draw(); });
  const doPrint = async () => {
    toast('Getting the pictures ready…', 1500);
    await picturesReady(wrap);
    await document.fonts.ready;
    window.print();
  };
  app.append(
    el('header', { class: 'topbar noprint' }, iconButton('back', 'Back', () => go('#/book/' + id)), el('h1', { class: 'bar-title' }, 'Print a mini-book'), el('span')),
    el('main', { class: 'print-body' },
      el('div', { class: 'print-controls noprint' },
        el('h2', {}, titleText(book)),
        el('p', { class: 'muted' }, 'One sheet of letter paper. Set the printer to landscape if it asks.'),
        el('div', { class: 'printchoices' }, bw, co),
        bigButton('Print', doPrint, 'next', 'print'),
        el('details', { class: 'howto' }, el('summary', {}, 'How to fold it'), el('ol', {}, STEPS.map(s => el('li', {}, s))))),
      scaler));
  window.addEventListener('resize', fit, { once: true });
  draw();
}
