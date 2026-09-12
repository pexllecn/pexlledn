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

    // Incoming content begins defocused while the shell is changing shape.
    filter: `blur(${opening ? 8 : 6}px)`,

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
      opacity: {
        duration: 0.11,
        delay: 0.035,
      },

      filter: {
        duration: 0.2,
        times: [0, 0.46, 0.7, 0.84, 1],
        ease: "linear" as const,
      },

      scale: {
        type: "spring" as const,
        stiffness: 650,
        damping: 38,
        mass: 0.55,
      },

      y: {
        type: "spring" as const,
        stiffness: 650,
        damping: 38,
        mass: 0.55,
      },
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

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const islandRef = useRef<HTMLDivElement>(null);

  // Reset and arm the dismissal timer whenever a new activity arrives.
  useEffect(() => {
    clearTimers();
    setDefocusing(false);
    if (!activity) return;

    setExpanded(Boolean(activity.autoExpand));

    if (timer.current) {
      clearTimeout(timer.current);
    }

    const duration = activity.duration ?? 4200;

    if (duration > 0) {
      dismissTimer.current = setTimeout(() => {
        setDefocusing(true);
        actionTimer.current = setTimeout(
          onDismiss,
          reduceMotion ? 0 : BLUR_LEAD_MS,
        );
      }, duration);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [activity, onDismiss]);

  // Tap anywhere outside the island to dismiss it.
  useEffect(() => {
    if (!activity) return;

    const handlePointer = (event: PointerEvent) => {
      const clickedOutside =
        islandRef.current &&
        !islandRef.current.contains(event.target as Node);

      if (!clickedOutside) return;

      if (timer.current) {
        clearTimeout(timer.current);
      }

      onDismiss();
    };

    // Defer registration so the event which opened the island cannot
    // immediately close it again.
    const listenerTimer = setTimeout(() => {
      document.addEventListener("pointerdown", handlePointer);
    }, 0);

    return () => {
      clearTimeout(listenerTimer);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [activity, blurThen, expanded, onDismiss, reduceMotion]);

  const canExpand = Boolean(activity?.expanded);
  const showExpanded = expanded && canExpand;
  const collapsedSize = activity?.size ?? "compact";
  const openSize = activity?.expandedSize ?? "expanded";
  const canExpand = Boolean(activity?.expanded);

  const showExpanded = expanded && canExpand;
  const showCompact = !showExpanded;

  const spec = ISLAND_SIZES[showExpanded ? openSize : collapsedSize];

  const toggle = useCallback(() => {
    if (!canExpand) return;

    window.navigator?.vibrate?.(8);

    // Tapping keeps the island alive instead of allowing its original
    // dismissal timer to close it during interaction.
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setExpanded((current) => !current);
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
              ref={islandRef}
              key="island"
              initial={{
                width: ISLAND_SIZES.idle.width,
                height: ISLAND_SIZES.idle.height,
                borderRadius: ISLAND_SIZES.idle.radius,
                scale: 0.96,
                y: -9,
                opacity: 0,
              }}
              animate={{
                width: size.width,
                height: size.height,
                borderRadius: size.radius,
                scale: 1,
                y: 0,
                opacity: 1,

                transition: reduceMotion
                  ? {
                      duration: 0.12,
                    }
                  : showExpanded
                    ? {
                        ...EXPAND_SPRING,

                        opacity: {
                          duration: 0.08,
                        },
                      }
                    : {
                        ...SHELL_SPRING,

                        opacity: {
                          duration: 0.08,
                        },
                      },
              }}
              exit={{
                width: ISLAND_SIZES.idle.width,
                height: ISLAND_SIZES.idle.height,
                borderRadius: ISLAND_SIZES.idle.radius,
                scale: 0.96,
                y: -8,
                opacity: 0,

                transition: reduceMotion
                  ? {
                      duration: 0.1,
                    }
                  : {
                      ...SHELL_SPRING,

                      opacity: {
                        duration: 0.085,
                      },
                    },
              }}
              whileTap={
                canExpand && !reduceMotion
                  ? {
                      scale: 0.985,
                    }
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
                willChange: "width, height, border-radius, transform",
                transformOrigin: "50% 0%",
                WebkitFontSmoothing: "antialiased",
                backfaceVisibility: "hidden",
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
  const context = useContext(IslandContext);

  if (!context) {
    throw new Error(
      "useDynamicIsland must be used within DynamicIslandProvider",
    );
  }

  return context;
};

export const DynamicIslandProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activity, setActivity] = useState<IslandActivity | null>(null);

  const show = useCallback((nextActivity: IslandActivity) => {
    // Keep the physical shell mounted between activities. iOS morphs directly
    // from its current geometry rather than blinking through the idle pill.
    setActivity({
      ...nextActivity,
      id: `${nextActivity.id}-${Date.now()}`,
    });
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
