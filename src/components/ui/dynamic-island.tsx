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

/* -------------------------------------------------------------------------- */
/*  Size presets                                                              */
/*                                                                            */
/*  The real Dynamic Island morphs between a handful of discrete shapes.      */
/*  We model each shape as a fixed width / height / corner radius and let     */
/*  Framer Motion spring between them, exactly like iOS.                      */
/* -------------------------------------------------------------------------- */

export type IslandSize =
  | "idle" // the resting pill (mimics the notch)
  | "minimal" // tiny circle-ish pill (single glyph)
  | "compact" // leading + trailing blobs with a gap
  | "long" // a wider single line
  | "default" // one-line notification
  | "expanded" // rich card
  | "tall" // taller rich card
  | "ultra"; // full live-activity card

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
/*  Springs                                                                    */
/* -------------------------------------------------------------------------- */

// The signature "gooey" morph of the shell.
const SHELL_SPRING = {
  type: "spring" as const,
  stiffness: 510,
  damping: 34,
  mass: 0.82,
  restDelta: 0.08,
  restSpeed: 0.08,
};

// Expansion has a fraction more travel than retraction. This is what gives the
// shell its soft, rubber-like overshoot without making every interaction slow.
const EXPAND_SPRING = {
  type: "spring" as const,
  stiffness: 430,
  damping: 31,
  mass: 0.88,
  restDelta: 0.08,
  restSpeed: 0.08,
};

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
/*  Content transition helper                                                  */
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
    filter: "blur(0px)",
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
    filter: "blur(2px)",
    scale: opening ? 1.018 : 0.98,
    y: opening ? 1 : -1,
    transition: { duration: 0.075, ease: "easeOut" as const },
  }),
};

/* -------------------------------------------------------------------------- */
/*  The island shell                                                          */
/* -------------------------------------------------------------------------- */

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
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const islandRef = useRef<HTMLDivElement>(null);

  // Reset / arm whenever a new activity arrives.
  useEffect(() => {
    if (!activity) return;
    setExpanded(!!activity.autoExpand);

    if (timer.current) clearTimeout(timer.current);
    const duration = activity.duration ?? 4200;
    if (duration > 0) {
      timer.current = setTimeout(onDismiss, duration);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [activity, onDismiss]);

  // An outside tap backs out one presentation level at a time: expanded live
  // activities collapse first, and only a later outside tap dismisses the
  // compact activity.
  useEffect(() => {
    if (!activity) return;
    const handlePointer = (e: PointerEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        if (timer.current) clearTimeout(timer.current);

        if (expanded && activity.expanded) {
          setExpanded(false);
          return;
        }

        onDismiss();
      }
    };
    // Defer so the click that opened the island doesn't immediately close it.
    const id = setTimeout(
      () => document.addEventListener("pointerdown", handlePointer),
      0,
    );
    return () => {
      clearTimeout(id);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [activity, expanded, onDismiss]);

  const collapsedSize = activity?.size ?? "compact";
  const openSize = activity?.expandedSize ?? "expanded";
  const canExpand = Boolean(activity?.expanded);
  const showExpanded = expanded && canExpand;
  const showCompact = !showExpanded;

  const spec = ISLAND_SIZES[showExpanded ? openSize : collapsedSize];

  const buzz = () => window.navigator?.vibrate?.(8);

  const toggle = useCallback(() => {
    if (!canExpand) return;
    buzz();
    // Tapping keeps the island alive a bit longer.
    if (timer.current) clearTimeout(timer.current);
    setExpanded((v) => !v);
  }, [canExpand]);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={reduceMotion ? { duration: 0.12 } : SHELL_SPRING}
    >
      <div className="pointer-events-none fixed inset-x-0 top-3 z-[100000] flex justify-center">
        <AnimatePresence initial={false}>
          {activity && (
            <motion.div
              key="island"
              layout
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
                transition: reduceMotion
                  ? { duration: 0.12 }
                  : showExpanded
                    ? EXPAND_SPRING
                    : SHELL_SPRING,
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
                  : { ...SHELL_SPRING, opacity: { duration: 0.1 } },
              }}
              whileTap={
                canExpand && !reduceMotion
                  ? { scaleX: 0.985, scaleY: 0.965 }
                  : undefined
              }
              onClick={toggle}
              role="alert"
              aria-live="polite"
              aria-expanded={expanded}
              className={cn(
                "pointer-events-auto relative overflow-hidden bg-black text-white",
                "shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.06]",
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
              {/* subtle top gloss, like the real hardware */}
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
/*  Manager + context                                                          */
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

export const DynamicIslandProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activity, setActivity] = useState<IslandActivity | null>(null);

  const show = useCallback((next: IslandActivity) => {
    // Keep the physical shell mounted between activities. iOS morphs directly
    // from the current geometry instead of blinking back through the idle pill.
    setActivity({ ...next, id: `${next.id}-${Date.now()}` });
  }, []);

  const dismiss = useCallback(() => setActivity(null), []);

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <IslandContext.Provider value={value}>
      {children}
      <DynamicIsland activity={activity} onDismiss={dismiss} />
    </IslandContext.Provider>
  );
};

export default DynamicIsland;
