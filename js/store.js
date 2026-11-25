// Book Fair — saving on this device. No accounts, nothing sent anywhere.

const KEY = 'book-fair.v1';

const DEFAULTS = () => ({
  version: 1,
  created: Date.now(),
  settings: { name: '', sound: true },
  books: [],     // finished books, newest last
  draft: null,   // the book being made right now
});

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS();
    const p = JSON.parse(raw);
    const d = DEFAULTS();
    // Books from the first test version (before story paths) can't be redrawn, so they're left out.
    const books = Array.isArray(p.books) ? p.books.filter(b => b && b.v === 2) : [];
    const draft = p.draft && p.draft.v === 3 ? p.draft : null;
    return { ...d, ...p, settings: { ...d.settings, ...(p.settings || {}) }, books, draft };
  } catch (e) {
    return DEFAULTS();
  }
}

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); return true; } catch (e) { return false; }
}

export const get = () => state;
export function update(fn) { fn(state); save(); }

export const book = (id) => state.books.find(b => b.id === id);
export const authorName = () => (state.settings.name || '').trim();

export function addBook(b) { update(s => { s.books.push(b); s.draft = null; }); }
export function deleteBook(id) { update(s => { s.books = s.books.filter(b => b.id !== id); }); }

export function exportData() { return JSON.stringify(state, null, 2); }

export function importData(text) {
  const p = JSON.parse(text);
  if (!p || p.version !== 1 || !Array.isArray(p.books)) throw new Error('Not a Book Fair backup');
  const d = DEFAULTS();
  state = { ...d, ...p, settings: { ...d.settings, ...(p.settings || {}) }, books: p.books.filter(b => b && b.v === 2) };
  save();
}

export function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
