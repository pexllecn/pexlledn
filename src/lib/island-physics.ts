/**
 * Island morph physics.
 *
 * The original Dynamic Island demo hard-codes a lookup table keyed by
 * `"<from>-<to>"` — `"timer-ring"` gets `scale: 0.7, y: -7.5, bounce: 0.35`,
 * and so on. That works for three views. It needs 56 entries for eight, and
 * every new activity means hand-tuning another row.
 *
 * So instead of storing the answers, we derive them from the two footprints.
 * The curves below were fitted against the hand-tuned originals and reproduce
 * them to within a few hundredths — see `island-physics.fixtures.ts`, which
 * asserts exactly that. The payoff is that a new variant needs no tuning at
 * all: it is measured on first render and the numbers fall out.
 *
 * Naming follows Apple's two-parameter spring model (WWDC 2018) rather than
 * mass/stiffness/damping:
 *   - `bounce`   — overshoot. 0 is critically damped, higher oscillates.
 *   - `duration` — response, i.e. how fast it reaches the target. Not a
 *                  fixed runtime; a spring settles when the physics says so.
 */

export interface Footprint {
  /** Natural, untransformed content width in px. */
  w: number;
  /** Natural, untransformed content height in px. */
  h: number;
}

export interface MorphSpring {
  type: "spring";
  bounce: number;
  duration: number;
}

export interface MorphExit {
  scaleX: number;
  scaleY: number;
  y: number;
  blur: number;
  bounce: number;
  duration: number;
}

export interface Morph {
  /** Spring for the container's `layout` animation. */
  spring: MorphSpring;
  /** Target the outgoing content animates to as it is absorbed. */
  exit: MorphExit;
  /** Normalised magnitude of the morph, 0-1. Exposed for the readout. */
  travel: number;
}

export interface MotionProfile {
  id: string;
  label: string;
  description: string;
  bounceScale: number;
  durationScale: number;
}

/**
 * The profile for product surfaces, as opposed to the demo.
 *
 * The curves below were fitted to a demo whose hand-tuned constants are
 * deliberately playful — bounce 0.26–0.52 across the range. A surface carrying
 * fourteen real activities wants the same *derivation* but a quieter voice:
 * measured against what the notification island already shipped (damping ratio
 * 0.80–0.83, i.e. bounce 0.17–0.20), this scale reproduces that character at
 * the travel those morphs actually cover, while keeping the part that matters —
 * bounce falling as the morph grows.
 *
 * Resulting band: about 0.23 for a small shape change down to 0.13 for the
 * largest. Restrained, and still physical.
 *
 * `island-physics.fixtures.ts` asserts this band, so a later change to the
 * curves cannot quietly make a product surface bouncy.
 */
export const SYSTEM_PROFILE: MotionProfile = {
  id: "system",
  label: "System",
  description:
    "The restrained profile for product surfaces. Same derivation as the demo, scaled to the voice the notification island already had.",
  bounceScale: 0.48,
  durationScale: 1,
};

/**
 * The motion "variants" — the same physics, different personality. Per the
 * design-engineering rule that motion should match the mood of the thing:
 * a playful component can ring, a dashboard should be crisp.
 *
 * These are the demo's selectable profiles. Product surfaces use
 * SYSTEM_PROFILE above rather than picking from this list.
 */
export const MOTION_PROFILES: MotionProfile[] = [
  {
    id: "fluid",
    label: "Fluid",
    description:
      "The house default. Enough overshoot to read as a physical object, not enough to feel like a toy.",
    bounceScale: 1,
    durationScale: 1,
  },
  {
    id: "snappy",
    label: "Snappy",
    description:
      "Shorter response, half the overshoot. What you'd ship in a dense dashboard where the island is seen constantly.",
    bounceScale: 0.5,
    durationScale: 0.74,
  },
  {
    id: "bouncy",
    label: "Bouncy",
    description:
      "Overshoot pushed past the usual UI ceiling. Legible as a demo, too loud for anything seen more than a few times a day.",
    bounceScale: 1.38,
    durationScale: 1.16,
  },
  {
    id: "critical",
    label: "Critical",
    description:
      "Damping ratio 1.0 — no overshoot at all. Apple's recommended starting point before any bounce is earned by a gesture.",
    bounceScale: 0,
    durationScale: 0.9,
  },
];

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Softened ratio. A raw height ratio over-drives the scale badly — a timer
 * collapsing to a ring is a 0.44x ratio, which looks like the content is
 * being sucked down a drain. The exponent flattens it toward 1 while keeping
 * the direction and the ordering intact.
 */
