// Where things end up: tree tops, ponds, holes, mud, rocks in the way.
// Each spot draws itself on the right side of the 400 x 300 page and says where the lost thing sits.
//   back  = drawn behind the thing, front = drawn over it (water, a hole's edge, a net)
//   obj   = [x, y] bottom-center of the thing, size = how tall the thing is drawn there
//   stand = x where someone stands on the ground to try to reach it
import { pic, shape, ell, line, GROUND as G } from './art.js';

const r = (n) => +n.toFixed(1);
let uid = 0;

function waterFront(cx, cy, rx, ry, from, color, mode) {
  // The near half of a pond, drawn over the floating thing so it sits in the water.
  const id = 'wf' + (++uid);
  if (mode === 'line') return `<path d="M${cx - rx * 0.55} ${from + 2} q${rx * 0.14} -4 ${rx * 0.28} 0 t${rx * 0.28} 0 t${rx * 0.28} 0 t${rx * 0.28} 0" fill="none" stroke="#3a3a3a" stroke-width="1.2" vector-effect="non-scaling-stroke"/>`;
  return `<defs><clipPath id="${id}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath></defs>
    <rect x="${cx - rx}" y="${from}" width="${rx * 2}" height="${ry * 2 + 10}" fill="${color}" opacity=".9" clip-path="url(#${id})"/>`;
}

function pond(cx, cy, rx, ry, color, rim, mode) {
  return ell(cx, cy + 3, rx + 6, ry + 4, rim, mode) + ell(cx, cy, rx, ry, color, mode);
}

const tent = (mode) =>
  shape('M215 252 V192 H365 V252 Z', '#fff6ec', mode) +
  (mode === 'line' ? line('M245 252 V192 M275 252 V192 M305 252 V192 M335 252 V192', 1) : [215, 245, 275, 305, 335].map(x => `<rect x="${x}" y="192" width="15" height="60" fill="#f2a79f"/>`).join('')) +
  shape('M203 194 L290 126 L377 194 Z', '#e2483d', mode) +
  shape('M268 143 L290 126 L312 143 L304 194 H276 Z', '#fff6ec', mode);

const booth = (mode) =>
  (mode === 'line' ? line('M238 218 V252 M342 218 V252') : '<path d="M238 218 V252 M342 218 V252" stroke="#8a5a33" stroke-width="7"/>') +
  shape('M226 132 H354 V218 H226 Z', '#f6c453', mode) +
  shape('M218 134 L290 100 L362 134 Z', '#e2483d', mode) +
  shape('M256 150 H324 V190 H256 Z', '#bfe3f2', mode) +
  (mode === 'line' ? '' : '<rect x="238" y="236" width="104" height="16" fill="#000" opacity=".12"/>');

const tower = (mode) =>
  (mode === 'line' ? line('M248 252 L262 132 M332 252 L318 132 M252 216 H328 M256 180 H324') : '<path d="M248 252 L262 132 M332 252 L318 132" stroke="#c99a62" stroke-width="7"/><path d="M252 216 H328 M256 180 H324" stroke="#c99a62" stroke-width="4"/>') +
  shape('M246 132 H334 V138 H246 Z', '#a87a45', mode) +
  shape('M256 132 V90 H324 V132 Z', '#e2483d', mode) +
  shape('M248 92 L290 66 L332 92 Z', '#fff6ec', mode) +
  shape('M276 104 H304 V124 H276 Z', '#bfe3f2', mode);

const rockMound = (color, mode) =>
  shape('M196 252 Q206 176 260 156 Q300 138 336 160 Q384 186 388 252 Z', color, mode) +
  shape('M270 252 V236 Q270 220 290 220 Q310 220 310 236 V252 Z', '#2e2a26', mode === 'line' ? 'color' : mode);

