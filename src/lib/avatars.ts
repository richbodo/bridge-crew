/**
 * The crew's avatars: one small pixel portrait per Game Studio job, in its station's colour, with
 * a pose for each crew member state (docs/state_machines.md §3). Standing by is still; the other
 * poses have two frames, shown in turn, so anything that moves is busy or wants the floor.
 *
 * Each picture is 16 rows of 16 letters, one letter per pixel. "." is empty. The letters shared
 * by every avatar are in COMMON; `u` is the station's colour and `U` its shade. A pose paints
 * over the standing-by picture, a row at a time: { 6: "...." } replaces row 6, and "." in a
 * row leaves that pixel as it was.
 */

import type { CrewStatus } from "./machines";

export const SIZE = 16;

export type Pose = "idle" | "working" | "hailing" | "speaking";
type Overlay = Readonly<Record<number, string>>;
type Frames = readonly [Overlay, Overlay];

export interface Sprite {
  /** Colours for this avatar's own letters: skin (s, S), hair (h, H) and what it holds. */
  colors: Readonly<Record<string, string>>;
  /** Standing by. */
  base: readonly string[];
  working: Frames;
  hailing: Frames;
  speaking: Frames;
}

/** Letters every avatar may use. */
export const COMMON: Readonly<Record<string, string>> = {
  o: "oklch(0.2 0.03 260)", // outline, and eyes
  w: "oklch(0.97 0.01 95)", // white
  m: "oklch(0.42 0.12 20)", // an open mouth
  b: "oklch(0.86 0.15 88)", // the badge, in gold
  y: "oklch(0.3 0.03 260)", // the uniform's collar
  "*": "oklch(0.92 0.03 250 / 0.5)", // a star
  "!": "oklch(0.9 0.17 95)", // "I have something for you"
};

/** The neck, shoulders and uniform every crew member wears: rows 11 to 15. */
const UNIFORM = [
  "......oSSo......",
  "...oooySSyooo...",
  "..ouuuyyyyuuuo..",
  ".ouuuuuuuubuuuo.",
  ".oUuuuuuuuuuuUo.",
];

// ---------- poses most of the crew share ----------

/** Looking down at the work: the top half of each eye closes. */
const LOOK_DOWN: Overlay = { 6: "......s..s......" };

/** A hand up, and a "!" over the shoulder, like a game character with something to say. */
const HAND_UP: Frames = [
  {
    0: ".............!!.",
    1: ".............!!.",
    2: ".............!!.",
    3: ".oo.............",
    4: "osso.........!!.",
    5: "osss............",
    6: "osso............",
    7: "ouuo............",
    8: "ouuo............",
    9: "ouuo............",
    10: "ouuo............",
    11: "ouuo............",
    12: "ouuo............",
    13: ".ouu............",
  },
  {
    1: ".............!!.",
    2: ".............!!.",
    3: "oo...........!!.",
    4: "sso.............",
    5: "ssso.........!!.",
    6: "oso.............",
    7: "ouuo............",
    8: "ouuo............",
    9: "ouuo............",
    10: "ouuo............",
    11: "ouuo............",
    12: "ouuo............",
    13: ".ouu............",
  },
];

/** Talking: the mouth opens and closes. */
const TALK: Frames = [{ 9: ".......mm......." }, { 9: ".......SS......." }];

// ---------- the crew ----------

const storyteller: Sprite = {
  colors: {
    s: "oklch(0.52 0.09 50)",
    S: "oklch(0.42 0.08 45)",
    h: "oklch(0.25 0.02 270)",
    H: "oklch(0.4 0.05 270)",
    P: "oklch(0.93 0.03 90)", // the book's pages
    k: "oklch(0.45 0.1 30)", // its spine
    t: "oklch(0.55 0.03 250)", // writing
    q: "oklch(0.97 0.02 90)", // the quill
  },
  base: [
    "................",
    "..............*.",
    ".....oooooo.....",
    "....ohhhhhho....",
    "...ohhHHhhhho...",
    "...ohhsssshho...",
    "...ohsossosho...",
    "...ohsossosho...",
    "...ohssssssho...",
    "...ohosSSsoho...",
    "...ohhoooohho...",
    "...ohhoSSohho...",
    "...ohhySSyhho...",
    ...UNIFORM.slice(2),
  ],
  // Writing in an open book.
  working: [
    {
      ...LOOK_DOWN,
      10: ".............q..",
      11: "............q...",
      12: "...ooooooooqo...",
      13: "...oPPPkkPoPo...",
      14: "..sottPkkPPPo...",
      15: "..soPPPkkPPPo...",
    },
    {
      ...LOOK_DOWN,
      10: "............q...",
      11: "...........q....",
      12: "...oooooooqoo...",
      13: "...oPPPkkoPPo...",
      14: "..sottPkkttPo...",
      15: "..soPPPkkPPPo...",
    },
  ],
  hailing: HAND_UP,
  speaking: TALK,
};

