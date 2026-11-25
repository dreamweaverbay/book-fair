# Book Fair

His own book fair, brought to life. He makes six-page picture books, keeps them on his shelf, and holds a pretend fair where a grown-up buys a book with pretend coins and he reads it aloud. Every book prints as a fold-up mini-book.

Plain static site: no accounts, no AI, no voices, no tracking. Works offline once it has been opened. Everything is saved on the tablet it's used on.

## Making a book

One question per screen, about ten minutes start to finish. The screens name the parts of a story as he goes: main character, setting, and kind of story first, then a label on each page (Beginning, Problem, Help, Solution, Ending, and so on).

1. **Main character:** Robot, Monster, Monster Truck, Shark, Fish, Berry (a fruit buddy), Sam (a stick-figure kid), Dragon, Big Lizard (an original character), Dino, Astronaut, Superhero.
2. **Setting:** the fair, the beach, under the sea, the woods, the jungle (with a volcano), the truck arena, the ball park, the big city, the moon.
3. **Kind of story:** a rescue, a race, or a mystery (see below). The mystery only shows up in settings where an animal could sneak off with a snack.
4. **Six pages.** Each page asks one question and has one blank. He picks from up to four picture cards, the words drop into the blank, and the picture changes to match.
5. **Title:** four titles built from his story, like "Shark and the Kite", "The Kite in the Palm Tree", "Dragon to the Rescue", "Shark and Dragon".

### Two rules for all content

1. **If the words name it, the picture shows it, in that amount.**
2. **Every card shows the exact words that drop into the blank,** so the cards always answer the question on the screen. "What did Shark take to the beach?" gets cards that say *a kite*, *a ball*, *a new hat*; the sentence becomes "Shark went to the beach with a kite."

### Thinking pages

The rescue and the mystery each have one page where only some of the cards work, so he has to think about it. The screen says so ("Think about it! Only some of these will work."), and there are usually two cards that work and two that don't.

- **Rescue, page 4 (Help):** "The kite is too high. Who can help?" Each card says what that friend is good at: *Dragon, can fly*; *Fish, is a good swimmer*. If he picks Fish, the picture shows Fish standing there with a question mark, the card fades, and a note says *Fish is a good swimmer. But the kite is too high for Fish! Who else can help?*
- **Mystery, page 4 (Who did it?):** "Shark found tiny footprints. Who took the cake?" If he picks the worm: *A worm has no feet! Who else could it be?*

A wrong pick costs nothing: no buzzer, no score, just the note and another try. The note is a sentence he can sound out, or a grown-up can read it with him and ask "why not?"

### The three kinds of story

| | Rescue | Race | Mystery |
| --- | --- | --- | --- |
| 1 | Beginning: what he took along | Beginning: who he raced | Beginning: what snack he took |
| 2 | Problem: what happened to it | Goal: what the winner gets | Problem: the snack is gone, what clue he found |
| 3 | First try: how he tried to get it back | Problem: what happened to him (slipped on a banana peel) | Clues: where the trail led |
| 4 | Help (thinking page): who can help | Twist: what the leader stopped to do (took a nap) | Who did it? (thinking page): which animal fits the clue |
| 5 | Solution: the surprise on it | Solution: how he got past | Solution: what he did about it (shared it) |
| 6 | Ending | Ending | Ending |

The race is the tortoise and the hare: whoever falls behind wins because the leader stops to show off. The mystery uses three clues (a feather, tiny footprints, a slimy trail), and the trail only leads somewhere up high if the clue was a feather. Each kind lives in its own file (`js/rescue.js`, `js/race.js`, `js/mystery.js`), with the characters and settings they share in `js/cast.js`.

### How the rescue stays sensible

Every choice is drawn from the ones before it:

| Page | Part | The question | What decides the choices |
| --- | --- | --- | --- |
| 1 | Beginning | What did Shark take to the beach? | The setting decides the toys and rides: *a kite*, *a ball*, *a scooter* |
| 2 | Problem | Oh no! What happened to the kite? | The toy and the setting decide what can go wrong: *blew into a palm tree*, *blew into the waves*. A ball rolls, a kite blows away, a ride gets its path blocked |
| 3 | First try | What did Shark do to get it back? | The kind of spot decides the tries: too high means *jumped up*, *used a long stick*, *stood on a box* |
| 4 | Help | The kite is too high. Who can help? | Two helpers whose skill fits the spot, and two whose skill doesn't. The card says why: *Dragon, can fly* or *Dino, has a long, long neck* |
| 5 | Solution | Surprise! What was on the kite? | The helper uses that skill, and a small surprise fits the spot: *a bird* in a tree, *a frog* in the pond, *a worm* in the mud |
| 6 | Ending | What did Shark and Dragon do next? | *flew the kite together*, *had a picnic*, *had a party*, *took a nap* |

