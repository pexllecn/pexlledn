"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ComponentWrapper, { useTheme } from "./ComponentWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Charging,
  ChargingExpanded,
  FaceId,
  IncomingCall,
  IncomingCallExpanded,
  Navigation,
  NavigationExpanded,
  NowPlaying,
  NowPlayingExpanded,
  Ring,
  Timer,
  TimerExpanded,
} from "./island-activities";
import {
  computeMorph,
  MOTION_PROFILES,
  type Footprint,
  type MotionProfile,
} from "./island-physics";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** useLayoutEffect warns during SSR; this is the standard isomorphic swap. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Presentation {
  /** Nominal footprint, used only until this presentation has rendered once. */
  estimate: Footprint;
  render: () => React.ReactNode;
}

interface View extends Presentation {
  id: string;
  label: string;
  /**
   * The tap-to-expand form, where the activity has one. Transient states
   * (Face ID, a ring toggle) deliberately have none — there is nothing behind
   * them to open, and offering the affordance anyway would be a lie.
   */
  expanded?: Presentation;
}

/** Footprint key for a view in a given state. */
const keyFor = (view: string, expanded: boolean) =>
  expanded ? `${view}:expanded` : view;

const VIEWS: View[] = [
  {
    id: "idle",
    label: "Idle",
    estimate: { w: 100, h: 28 },
    render: () => <div className="h-7" />,
  },
  { id: "ring", label: "Ring", estimate: { w: 128, h: 28 }, render: () => <Ring /> },
  {
    id: "charging",
    label: "Charging",
    estimate: { w: 150, h: 32 },
    render: () => <Charging />,
    expanded: { estimate: { w: 280, h: 104 }, render: () => <ChargingExpanded /> },
  },
  {
    id: "faceid",
    label: "Face ID",
    estimate: { w: 168, h: 92 },
    render: () => <FaceId />,
  },
  {
    id: "timer",
    label: "Timer",
    estimate: { w: 284, h: 64 },
    render: () => <Timer />,
    expanded: { estimate: { w: 300, h: 168 }, render: () => <TimerExpanded /> },
  },
  {
    id: "music",
    label: "Music",
    estimate: { w: 300, h: 72 },
    render: () => <NowPlaying />,
    expanded: { estimate: { w: 320, h: 180 }, render: () => <NowPlayingExpanded /> },
  },
  {
    id: "call",
    label: "Call",
    estimate: { w: 300, h: 76 },
    render: () => <IncomingCall />,
    expanded: { estimate: { w: 300, h: 196 }, render: () => <IncomingCallExpanded /> },
  },
  {
    id: "maps",
    label: "Maps",
    estimate: { w: 292, h: 68 },
    render: () => <Navigation />,
    expanded: { estimate: { w: 312, h: 172 }, render: () => <NavigationExpanded /> },
  },
];

const VIEW_BY_ID = Object.fromEntries(VIEWS.map((v) => [v.id, v]));

/** Exit target for the outgoing copy, driven entirely by the computed morph. */
const ghostVariants = {
  exit: (c: {
    scaleX: number;
    scaleY: number;
    y: number;
    blur: number;
    bounce: number;
    duration: number;
  }) => ({
    scaleX: c.scaleX,
    scaleY: c.scaleY,
    y: c.y,
    // The keyframe array is load-bearing. The ghost mounts at opacity 0 (so
    // the incoming copy is never seen twice); forcing the exit to start at 1
    // is what makes the outgoing copy visible for the handoff.
    opacity: [1, 0],
    filter: [`blur(0px)`, `blur(${c.blur}px)`],
    transition: {
      type: "spring" as const,
      bounce: c.bounce,
      duration: c.duration,
      // Opacity clears well before the shape settles. Exit faster than enter:
      // the user has already decided, so the old state should get out of the
      // way rather than linger over the new one.
      opacity: { duration: c.duration * 0.5, ease: EASE_OUT },
      filter: { duration: c.duration * 0.6, ease: EASE_OUT },
    },
  }),
};

