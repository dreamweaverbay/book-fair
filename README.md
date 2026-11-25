# Book Fair

His own book fair, brought to life. He makes six-page picture books, keeps them on his shelf, and holds a pretend fair where a grown-up buys a book with pretend coins and he reads it aloud. Every book prints as a fold-up mini-book.

Plain static site: no accounts, no AI, no voices, no tracking. Works offline once it has been opened. Everything is saved on the tablet it's used on.

## Making a book

One question per screen, about ten minutes start to finish.

1. **Who:** a hero, then a helper. Robot, Monster, Monster Truck, Shark, Fish, Berry (a fruit buddy), Sam (a stick-figure kid), Dragon, Big Lizard.
2. **Where:** the fair, the beach, under the sea, the woods, the truck arena, the big city. It becomes the background on every page.
3. **Uh-oh:** Lost!, Silly storm!, Way too big!, Stuck!, Mix-up! The cards show his hero in that kind of trouble.
4. **Silly thing:** sock, cotton candy, duck, beach ball, banana peel. It saves the day on page 5.
5. **Six pages.** Each page is one sentence with one blank. He picks from four picture cards, the blank fills in, and the page picture changes to match. Stickers are optional after each pick (drag on, drag off to remove, up to six a page).
6. **Title:** "The ___ ___", picked like a Lure Lab bait name: a funny word (Giant, Tiny, Stinky, Sparkly, Soggy, Sleepy, Dizzy, Bouncy) and a second word taken from his own book. The cover shows it: a Giant Shark is drawn bigger, a Stinky Sock gets stink lines.

The six pages always follow the same shape, so any choices make a story that holds together:

| Page | Job | Example |
| --- | --- | --- |
| 1 | Meet the hero | Shark lived at the beach and loved **pizza**. |
| 2 | Uh-oh | One day, Shark lost a **kite**. |
| 3 | First try | Shark looked in a **box**, but no kite. |
| 4 | Second try | Robot came to help with a **map**. |
| 5 | The fix | They found the kite under a **stinky** sock! |
| 6 | The end | Then Shark and Robot had a big **picnic**! |

Tapping any word in a sentence highlights it. Nothing is ever read aloud.

### The one rule for all content

If the words name it, the picture shows it, in that amount. "Cupcakes" draws three cupcakes; "a tiny sock" draws a tiny sock; "but no kite" shows no kite. When adding or changing anything in `js/story.js`, check the picture against the sentence. `dev/pages.html` (kept out of the repo) renders every choice on every page for checking.

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
js/story.js         story parts, sentences, choice pools, and every page picture
js/art.js           code-drawn characters, silly things, places; the picture helper
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

Pictures: shark, fish, berry, dragon, and all the objects are Noto Emoji (credit and license in `art/noto/README.md`). Robot, Monster, Monster Truck, Sam, Big Lizard (an original character), the sock, cotton candy, rubber duck, beach ball, banana peel, and all six places are drawn in code in `js/art.js`, each with a color look and an outline look.

When files are added, update the list in `sw.js` and change its `VERSION` so tablets pick up the new copy.
