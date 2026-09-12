"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type IslandSize =
  | "idle"
  | "minimal"
  | "compact"
  | "long"
  | "default"
  | "expanded"
  | "tall"
  | "ultra";

interface SizeSpec {
  width: number;
  height: number;
  radius: number;
}

export const ISLAND_SIZES: Record<IslandSize, SizeSpec> = {
  idle: { width: 130, height: 36, radius: 22 },
  minimal: { width: 90, height: 36, radius: 22 },
  compact: { width: 236, height: 37, radius: 22 },
  long: { width: 320, height: 44, radius: 22 },
  default: { width: 354, height: 62, radius: 30 },
  expanded: { width: 360, height: 168, radius: 38 },
  tall: { width: 366, height: 210, radius: 42 },
  ultra: { width: 372, height: 252, radius: 44 },
};

/* -------------------------------------------------------------------------- */
/*  Physics                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Apple describes its springs as `response` (how long one oscillation takes)
 * and `bounce` (0 = critically damped, higher = more overshoot), which is a far
 * more physical way to tune motion than raw stiffness/damping. This converts
 * that notation into the coefficients framer-motion wants:
 *
 *   stiffness = (2pi / response)^2 * mass
 *   damping   = 4pi * dampingFraction * mass / response     (dampingFraction = 1 - bounce)
 */
const spring = (
  response: number,
  bounce: number,
  { mass = 1, restDelta = 0.008, restSpeed = 0.04 } = {},
) => ({
  type: "spring" as const,
  stiffness: ((2 * Math.PI) / response) ** 2 * mass,
  damping: (4 * Math.PI * (1 - bounce) * mass) / response,
  mass,
  restDelta,
  restSpeed,
});

// Geometry is measured in pixels, so it needs a far coarser rest threshold than
// a 0..1 transform. Settling at a twentieth of a pixel is invisible, and not
// waiting for it is the difference between a crisp stop and a lingering crawl.
const PX_REST = { restDelta: 0.05, restSpeed: 0.2 };

// Growing has more travel and more bounce than shrinking, exactly like the real
// island: it springs open and snaps closed.
const EXPAND_SPRING = spring(0.38, 0.28, { mass: 1, ...PX_REST });
const COLLAPSE_SPRING = spring(0.34, 0.18, { mass: 1, ...PX_REST });

// Swapping between two compact activities is a shorter, tighter move.
const MORPH_SPRING = spring(0.36, 0.24, { mass: 1, ...PX_REST });

// The squash applied to the shell itself while it travels.
const SQUASH_SPRING = spring(0.34, 0.26);

/* -------------------------------------------------------------------------- */
/*  Focus envelopes                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Every envelope below is a keyframe list plus its own timing curve, so the
 * shape of the motion lives entirely in these numbers. That means the easing
 * BETWEEN keyframes has to stay gentle: a sharp ease-out re-times each segment
 * to finish almost as soon as it starts, which silently flattens the whole
 * envelope into a single snap. Shape in the keyframes, smoothing in the ease.
 */
const SEGMENT_EASE = "easeInOut" as const;

// Content arrives out of focus and pulls sharp, overshooting a touch into a
// second micro-defocus while the shell is still springing. Reading the two
// arrays top to bottom is reading exactly what the eye sees.
const FOCUS_IN = [
  "blur(16px)",
  "blur(9px)",
  "blur(3.5px)",
  "blur(0.6px)",
  "blur(0px)",
  "blur(0.45px)",
  "blur(0px)",
];

const FOCUS_IN_TIMES = [0, 0.18, 0.36, 0.55, 0.7, 0.85, 1];

// Leaving is the same move reversed and compressed. It has to bite early:
// pixels that are already transparent cannot be seen going soft, so the blur
// leads the fade rather than trailing it.
const FOCUS_OUT = ["blur(0px)", "blur(4px)", "blur(9px)", "blur(15px)"];

const FOCUS_OUT_TIMES = [0, 0.32, 0.66, 1];