export default function DynamicIsland() {
  const [view, setView] = useState("idle");
  const [expanded, setExpanded] = useState(false);
  const [profileId, setProfileId] = useState("fluid");
  const [slowMo, setSlowMo] = useState(false);
  const reduced = useReducedMotion() ?? false;

  const profile: MotionProfile =
    MOTION_PROFILES.find((p) => p.id === profileId) ?? MOTION_PROFILES[0];

  /**
   * Footprints, seeded with the declared estimates and overwritten with real
   * measurements the first time each view renders. After one visit apiece the
   * physics is running on actual geometry, so a new activity needs no tuning —
   * it just needs to exist.
   */
  const footprints = useRef<Record<string, Footprint>>(
    Object.fromEntries(
      VIEWS.flatMap((v) =>
        v.expanded
          ? [
              [v.id, { ...v.estimate }] as const,
              [keyFor(v.id, true), { ...v.expanded.estimate }] as const,
            ]
          : [[v.id, { ...v.estimate }] as const]
      )
    )
  );

  const contentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // offsetWidth/Height rather than getBoundingClientRect: the container is
    // mid-layout-animation and the content carries an entry scale, and offset*
    // reports the untransformed box that the morph actually needs.
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (w > 0 && h > 0) footprints.current[keyFor(view, expanded)] = { w, h };
  }, [view, expanded]);

  const [morph, setMorph] = useState(() =>
    computeMorph(VIEW_BY_ID.idle.estimate, VIEW_BY_ID.idle.estimate, profile, reduced)
  );

  const speed = slowMo ? 0.25 : 1;

  /**
   * Every change of shape goes through here — switching activity and tapping
   * to expand alike. That is the point: expanding is not a special animation
   * with its own tuning, it is the same morph between two measured footprints.
   * A tall expansion gets a longer, calmer spring than a short one for exactly
   * the same reason idle→music does, without anyone deciding that separately.
   */
  const transitionTo = useCallback(
    (nextView: string, nextExpanded: boolean) => {
      const fromKey = keyFor(view, expanded);
      const toKey = keyFor(nextView, nextExpanded);
      if (fromKey === toKey) return;

      const m = computeMorph(
        footprints.current[fromKey],
        footprints.current[toKey],
        profile,
        reduced
      );
      // Slow motion stretches time without touching the physics, so what you
      // see at 0.25x is the same motion, just legible.
      setMorph({
        ...m,
        spring: { ...m.spring, duration: m.spring.duration / speed },
        exit: { ...m.exit, duration: m.exit.duration / speed },
      });
      setView(nextView);
      setExpanded(nextExpanded);
    },
    [view, expanded, profile, reduced, speed]
  );

  // Switching activity always lands compact: the expanded form is something
  // you opened, and carrying that intent onto a different activity would be
  // deciding on the user's behalf.
  const go = useCallback(
    (next: string) => transitionTo(next, false),
    [transitionTo]
  );

  const current = VIEW_BY_ID[view];
  const canExpand = Boolean(current?.expanded);

  const toggleExpand = useCallback(() => {
    if (!canExpand) return;
    transitionTo(view, !expanded);
  }, [canExpand, transitionTo, view, expanded]);

  const content = useMemo(() => {
    const v = VIEW_BY_ID[view];
    if (!v) return null;
    return expanded && v.expanded ? v.expanded.render() : v.render();
  }, [view, expanded]);

  return (
    <div className="flex flex-col gap-6">
      <ComponentWrapper hasLightMode>
        {/* The stage has to live inside the wrapper, not beside it: useTheme()
            reads the wrapper's provider, and a sibling would silently get the
            default and never respond to the light/dark switch. */}
        <Stage
          view={view}
          expanded={expanded}
          canExpand={canExpand}
          onToggleExpand={toggleExpand}
          content={content}
          morph={morph}
          contentRef={contentRef}
          reduced={reduced}
          speed={speed}
        />
      </ComponentWrapper>

      <Controls
        view={view}
        onView={go}
        profileId={profileId}
        onProfile={setProfileId}
        slowMo={slowMo}
        onSlowMo={setSlowMo}
        reduced={reduced}
      />
    </div>
  );
}

