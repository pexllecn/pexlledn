/**
 * One motion vocabulary, shared by every screen that follows the Apple design
 * pass. Importing from here rather than hand-tuning per page is what keeps a
 * card on the dashboard, a column on the board and a row in the mail list
 * feeling like parts of the same machine.
 *
 * The split that matters: UI that simply appears moves on a short, decelerating
 * TWEEN, while anything the finger is pushing around moves on a SPRING. Apple
 * is consistent about this, and it is the difference between an interface that
 * feels crisp and one that feels like it is wading. Springs on passive entrances
 * are the single most common way a design ends up feeling sluggish.
 */

/** Apple's standard decelerate. Things arrive slowing down, never bouncing. */
export const EASE_OUT = [0.32, 0.72, 0, 1] as const;

/** Symmetric, for things that move between two states while staying visible. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** Leaving is faster than arriving, and accelerates away. */
export const EASE_IN = [0.4, 0, 1, 1] as const;

/**
 * Springs are written the way Apple writes them — `response` (how long one
 * oscillation takes) and `bounce` (0 critically damped, higher overshoots) —
 * and converted to what framer-motion wants:
 *
 *   stiffness = (2pi / response)^2 * mass
 *   damping   = 4pi * (1 - bounce) * mass / response
 *
 * `restDelta` is deliberately loose. Waiting for a spring to settle within a
 * hundredth of a pixel adds a tail nobody can see but everybody feels.
 */
export const spring = (
  response: number,
  bounce = 0.2,
  { mass = 1, restDelta = 0.01, restSpeed = 0.05 } = {},
) => ({
  type: "spring" as const,
  stiffness: ((2 * Math.PI) / response) ** 2 * mass,
  damping: (4 * Math.PI * (1 - bounce) * mass) / response,
  mass,
  restDelta,
  restSpeed,
});

/** Direct manipulation: drag handles, cards under the cursor, sheets. */
export const SPRING_GRAB = spring(0.3, 0.16);

/** Press feedback. Fast enough to feel like the surface itself responds. */
export const SPRING_PRESS = spring(0.22, 0.1);

/** Panels and sheets that slide in from an edge. */
export const SPRING_PANEL = spring(0.42, 0.14);

/** Geometry in pixels needs a coarser rest threshold than a 0..1 transform. */
export const SPRING_LAYOUT = spring(0.38, 0.12, {
  restDelta: 0.4,
  restSpeed: 1,
});

/* -------------------------------------------------------------------------- */
/*  Entrance variants                                                         */
/* -------------------------------------------------------------------------- */

/** The house entrance: rise a little, resolve. Used for cards and sections. */
export const rise = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE_OUT },
  },
};

/** For content that replaces other content in place, rather than arriving. */
export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.28, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: EASE_IN } },
};

/** Modal-ish content: settles into place from very slightly small. */
export const zoom = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.34, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.18, ease: EASE_IN },
  },
};

/**
 * Lists cascade rather than landing at once. Kept short on purpose: past about
 * 60ms per item the stagger stops reading as physics and starts reading as lag,
 * and `delayChildren` covers the frame the parent spends laying itself out.
 */
export const stagger = (each = 0.035, delay = 0.04) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: each, delayChildren: delay },
  },
});

/** Cap on how long a cascade may run, so long lists do not crawl in. */
export const staggerIndex = (index: number, each = 0.035, max = 8) =>
  Math.min(index, max) * each;

/* -------------------------------------------------------------------------- */
/*  Interaction                                                               */
/* -------------------------------------------------------------------------- */

/** A row or tile that lifts to the cursor. */
export const lift = {
  whileHover: { y: -3 },
  whileTap: { scale: 0.985 },
  transition: SPRING_PRESS,
};

/** A control that only depresses — buttons, toggles, segmented items. */
export const press = {
  whileTap: { scale: 0.96 },
  transition: SPRING_PRESS,
};