const soften = (ratio: number, exponent: number) =>
  Number.isFinite(ratio) && ratio > 0 ? Math.pow(ratio, exponent) : 1;

/**
 * A shrinking island pulls its content back as well as in. Without this, a
 * pill that only narrows (ring → idle) leaves its content at full height,
 * which reads as the content being clipped rather than receding. The cap is
 * a floor, not a multiplier, so it never compounds with a large shrink that
 * is already scaling things down.
 */
const ABSORB = 0.93;
const absorb = (scale: number, shrinking: boolean) =>
  shrinking ? Math.min(scale, ABSORB) : scale;

/** Normalised size change between two footprints, saturating around 260px. */
export function travelBetween(from: Footprint, to: Footprint): number {
  const dw = Math.abs(to.w - from.w);
  const dh = Math.abs(to.h - from.h);
  return clamp(Math.hypot(dw, dh) / 260, 0, 1);
}

/**
 * The whole model, in five lines of arithmetic.
 *
 * Note the inverse relationship on bounce: a *small* change gets *more*
 * overshoot, a large one gets less. That is the physically right way round —
 * something light moving a short distance can ring, something heavy crossing
 * the screen should not — and it matches what the hand-tuned table did.
 */
export function computeMorph(
  from: Footprint,
  to: Footprint,
  profile: MotionProfile,
  reducedMotion = false
): Morph {
  const travel = travelBetween(from, to);
  const shrinking = Math.hypot(to.w, to.h) < Math.hypot(from.w, from.h);

  if (reducedMotion) {
    // Not "no animation" — a gentler, non-vestibular equivalent. The opacity
    // crossfade still explains that one thing became another; the movement
    // and the overshoot, which are the parts that cause trouble, are gone.
    return {
      travel,
      spring: { type: "spring", bounce: 0, duration: 0.24 },
      exit: {
        scaleX: 1,
        scaleY: 1,
        y: 0,
        blur: 0,
        bounce: 0,
        duration: 0.18,
      },
    };
  }

  const bounce = clamp((0.52 - 0.26 * travel) * profile.bounceScale, 0, 0.75);
  const duration = clamp((0.38 + 0.2 * travel) * profile.durationScale, 0.16, 0.9);

  return {
    travel,
    spring: { type: "spring", bounce, duration },
    exit: {
      // Per-axis, never a uniform `scale`. Keeping them separate is what stops
      // a wide-but-short view from squashing when it hands off to a
      // tall-but-narrow one.
      //
      // Worth noting: the original writes `scale: 0.9, scaleX: 0.9` together
      // for ring→idle. Framer composes those multiplicatively, so the content
      // actually leaves at 0.81 on x — almost certainly not the intent, which
      // reads as "0.9 in both directions". Setting only scaleX/scaleY removes
      // the ambiguity.
      scaleX: clamp(absorb(soften(to.w / from.w, 0.35), shrinking), 0.7, 1.45),
      scaleY: clamp(absorb(soften(to.h / from.h, 0.45), shrinking), 0.66, 1.45),
      // The outgoing content drifts toward where the new centre will be, so
      // it reads as being absorbed rather than dropped.
      y: clamp((to.h - from.h) * 0.21, -22, 22),
      // Blur bridges the two states. Without it you see two distinct objects
      // overlapping; with it the eye reads one thing changing shape. Scales
      // with the size of the change, because a small morph needs less help.
      blur: clamp(2.5 + 3.5 * travel, 2.5, 6),
      bounce,
      duration,
    },
  };
}