// The shell materialises out of, and dissolves back into, the notch. The
// midpoint is held deliberately high: an exponential decay straight to sharp
// reads as a rendering glitch, a held defocus reads as depth of field.
const SHELL_FOCUS_IN = ["blur(10px)", "blur(6px)", "blur(1.5px)", "blur(0px)"];
const SHELL_FOCUS_TIMES = [0, 0.3, 0.62, 1];

const SHELL_FOCUS_OUT = ["blur(0px)", "blur(2px)", "blur(6px)", "blur(12px)"];
const SHELL_FOCUS_OUT_TIMES = [0, 0.28, 0.6, 1];

// Apple's own focus-pull easing: leave fast, arrive slow.
const FOCUS_EASE = [0.16, 1, 0.3, 1] as const;
const DEFOCUS_EASE = [0.55, 0, 1, 0.45] as const;

/* -------------------------------------------------------------------------- */
/*  Presentation of a single activity                                         */
/* -------------------------------------------------------------------------- */

export interface IslandActivity {
  id: string;

  /** Collapsed shape. */
  size?: IslandSize;

  /** Shape when the island is tapped open. */
  expandedSize?: IslandSize;

  /** Left blob of the compact presentation. */
  leading?: React.ReactNode;

  /** Right blob of the compact presentation. */
  trailing?: React.ReactNode;

  /** Center strip of the compact presentation. */
  center?: React.ReactNode;

  /** Full collapsed content (overrides leading/center/trailing layout). */
  collapsed?: React.ReactNode;

  /** Rich content revealed when expanded. */
  expanded?: React.ReactNode;

  /** Auto-open on arrival. */
  autoExpand?: boolean;

  /** ms before the island retracts. 0 keeps it until dismissed. */
  duration?: number;
}

/* -------------------------------------------------------------------------- */
/*  Content transition                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Outgoing and incoming content overlap deliberately, but not symmetrically.
 * The incoming layer is held back a couple of frames so the old pixels get to
 * go soft before the new ones start resolving underneath them. Without that
 * offset both layers sit sharp on top of each other mid-swap and the island
 * looks like it is double-printing rather than exchanging its contents.
 */
const contentMotion = {
  initial: (opening: boolean) => ({
    opacity: 0,
    filter: FOCUS_IN[0],
    scale: opening ? 0.9 : 1.06,
    y: opening ? -5 : 3,
  }),

  animate: {
    opacity: 1,
    filter: FOCUS_IN,
    scale: 1,
    y: 0,

    transition: {
      // Deliberately slower than the blur so the content is still visible
      // while it is resolving. Fading in faster than it focuses would hide
      // the entire focus pull behind a transparent layer.
      opacity: { duration: 0.3, delay: 0.05, ease: "easeOut" as const },

      filter: {
        duration: 0.46,
        delay: 0.04,
        times: FOCUS_IN_TIMES,
        ease: SEGMENT_EASE,
      },

      scale: { ...spring(0.4, 0.24), delay: 0.03 },
      y: { ...spring(0.4, 0.24), delay: 0.03 },
    },
  },

  exit: (opening: boolean) => ({
    opacity: 0,
    filter: FOCUS_OUT,
    scale: opening ? 1.07 : 0.92,
    y: opening ? 4 : -4,

    transition: {
      // Hold opacity up through the first half of the defocus, then drop.
      opacity: { duration: 0.26, ease: [0.7, 0, 0.84, 0.35] as const },

      filter: {
        duration: 0.28,
        times: FOCUS_OUT_TIMES,
        ease: SEGMENT_EASE,
      },

      scale: { duration: 0.26, ease: DEFOCUS_EASE },
      y: { duration: 0.26, ease: DEFOCUS_EASE },
    },
  }),
};

