// Story paths: every choice depends on the ones before it, so any book he makes hangs together.
//   Page 1  Beginning: the main character goes to the setting to do something they love
//   Page 2  Problem:   where the toy ends up, or what blocks the path
//   Page 3  First try: what the main character tries, and why it doesn't work
//   Page 4  Help:      who comes to help (only helpers whose skill fits the problem)
//   Page 5  Solution:  how the helper fixes it, plus a small surprise that fits the spot
//   Page 6  Ending:    what they do together after
// The one rule: if the words name it, the picture shows it, in that amount.
import { pic, figure, aspect, scene, GROUND as G } from './art.js';
import { SPOT_ART, BLOCK_ART, pathBand, stick, ropeLine, netPole, arcs, effort, robotArm, pearl } from './spots.js';

/* ---------------- characters and settings ---------------- */

export const HEROES = [
  { id: 'robot', name: 'Robot' },
  { id: 'monster', name: 'Monster' },
  { id: 'truck', name: 'Monster Truck' },
  { id: 'shark', name: 'Shark' },
  { id: 'fish', name: 'Fish' },
  { id: 'strawberry', name: 'Berry' },
  { id: 'sam', name: 'Sam' },
  { id: 'dragon', name: 'Dragon' },
  { id: 'lizard', name: 'Big Lizard' },
  { id: 'dino', name: 'Dino' },
  { id: 'astronaut', name: 'Astronaut' },
  { id: 'superhero', name: 'Superhero' },
];

export const PLACES = [
  { id: 'fair', label: 'the fair', to: 'to the fair' },
  { id: 'beach', label: 'the beach', to: 'to the beach' },
  { id: 'sea', label: 'under the sea', to: 'under the sea' },
  { id: 'woods', label: 'the woods', to: 'to the woods' },
  { id: 'jungle', label: 'the jungle', to: 'to the jungle' },
  { id: 'arena', label: 'truck arena', to: 'to the truck arena' },
  { id: 'park', label: 'ball park', to: 'to the ball park' },
  { id: 'city', label: 'big city', to: 'to the big city' },
  { id: 'space', label: 'the moon', to: 'to the moon' },
];

export const hero = (id) => HEROES.find(h => h.id === id);
export const place = (id) => PLACES.find(p => p.id === id);

export const PAGE_PARTS = ['Beginning', 'Problem', 'First try', 'Help', 'Solution', 'Ending'];
export const pageJob = (i) => PAGE_PARTS[i - 1];

/* ---------------- things they love ----------------
   love = page 1, play = page 6, end = the ending card, show = how page 1 draws it. */

export const THINGS = {
  kite: { word: 'kite', art: 'kite', h: 44, love: 'fly a kite', play: 'flew the kite together', end: 'fly the kite', show: 'sky' },
  balloon: { word: 'balloon', art: 'balloon', h: 54, love: 'play with a balloon', play: 'played with the balloon', end: 'play with the balloon', show: 'string' },
  hat: { word: 'hat', art: 'cap', h: 34, love: 'show off a cool hat', play: 'took turns wearing the hat', end: 'take turns with the hat', show: 'head' },
  ball: { word: 'ball', art: 'ball', h: 36, love: 'kick a ball', play: 'played catch', end: 'play catch', show: 'ground', toss: true },
  beachball: { word: 'beach ball', art: 'beachball', h: 40, love: 'toss a beach ball', play: 'tossed the beach ball', end: 'toss the beach ball', show: 'ground', toss: true },
  basketball: { word: 'basketball', art: 'basketball', h: 38, love: 'shoot a basketball', play: 'played basketball', end: 'play basketball', show: 'ground', toss: true },
  baseball: { word: 'baseball', art: 'baseball', h: 30, love: 'throw a baseball', play: 'played catch with the baseball', end: 'play catch', show: 'ground', toss: true },
  apple: { word: 'apple', art: 'apple', h: 34, love: 'eat a big apple', play: 'shared the apple', end: 'share the apple', show: 'ground' },
  shell: { word: 'shell', art: 'shell', h: 36, love: 'look at a shiny shell', play: 'looked at the shell together', end: 'look at the shell', show: 'ground' },
  crown: { word: 'crown', art: 'crown', h: 30, love: 'show off a gold crown', play: 'took turns wearing the crown', end: 'take turns with the crown', show: 'head' },
  teddy: { word: 'teddy bear', art: 'teddy', h: 42, love: 'play with a teddy bear', play: 'hugged the teddy bear', end: 'hug the teddy bear', show: 'ground' },
  rocket: { word: 'toy rocket', art: 'rocket', h: 40, love: 'fly a toy rocket', play: 'flew the toy rocket', end: 'fly the toy rocket', show: 'sky' },
  bike: { word: 'bike', art: 'bike', h: 58, love: 'ride a bike', play: 'took turns on the bike', end: 'take turns on the bike', show: 'ride' },
  scooter: { word: 'scooter', art: 'scooter', h: 66, love: 'ride a scooter', play: 'took turns on the scooter', end: 'take turns on the scooter', show: 'ride' },
  skateboard: { word: 'skateboard', art: 'skateboard', h: 26, love: 'ride a skateboard', play: 'took turns on the skateboard', end: 'take turns on the skateboard', show: 'ride' },
};

/* ---------------- surprises on page 5 ---------------- */

export const TWISTS = {
  bird: { word: 'bird', art: 'bird' },
  parrot: { word: 'parrot', art: 'parrot' },
  monkey: { word: 'monkey', art: 'monkey' },
  squirrel: { word: 'squirrel', art: 'squirrel' },
  leaf: { word: 'leaf', art: 'leaf' },
  ladybug: { word: 'ladybug', art: 'ladybug' },
  butterfly: { word: 'butterfly', art: 'butterfly' },
  coconut: { word: 'coconut', art: 'coconut' },
  frog: { word: 'frog', art: 'frog' },
  duck: { word: 'duck', art: 'duck' },
  turtle: { word: 'turtle', art: 'turtle' },
  crab: { word: 'crab', art: 'crab' },
  littlefish: { word: 'little fish', art: 'tropicalfish' },
  octopus: { word: 'octopus', art: 'octopus' },
  mouse: { word: 'mouse', art: 'mouse' },
  snail: { word: 'snail', art: 'snail' },
  worm: { word: 'worm', art: 'worm' },
  star: { word: 'star', art: 'star' },
  moonrock: { word: 'moon rock', art: 'rock' },
  planet: { word: 'tiny planet', art: 'planet' },
  pearl: { word: 'pearl', art: null },
};

