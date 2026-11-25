// Book Fair pictures.
// Bundled Noto Emoji pictures (see art/noto/README.md) plus characters, props and places drawn in code.
// Everything is placed by its bottom-center point. Every picture has two looks:
//   'color' for the screen, and 'line' for printing as an outline he can color.
import { NOTO } from './notobox.js';

let uid = 0;
const nid = (p) => `${p}${++uid}`;

/* ---------------- code-drawn pictures ----------------
   Each one is drawn with its bottom-center at (0,0). nh = natural height, nw = natural width.
   Classes used by the outline look (see css): k = stays dark, nf = a line with no fill,
   limb = a thick line that keeps its weight, sh = shading that the outline look leaves out. */

const INK = '#2b2b2b';

const CODE = {
  robot: {
    nh: 120, nw: 86,
    draw: () => `
      <line x1="0" y1="-104" x2="0" y2="-113" stroke="#5d6b78" stroke-width="3.5" class="limb nf"/>
      <circle cx="0" cy="-115" r="5.5" fill="#ef5a4c"/>
      <rect x="-31" y="-96" width="6" height="16" rx="2.5" fill="#8796a3"/>
      <rect x="25" y="-96" width="6" height="16" rx="2.5" fill="#8796a3"/>
      <rect x="-26" y="-105" width="52" height="35" rx="10" fill="#c3d0da"/>
      <circle cx="-11" cy="-89" r="8.5" fill="#fff"/><circle cx="-10" cy="-88" r="4.2" fill="${INK}" class="k"/>
      <circle cx="11" cy="-89" r="8.5" fill="#fff"/><circle cx="12" cy="-88" r="4.2" fill="${INK}" class="k"/>
      <path d="M-9 -78 Q0 -72 9 -78" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" class="nf"/>
      <rect x="-7" y="-71" width="14" height="7" fill="#8796a3"/>
      <rect x="-43" y="-62" width="12" height="30" rx="6" fill="#8796a3"/>
      <rect x="31" y="-62" width="12" height="30" rx="6" fill="#8796a3"/>
      <circle cx="-37" cy="-30" r="6.5" fill="#c3d0da"/><circle cx="37" cy="-30" r="6.5" fill="#c3d0da"/>
      <rect x="-20" y="-24" width="12" height="17" fill="#8796a3"/>
      <rect x="8" y="-24" width="12" height="17" fill="#8796a3"/>
      <rect x="-31" y="-66" width="62" height="44" rx="9" fill="#3fa7c4"/>
      <rect x="-19" y="-58" width="38" height="22" rx="4" fill="#e9f4f8"/>
      <circle cx="-9" cy="-47" r="4.2" fill="#f2c14e"/><circle cx="3" cy="-47" r="4.2" fill="#ef5a4c"/>
      <rect x="10" y="-53" width="4.5" height="12" rx="1.5" fill="#5cb85c"/>
      <rect x="-26" y="-9" width="21" height="9" rx="4.5" fill="#5d6b78"/>
      <rect x="5" y="-9" width="21" height="9" rx="4.5" fill="#5d6b78"/>`,
  },
  monster: {
    nh: 108, nw: 100,
    draw: () => `
      <path d="M-21 -88 Q-30 -100 -26 -108 Q-16 -100 -9 -94 Z" fill="#f6c453"/>
      <path d="M21 -88 Q30 -100 26 -108 Q16 -100 9 -94 Z" fill="#f6c453"/>
      <ellipse cx="-41" cy="-61" rx="6" ry="14" fill="#8f63d2" transform="rotate(-31 -41 -61)"/>
      <ellipse cx="41" cy="-36" rx="6" ry="11" fill="#8f63d2" transform="rotate(-37 41 -36)"/>
      <ellipse cx="-17" cy="-5" rx="13" ry="6.5" fill="#7448b8"/>
      <ellipse cx="17" cy="-5" rx="13" ry="6.5" fill="#7448b8"/>
      <path d="M-36 -12 C-41 -62 -28 -97 0 -97 C28 -97 41 -62 36 -12 Q0 -2 -36 -12 Z" fill="#9b72d8"/>
      <ellipse cx="0" cy="-30" rx="21" ry="17" fill="#c9b0f2"/>
      <circle cx="-25" cy="-76" r="4" fill="#b896ea" class="sh"/><circle cx="27" cy="-44" r="3.5" fill="#b896ea" class="sh"/>
      <circle cx="-13" cy="-68" r="12" fill="#fff"/><circle cx="-11" cy="-66" r="5.5" fill="${INK}" class="k"/>
      <circle cx="13" cy="-68" r="12" fill="#fff"/><circle cx="15" cy="-66" r="5.5" fill="${INK}" class="k"/>
      <path d="M-16 -51 Q0 -45 16 -51 Q0 -33 -16 -51 Z" fill="#5a2d6b" class="k"/>
      <rect x="-3.5" y="-49.5" width="7" height="6" rx="1.5" fill="#fff"/>`,
  },
  truck: {
    nh: 92, nw: 134,
    draw: () => {
      const wheel = (cx) => `<circle cx="${cx}" cy="-24" r="24" fill="#2f3237"/>
        <circle cx="${cx}" cy="-24" r="18" fill="none" stroke="#50555c" stroke-width="3" stroke-dasharray="5 4" class="nf sh"/>
        <circle cx="${cx}" cy="-24" r="10" fill="#a7afb8"/><circle cx="${cx}" cy="-24" r="3.5" fill="#2f3237" class="k"/>`;
      return `
      <rect x="-42" y="-52" width="8" height="18" fill="#8a929b"/><rect x="34" y="-52" width="8" height="18" fill="#8a929b"/>
      ${wheel(-38)}${wheel(38)}
      <path d="M-62 -48 H60 Q66 -48 66 -54 V-62 Q66 -66 60 -66 H38 L28 -86 Q26 -90 20 -90 H-8 Q-12 -90 -12 -86 V-66 H-62 Q-66 -66 -66 -62 V-52 Q-66 -48 -62 -48 Z" fill="#e2483d"/>
      <path d="M-6 -84 H18 L26 -69 H-6 Z" fill="#bfe3f2"/>
      <path d="M-66 -59 H66 V-55 H-66 Z" fill="#f6c453"/>
      <rect x="59" y="-65" width="6" height="6" rx="2" fill="#fff3b0"/>`;
    },
  },
  sam: {
    nh: 104, nw: 60,
    draw: () => `
      <path d="M-14 0 L0 -34 L14 0" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" class="limb nf"/>
      <path d="M0 -34 V-66" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round" class="limb nf"/>
      <path d="M-20 -76 L0 -58 L20 -46" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" class="limb nf"/>
      <circle cx="0" cy="-80" r="15" fill="#fff" stroke="${INK}" stroke-width="3.5"/>
      <path d="M-15 -84 Q-15 -100 0 -100 Q15 -100 15 -84 Z" fill="#3a86c8"/>
      <path d="M9 -86 H27 Q28 -82 24 -82 H9 Z" fill="#2c6aa3"/>
      <circle cx="-5" cy="-79" r="2.2" fill="${INK}" class="k"/><circle cx="5" cy="-79" r="2.2" fill="${INK}" class="k"/>
      <path d="M-6 -73 Q0 -68 6 -73" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" class="nf"/>`,
  },
  lizard: {
    nh: 118, nw: 104,
    draw: () => `
      <path d="M14 -16 Q46 -14 60 0 Q38 -2 16 -5 Z" fill="#4e9f5b"/>
      <path d="M-15 -104 Q-11 -118 -5 -105 Q0 -120 5 -105 Q11 -118 15 -104 Z" fill="#f2b84b"/>
      <ellipse cx="-34" cy="-51" rx="5" ry="9" fill="#5bb36a" transform="rotate(50 -34 -51)"/>
      <ellipse cx="34" cy="-51" rx="5" ry="9" fill="#5bb36a" transform="rotate(-50 34 -51)"/>
      <ellipse cx="-18" cy="-7" rx="14" ry="8" fill="#4e9f5b"/>
      <ellipse cx="18" cy="-7" rx="14" ry="8" fill="#4e9f5b"/>
      <path d="M-31 -14 C-37 -50 -27 -76 0 -76 C27 -76 37 -50 31 -14 Q0 -4 -31 -14 Z" fill="#5bb36a"/>
      <path d="M-17 -16 C-21 -40 -14 -62 0 -62 C14 -62 21 -40 17 -16 Q0 -10 -17 -16 Z" fill="#d9eeae"/>
      <path d="M-13 -27 H13 M-15 -38 H15 M-13 -49 H13" stroke="#b9d68a" stroke-width="2" fill="none" class="nf sh"/>
      <ellipse cx="0" cy="-89" rx="25" ry="19" fill="#5bb36a"/>
      <ellipse cx="0" cy="-80" rx="17" ry="10" fill="#6dc47b"/>
      <circle cx="-5" cy="-83" r="1.6" fill="${INK}" class="k"/><circle cx="5" cy="-83" r="1.6" fill="${INK}" class="k"/>
      <circle cx="-12" cy="-97" r="8" fill="#fff"/><circle cx="-11" cy="-96" r="4" fill="${INK}" class="k"/>
      <circle cx="12" cy="-97" r="8" fill="#fff"/><circle cx="13" cy="-96" r="4" fill="${INK}" class="k"/>
      <circle cx="-17" cy="-81" r="3" fill="#f3a6a0" class="sh"/><circle cx="17" cy="-81" r="3" fill="#f3a6a0" class="sh"/>
      <path d="M-9 -76 Q0 -71 9 -76" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" class="nf"/>`,
  },
  // Silly things
  sock: {
    nh: 84, nw: 52,
    draw: () => `
      <path d="M-4 -84 H18 V-32 Q18 -12 0 -8 L-18 -4 Q-34 -2 -34 -16 Q-34 -28 -20 -30 L-4 -32 Z" fill="#f5f1e8" stroke="#cfc6b2" stroke-width="2.5"/>
      <path d="M-4 -80 H18 V-74 H-4 Z" fill="#e2483d"/><path d="M-4 -70 H18 V-64 H-4 Z" fill="#3a86c8"/>
      <path d="M-18 -4 Q-34 -2 -34 -16 Q-34 -28 -20 -30 Q-24 -16 -18 -4 Z" fill="#e2483d"/>
      <path d="M4 -10 Q18 -12 18 -30 Q8 -26 4 -10 Z" fill="#e2483d"/>`,
  },
  cottoncandy: {
    nh: 104, nw: 70,
    draw: () => `
      <path d="M-11 -42 L0 0 L11 -42 Z" fill="#f6f1e6" stroke="#d6cdb8" stroke-width="2"/>
      <path d="M-8 -30 L5 -38 M-5 -18 L7 -26" stroke="#5aa9d6" stroke-width="2.5" class="nf"/>
      <circle cx="-19" cy="-54" r="16" fill="#f59cc8"/><circle cx="19" cy="-54" r="16" fill="#f59cc8"/>
      <circle cx="0" cy="-62" r="23" fill="#f7add2"/>
      <circle cx="-13" cy="-79" r="14" fill="#f7add2"/><circle cx="13" cy="-81" r="15" fill="#f59cc8"/>
      <circle cx="0" cy="-90" r="13" fill="#f9bedb"/>`,
  },
  duck: {
    nh: 70, nw: 92,
    draw: () => `
      <path d="M32 -30 L46 -46 L40 -24 Z" fill="#f7c331"/>
      <ellipse cx="6" cy="-20" rx="36" ry="20" fill="#ffd23f"/>
      <path d="M-6 -24 Q10 -38 28 -24 Q12 -14 -6 -24 Z" fill="#f2b81f"/>
      <circle cx="-16" cy="-50" r="18" fill="#ffd23f"/>
      <path d="M-31 -52 Q-48 -52 -46 -44 Q-38 -38 -28 -43 Z" fill="#f28a2e"/>
      <circle cx="-20" cy="-55" r="3.2" fill="${INK}" class="k"/>`,
  },
  beachball: {
    nh: 64, nw: 64,
    draw: () => {
      const id = nid('bb');
      const lens = (a, b, c) => `<path d="M0 -62 Q${a} -32 0 -2 Q${b} -32 0 -62 Z" fill="${c}" clip-path="url(#${id})"/>`;
      return `<defs><clipPath id="${id}"><circle cx="0" cy="-32" r="30"/></clipPath></defs>
        <circle cx="0" cy="-32" r="30" fill="#fbfaf5"/>
        ${lens(-90, -38, '#e2483d')}${lens(-38, 0, '#f6c453')}${lens(38, 90, '#3a86c8')}
        <circle cx="0" cy="-32" r="30" fill="none" stroke="#d9d2c0" stroke-width="1.5" class="nf"/>
        <ellipse cx="0" cy="-60" rx="6" ry="3" fill="#fbfaf5"/>`;
    },
  },
  bananapeel: {
    nh: 46, nw: 92,
    draw: () => `
      <path d="M-6 -16 Q-30 -26 -44 -2 Q-37 3 -30 -2 Q-20 -12 -5 -9 Z" fill="#f2c331"/>
      <path d="M-7 -14 Q-27 -21 -38 -3 Q-29 -7 -7 -10 Z" fill="#fff1bd" class="sh"/>
      <path d="M6 -16 Q30 -26 44 -2 Q37 3 30 -2 Q20 -12 5 -9 Z" fill="#f2c331"/>
      <path d="M7 -14 Q27 -21 38 -3 Q29 -7 7 -10 Z" fill="#fff1bd" class="sh"/>
      <path d="M-10 -10 Q-11 -34 0 -38 Q11 -34 10 -10 Z" fill="#f7d24a"/>
      <path d="M-3 -38 Q-3 -45 0 -46 Q3 -45 3 -38 Z" fill="#7a5426"/>
      <path d="M-7 -10 Q-10 6 2 6 Q12 4 7 -10 Z" fill="#f7d24a"/>
      <path d="M-4 -9 Q-6 2 2 3 Q8 2 4 -9 Z" fill="#fff1bd" class="sh"/>`,
  },
  bubble: {
    nh: 72, nw: 72,
    draw: () => `
      <circle cx="0" cy="-36" r="34" fill="#cdeefb" fill-opacity=".7" stroke="#7cc4e4" stroke-width="2.5"/>
      <path d="M-22 -48 Q-16 -62 -2 -64" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" class="nf"/>
      <circle cx="18" cy="-20" r="4" fill="#fff" class="sh"/>`,
  },
  coin: {
    nh: 40, nw: 40,
    draw: () => `<circle cx="0" cy="-20" r="19" fill="#e9b52e"/><circle cx="0" cy="-20" r="14.5" fill="#f6cf55"/>
      <path d="M0 -29 L2.6 -23 L9 -22.6 L4 -18.6 L5.6 -12.4 L0 -15.8 L-5.6 -12.4 L-4 -18.6 L-9 -22.6 L-2.6 -23 Z" fill="#e9b52e"/>`,
  },
  blanket: {
    nh: 30, nw: 220,
    draw: () => `<ellipse cx="0" cy="-15" rx="110" ry="15" fill="#f4d8d4"/>
      <path d="M-80 -24 L-60 -4 M-40 -28 L-20 -2 M0 -30 L20 -1 M40 -28 L60 -3 M-95 -12 H95" stroke="#e07a6b" stroke-width="5" class="nf"/>`,
  },
};

