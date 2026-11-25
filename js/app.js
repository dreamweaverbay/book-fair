// Book Fair — home, shelf, a book's page, grown-up panel, and the router.
import * as store from './store.js';
import { sfx, unlockAudio } from './sound.js';
import { el, icon, iconButton, bigButton, grownUpGate, confirmBox, toast } from './ui.js';
import * as make from './make.js';
import { cover } from './bookview.js';
import { titleText } from './story.js';
import { openReader } from './reader.js';
import { startFair } from './fair.js';
import { printScreen } from './print.js';
import { pic } from './art.js';

const app = document.getElementById('app');
const go = (hash) => { if (location.hash === hash) route(); else location.hash = hash; };

function route() {
  const h = location.hash || '#/';
  window.scrollTo(0, 0);
  const [, path, id] = h.match(/^#\/([^/]*)\/?(.*)$/) || [];
  if (path === 'make') make.start(app, go);
  else if (path === 'done') make.doneScreen(app, go, id);
  else if (path === 'shelf') shelf();
  else if (path === 'book') bookScreen(id);
  else if (path === 'read') { const b = store.book(id); if (!b) go('#/shelf'); else openReader(app, b, { onClose: () => go('#/book/' + id) }); }
  else if (path === 'print') printScreen(app, go, id);
  else if (path === 'fair') startFair(app, go);
  else if (path === 'grownup') grownUp();
  else home();
}

/* ---------------- home ---------------- */

function home() {
  const s = store.get();
  const n = s.books.length;
  const name = store.authorName();
  app.innerHTML = '';
  app.className = 'screen home';
  const resume = make.hasDraft();
  app.append(
    el('div', { class: 'awning', 'aria-hidden': 'true' }),
    el('main', { class: 'home-body' },
      el('div', { class: 'home-sign' },
        el('h1', { class: 'home-title' }, name ? `${name}'s Book Fair` : 'Book Fair'),
        el('p', { class: 'home-sub' }, 'Make a book. Sell it at the fair.')),
      el('div', { class: 'home-art', html: homeArt() }),
      el('div', { class: 'home-buttons' },
        el('button', { class: 'homebtn make', onclick: () => { sfx.tap(); go('#/make'); } },
          icon('plus'), el('span', { class: 'hb-text' }, el('span', { class: 'hb-word' }, resume ? 'Keep making my book' : 'Make a book'))),
        el('button', { class: 'homebtn shelf', onclick: () => { sfx.tap(); go('#/shelf'); } },
          icon('read'), el('span', { class: 'hb-text' }, el('span', { class: 'hb-word' }, 'My shelf'), el('span', { class: 'hb-count' }, `${n} book${n === 1 ? '' : 's'}`))),
        el('button', { class: 'homebtn fair', disabled: n ? null : true, onclick: () => { sfx.tap(); go('#/fair'); } },
          icon('star'), el('span', { class: 'hb-text' }, el('span', { class: 'hb-word' }, 'Hold the fair'), n ? null : el('span', { class: 'hb-count' }, 'Make a book first')))),
      resume ? el('button', { class: 'linkbtn', onclick: () => confirmBox('Start a new book?', 'The book you were making will be thrown away.', 'Start new', () => { make.discardDraft(); go('#/make'); }) }, 'Start a new book instead') : null),
    el('button', { class: 'grownbtn', onclick: () => grownUpGate(() => go('#/grownup')) }, icon('people'), 'Grown-ups'));
}

function homeArt() {
  // A little fair table with books on it.
  const book = (x, c1, c2, h = 54) => `<g transform="translate(${x} 0)"><rect x="-17" y="${120 - h}" width="34" height="${h}" rx="3" fill="${c1}"/><rect x="-17" y="${120 - h}" width="6" height="${h}" fill="${c2}"/><rect x="-6" y="${128 - h}" width="18" height="8" rx="2" fill="#fffaf1" opacity=".85"/></g>`;
  return `<svg viewBox="0 0 320 170" class="table-art" aria-hidden="true">
    <rect x="20" y="120" width="280" height="14" rx="3" fill="#b77a45"/>
    <path d="M24 134 H296 L290 166 H30 Z" fill="#e2483d"/><path d="M60 134 h20 l-2 32 h-20 Z M120 134 h20 l-1 32 h-20 Z M180 134 h20 l1 32 h-20 Z M240 134 h20 l2 32 h-20 Z" fill="#fff6ec"/>
    ${book(70, '#3a86c8', '#2c6aa3', 58)}${book(115, '#f2b33d', '#d99a24', 50)}${book(160, '#5cb85c', '#479a47', 62)}${book(205, '#9b72d8', '#7d55bd', 52)}${book(250, '#e2483d', '#c53a30', 56)}
    <g transform="translate(270 112)">${pic('coin', 0, 0, 22)}</g><g transform="translate(290 116)">${pic('coin', 0, 0, 18)}</g>
  </svg>`;
}

/* ---------------- shelf ---------------- */

function shelf() {
  const books = store.get().books.slice().reverse();
  app.innerHTML = '';
  app.className = 'screen shelf';
  const main = el('main', { class: 'shelf-body' });
  app.append(el('header', { class: 'topbar' }, iconButton('back', 'Home', () => go('#/')), el('h1', { class: 'bar-title' }, 'My shelf'), iconButton('home', 'Home', () => go('#/'))), main);
  if (!books.length) {
    main.append(el('div', { class: 'empty' }, el('p', { class: 'question' }, 'Your shelf is empty. Make your first book!'), bigButton('Make a book', () => go('#/make'), 'next', 'plus')));
    return;
  }
  const grid = el('div', { class: 'shelf-grid' });
  for (const b of books) grid.append(el('button', { class: 'shelf-book', onclick: () => { sfx.tap(); go('#/book/' + b.id); } }, cover(b, { size: 'small', showSold: true })));
  main.append(grid);
}

/* ---------------- one book ---------------- */

function bookScreen(id) {
  const b = store.book(id);
  if (!b) { go('#/shelf'); return; }
  app.innerHTML = '';
  app.className = 'screen bookscreen';
  app.append(
    el('header', { class: 'topbar' }, iconButton('back', 'My shelf', () => go('#/shelf')), el('h1', { class: 'bar-title' }, titleText(b)), iconButton('home', 'Home', () => go('#/'))),
    el('main', { class: 'book-body' },
      el('div', { class: 'book-cover' }, cover(b, { size: 'big', showSold: true })),
      el('div', { class: 'book-actions' },
        bigButton('Read it', () => go('#/read/' + id), 'next', 'read'),
        bigButton('Print it', () => go('#/print/' + id), 'ghost', 'print'),
        el('button', { class: 'linkbtn', onclick: () => grownUpGate(() => confirmBox('Delete this book?', `${titleText(b)} will be gone from this tablet.`, 'Delete', () => { store.deleteBook(id); toast('Book deleted'); go('#/shelf'); }), 'Grown-ups: delete a book') }, icon('trash'), 'Delete'))));
}

/* ---------------- grown-ups ---------------- */

function grownUp() {
  const s = store.get();
  app.innerHTML = '';
  app.className = 'screen grownup';
  const nameIn = el('input', { type: 'text', class: 'textin', value: s.settings.name, maxlength: '24', placeholder: 'Name for the covers', 'aria-label': 'Author name' });
  nameIn.addEventListener('input', () => store.update(st => { st.settings.name = nameIn.value; }));
  const soundBtn = el('button', { class: 'toggle' + (s.settings.sound ? ' on' : ''), role: 'switch', 'aria-checked': String(s.settings.sound) }, s.settings.sound ? 'On' : 'Off');
  soundBtn.addEventListener('click', () => {
    store.update(st => { st.settings.sound = !st.settings.sound; });
    const v = store.get().settings.sound;
    soundBtn.classList.toggle('on', v); soundBtn.textContent = v ? 'On' : 'Off'; soundBtn.setAttribute('aria-checked', String(v));
    sfx.tap();
  });
  const fileIn = el('input', { type: 'file', accept: 'application/json,.json', style: { display: 'none' } });
  fileIn.addEventListener('change', async () => {
    const f = fileIn.files[0]; if (!f) return;
    try { store.importData(await f.text()); toast('Backup restored'); grownUp(); }
    catch (e) { toast('That file isn’t a Book Fair backup'); }
  });
  const download = () => {
    const blob = new Blob([store.exportData()], { type: 'application/json' });
    const a = el('a', { href: URL.createObjectURL(blob), download: `book-fair-backup-${store.todayKey()}.json` });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  };
  const list = el('div', { class: 'gu-books' });
  const drawList = () => {
    list.innerHTML = '';
    const books = store.get().books.slice().reverse();
    if (!books.length) list.append(el('p', { class: 'muted' }, 'No books yet.'));
    for (const b of books) {
      list.append(el('div', { class: 'gu-book' },
        el('span', {}, titleText(b), el('small', { class: 'muted' }, ' · ' + new Date(b.made).toLocaleDateString())),
        el('button', { class: 'smallbtn danger', onclick: () => confirmBox('Delete this book?', `${titleText(b)} will be gone from this tablet.`, 'Delete', () => { store.deleteBook(b.id); toast('Book deleted'); drawList(); }) }, 'Delete')));
    }
  };
  drawList();
  app.append(
    el('header', { class: 'topbar' }, iconButton('back', 'Home', () => go('#/')), el('h1', { class: 'bar-title' }, 'Grown-ups'), el('span')),
    el('main', { class: 'gu-body' },
      el('section', { class: 'gu-card' },
        el('h2', {}, 'Author name'),
        el('p', { class: 'muted' }, 'Prints on every cover after “by”.'),
        nameIn),
      el('section', { class: 'gu-card' },
        el('div', { class: 'row between' }, el('div', {}, el('h2', {}, 'Sound effects'), el('p', { class: 'muted' }, 'Soft taps, page turns, and coins. Never any voices.')), soundBtn)),
      el('section', { class: 'gu-card' },
        el('h2', {}, 'Backup'),
        el('p', { class: 'muted' }, 'Books are saved only on this tablet. Clearing the browser’s data erases them, so download a backup now and then.'),
        el('div', { class: 'row gap wrap' }, el('button', { class: 'smallbtn', onclick: download }, 'Download backup'), el('button', { class: 'smallbtn', onclick: () => fileIn.click() }, 'Restore from backup')),
        fileIn),
      el('section', { class: 'gu-card' },
        el('h2', {}, 'His books'),
        list),
      el('section', { class: 'gu-card' },
        el('h2', {}, 'Printing'),
        el('p', { class: 'muted' }, 'Open a book on the shelf and tap Print it. Each book fits on one sheet of letter paper and folds into a mini-book with one cut. Black and white prints outlines he can color; color prints the characters in color with outline backgrounds. Neither prints filled backgrounds.')),
      el('p', { class: 'muted center small' }, 'Book Fair works offline. No accounts, no ads, nothing sent anywhere.')));
}

/* ---------------- start ---------------- */

unlockAudio();
window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