const gameDesigner: Sprite = {
  colors: {
    s: "oklch(0.84 0.06 60)",
    S: "oklch(0.72 0.07 50)",
    h: "oklch(0.45 0.08 55)",
    H: "oklch(0.58 0.09 60)",
    k: "oklch(0.32 0.02 260)", // the joystick
    r: "oklch(0.65 0.21 25)", // its knob
  },
  base: [
    "................",
    "..*.............",
    ".....oooooo.....",
    "....ohhhhhho....",
    "....ohhhHhho....",
    "....ohhsssso....",
    "....osossoso....",
    "....osossoso....",
    "....osssssso....",
    ".....osSSso.....",
    "......oooo......",
    "......oSSo......",
    "...oooySSyooo...",
    "..ouuuyybbuuuo..",
    ...UNIFORM.slice(3),
  ],
  // Trying the controls on a joystick.
  working: [
    {
      ...LOOK_DOWN,
      9: "...........oo...",
      10: "..........orwo..",
      11: "..........orro..",
      12: "...........oo...",
      13: "...........kk...",
      14: ".........okkkko.",
      15: ".........okkrko.",
    },
    {
      ...LOOK_DOWN,
      9: "............oo..",
      10: "...........orwo.",
      11: "...........orro.",
      12: "............oo..",
      13: "............k...",
      14: ".........okkkko.",
      15: ".........okkkko.",
    },
  ],
  hailing: HAND_UP,
  speaking: TALK,
};

const artist: Sprite = {
  colors: {
    s: "oklch(0.78 0.14 145)",
    S: "oklch(0.64 0.13 150)",
    p: "oklch(0.75 0.17 340)", // antenna tips and paint
    c: "oklch(0.8 0.12 210)", // paint
    Y: "oklch(0.88 0.15 95)", // paint
    T: "oklch(0.7 0.1 70)", // the brush handle
  },
  base: [
    "...pp......pp...",
    "....o......o....",
    ".....oooooo.....",
    "....osssssso....",
    "...osssssssso...",
    "...oswosswoso...",
    "...osoossooso...",
    "...opssssssspo..",
    "...osssSSssso...",
    "....osssssso....",
    ".....oooooo.....",
    "......oSSo......",
    "...oooySSyooo...",
    "..ouuuyyyyuuuo..",
    ".ouucuuuuubuuuo.",
    ".oUuuuuYuuuuuUo.",
  ],
  // Painting, with the brush up.
  working: [
    {
      5: "...osossssoso...",
      6: "...oswosswoso...",
      7: ".............oo.",
      8: "............opp.",
      9: "............Tpo.",
      10: "...........T....",
      11: "..........T.....",
      12: ".........sT.....",
    },
    {
      5: "...osossssoso...",
      6: "...oswosswosoc..",
      7: ".............c..",
      8: ".............oo.",
      9: "............oppo",
      10: "...........Tpo..",
      11: "..........T.....",
      12: ".........sT.....",
    },
  ],
  hailing: HAND_UP,
  speaking: [{ 8: "...osssmmssso..." }, { 8: "...osssSSssso..." }],
};

const soundDesigner: Sprite = {
  colors: {
    s: "oklch(0.66 0.09 55)",
    S: "oklch(0.55 0.09 50)",
    h: "oklch(0.27 0.03 40)",
    H: "oklch(0.4 0.05 40)",
    k: "oklch(0.35 0.03 260)", // the headphones
    n: "oklch(0.95 0.02 250)", // music
  },
  base: [
    "......oooo......",
    ".....ohHhho.....",
    "....okkkkkko....",
    "...okhhhhhhko...",
    "...okhhhhhhko...",
    "..okkhsssshkko..",
    "..ouksossoskuo..",
    "..ouksossoskuo..",
    "..okksssssskko..",
    "...ooosSSsooo...",
    "......oooo......",
    ...UNIFORM,
  ],
  // Making sounds: notes rise.
  working: [
    {
      ...LOOK_DOWN,
      1: ".............n..",
      2: ".............nn.",
      3: "...........n.n..",
      4: "..........nn....",
      5: "...........n....",
    },
    {
      ...LOOK_DOWN,
      0: "..............n.",
      1: "..............nn",
      2: "............n.n.",
      3: "..........nn....",
      4: "...........n....",
    },
  ],
  hailing: HAND_UP,
  speaking: TALK,
};