/* ---------------- one picture, by name ---------------- */

export function hasArt(name) { return !!(CODE[name] || NOTO[name]); }

// Width / height of a picture.
export function aspect(name) {
  if (CODE[name]) return CODE[name].nw / CODE[name].nh;
  const b = NOTO[name];
  return b ? b[2] / b[3] : 1;
}

// A picture with its bottom-center at (x, y), h tall. flip mirrors it left-right.
export function pic(name, x, y, h, o = {}) {
  const mode = o.mode || 'color';
  const flip = o.flip ? -1 : 1;
  const rot = o.rot ? ` rotate(${o.rot})` : '';
  if (CODE[name]) {
    const c = CODE[name];
    const s = h / c.nh;
    return `<g class="${mode === 'line' ? 'ln' : ''}" transform="translate(${r(x)} ${r(y)})${rot} scale(${r(flip * s, 4)} ${r(s, 4)})">${c.draw()}</g>`;
  }
  const b = NOTO[name];
  if (!b) return '';
  const w = h * b[2] / b[3];
  const src = `art/${mode === 'line' ? 'noto-line' : 'noto'}/${name}.svg`;
  const inner = `<svg x="${r(-w / 2)}" y="${r(-h)}" width="${r(w)}" height="${r(h)}" viewBox="${b.join(' ')}" overflow="visible"><image href="${src}" width="128" height="128"/></svg>`;
  return `<g transform="translate(${r(x)} ${r(y)})${rot} scale(${flip} 1)">${inner}</g>`;
}

