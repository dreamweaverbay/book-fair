// Reading a finished book: cover, six pages, The End. He turns the pages; nothing reads itself.
import { sfx } from './sound.js';
import { el, iconButton, bigButton, icon } from './ui.js';
import { cover, page, endPage } from './bookview.js';

// opts: { onClose, endButton: { text, onClick } }
export function openReader(app, book, opts = {}) {
  let at = 0;
  const LAST = 7;
  app.innerHTML = '';
  app.className = 'screen reader';
  const stage = el('div', { class: 'reader-stage' });
  const prev = el('button', { class: 'turn prev', 'aria-label': 'Back a page', onclick: () => turn(-1) }, icon('back'));
  const next = el('button', { class: 'turn next', 'aria-label': 'Next page', onclick: () => turn(1) }, icon('next'));
  const count = el('div', { class: 'reader-count', 'aria-live': 'polite' });
  const endRow = el('div', { class: 'reader-end' });
  app.append(
    el('header', { class: 'topbar' }, iconButton('back', 'Close the book', () => opts.onClose && opts.onClose()), count, el('span')),
    el('main', { class: 'reader-body' }, prev, stage, next),
    endRow);

  function show() {
    stage.innerHTML = '';
    let node;
    if (at === 0) node = cover(book, { size: 'reading' });
    else if (at === LAST) node = endPage();
    else node = page(book, at);
    node.classList.add('turnin');
    stage.append(node);
    prev.disabled = at === 0;
    next.disabled = at === LAST;
    count.textContent = at === 0 ? 'Cover' : at === LAST ? 'The End' : `Page ${at} of 6`;
    endRow.innerHTML = '';
    if (at === LAST && opts.endButton) endRow.append(bigButton(opts.endButton.text, opts.endButton.onClick, 'next', opts.endButton.icon || null));
    else if (at === LAST) endRow.append(bigButton('Read it again', () => { at = 0; sfx.page(); show(); }, 'ghost'), bigButton('Close the book', () => opts.onClose && opts.onClose(), 'next'));
  }

  function turn(d) {
    const n = Math.max(0, Math.min(LAST, at + d));
    if (n === at) return;
    at = n;
    sfx.page();
    show();
  }

  // Swipe to turn pages too.
  let sx = null;
  stage.addEventListener('pointerdown', e => { sx = e.clientX; });
  stage.addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 70) turn(dx < 0 ? 1 : -1); });

  show();
}