const TW = {
  tree: ['bird', 'squirrel', 'leaf'], jungletree: ['parrot', 'monkey', 'coconut'], high: ['bird', 'ladybug', 'butterfly'],
  palm: ['bird', 'coconut', 'butterfly'], pond: ['frog', 'duck', 'turtle'], sea: ['crab', 'littlefish', 'octopus'],
  small: ['mouse', 'snail', 'ladybug'], hole: ['crab', 'worm', 'snail'], dirt: ['worm', 'snail', 'ladybug'],
  mud: ['worm', 'frog', 'snail'], space: ['star', 'moonrock', 'planet'], clam: ['pearl', 'crab', 'littlefish'],
  beach: ['crab', 'snail', 'worm'], town: ['mouse', 'ladybug', 'snail'], jungle: ['frog', 'butterfly', 'snail'],
};

/* ---------------- spots ----------------
   kind decides the first tries and the helpers' skills. helpers = only those with a skill that fits. */

const HIGH_ALL = ['dragon', 'lizard', 'sam', 'robot', 'astronaut', 'dino', 'superhero'];
const VERY_HIGH = ['dragon', 'astronaut', 'sam', 'robot', 'superhero'];
const SWIM = ['shark', 'fish', 'dino'];
const UNDERWATER = ['shark', 'fish'];
const GAP = ['berry', 'sam', 'robot'];
const DIG = ['monster', 'truck'];
const STRONG = ['monster', 'lizard', 'truck', 'superhero'];
const FLY = ['astronaut', 'dragon', 'superhero'];
const DEEP_LAND = ['astronaut', 'dragon', 'superhero', 'dino'];
const TANGLE = ['shark', 'monster', 'robot'];

export const SPOTS = {
  wheeltop: { kind: 'HIGH', phrase: 'up to the top of the big wheel', card: 'big wheel', title: 'on the Big Wheel', helpers: VERY_HIGH, twists: TW.high },
  tentroof: { kind: 'HIGH', phrase: 'onto the tent roof', card: 'tent roof', title: 'on the Tent', helpers: HIGH_ALL, twists: TW.high },
  pond: { kind: 'WATER', phrase: 'into the duck pond', card: 'duck pond', title: 'in the Pond', helpers: SWIM, twists: TW.pond },
  booth: { kind: 'SMALL', noun: 'gap', phrase: 'under the ticket booth', card: 'ticket booth', title: 'under the Booth', helpers: GAP, twists: TW.small },
  mud: { kind: 'MUD', phrase: 'into a mud puddle', card: 'mud puddle', title: 'in the Mud', helpers: DIG, twists: TW.mud },
  palmtop: { kind: 'HIGH', phrase: 'up into a palm tree', card: 'palm tree', title: 'in the Palm Tree', helpers: VERY_HIGH, twists: TW.palm },
  tower: { kind: 'HIGH', phrase: 'onto the lifeguard tower', card: 'lifeguard tower', title: 'on the Tower', helpers: HIGH_ALL, twists: TW.high },
  waves: { kind: 'WATER', phrase: 'out into the waves', card: 'waves', title: 'in the Waves', helpers: SWIM, twists: TW.sea },
  tidepool: { kind: 'WATER', phrase: 'into a tide pool', card: 'tide pool', title: 'in the Tide Pool', helpers: SWIM, twists: TW.sea },
  crabhole: { kind: 'SMALL', noun: 'hole', phrase: 'into a crab hole', card: 'crab hole', title: 'in the Crab Hole', helpers: ['berry', 'robot', 'fish'], twists: TW.hole },
  cave: { kind: 'SMALL', noun: 'cave', phrase: 'into a little cave', card: 'little cave', title: 'in the Cave', helpers: ['berry', 'fish'], twists: TW.sea },
  clam: { kind: 'SMALL', noun: 'clam', phrase: 'into a giant clam', card: 'giant clam', title: 'in the Clam', helpers: ['berry', 'fish'], twists: TW.clam },
  wreck: { kind: 'SMALL', noun: 'window', phrase: 'into an old ship', card: 'old ship', title: 'in the Old Ship', helpers: ['berry', 'fish'], twists: TW.sea },
  crack: { kind: 'DEEP', noun: 'crack', phrase: 'down into a deep crack', card: 'deep crack', title: 'in the Crack', helpers: UNDERWATER, twists: TW.sea },
  net: { kind: 'NET', noun: 'net', phrase: 'into an old fishing net', card: 'fishing net', title: 'in the Net', helpers: TANGLE, twists: TW.sea },
  seaweed: { kind: 'NET', noun: 'seaweed', phrase: 'into some tall seaweed', card: 'tall seaweed', title: 'in the Seaweed', helpers: TANGLE, twists: TW.sea },
  boardwalk: { kind: 'SMALL', noun: 'gap', phrase: 'under the boardwalk', card: 'boardwalk', title: 'under the Boardwalk', helpers: GAP, twists: TW.beach },
  ditch: { kind: 'DEEP', noun: 'ditch', phrase: 'into a deep ditch', card: 'deep ditch', title: 'in the Ditch', helpers: DEEP_LAND, twists: TW.dirt },
  roadhole: { kind: 'DEEP', noun: 'hole', phrase: 'into a deep hole in the road', card: 'hole in the road', title: 'in the Hole', helpers: DEEP_LAND, twists: TW.town },
  moonhole: { kind: 'SMALL', noun: 'hole', phrase: 'into a tiny moon hole', card: 'tiny hole', title: 'in the Moon Hole', helpers: ['berry', 'robot'], twists: TW.space },
  underrock: { kind: 'UNDER', phrase: 'under a big rock', card: 'big rock', title: 'under the Rock', helpers: STRONG, twists: TW.sea },
  treetop: { kind: 'HIGH', phrase: 'up into a tall tree', card: 'tall tree', title: 'in the Tree', helpers: VERY_HIGH, twists: TW.tree },
  bigrock: { kind: 'HIGH', phrase: 'onto a tall rock', card: 'tall rock', title: 'on the Rock', helpers: HIGH_ALL, twists: TW.high },
  river: { kind: 'WATER', phrase: 'into the river', card: 'river', title: 'in the River', helpers: SWIM, twists: TW.pond },
  rabbithole: { kind: 'SMALL', noun: 'hole', phrase: 'into a rabbit hole', card: 'rabbit hole', title: 'in the Rabbit Hole', helpers: ['berry', 'robot'], twists: TW.dirt },
  hollowlog: { kind: 'SMALL', noun: 'log', phrase: 'into a hollow log', card: 'hollow log', title: 'in the Log', helpers: GAP, twists: TW.small },
  jungletree: { kind: 'HIGH', phrase: 'up into a jungle tree', card: 'jungle tree', title: 'in the Jungle Tree', helpers: VERY_HIGH, twists: TW.jungletree },
  junglerock: { kind: 'HIGH', phrase: 'onto a tall rock', card: 'tall rock', title: 'on the Rock', helpers: HIGH_ALL, twists: TW.jungle },
  jungleriver: { kind: 'WATER', phrase: 'into the river', card: 'river', title: 'in the River', helpers: SWIM, twists: TW.pond },
  junglemud: { kind: 'MUD', phrase: 'into some sticky mud', card: 'sticky mud', title: 'in the Mud', helpers: DIG, twists: TW.mud },
  junglelog: { kind: 'SMALL', noun: 'log', phrase: 'into a hollow log', card: 'hollow log', title: 'in the Log', helpers: GAP, twists: TW.jungle },
  lightpole: { kind: 'HIGH', phrase: 'to the top of a light pole', card: 'light pole', title: 'on the Light Pole', helpers: VERY_HIGH, twists: TW.high },
  stands: { kind: 'HIGH', phrase: 'up into the stands', card: 'stands', title: 'in the Stands', helpers: HIGH_ALL, twists: TW.high },
  mudpit: { kind: 'MUD', phrase: 'into the mud pit', card: 'mud pit', title: 'in the Mud Pit', helpers: DIG, twists: TW.mud },
  understands: { kind: 'SMALL', noun: 'gap', phrase: 'under the stands', card: 'under the stands', title: 'under the Stands', helpers: GAP, twists: TW.small },
  tire: { kind: 'SMALL', noun: 'hole', phrase: 'into a giant tire', card: 'giant tire', title: 'in the Tire', helpers: GAP, twists: TW.small },
  backboard: { kind: 'HIGH', phrase: 'onto the top of the backboard', card: 'backboard', title: 'on the Backboard', helpers: HIGH_ALL, twists: TW.high },
  scoreboard: { kind: 'HIGH', phrase: 'onto the scoreboard', card: 'scoreboard', title: 'on the Scoreboard', helpers: HIGH_ALL, twists: TW.high },
  bleachers: { kind: 'SMALL', noun: 'gap', phrase: 'under the bleachers', card: 'bleachers', title: 'under the Bleachers', helpers: GAP, twists: TW.small },
  parkmud: { kind: 'MUD', phrase: 'into a mud puddle', card: 'mud puddle', title: 'in the Mud', helpers: DIG, twists: TW.mud },
  lamppost: { kind: 'HIGH', phrase: 'to the top of a lamp post', card: 'lamp post', title: 'on the Lamp Post', helpers: ['dragon', 'lizard', 'robot', 'astronaut', 'dino', 'superhero'], twists: TW.high },
  roof: { kind: 'HIGH', phrase: 'onto a tall roof', card: 'tall roof', title: 'on the Roof', helpers: ['dragon', 'robot', 'astronaut', 'superhero'], twists: TW.high },
  fountain: { kind: 'WATER', phrase: 'into the fountain', card: 'fountain', title: 'in the Fountain', helpers: SWIM, twists: TW.pond },
  drain: { kind: 'SMALL', noun: 'drain', phrase: 'into a drain', card: 'drain', title: 'in the Drain', helpers: ['berry', 'fish', 'robot'], twists: TW.small },
  undercar: { kind: 'SMALL', noun: 'gap', phrase: 'under a parked car', card: 'parked car', title: 'under the Car', helpers: GAP, twists: TW.small },
  satellite: { kind: 'FAR', phrase: 'up to a satellite', card: 'satellite', title: 'by the Satellite', helpers: FLY, twists: TW.space },
  faraway: { kind: 'FAR', phrase: 'far up into space', card: 'far up', title: 'in Space', helpers: FLY, twists: TW.space },
  bigrocket: { kind: 'HIGH', phrase: 'onto a big rocket', card: 'big rocket', title: 'on the Big Rocket', helpers: ['astronaut', 'dragon', 'lizard', 'robot', 'dino', 'superhero'], twists: TW.space },
  crater: { kind: 'DEEP', noun: 'crater', phrase: 'into a deep crater', card: 'crater', title: 'in the Crater', helpers: DEEP_LAND, twists: TW.space },
  mooncave: { kind: 'SMALL', noun: 'cave', phrase: 'into a moon cave', card: 'moon cave', title: 'in the Moon Cave', helpers: GAP, twists: TW.space },
  moonunder: { kind: 'UNDER', phrase: 'under a moon rock', card: 'moon rock', title: 'under the Moon Rock', helpers: STRONG, twists: TW.space },
};