const engineer: Sprite = {
  colors: {
    s: "oklch(0.8 0.07 70)",
    S: "oklch(0.7 0.08 55)",
    h: "oklch(0.66 0.16 45)",
    H: "oklch(0.76 0.15 60)",
    k: "oklch(0.32 0.02 260)", // the goggles' strap
    g: "oklch(0.82 0.1 200)", // their lenses
    G: "oklch(0.7 0.02 250)", // the spanner
    Y: "oklch(0.92 0.16 95)", // a spark
  },
  base: [
    ".....o..o..o....",
    "....oho.ohoho...",
    "....ohhohhhho...",
    "....ohhhhhhho...",
    "....okgkkgkko...",
    "....osssssso....",
    "....osossoso....",
    "....osossoso....",
    "....oSssssSo....",
    ".....osSSso.....",
    "......oooo......",
    ...UNIFORM,
  ],
  // Goggles down, fixing something with a spanner.
  working: [
    {
      4: "....ohhhhhhho...",
      6: "....kggkggkk....",
      7: "....kggkggkk....",
      11: "............Y...",
      12: "...........YGY..",
      13: "............G...",
      14: "...........G....",
      15: "..........sG....",
    },
    {
      4: "....ohhhhhhho...",
      6: "....kggkggkk....",
      7: "....kggkggkk....",
      11: "...........Y.Y..",
      12: "............G...",
      13: "...........YGY..",
      14: "...........G....",
      15: "..........sG....",
    },
  ],
  hailing: HAND_UP,
  speaking: TALK,
};

const tester: Sprite = {
  colors: {
    s: "oklch(0.78 0.02 250)", // metal
    S: "oklch(0.62 0.02 250)",
    c: "oklch(0.85 0.13 195)", // eyes
    l: "oklch(0.78 0.18 145)", // the antenna's light
    g: "oklch(0.88 0.06 200)", // the magnifying glass
    T: "oklch(0.3 0.04 50)", // its handle
  },
  base: [
    ".......ll.......",
    ".......oo.......",
    "...oooooooooo...",
    "...osssssssso...",
    "...osSSssSSso...",
    "...oscwsscwso...",
    "...osccssccso...",
    "...osSSssSSso...",
    "...ossoooosso...",
    "...oSSSSSSSSo...",
    "....oooooooo....",
    ...UNIFORM,
  ],
  // Looking for bugs: one eye looks huge through the glass, which sweeps to and fro.
  working: [
    {
      3: ".........oooo...",
      4: "........occwco..",
      5: ".....SS.occcco..",
      6: ".....cc.occcco..",
      7: "........occcco..",
      8: ".........ooooT..",
      9: ".............T..",
      10: "..............T.",
      11: "..............T.",
    },
    {
      3: "........oooo....",
      4: ".......occwco...",
      5: ".....SSocccco...",
      6: ".....ccocccco...",
      7: ".......occcco...",
      8: "........ooooT...",
      9: "............T...",
      10: ".............T..",
      11: ".............T..",
    },
  ],
  // The antenna's light blinks too.
  hailing: [HAND_UP[0], { ...HAND_UP[1], 0: ".......oo......." }],
  speaking: [{ 8: "...osswwwwsso..." }, { 8: "...ossoooosso..." }],
};

export const SPRITES = {
  storyteller,
  "game-designer": gameDesigner,
  artist,
  "sound-designer": soundDesigner,
  engineer,
  tester,
} as const satisfies Record<string, Sprite>;

export type AvatarKey = keyof typeof SPRITES;

/** The pose for a crew member's state. The legacy `stopped` stands by. */
export function poseOf(status: CrewStatus | "stopped"): Pose {
  switch (status) {
    case "working":
      return "working";
    case "hand_raised":
      return "hailing";
    case "speaking":
      return "speaking";
    default:
      return "idle";
  }
}

/** The picture for one frame of a pose: 16 rows of 16 letters. */
export function frameOf(sprite: Sprite, pose: Pose, frame: 0 | 1): string[] {
  const rows = [...sprite.base];
  if (pose === "idle") return rows;
  const overlay = sprite[pose][frame];
  for (const [at, row] of Object.entries(overlay)) {
    const i = Number(at);
    rows[i] = [...rows[i]!]
      .map((letter, x) => (row[x] && row[x] !== "." ? row[x] : letter))
      .join("");
  }
  return rows;
}

/**
 * A picture as one SVG path per letter, each pixel run a rectangle, so a frame is a handful of
 * elements however much is in it.
 */
export function pathsOf(rows: readonly string[]): Array<{ letter: string; d: string }> {
  const runs = new Map<string, string[]>();
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length;) {
      const letter = row[x]!;
      let end = x + 1;
      while (row[end] === letter) end += 1;
      if (letter !== ".") {
        const list = runs.get(letter) ?? [];
        list.push(`M${x} ${y}h${end - x}v1h${x - end}z`);
        runs.set(letter, list);
      }
      x = end;
    }
  });
  return [...runs].map(([letter, d]) => ({ letter, d: d.join("") }));
}