A spot is never offered if the main character could fix it alone (a shark never needs help getting something out of a pond) or if fewer than two helpers fit. `dev/check.mjs` (kept out of the repo) walks every main character, setting and choice to confirm that, that every sentence comes out whole, and that every card's words appear in its sentence. It also checks every thinking page has cards that work and cards that don't. Across all three kinds that comes to about 2,600 core plots and roughly 1.1 million complete books (rescue about 260,000, race about 785,000, mystery about 50,000).

Example: *Shark went to the beach with a kite. / Oh no! The kite blew into a palm tree! / Shark jumped up, but the kite was too high. / Dragon came to help. Dragon can fly! / Dragon flew up and got the kite. It had a bird on it! / Then Shark and Dragon flew the kite together!*

Tapping any word in a sentence highlights it. Nothing is ever read aloud.

### Stickers

After he picks a word, **Add stickers** opens a tray of stickers that fit the setting (shells and crabs at the beach, planets and comets on the moon, parrots and monkeys in the jungle) plus a star and a heart. Tap a sticker to drop it on the page, or drag it where he wants it. Tap one on the page to take it off. Up to six per page.

`dev/books.html` and `dev/spots.html` (kept out of the repo) render whole books, or one page for every spot, for checking pictures against sentences.

## The fair

1. He picks up to four books for his table and sets a price on each, 1 to 10 coins. The coins show up as he picks, so 7 looks like 7.
2. A grown-up picks a book and taps **Pay a coin** once per coin. The dotted circles fill in as he counts.
3. He reads the book aloud, turning the pages himself.
4. **Sold!** The book gets a SOLD sticker. Coins stay pretend.

## Printing

Open a book from the shelf and tap **Print it**. One sheet of letter paper, landscape, one cut, folds into a cover, six pages, and a back with a price tag for a real-life fair. Folding steps are on the print screen.

- **Black and white** (the default): outline pictures he can color.
- **Color:** characters and things in color, backgrounds still as outlines.
- Neither prints filled backgrounds or full-page color.

## Grown-up panel

Tap **Grown-ups** on the home screen and answer the times-table question. Set his name (it prints on every cover after "by"), turn sound effects on or off, download or restore a backup, and delete books. A single book can also be deleted from its own page, behind the same question.

## Publishing on GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
3. After a minute or two it's live at `https://dreamweaverbay.github.io/book-fair/`.

## Installing on the tablet

Open the site in Chrome, tap the ⋮ menu, and choose **Add to home screen** or **Install app**. It opens full-screen and works offline. After an update is pushed, close the app fully and open it again while online.

## How it's organized

```
index.html          app shell
css/style.css       all styles, including the printed sheet
js/app.js           home, shelf, a book's page, grown-up panel, router
js/make.js          making a book, one question per screen
js/story.js         hands each question to the right kind of story
js/cast.js          characters, settings, stickers, endings shared by every kind
js/rescue.js        the rescue: problems, spots, helpers, the thinking page, sentences, titles, pictures
js/race.js          the race
js/mystery.js       the mystery
js/spots.js         where things end up (tree tops, ponds, holes) and what blocks the path
js/art.js           code-drawn characters and settings; the picture helper
js/notobox.js       the visible box of each bundled picture
js/bookview.js      covers, pages, sentences, stickers
js/reader.js        reading a finished book
js/fair.js          the fair
js/print.js         the fold-up mini-book
js/store.js         saving on the tablet
js/sound.js         soft sound effects made in code (no recordings, no voices)
js/ui.js            buttons, overlays, the grown-up gate
art/noto/           bundled pictures (Noto Emoji)
art/noto-line/      outline versions of the same pictures, for printing
fonts/              Andika (reading) and Baloo 2 (headings), SIL Open Font License
sw.js               offline support
```

Pictures: Shark, Fish, Berry, Dragon, Dino, Astronaut, Superhero, and most objects are Noto Emoji (credit and license in `art/noto/README.md`). Robot, Monster, Monster Truck, Sam, Big Lizard, the beach ball, the settings, and the spots (towers, ponds, holes, the backboard, and so on) are drawn in code in `js/art.js` and `js/spots.js`, each with a color look and an outline look.

When files are added, update the list in `sw.js` and change its `VERSION` so tablets pick up the new copy.