const wreck = (mode) =>
  shape('M206 252 L222 186 L372 168 L384 252 Z', '#8a5a33', mode) +
  shape('M222 186 L372 168 L370 178 L224 196 Z', '#6b4426', mode) +
  ell(262, 214, 13, 13, '#2e2a26', mode === 'line' ? 'color' : mode) + ell(304, 209, 13, 13, '#2e2a26', mode === 'line' ? 'color' : mode) + ell(346, 204, 13, 13, '#2e2a26', mode === 'line' ? 'color' : mode) +
  shape('M300 168 L304 92 L310 92 L312 167 Z', '#6b4426', mode);

const ringAt = (cx, cy, rr, mode) => `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="${mode === 'line' ? '#3a3a3a' : '#c9a14a'}" stroke-width="${mode === 'line' ? 1.3 : 4}" vector-effect="non-scaling-stroke"/>`;

const netMesh = (mode) => {
  const c = mode === 'line' ? '#3a3a3a' : '#e8dcc0';
  let d = '';
  for (let x = 236; x <= 344; x += 12) d += `M${x} 252 Q${290 + (x - 290) * 0.6} 196 ${290 + (x - 290) * 0.25} 182 `;
  for (let y = 196; y <= 248; y += 12) { const w = 30 + (y - 182) * 1.05; d += `M${290 - w} ${y} H${290 + w} `; }
  return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${mode === 'line' ? 0.9 : 2}" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`;
};

const tire = (cx, cy, R, mode) =>
  (mode === 'line'
    ? `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="#3a3a3a" stroke-width="1.3" vector-effect="non-scaling-stroke"/><circle cx="${cx}" cy="${cy}" r="${R * 0.4}" fill="#fff" stroke="#3a3a3a" stroke-width="1.3" vector-effect="non-scaling-stroke"/>`
    : `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#2f3237"/><circle cx="${cx}" cy="${cy}" r="${R * 0.8}" fill="none" stroke="#50555c" stroke-width="5" stroke-dasharray="7 6"/><circle cx="${cx}" cy="${cy}" r="${R * 0.4}" fill="#3d3a33"/>`);

const bleachers = (mode) =>
  shape('M214 252 V232 H232 V212 H250 V192 H268 V172 H286 V152 H384 V252 Z', '#b8bec6', mode) +
  shape('M226 252 V236 H372 V252 Z', '#2e2a26', mode === 'line' ? 'color' : mode);

const building = (mode) => {
  let w = '';
  for (let y = 80; y < 240; y += 24) for (let x = 254; x < 340; x += 22) w += `M${x} ${y} h12 v14 h-12 Z `;
  return shape('M240 252 V58 H360 V252 Z', '#c6d1ea', mode) + shape('M234 58 H366 V50 H234 Z', '#9aa6c0', mode) +
    (mode === 'line' ? `<path d="${w}" fill="none" stroke="#3a3a3a" stroke-width=".7" vector-effect="non-scaling-stroke"/>` : `<path d="${w}" fill="#fff" opacity=".75"/>`);
};

const pole = (x, top, mode, lamp = true) =>
  (mode === 'line' ? line(`M${x} 252 V${top + 12}`) : `<path d="M${x} 252 V${top + 12}" stroke="#7a828c" stroke-width="7"/>`) +
  (lamp ? shape(`M${x - 18} ${top + 12} H${x + 18} L${x + 12} ${top} H${x - 12} Z`, '#5d6b78', mode) + shape(`M${x - 13} ${top + 12} H${x + 13} V${top + 17} H${x - 13} Z`, '#fff3b0', mode) : '');

const crack = (mode) =>
  shape('M246 254 L262 246 L276 252 L290 244 L304 251 L320 245 L336 254 L320 262 L304 270 L290 276 L276 270 L260 263 Z', '#2b2622', mode === 'line' ? 'color' : mode);

const crater = (cx, mode, inside = '#8f8b82') => ell(cx, 262, 86, 20, '#b3afa5', mode) + ell(cx, 264, 72, 15, inside, mode);