export const BLOCKERS = {
  rock: { word: 'big rock', helpers: STRONG },
  log: { word: 'big log', helpers: STRONG },
  box: { word: 'big box', helpers: STRONG },
  haybale: { word: 'hay bale', helpers: STRONG },
  bigtire: { word: 'giant tire', helpers: STRONG },
  moonrock: { word: 'big moon rock', helpers: STRONG },
  brokensat: { word: 'broken satellite', helpers: STRONG },
};

/* ---------------- the problems in each setting ---------------- */

const UHOH = {
  wind: { label: 'Blown away!', lead: 'Oh no! The wind blew the {O} ' },
  roll: { label: 'Rolled away!', lead: 'Oh no! The {O} rolled ' },
  flew: { label: 'Too high!', lead: 'Oh no! The {O} flew ' },
  current: { label: 'A big wave!', lead: 'Oh no! A big wave pushed the {O} ' },
  sink: { label: 'It sank!', lead: 'Oh no! The {O} sank ' },
  float: { label: 'Floated away!', lead: 'Oh no! The {O} floated ' },
  bounce: { label: 'Bounced away!', lead: 'Oh no! The {O} bounced ' },
  puff: { label: 'Volcano puff!', lead: 'Oh no! The volcano went PUFF and blew the {O} ' },
  block: { label: 'In the way!', lead: 'Oh no! ' },
};

const RIDES = ['bike', 'scooter', 'skateboard'];

