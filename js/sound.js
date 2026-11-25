// Soft sound effects made in code. No voices, no recordings.
import * as store from './store.js';

let ctx = null;
let master = null;

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.35;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

const on = () => store.get().settings.sound;

function tone(freq, start, dur, { type = 'sine', vol = 0.2, attack = 0.01, glideTo = null } = {}) {
  const c = ac(); if (!c) return;
  const t0 = c.currentTime + start;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(master);
  o.start(t0); o.stop(t0 + dur + 0.05);
}

function noise(start, dur, { vol = 0.15, filter = 1200, q = 1, type = 'bandpass' } = {}) {
  const c = ac(); if (!c) return;
  const t0 = c.currentTime + start;
  const len = Math.max(1, Math.floor(c.sampleRate * dur));
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = type; f.frequency.value = filter; f.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + dur * 0.3);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f); f.connect(g); g.connect(master);
  src.start(t0); src.stop(t0 + dur + 0.02);
}

export const sfx = {
  tap() { if (on()) tone(620, 0, 0.07, { type: 'triangle', vol: 0.1 }); },
  pick() { if (on()) { tone(520, 0, 0.09, { type: 'triangle', vol: 0.14 }); tone(780, 0.05, 0.1, { type: 'triangle', vol: 0.1 }); } },
  page() { if (on()) noise(0, 0.28, { vol: 0.12, filter: 900, q: 0.7 }); },
  nope() { if (on()) { tone(440, 0, 0.12, { type: 'sine', vol: 0.12, glideTo: 330 }); tone(330, 0.12, 0.16, { type: 'sine', vol: 0.1, glideTo: 262 }); } },
  sticker() { if (on()) tone(300, 0, 0.12, { type: 'sine', vol: 0.18, glideTo: 520 }); },
  unstick() { if (on()) tone(520, 0, 0.12, { type: 'sine', vol: 0.12, glideTo: 300 }); },
  coin() { if (on()) { tone(1320, 0, 0.12, { type: 'triangle', vol: 0.1 }); tone(1760, 0.05, 0.18, { type: 'sine', vol: 0.08 }); } },
  sold() { if (on()) [523, 659, 784].forEach((f, i) => tone(f, i * 0.09, 0.3, { type: 'triangle', vol: 0.12 })); },
  done() { if (on()) { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.4, { type: 'triangle', vol: 0.12 })); tone(1047, 0.5, 0.7, { type: 'sine', vol: 0.06 }); } },
};

// Browsers wait for a tap before sound can play.
export function unlockAudio() {
  const go = () => { ac(); window.removeEventListener('pointerdown', go); };
  window.addEventListener('pointerdown', go, { once: true });
}