const hole = (cx, cy, mode, ground = '#e8d39b') => ell(cx, cy, 34, 12, ground, mode) + ell(cx, cy, 24, 8, '#2e2a26', mode === 'line' ? 'color' : mode);
const holeLip = (cx, cy, mode, ground = '#e8d39b') => mode === 'line'
  ? `<path d="M${cx - 24} ${cy} Q${cx} ${cy + 10} ${cx + 24} ${cy}" fill="none" stroke="#3a3a3a" stroke-width="1.3" vector-effect="non-scaling-stroke"/>`
  : `<path d="M${cx - 34} ${cy} Q${cx} ${cy + 22} ${cx + 34} ${cy} Q${cx} ${cy + 10} ${cx - 34} ${cy} Z" fill="${ground}"/><path d="M${cx - 26} ${cy + 1} Q${cx} ${cy + 12} ${cx + 26} ${cy + 1} V${cy + 16} H${cx - 26} Z" fill="${ground}"/>`;

const hollowLog = (mode) =>
  shape('M222 252 V214 Q222 206 230 206 H372 Q380 206 380 214 V252 Z', '#8a5a33', mode) +
  ell(230, 229, 14, 23, '#e2bd86', mode) + ell(230, 229, 9, 16, '#3b2a1e', mode === 'line' ? 'color' : mode);

const mound = (mode, color = '#9ccc7a') => shape('M206 252 Q236 196 292 194 Q350 196 378 252 Z', color, mode) +
  ell(292, 238, 18, 13, '#3b2a1e', mode === 'line' ? 'color' : mode);

const grate = (mode) => ell(290, 258, 46, 11, '#7a828c', mode) + ell(290, 258, 38, 8, '#2e2a26', mode === 'line' ? 'color' : mode);
const grateBars = (mode) => `<path d="M266 252 V265 M278 251 V266 M290 250 V266 M302 251 V266 M314 252 V265" stroke="${mode === 'line' ? '#3a3a3a' : '#9aa3ad'}" stroke-width="${mode === 'line' ? 1.2 : 3.5}" vector-effect="non-scaling-stroke"/>`;

const hoop = (mode) =>
  (mode === 'line' ? line('M320 252 V96') : '<path d="M320 252 V96" stroke="#7a828c" stroke-width="8"/>') +
  shape('M270 62 H342 V108 H270 Z', '#fbfaf5', mode) + shape('M292 78 H320 V100 H292 Z', '#fbfaf5', mode, mode === 'line' ? '' : 'stroke="#e2483d" stroke-width="3"') +
  ell(306, 112, 18, 5, 'none', mode, mode === 'line' ? '' : 'stroke="#f07a1a" stroke-width="4"') +
  (mode === 'line' ? line('M290 114 L296 134 M306 117 V136 M322 114 L316 134', 0.9) : '<path d="M290 114 L296 134 M306 117 V136 M322 114 L316 134 M292 124 H320" stroke="#fff" stroke-width="2"/>');

const scoreboard = (mode) =>
  (mode === 'line' ? line('M262 252 V140 M338 252 V140') : '<path d="M262 252 V140 M338 252 V140" stroke="#5d6b78" stroke-width="8"/>') +
  shape('M232 76 H368 V142 H232 Z', '#2f5d3a', mode) +
  (mode === 'line' ? line('M250 96 H286 M314 96 H350 M250 122 H350', 1) : '<rect x="248" y="88" width="40" height="40" rx="4" fill="#173a22"/><rect x="312" y="88" width="40" height="40" rx="4" fill="#173a22"/><text x="268" y="120" font-family="Baloo 2, sans-serif" font-weight="800" font-size="30" fill="#f6c453" text-anchor="middle">3</text><text x="332" y="120" font-family="Baloo 2, sans-serif" font-weight="800" font-size="30" fill="#f6c453" text-anchor="middle">2</text>');

