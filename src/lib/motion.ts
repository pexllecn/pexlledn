/**
 * The app's motion vocabulary.
 *
 * Single source of truth, in the same spirit as `--radius`: components state
 * *what kind* of motion they want, never the raw numbers, so the feel of the
 * whole product can be tuned from one place.
 *
 * The CSS half of this lives in `globals.css` as `--ease-*` / `--duration-*`
 * custom properties, and is surfaced as Tailwind utilities (`ease-fluid`,
 * `duration-dropdown`, …). The values are kept identical on both sides — a
 * Framer spring and a CSS transition on the same interaction should not
 * disagree about what "fluid" means.
 */

/**
 * Cubic-bézier control points, as Framer Motion wants them.
 *
 * The built-in CSS easings are too weak to read as intentional — `ease-out`
 * barely differs from linear over a 200ms move. These are the stronger
 * variants.
 */
export const EASING = {
  /** Entering, exiting, and most UI feedback. Starts fast, so it feels answered. */
  out: [0.23, 1, 0.32, 1],
  /** Something already on screen moving to a new place. */
  inOut: [0.77, 0, 0.175, 1],
  /** Sheets and drawers. The iOS curve, by way of Ionic. */
  drawer: [0.32, 0.72, 0, 1],
} as const;

/** The same curves as CSS strings, for inline styles and template literals. */
export const EASING_CSS = {
  out: "cubic-bezier(0.23, 1, 0.32, 1)",
  inOut: "cubic-bezier(0.77, 0, 0.175, 1)",
  drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
} as const;

/**
 * Durations in seconds, named for the thing rather than the number.
 *
 * The ceiling for interface motion is about 300ms — past that an interaction
 * reads as sluggish however good the curve is. `drawer` is the one deliberate
 * exception: it covers much more distance, and the extra time is what stops
 * it from feeling thrown.
 */
export const DURATION = {
  /** Button and pressable feedback. */
  press: 0.16,
  /** Tooltips and small popovers. */
  tooltip: 0.15,
  /** Dropdowns, selects, context menus. */
  dropdown: 0.2,
  /** Dialogs and modals. */
  modal: 0.3,
  /** Sheets and drawers. */
  drawer: 0.4,
} as const;

export interface Spring {
  type: "spring";
  bounce: number;
  duration: number;
}

/**
 * Springs, in Apple's two-parameter form rather than mass/stiffness/damping.
 *
 *   - `bounce`   — overshoot. 0 is critically damped.
 *   - `duration` — response: how fast it reaches the target, not how long it
 *                  runs. A spring settles when the physics says so.
 *
 * `fluid` is the default for a reason: bounce belongs on motion a gesture
 * actually threw. Overshoot on a menu that merely faded in reads as decoration,
 * and it is seen too often to stay charming.
 */
export const SPRING = {
  /** The house default. Enough life to read as physical, not enough to distract. */
  fluid: { type: "spring", bounce: 0.2, duration: 0.4 },
  /** Frequently-seen UI. Crisper, barely any overshoot. */
  snappy: { type: "spring", bounce: 0.1, duration: 0.28 },
  /** Earned by a flick, a drag release, or a rare moment of success. */
  playful: { type: "spring", bounce: 0.38, duration: 0.5 },
  /** Critically damped. No overshoot at all — the safe starting point. */
  critical: { type: "spring", bounce: 0, duration: 0.35 },
} as const satisfies Record<string, Spring>;

/**
 * Reduced motion is gentler, not absent.
 *
 * Opacity and colour changes survive, because they are what explain that one
 * state became another. What goes is travel, overshoot and blur — the parts
 * that cause trouble for people who asked not to be moved.
 */
export const REDUCED_SPRING: Spring = { type: "spring", bounce: 0, duration: 0.2 };

/** Picks the right spring for the current motion preference. */
export function spring(name: keyof typeof SPRING, reducedMotion?: boolean | null): Spring {
  return reducedMotion ? REDUCED_SPRING : SPRING[name];
}
