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
  stiffness: 480,
  damping: 38,
  mass: 0.78,
  restDelta: 0.1,
  restSpeed: 0.1,
};

const EXPAND_SPRING = {
  type: "spring" as const,
  stiffness: 410,
  damping: 34,
  mass: 0.82,
  restDelta: 0.1,
  restSpeed: 0.1,
};

const BLUR_LEAD_MS = 105;

export interface IslandActivity {
  id: string;
  size?: IslandSize;
  expandedSize?: IslandSize;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  center?: React.ReactNode;
  collapsed?: React.ReactNode;
  expanded?: React.ReactNode;
  autoExpand?: boolean;
  /** Milliseconds before dismissal. Set to 0 to keep the activity visible. */
  duration?: number;
}

const contentMotion = {
  initial: (opening: boolean) => ({
    opacity: 0,
    filter: `blur(${opening ? 9 : 7}px)`,
    scale: opening ? 0.975 : 1.015,
    y: opening ? -2 : 1,
  }),
  animate: {
    opacity: 1,
    filter: ["blur(7px)", "blur(1.2px)", "blur(0px)"],
    scale: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.14, delay: 0.025 },
      filter: {
        duration: 0.24,
        times: [0, 0.55, 1],
        ease: [0.16, 1, 0.3, 1],
      },
      scale: { type: "spring" as const, stiffness: 560, damping: 40 },
      y: { type: "spring" as const, stiffness: 560, damping: 40 },
    },
  },
  exit: (opening: boolean) => ({
    opacity: [1, 0.82, 0],
    filter: ["blur(0px)", "blur(1.5px)", "blur(8px)"],
    scale: opening ? 1.012 : 0.988,
    transition: {
      duration: 0.13,
      times: [0, 0.38, 1],
      ease: [0.4, 0, 1, 1],
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
  const [defocusing, setDefocusing] = useState(false);
  const reduceMotion = useReducedMotion();
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const actionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const islandRef = useRef<HTMLDivElement>(null);

  const clearTimers = useCallback(() => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    if (actionTimer.current) clearTimeout(actionTimer.current);
    dismissTimer.current = null;
    actionTimer.current = null;
  }, []);

  const blurThen = useCallback(
    (action: () => void) => {
      if (defocusing) return;
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      setDefocusing(true);
      actionTimer.current = setTimeout(
        () => {
          action();
          setDefocusing(false);
          actionTimer.current = null;
        },
        reduceMotion ? 0 : BLUR_LEAD_MS,
      );
    },
    [defocusing, reduceMotion],
  );

  useEffect(() => {
    clearTimers();
    setDefocusing(false);
    if (!activity) return;

    setExpanded(Boolean(activity.autoExpand));
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
    return clearTimers;
  }, [activity, clearTimers, onDismiss, reduceMotion]);

  useEffect(() => {
    if (!activity) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!islandRef.current?.contains(event.target as Node)) {
        blurThen(() => {
          if (expanded && activity.expanded) setExpanded(false);
          else onDismiss();
        });
      }
    };

    const listenerTimer = setTimeout(
      () => document.addEventListener("pointerdown", handlePointerDown),
      0,
    );
    return () => {
      clearTimeout(listenerTimer);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [activity, blurThen, expanded, onDismiss]);

  const canExpand = Boolean(activity?.expanded);
  const showExpanded = expanded && canExpand;
  const collapsedSize = activity?.size ?? "compact";
  const expandedSize = activity?.expandedSize ?? "expanded";
  const size = ISLAND_SIZES[showExpanded ? expandedSize : collapsedSize];

  const toggle = useCallback(() => {
    if (!canExpand || defocusing) return;
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    window.navigator?.vibrate?.(8);
    blurThen(() => setExpanded((current) => !current));
  }, [blurThen, canExpand, defocusing]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="pointer-events-none fixed inset-x-0 top-3 z-[100000] flex justify-center px-3">
        <AnimatePresence initial={false}>
          {activity && (
            <motion.div
              ref={islandRef}
              key="dynamic-island-shell"
              initial={{
                width: ISLAND_SIZES.idle.width,
                height: ISLAND_SIZES.idle.height,
                borderRadius: ISLAND_SIZES.idle.radius,
                scale: 0.96,
                y: -8,
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
                  ? { duration: 0.12 }
                  : showExpanded
                    ? EXPAND_SPRING
                    : SHELL_SPRING,
              }}
              exit={{
                width: ISLAND_SIZES.idle.width,
                height: ISLAND_SIZES.idle.height,
                borderRadius: ISLAND_SIZES.idle.radius,
                scale: 0.965,
                y: -7,
                opacity: 0,
                transition: reduceMotion
                  ? { duration: 0.1 }
                  : { ...SHELL_SPRING, opacity: { duration: 0.12 } },
              }}
              whileTap={
                canExpand && !reduceMotion ? { scale: 0.985 } : undefined
              }
              onClick={toggle}
              role="status"
              aria-live="polite"
              aria-expanded={canExpand ? expanded : undefined}
              className={cn(
                "pointer-events-auto relative max-w-[calc(100vw-24px)] overflow-hidden bg-black text-white",
                "shadow-[0_12px_40px_rgba(0,0,0,0.42)] ring-1 ring-white/[0.08]",
                "select-none [contain:layout_paint]",
                canExpand && "cursor-pointer",
              )}
              style={{
                willChange: "width, height, border-radius, transform",
                transformOrigin: "50% 0%",
                WebkitFontSmoothing: "antialiased",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.055] to-transparent" />
              <motion.div
                className="absolute inset-0"
                animate={
                  defocusing
                    ? { opacity: 0.72, filter: "blur(7px)", scale: 0.988 }
                    : { opacity: 1, filter: "blur(0px)", scale: 1 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.105,
                  ease: defocusing ? [0.4, 0, 1, 1] : [0.16, 1, 0.3, 1],
                }}
              >
                <AnimatePresence
                  mode="sync"
                  initial={false}
                  custom={showExpanded}
                >
                  {!showExpanded ? (
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
                        <div className="flex h-full items-center justify-between gap-2 px-3.5">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};

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

export const DynamicIslandProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activity, setActivity] = useState<IslandActivity | null>(null);
  const show = useCallback((next: IslandActivity) => {
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