export const PROBLEMS = {
  fair: [
    { type: 'wind', things: ['kite', 'balloon', 'hat'], spots: ['wheeltop', 'tentroof', 'pond', 'mud'] },
    { type: 'roll', things: ['ball', 'apple', 'beachball'], spots: ['pond', 'booth', 'mud'] },
    { type: 'block', things: RIDES, blockers: ['haybale', 'box', 'rock'], twists: TW.dirt },
  ],
  beach: [
    { type: 'wind', things: ['kite', 'hat', 'balloon'], spots: ['palmtop', 'tower', 'waves', 'tidepool', 'crabhole'] },
    { type: 'roll', things: ['beachball', 'ball', 'shell'], spots: ['waves', 'crabhole', 'tidepool', 'boardwalk'] },
    { type: 'block', things: RIDES, blockers: ['rock', 'log'], twists: TW.beach },
  ],
  sea: [
    { type: 'current', things: ['shell', 'ball', 'crown'], spots: ['cave', 'clam', 'wreck', 'net', 'seaweed'] },
    { type: 'sink', things: ['shell', 'ball', 'crown'], spots: ['crack', 'wreck', 'net', 'underrock'] },
  ],
  woods: [
    { type: 'wind', things: ['kite', 'hat', 'balloon'], spots: ['treetop', 'bigrock', 'river', 'mud'] },
    { type: 'roll', things: ['ball', 'apple', 'beachball'], spots: ['river', 'rabbithole', 'mud', 'hollowlog'] },
    { type: 'block', things: RIDES, blockers: ['log', 'rock'], twists: TW.dirt },
  ],
  jungle: [
    { type: 'puff', things: ['kite', 'hat', 'balloon'], spots: ['jungletree', 'junglerock', 'jungleriver', 'junglemud'] },
    { type: 'roll', things: ['ball', 'apple', 'beachball'], spots: ['jungleriver', 'junglemud', 'junglelog'] },
    { type: 'block', things: RIDES, blockers: ['log', 'rock'], twists: TW.jungle },
  ],
  arena: [
    { type: 'wind', things: ['hat', 'balloon', 'kite'], spots: ['lightpole', 'stands', 'mudpit', 'understands'] },
    { type: 'roll', things: ['ball', 'beachball', 'apple'], spots: ['mudpit', 'understands', 'tire', 'ditch'] },
    { type: 'block', things: RIDES, blockers: ['bigtire', 'haybale', 'rock'], twists: TW.dirt },
  ],
  park: [
    { type: 'flew', things: ['basketball', 'baseball', 'ball'], spots: ['backboard', 'scoreboard', 'bleachers', 'parkmud', 'ditch'] },
    { type: 'roll', things: ['basketball', 'baseball', 'ball'], spots: ['bleachers', 'parkmud', 'drain', 'ditch'] },
    { type: 'block', things: RIDES, blockers: ['box', 'rock'], twists: TW.dirt },
  ],
  city: [
    { type: 'wind', things: ['hat', 'kite', 'balloon'], spots: ['lamppost', 'roof', 'fountain', 'drain', 'roadhole'] },
    { type: 'roll', things: ['ball', 'apple', 'beachball'], spots: ['fountain', 'drain', 'undercar', 'roadhole'] },
    { type: 'block', things: RIDES, blockers: ['box', 'bigtire'], twists: TW.town },
  ],
  space: [
    { type: 'float', things: ['ball', 'teddy', 'rocket'], spots: ['satellite', 'faraway', 'bigrocket', 'crater', 'mooncave', 'moonhole'] },
    { type: 'bounce', things: ['ball', 'teddy', 'rocket'], spots: ['crater', 'mooncave', 'moonunder', 'bigrocket', 'moonhole'] },
    { type: 'block', things: RIDES, blockers: ['moonrock', 'brokensat'], twists: TW.space },
  ],
};

// Stickers that fit each setting, plus a star and a heart everywhere.
export const STICKERS = {
  fair: ['balloon', 'popcorn', 'ticket', 'confetti', 'crown', 'sparkles'],
  beach: ['sun', 'shell', 'crab', 'coconut', 'wave', 'tropicalfish'],
  sea: ['tropicalfish', 'octopus', 'crab', 'shell', 'coral', 'bubbles'],
  woods: ['mushroom', 'leaf', 'butterfly', 'squirrel', 'bird', 'blossom'],
  jungle: ['parrot', 'monkey', 'hibiscus', 'butterfly', 'frog', 'coconut'],
  arena: ['checkered', 'trophy', 'medal', 'sparkles', 'crown', 'flag'],
  park: ['trophy', 'medal', 'basketball', 'baseball', 'sun', 'sparkles'],
  city: ['bird', 'balloon', 'blossom', 'sun', 'car', 'bus'],
  space: ['planet', 'comet', 'rocket', 'satellite', 'earth', 'sparkles'],
};
export const stickersFor = (placeId) => [...(STICKERS[placeId] || []), 'star', 'heart'];

/* ---------------- first tries ---------------- */

export const TRIES = {
  jump: { text: 'jumped up', card: 'jump' },
  stick: { text: 'used a long stick', card: 'long stick' },
  box: { text: 'stood on a box', card: 'box' },
  net: { text: 'used a net', card: 'net' },
  lean: { text: 'leaned way out', card: 'lean out' },
  reach: { text: 'reached in', card: 'reach in' },
  squeeze: { text: 'tried to squeeze in', card: 'squeeze in' },
  crawl: { text: 'tried to crawl in', card: 'crawl in' },
  shovel: { text: 'used a shovel', card: 'shovel' },
  reachdown: { text: 'reached down', card: 'reach down' },
  jumphigh: { text: 'jumped up high', card: 'jump' },
  reachup: { text: 'reached up', card: 'reach up' },
  pullnet: { text: 'pulled and tugged', card: 'pull' },
  shake: { text: 'shook it hard', card: 'shake' },
  push: { text: 'pushed and pushed', card: 'push' },
  pull: { text: 'pulled and pulled', card: 'pull' },
  lift: { text: 'tried to lift it', card: 'lift' },
};

const KIND_TRIES = {
  HIGH: ['jump', 'stick', 'box'], WATER: ['stick', 'net', 'lean'], SMALL: ['reach', 'squeeze', 'crawl'],
  MUD: ['reach', 'stick', 'shovel'], DEEP: ['reachdown', 'stick', 'net'], FAR: ['jumphigh', 'net', 'reachup'],
  NET: ['pullnet', 'reach', 'shake'], UNDER: ['push', 'pull', 'lift'], BLOCK: ['push', 'pull', 'lift'],
};

/* ---------------- helpers' skills ----------------
   [what page 4 says about them, what page 5 says they did] */