const boardwalk = (mode) =>
  (mode === 'line' ? line('M222 252 V222 M300 252 V222 M378 252 V222') : '<path d="M222 252 V222 M300 252 V222 M378 252 V222" stroke="#8a5a33" stroke-width="7"/>') +
  shape('M196 212 H396 V224 H196 Z', '#c99a62', mode) +
  (mode === 'line' ? line('M236 212 V224 M276 212 V224 M316 212 V224 M356 212 V224', 0.8) : '<path d="M236 212 V224 M276 212 V224 M316 212 V224 M356 212 V224" stroke="#a87a45" stroke-width="2"/><rect x="200" y="224" width="196" height="28" fill="#000" opacity=".1"/>');

const weeds = (mode, layer) => {
  const back = [[262, 96], [282, 70], [330, 88]], front = [[300, 84], [316, 110]];
  const list = layer === 'back' ? back : front;
  return list.map(([x, top]) => {
    const d = `M${x} 254 Q${x - 14} ${(254 + top) * 0.66} ${x} ${(254 + top) / 2} Q${x + 14} ${(254 + top) * 0.4} ${x} ${top}`;
    return mode === 'line' ? line(d, 1.3) : `<path d="${d}" fill="none" stroke="${layer === 'back' ? '#2f8a4e' : '#3fa864'}" stroke-width="${layer === 'back' ? 9 : 8}" stroke-linecap="round"/>`;
  }).join('');
};

const ditch = (mode) => shape('M232 256 L256 246 L290 252 L326 244 L352 256 L326 268 L290 278 L256 268 Z', '#3b2a1e', mode === 'line' ? 'color' : mode);