//
// --------------- Stage ---------------
//

function Stage({
  view,
  expanded,
  canExpand,
  onToggleExpand,
  content,
  morph,
  contentRef,
  reduced,
  speed,
}: {
  view: string;
  expanded: boolean;
  canExpand: boolean;
  onToggleExpand: () => void;
  content: React.ReactNode;
  morph: ReturnType<typeof computeMorph>;
  contentRef: React.RefObject<HTMLDivElement>;
  reduced: boolean;
  speed: number;
}) {
  const theme = useTheme();
  const stateKey = keyFor(view, expanded);

  return (
    <div className="flex h-full w-full flex-col justify-between py-10">
          <div className="relative flex h-full w-full flex-col justify-between">
            {/* Press feedback sits on a wrapper rather than on the element
                that carries `layout`. Both want to write `transform`, and
                letting them share one produces a visible stutter at the
                moment the press lands — precisely when the user is looking. */}
            <motion.div
              className="mx-auto w-fit"
              whileTap={canExpand && !reduced ? { scale: 0.97 } : undefined}
              transition={{ duration: 0.16, ease: EASE_OUT }}
            >
            <motion.div
              layout
              transition={morph.spring}
              style={{ borderRadius: 32 }}
              role={canExpand ? "button" : undefined}
              tabIndex={canExpand ? 0 : undefined}
              aria-expanded={canExpand ? expanded : undefined}
              aria-label={
                canExpand
                  ? expanded
                    ? "Collapse activity"
                    : "Expand activity"
                  : undefined
              }
              onClick={canExpand ? onToggleExpand : undefined}
              onKeyDown={
                canExpand
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onToggleExpand();
                      }
                    }
                  : undefined
              }
              className={cn(
                "mx-auto w-fit min-w-[100px] overflow-hidden rounded-full bg-black outline-none",
                canExpand && "cursor-pointer focus-visible:ring-2 focus-visible:ring-white/40",
                // A bright top edge and a deeper shadow the larger it gets:
                // a bigger surface should read as a thicker piece of material,
                // not a bigger sticker.
                "shadow-[0_8px_30px_-6px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.09)]",
                theme === "light" && "shadow-[0_10px_34px_-8px_rgba(0,0,0,0.42)]"
              )}
            >
              <motion.div
                ref={contentRef}
                transition={morph.spring}
                initial={{
                  // 0.92, never 0. Nothing in the world appears from nothing,
                  // and a scale(0) entry reads as a pop rather than an arrival.
                  scale: 0.92,
                  opacity: 0,
                  filter: "blur(4px)",
                  originX: 0.5,
                  originY: 0.5,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                  originX: 0.5,
                  originY: 0.5,
                  transition: {
                    ...morph.spring,
                    // The shape starts moving first and the content lands into
                    // it. Without the beat, the two read as unrelated.
                    delay: reduced ? 0 : 0.05 / speed,
                    opacity: {
                      duration: (morph.spring.duration * 0.55),
                      ease: EASE_OUT,
                      delay: reduced ? 0 : 0.05 / speed,
                    },
                  },
                }}
                key={stateKey}
              >
                {content}
              </motion.div>
            </motion.div>
            </motion.div>

            {/* The ghost layer. Same content, absolutely positioned, mounted
                invisible — it exists only so the outgoing view has something
                to exit with while the container is busy morphing. */}
            <div className="pointer-events-none absolute left-1/2 top-0 flex h-[260px] w-[360px] -translate-x-1/2 items-start justify-center">
              <AnimatePresence mode="popLayout" custom={morph.exit}>
                <motion.div
                  initial={{ opacity: 0 }}
                  exit="exit"
                  variants={ghostVariants}
                  custom={morph.exit}
                  key={stateKey}
                >
                  {content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

      <div className="flex flex-col items-center gap-2.5">
        <AnimatePresence mode="popLayout" initial={false}>
          {canExpand ? (
            <motion.p
              key={expanded ? "collapse" : "expand"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              className={cn(
                "text-xs",
                theme === "dark" ? "text-white/40" : "text-black/40"
              )}
            >
              {expanded ? "Tap the island to collapse" : "Tap the island to expand"}
            </motion.p>
          ) : null}
        </AnimatePresence>
        <Readout morph={morph} view={view} reduced={reduced} />
      </div>
    </div>
  );
}