const SKILL = {
  dragon: { HIGH: ['can fly', 'flew up and got'], FAR: ['can fly', 'flew up and got'], DEEP: ['can fly', 'flew down and got'] },
  superhero: { HIGH: ['can fly', 'flew up and got'], FAR: ['can fly', 'flew up and got'], DEEP: ['can fly', 'flew down and got'], UNDER: ['is super strong', 'lifted the rock and got'], BLOCK: ['is super strong', 'lifted the {B} out of the way'] },
  lizard: { HIGH: ['is very tall', 'reached up and got'], UNDER: ['is big and strong', 'moved the rock and got'], BLOCK: ['is big and strong', 'pushed the {B} out of the way'] },
  dino: { HIGH: ['has a long, long neck', 'reached up and got'], WATER: ['can walk in deep water', 'waded in and got'], DEEP: ['has a long, long neck', 'reached down and got'] },
  sam: { HIGH: ['is good at climbing', 'climbed up and got'], SMALL: ['can crawl into small spaces', 'crawled in and got'] },
  robot: {
    HIGH: ['has stretchy arms', 'stretched up and got'], WATER: ['has stretchy arms', 'stretched out and got'], SMALL: ['has stretchy arms', 'reached in and got'],
    MUD: ['has stretchy arms', 'reached in and got'], DEEP: ['has stretchy arms', 'reached down and got'], FAR: ['has stretchy arms', 'stretched way up and got'], NET: ['has stretchy arms', 'reached in and got'],
  },
  astronaut: { HIGH: ['has a jet pack', 'zoomed up and got'], FAR: ['has a jet pack', 'zoomed up and got'], DEEP: ['has a jet pack', 'zoomed down and got'] },
  shark: { WATER: ['is a fast swimmer', 'swam over and got'], DEEP: ['is a fast swimmer', 'swam down and got'], NET: ['has sharp teeth', 'bit through the {N} and got'] },
  fish: { WATER: ['is a good swimmer', 'swam over and got'], SMALL: ['is small and can swim', 'swam in and got'], DEEP: ['is a good swimmer', 'swam down and got'] },
  strawberry: { SMALL: ['is very small', 'squeezed in and got'] },
  monster: { MUD: ['has big strong hands', 'dug out'], UNDER: ['is very strong', 'lifted the rock and got'], BLOCK: ['is very strong', 'lifted the {B} out of the way'], NET: ['is very strong', 'pulled the {N} apart and got'] },
  truck: { MUD: ['can drive in deep mud', 'drove in and got'], UNDER: ['can pull hard', 'pulled the rock away and got'], BLOCK: ['can pull hard', 'pulled the {B} out of the way'] },
};
const hid = (h) => (h === 'berry' ? 'strawberry' : h);

const ENDINGS = { picnic: { text: 'had a picnic', card: 'picnic' }, party: { text: 'had a party', card: 'party' }, nap: { text: 'took a nap', card: 'nap' } };

/* ---------------- what fits this book ---------------- */

export const problemOf = (book) => (PROBLEMS[book.place] || []).find(p => p.type === book.uhoh);
const isBlock = (book) => book.uhoh === 'block';

// A spot only works if the main character can't fix it alone and at least two helpers can.
export function spotOK(heroId, spotId) {
  const helpers = SPOTS[spotId].helpers.map(hid);
  if (helpers.includes(heroId)) return false;
  return helpers.filter(h => h !== heroId).length >= 2;
}
const blockOK = (heroId) => !STRONG.includes(heroId);

export function problemsFor(book) {
  return (PROBLEMS[book.place] || []).filter(p => (p.type === 'block' ? blockOK(book.hero) : p.spots.filter(s => spotOK(book.hero, s)).length >= 2));
}

export const uhohLabel = (type) => UHOH[type].label;

const kindOf = (book) => (isBlock(book) ? 'BLOCK' : book.picks[1] ? SPOTS[book.picks[1]].kind : null);

export function choicesFor(book, i) {
  const p = problemOf(book);
  if (!p) return [];
  if (i === 1) return p.things.slice();
  if (i === 2) return isBlock(book) ? p.blockers.slice() : p.spots.filter(s => spotOK(book.hero, s));
  if (i === 3) return KIND_TRIES[kindOf(book)] || [];
  if (i === 4) return (isBlock(book) ? BLOCKERS[book.picks[1]].helpers : SPOTS[book.picks[1]].helpers).map(hid).filter(h => h !== book.hero);
  if (i === 5) return isBlock(book) ? p.twists.slice() : SPOTS[book.picks[1]].twists.slice();
  if (i === 6) return [book.picks[0], 'picnic', 'party', 'nap'];
  return [];
}

// Up to four choices, mixed up (the ending keeps the toy's ending first).
export function poolFor(book, i, rnd = Math.random) {
  const list = choicesFor(book, i).slice();
  if (i === 6) return list;
  for (let k = list.length - 1; k > 0; k--) { const j = Math.floor(rnd() * (k + 1)); [list[k], list[j]] = [list[j], list[k]]; }
  return list.slice(0, 4);
}

export function cardWord(book, i, id) {
  if (i === 1) return THINGS[id].word;
  if (i === 2) return isBlock(book) ? BLOCKERS[id].word : SPOTS[id].card;
  if (i === 3) return TRIES[id].card;
  if (i === 4) return hero(id).name;
  if (i === 5) return TWISTS[id].word;
  if (i === 6) return THINGS[id] ? THINGS[id].end : ENDINGS[id].card;
  return id;
}

/* ---------------- words ---------------- */

const art = (word) => (/^[aeiou]/i.test(word) ? 'an' : 'a');