const r = (n, d = 1) => +n.toFixed(d);

// Standalone square-ish picture for choice cards.
export function cardPic(markup, vb = '0 0 100 100') {
  return `<svg viewBox="${vb}" class="cardpic">${markup}</svg>`;
}

/* ---------------- characters ---------------- */

// Which way each picture faces on its own: -1 = left, 1 = right, 0 = straight at us.
const FACING = { shark: -1, fish: -1, dragon: -1, truck: 1, duck: -1 };

// Heights in a scene (units of the 400 x 300 page).
export const FIG_H = { robot: 124, monster: 114, truck: 92, shark: 94, fish: 70, strawberry: 88, sam: 120, dragon: 124, lizard: 156 };

// Draw a character standing at x on the ground line, facing 'left' or 'right'.
export function figure(id, x, ground, o = {}) {
  const h = (o.h || FIG_H[id]) * (o.scale || 1);
  const w = h * aspect(id);
  const want = o.face === 'left' ? -1 : 1;
  const flip = FACING[id] ? FACING[id] !== want : false;
  let svg = pic(id, x, ground, h, { flip, mode: o.mode });
  if (id === 'strawberry') svg += berryFace(x, ground, h, o.mode);
  const headX = x + (FACING[id] ? want : 0) * (HEADX[id] || 0) * w;
  return { svg, x, ground, h, w, top: ground - h, left: x - w / 2, right: x + w / 2, headY: ground - h * headFrac(id), headX, face: want };
}

