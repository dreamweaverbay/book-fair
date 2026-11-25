// Shared pieces: building elements, buttons, overlays, the grown-up gate.
import { sfx } from './sound.js';

export function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v;
    else if (k === 'style' && typeof v === 'object') Object.entries(v).forEach(([sk, sv]) => (sk.startsWith('--') ? n.style.setProperty(sk, sv) : (n.style[sk] = sv)));
    else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2).toLowerCase(), v);
    else n.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) {
    if (kid === null || kid === undefined || kid === false) continue;
    n.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  }
  return n;
}

export const html = (markup, cls = '') => el('div', { class: cls, html: markup });

export const icons = {
  back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  next: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" fill="currentColor"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>',
  print: '<svg viewBox="0 0 24 24"><path d="M7 3h10v5H7z" fill="currentColor"/><rect x="3" y="8" width="18" height="9" rx="2" fill="currentColor"/><path d="M7 14h10v7H7z" fill="#fff" stroke="currentColor" stroke-width="2"/></svg>',
  read: '<svg viewBox="0 0 24 24"><path d="M2 5c3.5-1.5 7-1.5 10 1v14c-3-2.5-6.5-2.5-10-1zM22 5c-3.5-1.5-7-1.5-10 1v14c3-2.5 6.5-2.5 10-1z" fill="currentColor"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" fill="currentColor"/></svg>',
  people: '<svg viewBox="0 0 32 24"><circle cx="10" cy="7" r="4.2" fill="currentColor"/><path d="M2 22c0-5 3.6-8 8-8s8 3 8 8z" fill="currentColor"/><circle cx="23" cy="9" r="3.4" fill="currentColor" opacity=".7"/><path d="M17 22c.4-4 2.8-6.5 6-6.5s6 2.5 6 6.5z" fill="currentColor" opacity=".7"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M5 7h14l-1 14H6zM9 4h6l1 2H8z" fill="currentColor"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

export const icon = (name, cls = '') => el('span', { class: 'ic ' + cls, html: icons[name], 'aria-hidden': 'true' });

export function iconButton(name, label, onClick, cls = '') {
  return el('button', { class: 'iconbtn ' + cls, 'aria-label': label, onclick: (e) => { sfx.tap(); onClick(e); } }, icon(name));
}

export function bigButton(text, onClick, cls = '', iconName = null) {
  return el('button', { class: 'bigbtn ' + cls, onclick: (e) => { sfx.tap(); onClick(e); } }, iconName ? icon(iconName) : null, el('span', {}, text));
}

export function toast(text, ms = 2400) {
  const t = el('div', { class: 'toast', role: 'status' }, text);
  document.body.append(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, ms);
}

export function overlay(content, cls = '') {
  const o = el('div', { class: 'overlay ' + cls }, el('div', { class: 'overlay-card' }, content));
  document.body.append(o);
  requestAnimationFrame(() => o.classList.add('show'));
  return { node: o, close() { o.classList.remove('show'); setTimeout(() => o.remove(), 250); } };
}

// Grown-up gate: a times-table question a grown-up can do in their head.
export function grownUpGate(onPass, why = 'Grown-ups only') {
  const a = 6 + Math.floor(Math.random() * 4); // 6–9
  const b = 3 + Math.floor(Math.random() * 4); // 3–6
  const input = el('input', { class: 'gate-input', inputmode: 'numeric', type: 'text', autocomplete: 'off', 'aria-label': 'Answer' });
  const msg = el('p', { class: 'gate-msg' }, '');
  let ov;
  const check = () => {
    if (parseInt(input.value, 10) === a * b) { ov.close(); onPass(); }
    else { msg.textContent = 'Not quite. Try again.'; input.value = ''; input.focus(); }
  };
  input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  ov = overlay(el('div', { class: 'gate' },
    el('div', { class: 'gate-icon' }, icon('lock')),
    el('h2', {}, why),
    el('p', { class: 'gate-q' }, `What is ${a} × ${b}?`),
    input, msg,
    el('div', { class: 'row gap center' },
      el('button', { class: 'bigbtn ghost', onclick: () => ov.close() }, 'Cancel'),
      el('button', { class: 'bigbtn', onclick: check }, 'Enter')),
  ), 'gate-overlay');
  setTimeout(() => input.focus(), 250);
}

export function confirmBox(title, text, yesText, onYes, danger = true) {
  let ov;
  ov = overlay(el('div', { class: 'confirm' },
    el('h2', {}, title), el('p', {}, text),
    el('div', { class: 'row gap center' },
      el('button', { class: 'bigbtn ghost', onclick: () => ov.close() }, 'Keep it'),
      el('button', { class: 'bigbtn ' + (danger ? 'danger' : ''), onclick: () => { ov.close(); onYes(); } }, yesText))));
}

export function shuffle(arr, rnd = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// Wait until every picture inside a node has loaded (used before printing).
export function picturesReady(root) {
  const hrefs = [...new Set([...root.querySelectorAll('image')].map(i => i.getAttribute('href')))];
  return Promise.all(hrefs.map(h => new Promise(res => { const im = new Image(); im.onload = im.onerror = res; im.src = h; })));
}