// ---------- the spots ----------
export const SPOT_ART = {
  // the fair
  wheeltop: (m) => ({ back: pic('ferris', 292, G, 212, { mode: m }), obj: [292, 58], size: 40, stand: 205 }),
  tentroof: (m) => ({ back: tent(m), obj: [290, 130], size: 40, stand: 180 }),
  pond: (m) => ({ back: pond(290, 258, 92, 20, '#7cc4e4', '#a98a5d', m), obj: [296, 262], size: 38, front: waterFront(290, 258, 92, 20, 254, '#7cc4e4', m), stand: 185 }),
  booth: (m) => ({ back: booth(m), obj: [292, G], size: 28, stand: 200 }),
  mud: (m) => ({ back: pond(292, 258, 92, 20, '#7b5a3a', '#a98a5d', m), obj: [296, 264], size: 38, front: waterFront(292, 258, 92, 20, 254, '#7b5a3a', m), stand: 185 }),
  // the beach
  palmtop: (m) => ({ back: pic('palm', 300, G, 216, { mode: m }), obj: [300, 70], size: 40, stand: 212 }),
  tower: (m) => ({ back: tower(m), obj: [290, 70], size: 38, stand: 205 }),
  waves: (m) => ({ back: '', obj: [306, 192], size: 36, front: m === 'line' ? line('M276 191 q8 -5 16 0 t16 0 t16 0 t16 0', 1.2) : '<path d="M268 188 q10 -6 20 0 t20 0 t20 0 t20 0 V200 H268 Z" fill="#7cc8e6"/>', stand: 210 }),
  tidepool: (m) => ({ back: [[220, 254, 18], [240, 270, 14], [352, 252, 20], [362, 270, 14], [290, 274, 12]].map(([x, y, s]) => ell(x, y, s, s * 0.6, '#9a9488', m)).join('') + ell(292, 260, 62, 15, '#7cc4e4', m), obj: [292, 264], size: 34, front: waterFront(292, 260, 62, 15, 257, '#7cc4e4', m), stand: 190 }),
  crabhole: (m) => ({ back: hole(290, 256, m), obj: [290, 266], size: 34, front: holeLip(290, 256, m), stand: 200 }),
  // under the sea
  cave: (m) => ({ back: rockMound('#8a8478', m), obj: [290, 252], size: 26, stand: 195 }),
  clam: (m) => ({ back: pic('clam', 292, G + 2, 96, { mode: m }), obj: [290, G - 40], size: 26, stand: 205 }),
  wreck: (m) => ({ back: wreck(m), obj: [304, 220], size: 20, front: ringAt(304, 209, 13, m), stand: 180 }),
  crack: (m) => ({ back: crack(m), obj: [291, 270], size: 22, front: m === 'line' ? '' : '<path d="M262 260 L276 266 L290 272 L304 266 L320 260 L320 264 L304 271 L290 277 L276 271 L260 264 Z" fill="#e9d49e"/>', stand: 200 }),
  net: (m) => ({ back: '', obj: [290, G], size: 34, front: netMesh(m), stand: 200 }),
  underrock: (m) => ({ back: '', obj: [336, G], size: 28, front: pic('rock', 292, G + 2, 92, { mode: m }), stand: 205 }),
  // the woods
  treetop: (m) => ({ back: pic('tree', 300, G + 4, 226, { mode: m }), obj: [300, 74], size: 40, stand: 205 }),
  bigrock: (m) => ({ back: pic('rock', 302, G + 2, 150, { mode: m }), obj: [306, 116], size: 38, stand: 205 }),
  river: (m) => ({ back: shape('M150 238 Q240 230 300 238 T400 236 V272 Q330 280 260 272 T150 274 Z', '#7cc4e4', m), obj: [306, 260], size: 38, front: m === 'line' ? line('M284 259 q6 -4 12 0 t12 0 t12 0', 1.1) : '<path d="M276 256 q8 -5 16 0 t16 0 t16 0 t16 0 V270 H276 Z" fill="#7cc4e4"/>', stand: 190 }),
  rabbithole: (m) => ({ back: mound(m), obj: [292, 250], size: 24, front: '', stand: 190 }),
  hollowlog: (m) => ({ back: hollowLog(m), obj: [231, 244], size: 22, stand: 170 }),
  // the truck arena
  lightpole: (m) => ({ back: pole(300, 38, m), obj: [300, 40], size: 36, stand: 220 }),
  stands: (m) => ({ back: '', obj: [300, 128], size: 34, stand: 220 }),
  mudpit: (m) => ({ back: pond(292, 260, 100, 22, '#6e4f33', '#a87a45', m), obj: [298, 266], size: 38, front: waterFront(292, 260, 100, 22, 256, '#6e4f33', m), stand: 180 }),
  understands: (m) => ({ back: bleachers(m), obj: [300, G], size: 22, stand: 190 }),
  tire: (m) => ({ back: tire(292, 196, 56, m), obj: [292, 210], size: 26, stand: 205 }),
  // the big city
  lamppost: (m) => ({ back: pole(300, 72, m), obj: [300, 74], size: 36, stand: 220 }),
  roof: (m) => ({ back: building(m), obj: [300, 50], size: 36, stand: 205 }),
  fountain: (m) => ({ back: pic('fountain', 292, G + 2, 128, { mode: m }), obj: [318, G - 22], size: 26, stand: 200 }),
  drain: (m) => ({ back: grate(m), obj: [290, 266], size: 28, front: grateBars(m), stand: 200 }),
  undercar: (m) => ({ back: '', obj: [292, G], size: 22, front: pic('car', 292, G + 2, 82, { mode: m }), stand: 195 }),
  // the jungle (same shapes as the woods)
  jungletree: (m) => SPOT_ART.treetop(m),
  junglerock: (m) => SPOT_ART.bigrock(m),
  jungleriver: (m) => SPOT_ART.river(m),
  junglemud: (m) => SPOT_ART.mud(m),
  junglelog: (m) => SPOT_ART.hollowlog(m),
  // the ball park
  backboard: (m) => ({ back: hoop(m), obj: [306, 62], size: 34, stand: 210 }),
  scoreboard: (m) => ({ back: scoreboard(m), obj: [300, 74], size: 34, stand: 205 }),
  bleachers: (m) => SPOT_ART.understands(m),
  parkmud: (m) => SPOT_ART.mud(m),
  boardwalk: (m) => ({ back: boardwalk(m), obj: [300, G], size: 24, stand: 175 }),
  seaweed: (m) => ({ back: weeds(m, 'back'), obj: [296, 160], size: 30, front: weeds(m, 'front'), stand: 205 }),
  ditch: (m) => ({ back: ditch(m), obj: [291, 272], size: 24, front: m === 'line' ? '' : '<path d="M256 262 L290 276 L326 262 L326 266 L290 281 L256 266 Z" fill="#c99a62"/>', stand: 190 }),
  roadhole: (m) => ({ back: shape('M232 256 L256 246 L290 252 L326 244 L352 256 L326 268 L290 278 L256 268 Z', '#2e2a26', m === 'line' ? 'color' : m), obj: [291, 272], size: 24, front: m === 'line' ? '' : '<path d="M256 262 L290 276 L326 262 L326 266 L290 281 L256 266 Z" fill="#d9d4ca"/>', stand: 190 }),
  moonhole: (m) => ({ back: hole(290, 256, m, '#c9c6bd'), obj: [290, 266], size: 26, front: holeLip(290, 256, m, '#c9c6bd'), stand: 200 }),
  // the moon
  satellite: (m) => ({ back: pic('satellite', 286, 120, 70, { mode: m }), obj: [334, 98], size: 32, stand: 230 }),
  faraway: (m) => ({ back: '', obj: [300, 64], size: 26, stand: 230 }),
  bigrocket: (m) => ({ back: `<g transform="rotate(-45 300 ${G - 70})">${pic('rocket', 300, G + 10, 150, { mode: m })}</g>`, obj: [300, 72], size: 32, stand: 215 }),
  crater: (m) => ({ back: crater(292, m), obj: [292, 270], size: 30, front: m === 'line' ? '' : '<path d="M220 264 Q292 284 364 264 Q292 278 220 264 Z" fill="#8f8b82"/>', stand: 190 }),
  mooncave: (m) => ({ back: rockMound('#a8a49a', m), obj: [290, 252], size: 26, stand: 195 }),
  moonunder: (m) => ({ back: '', obj: [336, G], size: 28, front: pic('rock', 292, G + 2, 92, { mode: m }), stand: 205 }),
};