// The sentence for page i as pieces: { t } plain, { t, slot: true } the picked words, { blank: true } not picked yet.
export function words(book, i) {
  const H = hero(book.hero).name;
  const pick = book.picks[i - 1];
  const thing = book.picks[0] ? THINGS[book.picks[0]] : null;
  const O = thing ? thing.word : '';
  const out = [];
  const t = (s) => out.push({ t: s });
  const slot = (s) => out.push(s ? { t: s, slot: true } : { blank: true });
  const block = isBlock(book);
  const B = block && book.picks[1] ? BLOCKERS[book.picks[1]].word : '';

  if (i === 1) {
    t(`${H} went ${place(book.place).to} to `); slot(pick && THINGS[pick].love); t('.');
  } else if (i === 2) {
    if (block) {
      t('Oh no! ');
      if (pick) { t(cap(art(BLOCKERS[pick].word)) + ' '); slot(BLOCKERS[pick].word); } else slot(null);
      t(' blocked the path!');
    } else { t(UHOH[book.uhoh].lead.replace('{O}', O)); slot(pick && SPOTS[pick].phrase); t('!'); }
  } else if (i === 3) {
    t(H + ' '); slot(pick && TRIES[pick].text);
    if (block) t(`, but the ${B} was too heavy.`);
    else {
      const sp = SPOTS[book.picks[1]];
      const why = {
        HIGH: `the ${O} was too high`, WATER: `the ${O} was too far away`, FAR: `the ${O} was too far away`,
        SMALL: `the ${sp.noun} was too small`, DEEP: `the ${sp.noun} was too deep`, MUD: 'the mud was too deep',
        NET: `the ${sp.noun} was too tangled`, UNDER: 'the rock was too heavy',
      }[sp.kind];
      t(`, but ${why}.`);
    }
  } else if (i === 4) {
    if (pick) { slot(hero(pick).name); t(` came to help. ${hero(pick).name} ${SKILL[pick][kindOf(book)][0]}!`); }
    else { slot(null); t(' came to help.'); }
  } else if (i === 5) {
    const K = hero(book.picks[3]).name;
    const did = SKILL[book.picks[3]][kindOf(book)][1].replace('{B}', B).replace('{N}', block ? '' : SPOTS[book.picks[1]].noun || '');
    const surprise = () => { if (pick) { t(art(TWISTS[pick].word) + ' '); slot(TWISTS[pick].word); } else slot(null); };
    if (block) { t(`${K} ${did}. Under it was `); surprise(); t('!'); }
    else { t(`${K} ${did} the ${O}. It had `); surprise(); t(' on it!'); }
  } else if (i === 6) {
    t(`Then ${H} and ${hero(book.picks[3]).name} `); slot(pick && (THINGS[pick] ? THINGS[pick].play : ENDINGS[pick].text)); t('!');
  }
  return out;
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const plainText = (book, i) => words(book, i).map(p => (p.blank ? '___' : p.t)).join('');

/* ---------------- titles ---------------- */

const tc = (s) => s.replace(/\b\w/g, c => c.toUpperCase());

// Four titles built from what happened in his book.
export function titleOptions(book) {
  const H = hero(book.hero).name;
  const K = book.picks[3] ? hero(book.picks[3]).name : '';
  const thing = THINGS[book.picks[0]];
  return [
    { id: 'hero', text: `${H} and the ${tc(thing.word)}` },
    isBlock(book) ? { id: 'trouble', text: `The ${tc(BLOCKERS[book.picks[1]].word)} in the Way` } : { id: 'trouble', text: `The ${tc(thing.word)} ${SPOTS[book.picks[1]].title}` },
    { id: 'rescue', text: `${K} to the Rescue` },
    { id: 'friends', text: `${H} and ${K}` },
  ];
}

export function titleText(book) {
  if (!book.title) return '';
  const o = titleOptions(book).find(x => x.id === book.title);
  return o ? o.text : '';
}

/* ---------------- pictures ---------------- */

const heroAt = (book, x, mode, o = {}) => figure(book.hero, x, G, { mode, face: 'right', ...o });
const thingPic = (id, x, y, h, mode, o = {}) => pic(THINGS[id].art, x, y, h, { mode, ...o });

function onHead(f, artName, mode, h) {
  const hh = h || Math.max(26, Math.min(44, f.w * 0.5));
  return pic(artName, f.headX, f.headY + hh * 0.3, hh, { mode });
}

const FLIP_TWIST = ['bird', 'squirrel', 'duck', 'littlefish', 'mouse', 'snail', 'turtle', 'worm', 'parrot'];
function twistPic(id, x, y, h, mode) {
  if (id === 'pearl') return pearl(x, y, h * 0.7, mode);
  return pic(TWISTS[id].art, x, y, h, { mode, flip: FLIP_TWIST.includes(id) });
}

const handOf = (f) => [f.x + f.w * 0.42 * f.face, f.top + f.h * 0.45];

// Page 1: the main character with the thing they love.
function meetScene(book, mode) {
  const f = heroAt(book, 140, mode);
  const id = book.picks[0];
  if (!id) return f.svg;
  const th = THINGS[id];
  const [hx, hy] = handOf(f);
  if (th.show === 'sky') return f.svg + ropeLine(hx, hy, 286, 120, mode, -10) + thingPic(id, 296, 122, th.h * 1.3, mode);
  if (th.show === 'string') return f.svg + ropeLine(hx, hy, 240, 152, mode, 8) + thingPic(id, 242, 156, th.h * 1.2, mode);
  if (th.show === 'head') return f.svg + onHead(f, th.art, mode, th.h * 1.15);
  if (th.show === 'ride') return thingPic(id, 265, G + 2, th.h * 1.3, mode) + f.svg;
  return f.svg + thingPic(id, 262, G, th.h * 1.25, mode);
}

// The spot with the thing sitting in it.
function spotWithThing(book, mode) {
  const sp = SPOT_ART[book.picks[1]](mode);
  const [ox, oy] = sp.obj;
  const h = sp.size * (THINGS[book.picks[0]].h / 38);
  return { svg: sp.back + thingPic(book.picks[0], ox, oy, h, mode) + (sp.front || ''), sp, h, ox, oy };
}

// What the main character holds or does on page 3.
function tryProps(tryId, f, target, mode) {
  const [hx, hy] = handOf(f);
  const [tx, ty] = target;
  const toward = (len) => { const dx = tx - hx, dy = ty - hy, d = Math.hypot(dx, dy) || 1, L = Math.min(len, d * 0.8); return [hx + dx / d * L, hy + dy / d * L]; };
  if (tryId === 'stick') { const [ex, ey] = toward(92); return stick(hx, hy, ex, ey, mode); }
  if (tryId === 'net') { const [ex, ey] = toward(92); return netPole(hx, hy, ex, ey, mode); }
  if (tryId === 'shovel') return pic('shovel', f.right + 6, G, 54, { mode, rot: 14 });
  if (['pullnet', 'shake', 'push', 'lift'].includes(tryId)) return effort(f.right + 4, f.top + 18, mode);
  return '';
}

function tryHero(book, tryId, x, mode) {
  if (tryId === 'jump' || tryId === 'jumphigh') { const up = figure(book.hero, x, G - 26, { mode, face: 'right' }); return { f: up, svg: up.svg + arcs(x, G - 2, up.w * 0.8, mode) }; }
  if (tryId === 'box') { const up = figure(book.hero, x, G - 38, { mode, face: 'right' }); return { f: up, svg: pic('box', x, G + 2, 44, { mode }) + up.svg }; }
  if (['lean', 'reach', 'reachdown', 'squeeze', 'crawl'].includes(tryId)) { const f = heroAt(book, x, mode, { rot: { reachdown: 22, squeeze: 26, crawl: 72 }[tryId] || 14 }); return { f, svg: f.svg }; }
  if (tryId === 'reachup') { const f = heroAt(book, x, mode, { rot: 6 }); return { f, svg: f.svg + arcs(x, G - 2, f.w * 0.6, mode) }; }
  if (tryId === 'pull') { const f = heroAt(book, x, mode, { rot: -10 }); return { f, svg: f.svg }; }
  const f = heroAt(book, x, mode);
  return { f, svg: f.svg };
}

// Page 5: the helper doing what they're good at, with the surprise on the thing.
function rescue(book, mode) {
  const kid = book.picks[3];
  const kind = kindOf(book);
  const sp = SPOT_ART[book.picks[1]](mode);
  const [ox, oy] = sp.obj;
  const th = THINGS[book.picks[0]];
  const h = sp.size * (th.h / 38);
  const w = h * aspect(th.art);
  let front = sp.front || '', helper = '', thingAt = null;
  const fig = (x, g, o = {}) => figure(kid, x, g, { mode, face: 'left', ...o });

  if (kid === 'dragon' || kid === 'astronaut' || kid === 'superhero') {
    const hh = 92;
    helper = fig(Math.min(366, ox + w / 2 + 34), kind === 'DEEP' ? oy - 10 : oy + hh * 0.35, { h: hh }).svg;
  } else if ((kid === 'lizard' || kid === 'dino') && kind === 'HIGH') {
    const f = fig(Math.min(350, ox + 46), G);
    helper = f.svg; thingAt = [f.headX - f.w * 0.12, f.top + 6];
  } else if (kid === 'dino' && kind === 'DEEP') {
    const f = fig(Math.min(352, ox + 62), G);
    helper = f.svg; thingAt = [f.headX - f.w * 0.1, f.top + 10];
  } else if (kid === 'dino' && kind === 'WATER') {
    const f = fig(Math.min(350, ox + 40), oy + 12, { h: 118 });
    helper = f.svg; thingAt = [f.headX - f.w * 0.1, f.top + 8];
  } else if (kid === 'sam' && kind === 'HIGH') {
    helper = fig(ox + 26, oy + 112, { h: 104 }).svg;
  } else if (kid === 'robot') {
    const f = figure('robot', Math.max(150, Math.min(ox - 90, 210)), G, { mode, face: 'right', h: 112 });
    helper = f.svg + robotArm(f.x + f.w * 0.42, f.top + f.h * 0.48, ox - w * 0.45, oy - h * 0.5, mode);
  } else if (kid === 'shark' || kid === 'fish') {
    helper = fig(Math.min(370, ox + w / 2 + 40), oy + (kind === 'DEEP' ? 4 : 10), { h: kid === 'shark' ? 80 : 60 }).svg;
    if (kind === 'NET') { front = ''; thingAt = [ox - 30, G]; }
  } else if (kid === 'strawberry' || kid === 'sam') {
    helper = fig(Math.min(372, ox + w / 2 + 30), G, { h: kid === 'sam' ? 96 : 60 }).svg;
  } else if (kid === 'monster' && kind === 'MUD') {
    const f = fig(ox + 6, G + 8);
    helper = f.svg; thingAt = [f.x - f.w * 0.44, f.top + 10];
  } else if (kid === 'truck' && kind === 'MUD') {
    const f = figure('truck', ox, G + 6, { mode, face: 'left' });
    helper = f.svg; thingAt = [f.x, f.top + 2];
  } else if (kind === 'NET') {
    helper = fig(Math.min(372, ox + 72), G).svg; front = ''; thingAt = [ox - 30, G];
  }
  if (kind === 'UNDER') {
    // The rock is moved aside, so the thing is out in the open.
    front = pic('rock', 372, G + 2, 80, { mode, rot: 12 });
    const f = kid === 'truck' ? figure('truck', 284, G, { mode, face: 'left' }) : kid === 'superhero' ? fig(330, G - 70, { h: 92 }) : fig(300, G);
    helper = f.svg + (kid === 'truck' ? ropeLine(f.x + f.w * 0.45, G - 30, 346, G - 30, mode, 6) : '');
    thingAt = [kid === 'truck' ? 168 : 222, G];
  }
  const [tx, ty] = thingAt || [ox, oy];
  const thing = thingPic(book.picks[0], tx, ty, h, mode);
  const twist = book.picks[4] ? twistPic(book.picks[4], tx + w * 0.05, ty - h * 0.72, Math.max(22, Math.min(30, h * 0.8)), mode) : '';
  const watcher = heroAt(book, 72, mode).svg;
  return watcher + sp.back + (thingAt ? '' : thing) + front + helper + (thingAt ? thing : '') + twist;
}

// Page 6 extras: the toy, or the picnic, party, or nap.
function endingProps(book, f, k, mode) {
  const e = book.picks[5];
  if (!e) return { under: '', over: '' };
  if (e === 'picnic') return { under: pic('blanket', 205, G + 10, 34, { mode }), over: pic('basket', 205, G + 2, 46, { mode }) + pic('watermelon', 364, G, 38, { mode }) };
  if (e === 'party') return { under: '', over: pic('balloon', 44, 168, 84, { mode }) + pic('balloon', 362, 160, 84, { mode, flip: true }) + pic('confetti', 205, 104, 70, { mode }) };
  if (e === 'nap') return { under: '', over: pic('zzz', f.x + f.w * 0.3, f.top - 2, 32, { mode }) + pic('zzz', k.x + k.w * 0.3, k.top - 2, 32, { mode }) };
  const th = THINGS[e];
  const [hx, hy] = handOf(f);
  if (th.show === 'sky') return { under: '', over: ropeLine(hx, hy, 230, 82, mode, -8) + thingPic(e, 238, 84, th.h * 1.3, mode) };
  if (th.show === 'string') return { under: '', over: ropeLine(hx, hy, 205, 140, mode, 8) + thingPic(e, 206, 144, th.h * 1.2, mode) };
  if (th.show === 'head') return { under: '', over: onHead(k, th.art, mode, th.h * 1.15) };
  if (th.show === 'ride') return { under: thingPic(e, 205, G + 2, th.h * 1.2, mode), over: '' };
  if (th.toss) return { under: '', over: `<path d="M${hx} ${hy} Q205 80 ${k.x - k.w * 0.4} ${k.top + k.h * 0.45}" fill="none" stroke="${mode === 'line' ? '#3a3a3a' : '#8a7563'}" stroke-width="2" stroke-dasharray="5 6"/>` + thingPic(e, 205, 124, th.h * 1.1, mode) };
  return { under: '', over: thingPic(e, 205, G, th.h * 1.2, mode) };
}

// The picture for page i. Leave out the pick to draw the page before he chooses.
export function pageScene(book, i, mode = 'color', bgMode) {
  let body = '';
  const block = isBlock(book);
  const path = block ? pathBand(mode, book.place) : '';
  const blocker = book.picks[1];

  if (i === 1) body = path + meetScene(book, mode);

  else if (i === 2) {
    if (block) body = path + thingPic(book.picks[0], 168, G + 2, THINGS[book.picks[0]].h * 1.1, mode) + heroAt(book, 92, mode).svg + (blocker ? BLOCK_ART[blocker](292, mode) : '');
    else body = (book.picks[1] ? spotWithThing(book, mode).svg : '') + heroAt(book, 92, mode).svg;
  }

  else if (i === 3) {
    const t = book.picks[2];
    if (block) {
      const x = t === 'pull' ? 150 : 214;
      const th = tryHero(book, t, x, mode);
      body = path + BLOCK_ART[blocker](292, mode) + th.svg + (t === 'pull' ? ropeLine(th.f.right - 6, th.f.top + th.f.h * 0.5, 246, G - 34, mode, 6) : '') + (t ? tryProps(t, th.f, [292, G - 40], mode) : '');
    } else {
      const s = spotWithThing(book, mode);
      const x = Math.max(70, s.sp.stand - 24 - (t === 'crawl' ? 70 : 0));
      const th = tryHero(book, t, x, mode);
      const pullRope = t === 'pull' ? ropeLine(th.f.right - 6, th.f.top + th.f.h * 0.5, 262, G - 30, mode, 6) : '';
      body = s.sp.back + (t ? tryProps(t, th.f, [s.ox, s.oy - s.h / 2], mode) : '') + thingPic(book.picks[0], s.ox, s.oy, s.h, mode) + (s.sp.front || '') + th.svg + pullRope;
    }
  }

  else if (i === 4) {
    const k = book.picks[3];
    if (block) body = path + BLOCK_ART[blocker](300, mode) + heroAt(book, 82, mode).svg + (k ? figure(k, 186, G, { mode, face: 'right' }).svg : '');
    else body = spotWithThing(book, mode).svg + heroAt(book, 70, mode).svg + (k ? figure(k, 166, G, { mode, face: 'right', scale: 0.92 }).svg : '');
  }

  else if (i === 5) {
    if (block) {
      const k = book.picks[3];
      const f = k === 'truck' ? figure('truck', 270, G, { mode, face: 'left' }) : figure(k, 282, k === 'superhero' ? G - 40 : G, { mode, face: 'right' });
      const rope = k === 'truck' ? ropeLine(f.x + f.w * 0.46, G - 30, 322, G - 30, mode, 6) : '';
      const twist = book.picks[4] ? twistPic(book.picks[4], 186, G, 32, mode) : '';
      body = path + heroAt(book, 74, mode).svg + BLOCK_ART[blocker](366, mode) + f.svg + rope + twist;
    } else body = rescue(book, mode);
  }

  else if (i === 6) {
    const f = heroAt(book, 128, mode);
    const k = figure(book.picks[3], 282, G, { mode, face: 'left' });
    const ex = endingProps(book, f, k, mode);
    body = path + ex.under + f.svg + k.svg + ex.over;
  }

  return scene(book.place, body, { mode, bgMode });
}

// The cover shows the page the title is about.
export function coverScene(book, mode = 'color', bgMode, titleId) {
  const page = { hero: 1, trouble: 2, rescue: 5, friends: 6 }[titleId || book.title];
  if (page) return pageScene(book, page, mode, bgMode);
  const f = heroAt(book, 128, mode);
  const k = book.picks[3] ? figure(book.picks[3], 282, G, { mode, face: 'left' }) : null;
  return scene(book.place, (isBlock(book) ? pathBand(mode, book.place) : '') + f.svg + (k ? k.svg : ''), { mode, bgMode });
}

/* ---------------- pictures for the choice cards ---------------- */

const square = (body, vb = '0 0 120 100') => `<svg viewBox="${vb}" class="cardpic" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const inner = (svg) => svg.replace(/^<svg[^>]*>|<\/svg>$/g, '');

export function heroCard(id) {
  const h = { truck: 62, lizard: 92, fish: 54, dino: 84, strawberry: 74 }[id] || 86;
  return square(figure(id, 60, 96, { h, face: 'right' }).svg);
}

export function placeCard(id) {
  return `<svg viewBox="0 0 400 300" class="cardpic place" xmlns="http://www.w3.org/2000/svg">${inner(scene(id, ''))}</svg>`;
}

export function uhohCard(book, type) {
  const f = figure(book.hero, 30, 96, { h: 54, face: 'right' });
  const c = '#8a7563';
  const lines = (d) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>`;
  if (type === 'wind') return square(f.svg + pic('cloud', 66, 34, 30) + lines('M62 44 q10 -4 20 0 t20 0 M66 54 q8 -3 16 0 t16 0') + pic('leaf', 104, 70, 22));
  if (type === 'puff') return square(f.svg + pic('volcano', 88, 98, 64) + pic('cloud', 92, 30, 22));
  if (type === 'roll') return square(f.svg + pic('ball', 98, 96, 26) + lines('M56 84 h20 M60 92 h16'));
  if (type === 'flew') return square(f.svg + pic('basketball', 92, 36, 26) + lines('M50 70 Q66 40 80 38'));
  if (type === 'current') return square(f.svg + pic('wave', 90, 96, 64));
  if (type === 'sink') return square(f.svg + pic('shell', 92, 96, 26) + [[90, 40, 4], [96, 54, 3], [88, 64, 2.5]].map(([x, y, rr]) => `<circle cx="${x}" cy="${y}" r="${rr}" fill="none" stroke="#5aa9d6" stroke-width="2"/>`).join(''));
  if (type === 'float') return square(f.svg + pic('teddy', 92, 50, 34) + pic('star', 108, 20, 12) + pic('star', 70, 16, 9));
  if (type === 'bounce') return square(f.svg + pic('ball', 100, 50, 24) + lines('M60 96 Q72 50 86 62 M88 96 Q96 74 100 76'));
  if (type === 'block') return square(f.svg + pic('rock', 92, 98, 56) + `<path d="M0 96 H120" stroke="${c}" stroke-width="2"/>`);
  return square('');
}

