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
import { computeMorph, SYSTEM_PROFILE } from "@/lib/island-physics";

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

/**
 * The shell spring is derived from the two sizes it is travelling between,
 * not chosen from a pair of constants.
 *
 * The previous version had exactly two springs and picked between them on
 * `expanded`, so idle→minimal (a 40px nudge) and idle→ultra (a 324px unfolding)
 * were animated identically. What actually differs between those is not whether
 * the island is opening — it is how far it has to go.
 *
 * `computeMorph` reads that distance off ISLAND_SIZES and falls out with a
 * bounce that decreases as the morph grows and a response that lengthens. The
 * SYSTEM_PROFILE scale keeps the result inside the voice this island already
 * had (bounce ~0.17–0.20) rather than the demo's playful range.
 *
 * `restDelta`/`restSpeed` are kept: they end the spring once it is visually
 * settled instead of letting it creep, which matters on width and height.
 */
const REST = { restDelta: 0.08, restSpeed: 0.08 } as const;

function shellSpring(from: SizeSpec, to: SizeSpec, reduceMotion: boolean) {
  const { spring } = computeMorph(
    { w: from.width, h: from.height },
    { w: to.width, h: to.height },
    SYSTEM_PROFILE,
    reduceMotion,
  );
  return { ...spring, ...REST };
}

// Keep the physical black shell perfectly sharp. Blurring the shell itself
// expands its painted bounds and can make the pill look horizontally stretched
// while its width is springing. Only the pixels inside use a focus envelope.
const CONTENT_FOCUS_IN = [
  "blur(8px)",
  "blur(1.25px)",
  "blur(0px)",
  "blur(0.6px)",
  "blur(0px)",
];

const CONTENT_FOCUS_OUT = ["blur(0px)", "blur(0.8px)", "blur(7px)"];

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
/*  Content transition helper                                                 */
/* -------------------------------------------------------------------------- */

const contentMotion = {
  initial: (opening: boolean) => ({
    opacity: 0,
    filter: "blur(2.5px)",
    scale: opening ? 0.965 : 1.025,
    y: opening ? -2 : 1,
  }),
  animate: {
    opacity: 1,

    // Focus quickly, soften once during the spring overshoot, then finish
    // completely sharp. The outer black shell itself is never blurred.
    filter: CONTENT_FOCUS_IN,

    scale: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.11, delay: 0.035 },
      filter: { duration: 0.14, delay: 0.02, ease: [0.2, 0.8, 0.2, 1] },
      scale: {
        type: "spring" as const,
        stiffness: 650,
        damping: 38,
        mass: 0.55,
      },
      y: { type: "spring" as const, stiffness: 650, damping: 38, mass: 0.55 },
    },
  },
  exit: (opening: boolean) => ({
    opacity: 0,

    // Defocus outgoing pixels immediately before the content disappears.
    filter: CONTENT_FOCUS_OUT,

    scale: opening ? 1.018 : 0.98,
    y: opening ? 1 : -1,

    transition: {
      opacity: {
        duration: 0.075,
        ease: "easeOut" as const,
      },

      filter: {
        duration: 0.105,
        times: [0, 0.24, 1],
        ease: [0.4, 0, 1, 1],
      },

      scale: {
        duration: 0.09,
        ease: "easeOut" as const,
      },

      y: {
        duration: 0.09,
        ease: "easeOut" as const,
      },
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

  /**
   * The size the shell is travelling *from*. An entering island comes from
   * idle; afterwards it comes from wherever it last settled. Holding this in a
   * ref rather than state keeps it out of the render cycle — it only ever feeds
   * the next transition, and writing it during render would be a second source
   * of truth for something the DOM already knows.
   */
  const prevSpecRef = useRef<SizeSpec>(ISLAND_SIZES.idle);
  const morphSpring = shellSpring(prevSpecRef.current, spec, Boolean(reduceMotion));
  const exitSpring = shellSpring(spec, ISLAND_SIZES.idle, Boolean(reduceMotion));

  useEffect(() => {
    prevSpecRef.current = spec;
  }, [spec]);

  const toggle = useCallback(() => {
    if (!canExpand) return;

    // A deliberate tap takes over from the auto-dismiss schedule.
    clearDismissTimer();
    setExpanded((current) => !current);
  }, [canExpand, clearDismissTimer]);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={reduceMotion ? { duration: 0.12 } : morphSpring}
    >
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
                scaleX: 0.82,
                scaleY: 0.68,
                y: -9,
                opacity: 0,
              }}
              animate={{
                width: spec.width,
                height: spec.height,
                borderRadius: spec.radius,
                scaleX: 1,
                scaleY: 1,
                y: 0,
                opacity: 1,
                transition: reduceMotion ? { duration: 0.12 } : morphSpring,
              }}
              exit={{
                width: ISLAND_SIZES.idle.width,
                height: ISLAND_SIZES.idle.height,
                borderRadius: ISLAND_SIZES.idle.radius,
                scaleX: 0.86,
                scaleY: 0.72,
                y: -8,
                opacity: 0,
                transition: reduceMotion
                  ? { duration: 0.1 }
                  : { ...exitSpring, opacity: { duration: 0.1 } },
              }}
              whileTap={
                canExpand && !reduceMotion
                  ? { scaleX: 0.985, scaleY: 0.965 }
                  : undefined
              }
              onClick={toggle}
              role="status"
              aria-live="polite"
              aria-expanded={canExpand ? expanded : undefined}
              className={cn(
                "pointer-events-auto relative overflow-hidden bg-black text-white",
                "shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
                "ring-1 ring-white/[0.06]",
                "select-none",
                canExpand && "cursor-pointer",
              )}
              style={{
                willChange: "width, height, transform",
                transformOrigin: "50% 0%",
                WebkitFontSmoothing: "antialiased",
                transform: "translateZ(0)",
              }}
            >
              {/* Subtle top gloss, like the physical hardware surface. */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent" />

              <AnimatePresence
                mode="sync"
                initial={false}
                custom={showExpanded}
              >
                {showCompact ? (
                  <motion.div
                    key={`${activity.id}-compact`}
                    custom={showExpanded}
                    variants={contentMotion}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0"
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
                    className="absolute inset-0 p-4"
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
