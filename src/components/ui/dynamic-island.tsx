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
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
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
  stiffness: 400,
  damping: 30,
  mass: 1.1,
};

// Content fades / blurs a touch quicker than the shell.
const CONTENT_SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 34,
  mass: 0.7,
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

const fade = {
  initial: { opacity: 0, filter: "blur(6px)", scale: 0.92 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: CONTENT_SPRING,
  },
  exit: {
    opacity: 0,
    filter: "blur(6px)",
    scale: 0.96,
    transition: { duration: 0.14 },
  },
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
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const collapsedSize = activity?.size ?? "compact";
  const openSize = activity?.expandedSize ?? "expanded";
  const canExpand = !!activity?.expanded;

  const spec =
    ISLAND_SIZES[expanded && canExpand ? openSize : collapsedSize];

  const buzz = () => window.navigator?.vibrate?.(8);

  const toggle = useCallback(() => {
    if (!canExpand) return;
    buzz();
    // Tapping keeps the island alive a bit longer.
    if (timer.current) clearTimeout(timer.current);
    setExpanded((v) => !v);
  }, [canExpand]);

  const showCompact = !(expanded && canExpand);

  return (
    <MotionConfig transition={SHELL_SPRING}>
      <div className="pointer-events-none fixed inset-x-0 top-3 z-[100000] flex justify-center">
        <AnimatePresence mode="popLayout">
          {activity && (
            <motion.div
              key="island"
              layout
              initial={{
                width: ISLAND_SIZES.idle.width,
                height: ISLAND_SIZES.idle.height,
                borderRadius: ISLAND_SIZES.idle.radius,
                scale: 0.85,
                y: -14,
                opacity: 0,
                filter: "blur(8px)",
              }}
              animate={{
                width: spec.width,
                height: spec.height,
                borderRadius: spec.radius,
                scale: 1,
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                width: ISLAND_SIZES.idle.width,
                height: ISLAND_SIZES.idle.height,
                borderRadius: ISLAND_SIZES.idle.radius,
                scale: 0.8,
                y: -16,
                opacity: 0,
                filter: "blur(9px)",
                transition: { ...SHELL_SPRING, opacity: { duration: 0.2 } },
              }}
              onClick={toggle}
              role="alert"
              aria-live="polite"
              aria-expanded={expanded}
              className={cn(
                "pointer-events-auto relative overflow-hidden bg-black text-white",
                "shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.06]",
                "select-none",
                canExpand && "cursor-pointer"
              )}
              style={{ willChange: "width, height" }}
            >
              {/* subtle top gloss, like the real hardware */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent" />

              <AnimatePresence mode="popLayout" initial={false}>
                {showCompact ? (
                  <motion.div
                    key="compact"
                    variants={fade}
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
                    key="expanded"
                    variants={fade}
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
    throw new Error("useDynamicIsland must be used within DynamicIslandProvider");
  return ctx;
};

export const DynamicIslandProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activity, setActivity] = useState<IslandActivity | null>(null);

  const show = useCallback((next: IslandActivity) => {
    // Retract first so the shape morphs from the resting pill again.
    setActivity(null);
    requestAnimationFrame(() =>
      setActivity({ ...next, id: `${next.id}-${Date.now()}` })
    );
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
