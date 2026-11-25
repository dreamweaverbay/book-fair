# Book Fair

His own book fair, brought to life. He makes six-page picture books, keeps them on his shelf, and holds a pretend fair where a grown-up buys a book with pretend coins and he reads it aloud. Every book prints as a fold-up mini-book.

Plain static site: no accounts, no AI, no voices, no tracking. Works offline once it has been opened. Everything is saved on the tablet it's used on.

## Making a book

One question per screen, about ten minutes start to finish. The screens name the parts of a story as he goes: main character, setting, problem, then Beginning, Problem, First try, Help, Solution, Ending on the pages.

1. **Main character:** Robot, Monster, Monster Truck, Shark, Fish, Berry (a fruit buddy), Sam (a stick-figure kid), Dragon, Big Lizard (an original character), Dino, Astronaut, Superhero.
2. **Setting:** the fair, the beach, under the sea, the woods, the jungle (with a volcano), the truck arena, the ball park, the big city, the moon.
3. **Problem:** two or three per setting, like *Blown away!*, *Rolled away!*, *In the way!*, *Volcano puff!*, *Floated away!*
4. **Six pages.** Each page is one or two short sentences with one blank. He picks from up to four picture cards, the blank fills in, and the picture changes to match.
5. **Title:** four titles built from his story, like "Shark and the Kite", "The Kite in the Palm Tree", "Dragon to the Rescue", "Shark and Dragon".

### How the stories stay sensible

Every choice is drawn from the ones before it (all of it lives in `js/story.js`):

| Page | Part | What decides the choices |
| --- | --- | --- |
| 1 | Beginning | The problem decides the toy (kite, balloon, ball, basketball…) or ride (bike, scooter, skateboard) |
| 2 | Problem | The setting decides where the toy can end up: a palm tree, a tide pool, a crab hole. Or what blocks the path |
| 3 | First try | The kind of spot decides the tries: too high means jump, long stick, stand on a box; too small means reach in, squeeze, crawl |
| 4 | Help | Only helpers whose skill fits the spot: Dragon can fly, Dino has a long neck, Berry is very small, Monster Truck can pull hard |
| 5 | Solution | The helper uses that skill, and a small surprise fits the spot: a bird in a tree, a frog in the pond, a worm in the mud |
| 6 | Ending | Play with the toy together, or have a picnic, a party, or a nap |

A spot is never offered if the main character could fix it alone (a shark never needs help getting something out of a pond) or if fewer than two helpers fit. `dev/check.mjs` (kept out of the repo) walks every main character, setting and choice to confirm that, and that every sentence comes out whole. That makes 285 core plots (setting, problem, toy, spot) and roughly 290,000 complete books across all the choices.

Example: *Shark went to the beach to fly a kite. / Oh no! The wind blew the kite up into a palm tree! / Shark jumped up, but the kite was too high. / Dragon came to help. Dragon can fly! / Dragon flew up and got the kite. It had a bird on it! / Then Shark and Dragon flew the kite together!*

Tapping any word in a sentence highlights it. Nothing is ever read aloud.

### Stickers

After he picks a word, **Add stickers** opens a tray of stickers that fit the setting (shells and crabs at the beach, planets and comets on the moon, parrots and monkeys in the jungle) plus a star and a heart. Tap a sticker to drop it on the page, or drag it where he wants it. Tap one on the page to take it off. Up to six per page.

### The one rule for all content

If the words name it, the picture shows it, in that amount. When adding or changing anything in `js/story.js`, check the picture against the sentence. `dev/books.html` renders whole books or every option for one page.

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
js/story.js         characters, settings, problems, story paths, sentences, titles, and every page picture
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
