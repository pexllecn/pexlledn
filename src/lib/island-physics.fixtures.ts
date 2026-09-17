/**
 * Fit check for `computeMorph`.
 *
 * These are the constants from the original three-view demo, where every
 * number was arrived at by hand. They are the ground truth the derived model
 * has to land on: if a change to the curves in `island-physics.ts` pushes any
 * of these past its tolerance, the model has stopped agreeing with the
 * tuned-by-eye original and the change is wrong.
 *
 * Run with:  npx tsx src/lib/island-physics.fixtures.ts
 */

import {
  computeMorph,
  MOTION_PROFILES,
  SYSTEM_PROFILE,
  type Footprint,
} from "./island-physics";

/** Natural footprints of the three original views, as rendered. */
const FOOTPRINTS: Record<string, Footprint> = {
  idle: { w: 100, h: 28 },
  ring: { w: 128, h: 28 },
  timer: { w: 284, h: 64 },
};

interface Expectation {
  from: string;
  to: string;
  bounce: number;
  scaleX?: number;
  scaleY?: number;
  y?: number;
}

/**
 * Straight from BOUNCE_VARIANTS / ANIMATION_VARIANTS in the original file.
 *
 * One reading call: ring→idle is written `scale: 0.9, scaleX: 0.9`, which
 * Framer composes to 0.81 on x. Taken at face value that is an odd target —
 * the redundancy reads as "0.9 in both directions", so that is what is
 * asserted here. Every other row is unambiguous.
 */
const EXPECTED: Expectation[] = [
  { from: "ring", to: "idle", bounce: 0.5, scaleX: 0.9, scaleY: 0.9 },
  { from: "idle", to: "ring", bounce: 0.5 },
  { from: "timer", to: "ring", bounce: 0.35, scaleX: 0.7, scaleY: 0.7, y: -7.5 },
  { from: "ring", to: "timer", bounce: 0.35, scaleX: 1.4, scaleY: 1.4, y: 7.5 },
  { from: "timer", to: "idle", bounce: 0.3, scaleX: 0.7, scaleY: 0.7, y: -7.5 },
  { from: "idle", to: "timer", bounce: 0.3 },
];

const TOLERANCE = { bounce: 0.05, scaleX: 0.08, scaleY: 0.08, y: 1.5 };

const fluid = MOTION_PROFILES.find((p) => p.id === "fluid")!;

let failed = 0;
const rows: string[] = [];

for (const e of EXPECTED) {
  const m = computeMorph(FOOTPRINTS[e.from], FOOTPRINTS[e.to], fluid);
  const actual: Record<string, number> = {
    bounce: m.spring.bounce,
    scaleX: m.exit.scaleX,
    scaleY: m.exit.scaleY,
    y: m.exit.y,
  };

  for (const key of ["bounce", "scaleX", "scaleY", "y"] as const) {
    const want = e[key];
    if (want === undefined) continue;
    const got = actual[key];
    const delta = Math.abs(got - want);
    const ok = delta <= TOLERANCE[key];
    if (!ok) failed++;
    rows.push(
      `${ok ? "pass" : "FAIL"}  ${e.from}→${e.to}  ${key.padEnd(6)} ` +
        `hand-tuned ${String(want).padEnd(6)} derived ${got.toFixed(3).padEnd(7)} Δ ${delta.toFixed(3)}`
    );
  }
}

console.log(rows.join("\n"));
/* -------------------------------------------------------------------------
   The product surface must stay in its own voice.

   The curves above are fitted to a demo whose constants are deliberately
   playful. The notification island is not a demo: before it moved onto this
   model it shipped damping ratios of 0.80–0.83, i.e. bounce 0.17–0.20. The
   band below is that character plus the travel-dependence the model adds.

   This is the guard that stops a later tweak to the demo curves from quietly
   making fourteen real activities bouncy.
   ------------------------------------------------------------------------- */

const ISLAND_SIZES: Record<string, Footprint> = {
  idle: { w: 130, h: 36 },
  minimal: { w: 90, h: 36 },
  compact: { w: 236, h: 37 },
  long: { w: 320, h: 44 },
  default: { w: 354, h: 62 },
  expanded: { w: 360, h: 168 },
  tall: { w: 366, h: 210 },
  ultra: { w: 372, h: 252 },
};

const SYSTEM_BAND = { min: 0.1, max: 0.25 };

const systemPairs: [string, string][] = [
  ["idle", "minimal"],
  ["idle", "compact"],
  ["compact", "default"],
  ["default", "expanded"],
  ["compact", "tall"],
  ["idle", "ultra"],
];

console.log("\nSystem profile — shipped character band 0.10–0.25:");
let systemFailed = 0;
let previousBounce = Infinity;
let monotonic = true;

// Sorted by travel, because that is the axis the claim is about: two morphs
// that cover the same distance should land on the same bounce, and the list is
// authored by readability rather than by distance.
const byTravel = systemPairs
  .map(([from, to]) => ({
    from,
    to,
    morph: computeMorph(ISLAND_SIZES[from], ISLAND_SIZES[to], SYSTEM_PROFILE),
  }))
  .sort((a, b) => a.morph.travel - b.morph.travel);

for (const { from, to, morph: m } of byTravel) {
  const b = m.spring.bounce;
  const inBand = b >= SYSTEM_BAND.min && b <= SYSTEM_BAND.max;
  if (!inBand) systemFailed++;
  if (b > previousBounce + 1e-9) monotonic = false;
  previousBounce = b;
  console.log(
    `${inBand ? "pass" : "FAIL"}  ${from.padEnd(8)}→ ${to.padEnd(9)} ` +
      `travel ${m.travel.toFixed(2)}  bounce ${b.toFixed(3)}  response ${m.spring.duration.toFixed(2)}s`
  );
}

// The whole point of the model: a bigger shape change settles harder.
if (!monotonic) {
  systemFailed++;
  console.log("FAIL  bounce does not decrease monotonically as travel grows");
} else {
  console.log("pass  bounce decreases monotonically as travel grows");
}

failed += systemFailed;

console.log(
  failed === 0
    ? `\nAll ${rows.length + systemPairs.length + 1} checks within tolerance.`
    : `\n${failed} checks FAILED.`
);

if (failed > 0 && typeof process !== "undefined") process.exit(1);
