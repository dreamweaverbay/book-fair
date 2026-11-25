// The fair: he sets up a table, a grown-up visitor picks a book and pays pretend coins,
// he counts them and reads the book aloud, and it gets a SOLD sticker.
import * as store from './store.js';
import { sfx } from './sound.js';
import { el, iconButton, bigButton } from './ui.js';
import { cover } from './bookview.js';
import { titleText } from './story.js';
import { openReader } from './reader.js';
import { pic } from './art.js';

let fair = null; // this fair only: { table: [ids], prices: {}, sold: [] }

const coinSvg = (empty = false) => empty
  ? '<svg viewBox="0 0 40 40" class="coin coin-slot"><circle cx="20" cy="20" r="17" fill="none" stroke="#c9a14a" stroke-width="2.5" stroke-dasharray="4 3"/></svg>'
  : `<svg viewBox="0 -40 40 40" class="coin">${pic('coin', 20, 0, 40)}</svg>`;

const coins = (n, cls = '') => el('div', { class: 'coins ' + cls, html: Array.from({ length: n }, () => coinSvg()).join('') });

export function startFair(app, go) {
  const books = store.get().books;
  if (!books.length) { noBooks(app, go); return; }
  fair = { table: [], prices: {}, sold: [] };
  pickBooks(app, go);
}

function shell(app, go, cls, onBack) {
  app.innerHTML = '';
  app.className = 'screen fair fs-' + cls;
  const main = el('main', { class: 'fair-body' });
  app.append(el('header', { class: 'topbar' }, iconButton('back', 'Back', onBack || (() => go('#/'))), el('h1', { class: 'bar-title' }, 'The Book Fair'), iconButton('home', 'Home', () => go('#/'))), main);
  return main;
}

function noBooks(app, go) {
  const m = shell(app, go, '');
  m.append(el('div', { class: 'empty' }, el('p', { class: 'question' }, 'Make a book first. Then you can sell it at the fair!'), bigButton('Make a book', () => go('#/make'), 'next', 'plus')));
}

function pickBooks(app, go) {
  const m = shell(app, go, 'pick');
  const books = store.get().books.slice().reverse();
  const next = bigButton('Next', () => { priceBook(app, go, 0); }, 'next', 'next');
  const sync = () => { next.disabled = fair.table.length === 0; };
  const grid = el('div', { class: 'shelf-grid small' });
  for (const b of books) {
    const tile = el('button', { class: 'shelf-book' + (fair.table.includes(b.id) ? ' on' : '') }, cover(b, { size: 'small' }), el('span', { class: 'pickmark' }, '✓'));
    tile.addEventListener('click', () => {
      const i = fair.table.indexOf(b.id);
      if (i >= 0) fair.table.splice(i, 1);
      else if (fair.table.length < 4) fair.table.push(b.id);
      else return;
      sfx.pick();
      tile.classList.toggle('on', fair.table.includes(b.id));
      sync();
    });
    grid.append(tile);
  }
  sync();
  m.append(el('p', { class: 'question' }, 'Pick up to 4 books for your table.'), grid, el('div', { class: 'actions' }, next));
}

function priceBook(app, go, k) {
  const id = fair.table[k];
  const b = store.book(id);
  const m = shell(app, go, 'price', () => (k === 0 ? pickBooks(app, go) : priceBook(app, go, k - 1)));
  const last = k === fair.table.length - 1;
  const next = bigButton(last ? 'Open the fair!' : 'Next book', () => (last ? table(app, go) : priceBook(app, go, k + 1)), 'next', 'next');
  next.disabled = !fair.prices[id];
  const show = el('div', { class: 'price-show' });
  const drawCoins = () => { show.innerHTML = ''; if (fair.prices[id]) show.append(coins(fair.prices[id]), el('p', { class: 'price-words' }, `${fair.prices[id]} coin${fair.prices[id] === 1 ? '' : 's'}`)); };
  const nums = el('div', { class: 'nums' });
  for (let n = 1; n <= 10; n++) {
    const btn = el('button', { class: 'pricenum' + (fair.prices[id] === n ? ' on' : '') }, String(n));
    btn.addEventListener('click', () => {
      sfx.coin();
      fair.prices[id] = n;
      nums.querySelectorAll('.pricenum').forEach(x => x.classList.remove('on'));
      btn.classList.add('on');
      next.disabled = false;
      drawCoins();
    });
    nums.append(btn);
  }
  drawCoins();
  m.append(el('div', { class: 'price-layout' },
    el('div', { class: 'price-book' }, cover(b, { size: 'small' })),
    el('div', { class: 'price-side' },
      el('p', { class: 'question' }, `How many coins for ${titleText(b)}?`),
      nums, show, el('div', { class: 'actions' }, next))));
}