//
// --------------- Readout ---------------
//

function Readout({
  morph,
  view,
  reduced,
}: {
  morph: ReturnType<typeof computeMorph>;
  view: string;
  reduced: boolean;
}) {
  const theme = useTheme();
  const cells = [
    ["bounce", morph.spring.bounce.toFixed(3)],
    ["response", `${morph.spring.duration.toFixed(2)}s`],
    ["scaleX", morph.exit.scaleX.toFixed(3)],
    ["scaleY", morph.exit.scaleY.toFixed(3)],
    ["y", `${morph.exit.y.toFixed(1)}px`],
    ["blur", `${morph.exit.blur.toFixed(1)}px`],
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-xl border px-4 py-2.5 font-mono text-[11px]",
        theme === "dark"
          ? "border-white/10 bg-white/[0.03] text-white/50"
          : "border-black/10 bg-black/[0.03] text-black/50"
      )}
    >
      {cells.map(([k, v]) => (
        <span key={k} className="tabular-nums">
          <span className="opacity-60">{k}</span>{" "}
          <span className={theme === "dark" ? "text-white/85" : "text-black/80"}>
            {v}
          </span>
        </span>
      ))}
      {reduced ? (
        <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-amber-500">
          reduced motion
        </span>
      ) : null}
      <span className="sr-only">Currently showing {view}</span>
    </div>
  );
}

//
// --------------- Controls ---------------
//

function Controls({
  view,
  onView,
  profileId,
  onProfile,
  slowMo,
  onSlowMo,
  reduced,
}: {
  view: string;
  onView: (id: string) => void;
  profileId: string;
  onProfile: (id: string) => void;
  slowMo: boolean;
  onSlowMo: (v: boolean) => void;
  reduced: boolean;
}) {
  const profile = MOTION_PROFILES.find((p) => p.id === profileId)!;

  return (
    <div className="flex flex-col gap-5">
      <section>
        <h3 className="mb-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Activity
        </h3>
        <div className="flex flex-wrap gap-2">
          {VIEWS.map((v) => (
            <Button
              key={v.id}
              size="sm"
              variant={view === v.id ? "default" : "outline"}
              onClick={() => onView(v.id)}
              aria-pressed={view === v.id}
              // Press feedback is instant and lives on :active, not on click.
              // The commit still happens on release, which is where it belongs.
              className="rounded-full transition-transform duration-press ease-fluid active:scale-[0.97]"
            >
              {v.label}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Motion profile
        </h3>
        <div className="flex flex-wrap gap-2">
          {MOTION_PROFILES.map((p) => (
            <Button
              key={p.id}
              size="sm"
              variant={profileId === p.id ? "default" : "outline"}
              onClick={() => onProfile(p.id)}
              aria-pressed={profileId === p.id}
              className="rounded-full transition-transform duration-press ease-fluid active:scale-[0.97]"
            >
              {p.label}
            </Button>
          ))}
          <Button
            size="sm"
            variant={slowMo ? "default" : "outline"}
            onClick={() => onSlowMo(!slowMo)}
            aria-pressed={slowMo}
            className="rounded-full transition-transform duration-press ease-fluid active:scale-[0.97]"
          >
            Slow motion 0.25&times;
          </Button>
        </div>
        <p className="mt-2.5 max-w-2xl text-sm text-muted-foreground">
          {profile.description}
        </p>
      </section>

      {reduced ? (
        <p className="max-w-2xl rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-amber-600 dark:text-amber-400">
          Your system asks for reduced motion, so the island crossfades instead
          of morphing. The opacity change still explains that one state became
          another — it is the movement and the overshoot that are gone, not the
          feedback.
        </p>
      ) : null}
    </div>
  );
}