// How far the head sits from the middle, as a share of width, for side-facing pictures.
const HEADX = { shark: 0.2, fish: 0.24, dragon: 0.14, truck: 0.06 };

// Where the top of the head is, as a share of height (for hats).
function headFrac(id) { return { truck: 1, shark: 0.9, fish: 0.85, dragon: 1, sam: 1, robot: 0.9 }[id] || 1; }

function berryFace(x, ground, h, mode) {
  const s = h / 100;
  const cy = ground - h * 0.42;
  return `<g class="${mode === 'line' ? 'ln' : ''}" transform="translate(${r(x + 2 * s)} ${r(cy)}) scale(${r(s, 4)})">
    <circle cx="-11" cy="-4" r="7" fill="#fff"/><circle cx="-10" cy="-3" r="3.6" fill="${INK}" class="k"/>
    <circle cx="11" cy="-4" r="7" fill="#fff"/><circle cx="12" cy="-3" r="3.6" fill="${INK}" class="k"/>
    <path d="M-9 9 Q0 17 9 9" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" class="nf"/></g>`;
}

/* ---------------- effects for the funny words ---------------- */

// Lines and extras drawn around a picture that sits in the box (cx, bottom, w, h).
export function effect(fx, cx, bottom, w, h, mode = 'color') {
  const top = bottom - h;
  const ln = mode === 'line' ? 'ln' : '';
  if (fx === 'stinky') {
    const wave = (x) => `<path d="M${r(x)} ${r(top - 4)} q7 -7 0 -14 q-7 -7 0 -14 q7 -7 0 -14" fill="none" stroke="#79b443" stroke-width="3.5" stroke-linecap="round" class="nf"/>`;
    return `<g class="${ln}">${wave(cx - w * 0.28)}${wave(cx)}${wave(cx + w * 0.28)}</g>`;
  }
  if (fx === 'sparkly') {
    const s = Math.max(16, Math.min(30, h * 0.32));
    return pic('sparkles', cx - w / 2 - s * 0.2, top + s * 0.9, s, { mode }) + pic('sparkles', cx + w / 2 + s * 0.15, top + h * 0.55, s * 0.8, { mode }) + pic('sparkles', cx + w * 0.15, top - 2, s * 0.7, { mode });
  }
  if (fx === 'soggy') {
    const s = Math.max(10, Math.min(18, h * 0.18));
    return pic('droplet', cx - w * 0.3, bottom + 2, s, { mode }) + pic('droplet', cx + w * 0.35, bottom - h * 0.25, s, { mode }) + pic('droplet', cx + w * 0.05, top + s * 0.2, s * 0.9, { mode });
  }
  if (fx === 'sleepy') return pic('zzz', cx + w * 0.35, top - 2, Math.max(22, Math.min(36, h * 0.35)), { mode });
  if (fx === 'dizzy') return pic('dizzy', cx, top - 2, Math.max(22, Math.min(34, h * 0.3)), { mode });
  if (fx === 'bouncy') {
    return `<g class="${ln}"><path d="M${r(cx - w * 0.45)} ${r(bottom + 12)} q${r(w * 0.2)} -12 ${r(w * 0.4)} 0 M${r(cx + w * 0.05)} ${r(bottom + 12)} q${r(w * 0.2)} -12 ${r(w * 0.4)} 0" fill="none" stroke="#8a7563" stroke-width="3" stroke-linecap="round" class="nf"/></g>`;
  }
  return '';
}