function table(app, go) {
  const m = shell(app, go, 'table', () => priceBook(app, go, fair.table.length - 1));
  const tbl = el('div', { class: 'fair-table' });
  for (const id of fair.table) {
    const b = store.book(id);
    if (!b) continue;
    const isSold = fair.sold.includes(id);
    const spot = el('button', { class: 'table-book' + (isSold ? ' sold' : ''), disabled: isSold ? true : null },
      cover(b, { size: 'small' }),
      el('div', { class: 'price-tag' }, el('span', { html: coinSvg() }), el('b', {}, String(fair.prices[id]))),
      isSold ? el('div', { class: 'sold-sticker' }, 'SOLD') : null);
    spot.addEventListener('click', () => { sfx.pick(); pay(app, go, id); });
    tbl.append(spot);
  }
  const allSold = fair.table.every(id => fair.sold.includes(id));
  m.append(
    el('div', { class: 'awning', 'aria-hidden': 'true' }),
    el('p', { class: 'question center' }, allSold ? 'Every book sold!' : 'The fair is open! Grown-up: pick a book to buy.'),
    tbl,
    el('div', { class: 'actions center' }, bigButton('Close the fair', () => closed(app, go), allSold ? 'next' : 'ghost')));
}

function pay(app, go, id) {
  const b = store.book(id);
  const price = fair.prices[id];
  let paid = 0;
  const m = shell(app, go, 'pay', () => table(app, go));
  const slots = el('div', { class: 'coins pay-slots', html: Array.from({ length: price }, () => coinSvg(true)).join('') });
  const say = el('p', { class: 'question center' }, 'Grown-up: tap to pay one coin at a time. Count them together!');
  const btn = bigButton('Pay a coin', () => {
    if (paid >= price) return;
    slots.children[paid].outerHTML = coinSvg();
    paid++;
    sfx.coin();
    if (paid === price) done();
  }, 'coinbtn');
  const after = el('div', { class: 'actions center' }, btn);
  function done() {
    say.textContent = `${price} coin${price === 1 ? '' : 's'}. Paid!`;
    after.innerHTML = '';
    after.append(bigButton('Read the book', () => read(app, go, id), 'next', 'read'));
  }
  m.append(el('div', { class: 'pay-layout' },
    el('div', { class: 'price-book' }, cover(b, { size: 'small' })),
    el('div', { class: 'pay-side' }, el('h2', { class: 'pay-title' }, titleText(b)), slots, say, after)));
}

function read(app, go, id) {
  const b = store.book(id);
  openReader(app, b, {
    onClose: () => table(app, go),
    endButton: { text: 'Sold!', icon: 'star', onClick: () => {
      if (!fair.sold.includes(id)) fair.sold.push(id);
      store.update(s => { const bk = s.books.find(x => x.id === id); if (bk) bk.sold = (bk.sold || 0) + 1; });
      sfx.sold();
      table(app, go);
    } },
  });
}

function closed(app, go) {
  const m = shell(app, go, 'closed');
  const sold = fair.sold.map(id => store.book(id)).filter(Boolean);
  m.append(el('div', { class: 'closed' },
    el('h1', { class: 'theend big' }, 'The fair is closed.'),
    el('p', { class: 'lead' }, 'Thanks for coming!'),
    sold.length ? el('div', { class: 'shelf-grid small' }, sold.map(b => el('div', { class: 'shelf-book' }, cover(b, { size: 'small' })))) : null,
    el('div', { class: 'actions center' }, bigButton('Home', () => go('#/'), 'next', 'home'))));
  fair = null;
}
