// The kinds of story he can make, and one doorway to all of them.
// Each kind lives in its own file and answers the same questions: what are the choices for this page,
// what does the sentence say, what does the picture show. Books without a kind are rescue stories.
// Two rules for every kind: if the words name it, the picture shows it, in that amount.
// And every choice card shows the exact words that drop into the blank.
import * as rescue from './rescue.js';
import * as race from './race.js';
import * as mystery from './mystery.js';

export { HEROES, PLACES, hero, place, heroCard, placeCard, stickersFor } from './cast.js';

const KINDS = { rescue, race, mystery };
const kindOf = (book) => KINDS[book.shape] || rescue;

// The kinds of story that fit this main character and setting.
export const kindsFor = (book) => Object.values(KINDS).filter(k => !k.fits || k.fits(book));
export const kindCard = (book, id) => KINDS[id].kindCard(book);

export const pageJob = (book, i) => kindOf(book).parts[i - 1];
export const choicesFor = (book, i) => kindOf(book).choicesFor(book, i);
export const poolFor = (book, i, rnd) => kindOf(book).poolFor(book, i, rnd);
export const question = (book, i) => kindOf(book).question(book, i);
export const words = (book, i) => kindOf(book).words(book, i);
export const cardNote = (book, i, id) => kindOf(book).cardNote(book, i, id);
export const choiceCard = (book, i, id) => kindOf(book).choiceCard(book, i, id);
export const pageScene = (book, i, mode, bgMode, flop) => kindOf(book).pageScene(book, i, mode, bgMode, flop);
export const titleOptions = (book) => kindOf(book).titleOptions(book);

// On a thinking page, a choice that doesn't fit gets a funny try, then he picks again.
// Returns null when the choice fits, or { say, ask } when it doesn't.
export const check = (book, i, id) => kindOf(book).check(book, i, id);
export const isThinkPage = (book, i) => kindOf(book).thinkPage === i;

// Anything a kind of story wants saved with the finished book.
export const extraFields = (book) => (kindOf(book).extra ? kindOf(book).extra(book) : {});

// A card shows exactly the words that will drop into the blank.
export function cardWord(book, i, id) {
  const picks = book.picks.slice();
  picks[i - 1] = id;
  const piece = words({ ...book, picks }, i).find(p => p.slot);
  return piece ? piece.t : '';
}

export const plainText = (book, i) => words(book, i).map(p => (p.blank ? '___' : p.t)).join('');

export function titleText(book) {
  if (!book.title) return '';
  const o = titleOptions(book).find(x => x.id === book.title);
  return o ? o.text : '';
}

// The cover shows the page its title is about.
export function coverScene(book, mode = 'color', bgMode) {
  return pageScene(book, kindOf(book).coverPage[book.title] || 6, mode, bgMode);
}