// Size change for the funny words.
export const FX_SCALE = { giant: 1.7, tiny: 0.45 };

/* ---------------- places ---------------- */
// Each place is drawn on a 400 x 300 page. GROUND is where feet stand.

export const GROUND = 252;

const line = (d, w = 1.4) => `<path d="${d}" fill="none" stroke="#3a3a3a" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
const sky = (top = '#cfe9f7', bottom = '#f3fbff') => {
  const id = nid('sky');
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="400" height="300" fill="url(#${id})"/>`;
};

const PLACES = {
  fair(mode) {
    const spokes = [...Array(8)].map((_, i) => { const a = i * Math.PI / 4; return [315 + 58 * Math.cos(a), 118 + 58 * Math.sin(a)]; });
    const flags = [...Array(9)].map((_, i) => { const x = 10 + i * 47; const y = 26 + Math.sin(i / 8 * Math.PI) * 14; return [x, y]; });
    const fcol = ['#e2483d', '#f6c453', '#3a86c8', '#5cb85c'];
    if (mode === 'line') {
      return line('M0 232 H400') +
        `<circle cx="315" cy="118" r="58" fill="none" stroke="#3a3a3a" stroke-width="1.4" vector-effect="non-scaling-stroke"/>` +
        spokes.map(([x, y]) => line(`M315 118 L${r(x)} ${r(y)}`, 1)).join('') +
        line('M300 130 L282 232 M330 130 L348 232') +
        line('M22 232 V180 H138 V232 M14 182 L80 140 L146 182 M80 140 V128 L94 133 L80 138') +
        line('M50 232 V180 M80 232 V180 M110 232 V180', 1) +
        line(`M0 22 ${flags.map(([x, y]) => `L${r(x)} ${r(y)}`).join(' ')} L400 22`, 1) +
        flags.slice(1, -1).map(([x, y]) => line(`M${r(x - 9)} ${r(y)} L${r(x)} ${r(y + 16)} L${r(x + 9)} ${r(y)}`, 1)).join('');
    }
    return sky() +
      `<circle cx="315" cy="118" r="58" fill="none" stroke="#f0a29b" stroke-width="5"/>` +
      `<circle cx="315" cy="118" r="44" fill="none" stroke="#f6c9c4" stroke-width="2.5"/>` +
      spokes.map(([x, y]) => `<line x1="315" y1="118" x2="${r(x)}" y2="${r(y)}" stroke="#e9c7a0" stroke-width="2.5"/>`).join('') +
      spokes.map(([x, y], i) => `<rect x="${r(x - 7)}" y="${r(y - 2)}" width="14" height="11" rx="3" fill="${['#f7c9a0', '#bfdcf3', '#cfe8b8', '#f3c6dd'][i % 4]}"/>`).join('') +
      `<path d="M300 130 L282 232 M330 130 L348 232" stroke="#c9a27a" stroke-width="5" stroke-linecap="round"/>` +
      `<circle cx="315" cy="118" r="6" fill="#c9a27a"/>` +
      `<rect y="214" width="400" height="86" fill="#a9d98a"/><rect y="214" width="400" height="6" fill="#98cc79"/>` +
      `<rect x="22" y="180" width="116" height="52" fill="#fff6ec"/>` +
      [22, 51, 80, 109].map(x => `<rect x="${x}" y="180" width="14.5" height="52" fill="#f2a79f"/>`).join('') +
      `<path d="M14 182 L80 140 L146 182 Z" fill="#e2483d"/><path d="M58 154 L80 140 L102 154 L94 182 H66 Z" fill="#fff6ec"/>` +
      `<path d="M80 140 V127" stroke="#8a5a33" stroke-width="2"/><path d="M80 127 L94 132 L80 137 Z" fill="#f6c453"/>` +
      `<path d="M0 22 ${flags.map(([x, y]) => `L${r(x)} ${r(y)}`).join(' ')} L400 22" fill="none" stroke="#8a7563" stroke-width="1.5"/>` +
      flags.slice(1, -1).map(([x, y], i) => `<path d="M${r(x - 9)} ${r(y)} L${r(x)} ${r(y + 16)} L${r(x + 9)} ${r(y)} Z" fill="${fcol[i % 4]}"/>`).join('');
  },
  beach(mode) {
    if (mode === 'line') {
      const rays = [...Array(8)].map((_, k) => { const a = k * Math.PI / 4; return `M${r(352 + 26 * Math.cos(a))} ${r(48 + 26 * Math.sin(a))} L${r(352 + 33 * Math.cos(a))} ${r(48 + 33 * Math.sin(a))}`; }).join(' ');
      return `<circle cx="352" cy="48" r="20" fill="none" stroke="#3a3a3a" stroke-width="1.4" vector-effect="non-scaling-stroke"/>` + line(rays, 1.2) +
        line('M0 150 H400') + line('M30 172 q10 -6 20 0 q10 6 20 0 M170 166 q10 -6 20 0 q10 6 20 0 M300 178 q10 -6 20 0 q10 6 20 0', 1) +
        line('M0 205 Q100 196 200 204 T400 200') + pic('palm', 22, 232, 142, { mode });
    }
    return sky('#bfe4f6', '#eef9ff') + `<circle cx="352" cy="48" r="22" fill="#f8d35e"/>` +
      `<rect y="150" width="400" height="60" fill="#7cc8e6"/>` +
      `<path d="M30 172 q10 -6 20 0 q10 6 20 0 M170 166 q10 -6 20 0 q10 6 20 0 M300 178 q10 -6 20 0 q10 6 20 0" fill="none" stroke="#e8f7fd" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M0 205 Q100 196 200 204 T400 200 V300 H0 Z" fill="#f3dfa8"/>` +
      `<path d="M0 205 Q100 196 200 204 T400 200" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>` +
      pic('palm', 22, 232, 142, { mode });
  },
  sea(mode) {
    const weeds = [[26, 252, 120], [58, 254, 80], [372, 252, 110]];
    const weed = ([x, y, h]) => `M${x} ${y} q-12 ${-h / 4} 0 ${-h / 2} q12 ${-h / 4} 0 ${-h / 2}`;
    const bubbles = [[90, 70, 6], [100, 48, 4], [86, 30, 3], [300, 90, 5], [312, 66, 3.5], [250, 40, 4]];
    if (mode === 'line') {
      return line('M0 16 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0', 1) +
        line('M0 246 Q60 236 120 246 T240 244 T400 246') +
        weeds.map(w => line(weed(w), 1.2)).join('') +
        bubbles.map(([x, y, s]) => `<circle cx="${x}" cy="${y}" r="${s}" fill="none" stroke="#3a3a3a" stroke-width="1" vector-effect="non-scaling-stroke"/>`).join('');
    }
    const id = nid('sea');
    return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd0ee"/><stop offset="1" stop-color="#2f8fc2"/></linearGradient></defs><rect width="400" height="300" fill="url(#${id})"/>` +
      `<path d="M60 0 L20 300 H70 L110 0 Z M240 0 L210 300 H250 L280 0 Z" fill="#fff" opacity=".08"/>` +
      `<path d="M0 246 Q60 236 120 246 T240 244 T400 246 V300 H0 Z" fill="#e9d49e"/>` +
      weeds.map(w => `<path d="${weed(w)}" fill="none" stroke="#3e9a5a" stroke-width="7" stroke-linecap="round"/>`).join('') +
      bubbles.map(([x, y, s]) => `<circle cx="${x}" cy="${y}" r="${s}" fill="#dff4fc" fill-opacity=".35" stroke="#e8f8ff" stroke-width="1.6"/>`).join('');
  },
  woods(mode) {
    if (mode === 'line') {
      return line('M0 186 Q100 160 200 178 T400 170') + line('M0 226 H400') +
        pic('pine', 34, 232, 150, { mode }) + pic('pine', 88, 228, 104, { mode }) + pic('pine', 362, 232, 160, { mode });
    }
    return sky('#cfe9f2', '#f2fbf6') +
      `<path d="M0 186 Q100 160 200 178 T400 170 V300 H0 Z" fill="#bcdc9c"/>` +
      `<rect y="222" width="400" height="78" fill="#8fc46a"/>` +
      pic('pine', 34, 232, 150, { mode }) + pic('pine', 88, 228, 104, { mode }) + pic('pine', 362, 232, 160, { mode });
  },
  arena(mode) {
    const dots = [];
    for (let row = 0; row < 4; row++) for (let i = 0; i < 26; i++) {
      const h = Math.abs(Math.sin((row * 31 + i) * 12.9898) * 43758.5453) % 1;
      dots.push([10 + i * 15 + (row % 2) * 7, 112 + row * 18, ['#e2483d', '#3a86c8', '#f6c453', '#5cb85c', '#9b72d8', '#f29a4a'][Math.floor(h * 6)]]);
    }
    if (mode === 'line') {
      return line('M0 96 H400 M0 190 H400') + line('M0 143 H400', 0.6) +
        line('M20 96 V40 M380 96 V40') + line('M8 30 H32 V42 H8 Z M368 30 H392 V42 H368 Z') +
        line('M282 252 Q326 196 372 252') + line('M200 96 V60 L232 66 L200 72', 1);
    }
    return sky('#c7e0f2', '#eef6fb') +
      `<rect y="92" width="400" height="100" fill="#c2c8d0"/><rect y="88" width="400" height="8" fill="#e2483d"/>` +
      dots.map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="5" fill="${c}" opacity=".75"/><rect x="${x - 5}" y="${y + 4}" width="10" height="7" rx="3" fill="${c}" opacity=".5"/>`).join('') +
      `<rect x="18" y="38" width="4" height="54" fill="#8a929b"/><rect x="378" y="38" width="4" height="54" fill="#8a929b"/>` +
      `<rect x="8" y="28" width="24" height="12" rx="2" fill="#fff6c9" stroke="#8a929b" stroke-width="2"/><rect x="368" y="28" width="24" height="12" rx="2" fill="#fff6c9" stroke="#8a929b" stroke-width="2"/>` +
      `<rect y="190" width="400" height="110" fill="#c99a62"/>` +
      `<path d="M0 238 Q200 226 400 240 M0 268 Q200 256 400 270" stroke="#b5844f" stroke-width="5" fill="none"/>` +
      `<path d="M282 252 Q326 196 372 252 Z" fill="#b5844f"/>` +
      `<path d="M200 92 V58" stroke="#5d6b78" stroke-width="2"/><path d="M200 58 h32 v14 h-32 Z" fill="#fff"/><path d="M200 58 h8 v7 h-8 Z M216 58 h8 v7 h-8 Z M208 65 h8 v7 h-8 Z M224 65 h8 v7 h-8 Z" fill="#2b2b2b"/>`;
  },
  city(mode) {
    const B = [[0, 110, 62, '#c9d6e3'], [58, 70, 56, '#e7cdb0'], [110, 128, 54, '#bcd8c4'], [160, 50, 60, '#d9c4e2'], [216, 104, 58, '#f0d6a8'], [270, 82, 64, '#c6d1ea'], [330, 120, 70, '#e6c3bd']];
    const wins = (x, y, w) => { let s = ''; for (let yy = y + 12; yy < 205; yy += 20) for (let xx = x + 9; xx < x + w - 12; xx += 16) s += `<rect x="${xx}" y="${yy}" width="8" height="10" rx="1.5"/>`; return s; };
    if (mode === 'line') {
      return B.map(([x, y, w]) => line(`M${x} 214 V${y} H${x + w} V214`)).join('') +
        `<g class="winline">${B.filter((_, i) => i % 2).map(([x, y, w]) => wins(x, y, w)).join('')}</g>` +
        line('M0 214 H400') + line('M0 232 H400', 1);
    }
    return sky('#cbe6f5', '#f3faff') +
      B.map(([x, y, w, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${214 - y}" fill="${c}"/><g fill="#fff" opacity=".7">${wins(x, y, w)}</g>`).join('') +
      `<rect y="212" width="400" height="88" fill="#d9d4ca"/><rect y="212" width="400" height="5" fill="#bdb6a9"/>` +
      `<path d="M0 232 H400" stroke="#c9c2b5" stroke-width="2"/>`;
  },
};

