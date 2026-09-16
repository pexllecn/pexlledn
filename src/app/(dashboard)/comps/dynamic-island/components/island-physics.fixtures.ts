/**
 * Fit check for `computeMorph`.
 *
 * These are the constants from the original three-view demo, where every
 * number was arrived at by hand. They are the ground truth the derived model
 * has to land on: if a change to the curves in `island-physics.ts` pushes any
 * of these past its tolerance, the model has stopped agreeing with the
 * tuned-by-eye original and the change is wrong.
 *
 * Run with:  npx tsx src/app/(dashboard)/comps/dynamic-island/components/island-physics.fixtures.ts
 */

import { computeMorph, MOTION_PROFILES, type Footprint } from "./island-physics";

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
console.log(
  failed === 0
    ? `\nAll ${rows.length} checks within tolerance.`
    : `\n${failed} of ${rows.length} checks FAILED.`
);

if (failed > 0 && typeof process !== "undefined") process.exit(1);