// ---------- things that block the path ----------
export const BLOCK_ART = {
  rock: (x, m, h = 104) => pic('rock', x, G + 4, h, { mode: m }),
  moonrock: (x, m, h = 104) => pic('rock', x, G + 4, h, { mode: m }),
  box: (x, m, h = 96) => pic('box', x, G + 4, h, { mode: m }),
  log: (x, m) => shape(`M${x - 74} ${G + 2} V${G - 40} Q${x - 74} ${G - 48} ${x - 66} ${G - 48} H${x + 66} Q${x + 74} ${G - 48} ${x + 74} ${G - 40} V${G + 2} Z`, '#8a5a33', m) + ell(x + 66, G - 23, 14, 25, '#e2bd86', m) + ell(x + 66, G - 23, 8, 14, '#c9a06a', m),
  haybale: (x, m) => shape(`M${x - 62} ${G + 2} V${G - 66} Q${x - 62} ${G - 80} ${x - 48} ${G - 80} H${x + 48} Q${x + 62} ${G - 80} ${x + 62} ${G - 66} V${G + 2} Z`, '#e8c35a', m) + (m === 'line' ? line(`M${x - 50} ${G - 56} H${x + 50} M${x - 50} ${G - 28} H${x + 50}`, 1) : `<path d="M${x - 50} ${G - 56} H${x + 50} M${x - 50} ${G - 28} H${x + 50}" stroke="#c9a03a" stroke-width="4"/>`),
  bigtire: (x, m) => tire(x, G - 54, 56, m),
  brokensat: (x, m) => `<g transform="rotate(18 ${x} ${G})">${pic('satellite', x, G + 6, 92, { mode: m })}</g>`,
};

// A path along the ground for the rides.
export function pathBand(mode, place) {
  if (mode === 'line') return line('M0 240 H400', 1) + line('M0 264 H400', 1);
  const c = { space: '#b9b5ab', city: '#c9c2b5', arena: '#b5844f', beach: '#ead39a', sea: '#ddc78f' }[place] || '#d9c49a';
  return `<path d="M0 238 H400 V266 H0 Z" fill="${c}" opacity=".85"/>`;
}