interface DynamicIslandProps {
  activity: IslandActivity | null;
  onDismiss: () => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  activity,
  onDismiss,
}) => {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const islandRef = useRef<HTMLDivElement>(null);

  const clearDismissTimer = useCallback(() => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
  }, []);

  // Reset and arm the dismissal timer whenever a new activity arrives.
  useEffect(() => {
    clearDismissTimer();

    if (!activity) return;

    setExpanded(Boolean(activity.autoExpand));

    const duration = activity.duration ?? 4200;

    if (duration > 0) {
      dismissTimer.current = setTimeout(onDismiss, duration);
    }

    return clearDismissTimer;
  }, [activity, onDismiss, clearDismissTimer]);

  // An outside tap backs out one presentation level at a time: expanded live
  // activities collapse first, and only a later outside tap dismisses the
  // compact activity.
  useEffect(() => {
    if (!activity) return;

    const handlePointer = (e: PointerEvent) => {
      if (islandRef.current && islandRef.current.contains(e.target as Node)) {
        return;
      }

      clearDismissTimer();

      if (expanded && activity.expanded) {
        setExpanded(false);
        return;
      }

      onDismiss();
    };

    // Defer so the click that opened the island doesn't immediately close it.
    const listenerTimer = setTimeout(
      () => document.addEventListener("pointerdown", handlePointer),
      0,
    );

    return () => {
      clearTimeout(listenerTimer);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [activity, expanded, onDismiss, clearDismissTimer]);

  const canExpand = Boolean(activity?.expanded);
  const showExpanded = expanded && canExpand;
  const showCompact = !showExpanded;
  const collapsedSize = activity?.size ?? "compact";
  const openSize = activity?.expandedSize ?? "expanded";

  const spec = ISLAND_SIZES[showExpanded ? openSize : collapsedSize];

  // Growing and shrinking are different physical events and get different
  // springs. Comparing against the previous frame's area is what tells them
  // apart, including when one activity morphs straight into another.
  const previousArea = useRef(spec.width * spec.height);
  const area = spec.width * spec.height;
  const growing = area >= previousArea.current;

  useEffect(() => {
    previousArea.current = area;
  }, [area]);

  const geometrySpring = showExpanded
    ? EXPAND_SPRING
    : growing
      ? MORPH_SPRING
      : COLLAPSE_SPRING;

  const shellTransition = reduceMotion
    ? { duration: 0.12 }
    : {
        width: geometrySpring,
        height: geometrySpring,
        borderRadius: geometrySpring,
        scaleX: SQUASH_SPRING,
        scaleY: SQUASH_SPRING,
        y: SQUASH_SPRING,
        opacity: { duration: 0.18, ease: FOCUS_EASE },

        // Spread across the same window the geometry spring takes to settle,
        // and hold the midpoint so the defocus is actually legible instead of
        // collapsing to sharp inside the first two frames.
        filter: {
          duration: 0.4,
          times: SHELL_FOCUS_TIMES,
          ease: SEGMENT_EASE,
        },
      };

  const toggle = useCallback(() => {
    if (!canExpand) return;

    // A deliberate tap takes over from the auto-dismiss schedule.
    clearDismissTimer();
    setExpanded((current) => !current);
  }, [canExpand, clearDismissTimer]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="pointer-events-none fixed inset-x-0 top-3 z-[100000] flex justify-center">
        <AnimatePresence initial={false}>
          {activity && (
            <motion.div
              ref={islandRef}
              key="island"
              initial={{
                width: ISLAND_SIZES.idle.width,
                height: ISLAND_SIZES.idle.height,
                borderRadius: ISLAND_SIZES.idle.radius,

                // Squashed flat and out of focus, as if it were still part of
                // the notch and had not resolved into an object yet.
                scaleX: 0.7,
                scaleY: 0.52,
                y: -12,
                opacity: 0,
                filter: reduceMotion ? "blur(0px)" : SHELL_FOCUS_IN[0],
              }}
              animate={{
                width: spec.width,
                height: spec.height,
                borderRadius: spec.radius,
                scaleX: 1,
                scaleY: 1,
                y: 0,
                opacity: 1,
                filter: reduceMotion ? "blur(0px)" : SHELL_FOCUS_IN,
              }}
              exit={{
                width: ISLAND_SIZES.idle.width,
                height: ISLAND_SIZES.idle.height,
                borderRadius: ISLAND_SIZES.idle.radius,
                scaleX: 0.76,
                scaleY: 0.58,
                y: -11,
                opacity: 0,
                filter: reduceMotion ? "blur(0px)" : SHELL_FOCUS_OUT,
                transition: reduceMotion
                  ? { duration: 0.1 }
                  : {
                      ...COLLAPSE_SPRING,
                      opacity: { duration: 0.19, ease: DEFOCUS_EASE },
                      filter: {
                        duration: 0.26,
                        times: SHELL_FOCUS_OUT_TIMES,
                        ease: SEGMENT_EASE,
                      },
                    },
              }}
              transition={shellTransition}
              whileTap={
                canExpand && !reduceMotion
                  ? { scaleX: 0.975, scaleY: 0.945 }
                  : undefined
              }
              onClick={toggle}
              role="status"
              aria-live="polite"
              aria-expanded={canExpand ? expanded : undefined}
              className={cn(
                "pointer-events-auto relative overflow-hidden bg-black text-white",
                "shadow-[0_10px_34px_rgba(0,0,0,0.42)]",
                "ring-1 ring-white/[0.06]",
                "select-none",
                canExpand && "cursor-pointer",
              )}
              style={{
                willChange: "width, height, transform, filter",
                transformOrigin: "50% 0%",
                WebkitFontSmoothing: "antialiased",

                // The shell resizes every frame. Containment keeps that work
                // from escaping into the rest of the page's layout.
                contain: "layout paint",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            >
              {/* Subtle top gloss, like the physical hardware surface. */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent" />

              {/*
                No `initial={false}` here. This presence mounts at the same
                moment as the shell, so suppressing its first render would skip
                the focus pull on the very appearance it matters most for.
              */}
              <AnimatePresence mode="sync" custom={showExpanded}>
                {showCompact ? (
                  <motion.div
                    key={`${activity.id}-compact`}
                    custom={showExpanded}
                    variants={contentMotion}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    data-island-content="compact"
                    className="absolute inset-0"
                    style={{ willChange: "filter, transform, opacity" }}
                  >
                    {activity.collapsed ?? (
                      <div className="flex h-full w-full items-center justify-between gap-2 px-3.5">
                        <div className="flex min-w-0 items-center">
                          {activity.leading}
                        </div>

                        {activity.center && (
                          <div className="flex min-w-0 flex-1 items-center justify-center">
                            {activity.center}
                          </div>
                        )}

                        <div className="flex min-w-0 items-center justify-end">
                          {activity.trailing}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${activity.id}-expanded`}
                    custom={showExpanded}
                    variants={contentMotion}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    data-island-content="expanded"
                    className="absolute inset-0 p-4"
                    style={{ willChange: "filter, transform, opacity" }}
                  >
                    {activity.expanded}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};

/* -------------------------------------------------------------------------- */
/*  Manager and context                                                       */
/* -------------------------------------------------------------------------- */

interface IslandContextValue {
  show: (activity: IslandActivity) => void;
  dismiss: () => void;
}

const IslandContext = createContext<IslandContextValue | null>(null);

export const useDynamicIsland = () => {
  const ctx = useContext(IslandContext);
  if (!ctx)
    throw new Error(
      "useDynamicIsland must be used within DynamicIslandProvider",
    );
  return ctx;
};

export const DynamicIslandProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activity, setActivity] = useState<IslandActivity | null>(null);

  const show = useCallback((next: IslandActivity) => {
    // Keep the physical shell mounted between activities. iOS morphs directly
    // from the current geometry instead of blinking back through the idle pill.
    setActivity({ ...next, id: `${next.id}-${Date.now()}` });
  }, []);

  const dismiss = useCallback(() => {
    setActivity(null);
  }, []);

  const value = useMemo(
    () => ({
      show,
      dismiss,
    }),
    [show, dismiss],
  );

  return (
    <IslandContext.Provider value={value}>
      {children}

      <DynamicIsland activity={activity} onDismiss={dismiss} />
    </IslandContext.Provider>
  );
};

export default DynamicIsland;