export const PLACE_IDS = Object.keys(PLACES);

export function placeArt(id, mode = 'color') { return PLACES[id](mode); }

// A whole page picture.
export function scene(place, body, o = {}) {
  const bgMode = o.bgMode || o.mode || 'color';
  return `<svg class="scene" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">${place ? placeArt(place, bgMode) : ''}${body}</svg>`;
}

// Thought bubble at (cx, cy) with a trail down toward (tx, ty).
export function thought(cx, cy, w, h, tx, ty, mode = 'color') {
  const stroke = mode === 'line' ? '#3a3a3a' : '#c9bfae';
  const sw = mode === 'line' ? 1.4 : 2.5;
  const dots = [0.35, 0.62, 0.85].map((t, i) => {
    const x = cx + (tx - cx) * (0.55 + t * 0.45), y = (cy + h / 2) + (ty - cy - h / 2) * t;
    return `<circle cx="${r(x)}" cy="${r(y)}" r="${[7, 5, 3.5][i]}" fill="#fff" stroke="${stroke}" stroke-width="${sw}" vector-effect="non-scaling-stroke"/>`;
  }).join('');
  return `<ellipse cx="${cx}" cy="${cy}" rx="${w / 2}" ry="${h / 2}" fill="#fff" stroke="${stroke}" stroke-width="${sw}" vector-effect="non-scaling-stroke"/>${dots}`;
}

// Motion lines (for "pushed" and "off it went").
export function zoom(x, y, len, mode = 'color') {
  const c = mode === 'line' ? '#3a3a3a' : '#8a7563';
  return `<path d="M${x} ${y} h${-len} M${x - 6} ${y + 12} h${-len * 0.8} M${x} ${y + 24} h${-len * 0.6}" stroke="${c}" stroke-width="3" stroke-linecap="round" fill="none"/>`;
}