// Small props for trying and helping.
export const stick = (x1, y1, x2, y2, mode) => `<path d="M${r(x1)} ${r(y1)} L${r(x2)} ${r(y2)}" stroke="${mode === 'line' ? '#3a3a3a' : '#8a5a33'}" stroke-width="${mode === 'line' ? 2.4 : 5}" stroke-linecap="round"/>`;
export const ropeLine = (x1, y1, x2, y2, mode, sag = 14) => `<path d="M${r(x1)} ${r(y1)} Q${r((x1 + x2) / 2)} ${r((y1 + y2) / 2 + sag)} ${r(x2)} ${r(y2)}" fill="none" stroke="${mode === 'line' ? '#3a3a3a' : '#c9a06a'}" stroke-width="${mode === 'line' ? 1.6 : 4}" stroke-linecap="round"/>`;
export const netPole = (x1, y1, x2, y2, mode) => stick(x1, y1, x2, y2, mode) + `<ellipse cx="${r(x2)}" cy="${r(y2)}" rx="13" ry="9" fill="${mode === 'line' ? '#fff' : '#f3ecd9'}" stroke="${mode === 'line' ? '#3a3a3a' : '#a89a78'}" stroke-width="2" transform="rotate(-20 ${r(x2)} ${r(y2)})"/>`;
export const beam = (x1, y1, x2, y2, mode) => mode === 'line' ? '' : `<path d="M${r(x1)} ${r(y1 - 4)} L${r(x2)} ${r(y2 - 16)} L${r(x2)} ${r(y2 + 16)} L${r(x1)} ${r(y1 + 4)} Z" fill="#fff3a0" opacity=".55"/>`;
export const arcs = (x, y, w, mode) => `<path d="M${r(x - w / 2)} ${r(y)} q${r(w * 0.25)} -10 ${r(w * 0.5)} 0 M${r(x + w * 0.05)} ${r(y + 2)} q${r(w * 0.2)} -8 ${r(w * 0.4)} 0" fill="none" stroke="${mode === 'line' ? '#3a3a3a' : '#8a7563'}" stroke-width="2.5" stroke-linecap="round"/>`;
export const effort = (x, y, mode, dir = 1) => `<path d="M${x} ${y} l${8 * dir} -6 M${x + 2 * dir} ${y + 10} l${10 * dir} 0 M${x} ${y + 20} l${8 * dir} 6" stroke="${mode === 'line' ? '#3a3a3a' : '#8a7563'}" stroke-width="2.5" stroke-linecap="round" fill="none"/>`;
export const robotArm = (x1, y1, x2, y2, mode) => mode === 'line'
  ? `<path d="M${r(x1)} ${r(y1)} L${r(x2)} ${r(y2)}" stroke="#3a3a3a" stroke-width="8" stroke-linecap="round"/><path d="M${r(x1)} ${r(y1)} L${r(x2)} ${r(y2)}" stroke="#fff" stroke-width="5.4" stroke-linecap="round"/><circle cx="${r(x2)}" cy="${r(y2)}" r="6" fill="#fff" stroke="#3a3a3a" stroke-width="1.3"/>`
  : `<path d="M${r(x1)} ${r(y1)} L${r(x2)} ${r(y2)}" stroke="#8796a3" stroke-width="7" stroke-linecap="round" stroke-dasharray="10 3"/><circle cx="${r(x2)}" cy="${r(y2)}" r="6.5" fill="#c3d0da"/>`;
export const pearl = (x, y, h, mode) => `<circle cx="${x}" cy="${y - h / 2}" r="${h / 2}" fill="${mode === 'line' ? '#fff' : '#f7f3ea'}" stroke="${mode === 'line' ? '#3a3a3a' : '#d8cfbd'}" stroke-width="1.5"/>${mode === 'line' ? '' : `<circle cx="${x - h * 0.15}" cy="${y - h * 0.65}" r="${h * 0.12}" fill="#fff"/>`}`;