export function choiceCard(book, i, id) {
  if (i === 1) { const th = THINGS[id]; return square(pic(th.art, 60, 92, Math.min(80, (100 / aspect(th.art)) * 0.8))); }
  if (i === 2) {
    if (isBlock(book)) return `<svg viewBox="196 128 192 160" class="cardpic" xmlns="http://www.w3.org/2000/svg">${BLOCK_ART[id](292, 'color')}</svg>`;
    const b = { ...book, picks: [book.picks[0], id, null, null, null, null] };
    return `<svg viewBox="150 0 250 300" class="cardpic" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">${inner(pageScene(b, 2))}</svg>`;
  }
  if (i === 3) {
    const th = tryHero(book, id, 110, 'color');
    let extra = tryProps(id, th.f, [250, 110], 'color');
    if (id === 'push' || id === 'lift') extra += pic('rock', 220, G + 2, 70);
    if (id === 'pull') extra += ropeLine(th.f.right - 6, th.f.top + th.f.h * 0.5, 200, G - 26, 'color', 6) + pic('rock', 226, G + 2, 70);
    if (id === 'pullnet' || id === 'shake') extra += `<g transform="translate(-70 0)">${SPOT_ART.net('color').front}</g>`;
    return `<svg viewBox="30 80 240 200" class="cardpic" xmlns="http://www.w3.org/2000/svg">${extra}${th.svg}</svg>`;
  }
  if (i === 4) return heroCard(id);
  if (i === 5) return square(twistPic(id, 60, 90, 70, 'color'));
  if (i === 6) {
    if (id === 'party') return square(pic('balloon', 42, 80, 60) + pic('balloon', 78, 74, 60, { flip: true }) + pic('confetti', 60, 98, 34));
    if (id === 'picnic') return square(pic('blanket', 60, 96, 16) + pic('basket', 48, 90, 46) + pic('watermelon', 88, 92, 28));
    if (id === 'nap') return square(pic('zzz', 60, 76, 52));
    const th = THINGS[id];
    return square(pic(th.art, 60, 90, Math.min(70, (90 / aspect(th.art)) * 0.8)));
  }
  return square('');
}
