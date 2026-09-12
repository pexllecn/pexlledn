"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/ui/animated-tabs";
import { cn } from "@/lib/utils";
import {
  DynamicIslandProvider,
  useDynamicIsland,
  type IslandActivity,
} from "@/components/ui/dynamic-island";
import {
  iOS,
  faceIdActivity,
  unlockActivity,
  silentActivity,
  chargingActivity,
  timerActivity,
  callActivity,
  musicActivity,
  mapsActivity,
  airpodsActivity,
  recordingActivity,
  rideActivity,
  flightActivity,
  sportsActivity,
  messageActivity,
} from "@/components/ui/island-activities";
import {
  BatteryFull,
  BellOff,
  Car,
  CornerUpRight,
  Headphones,
  LockKeyhole,
  MessageSquare,
  Mic,
  Music,
  Phone,
  Plane,
  ScanFace,
  SignalHigh,
  Timer,
  Trophy,
  Wifi,
  Zap,
} from "lucide-react";

const EASE = [0.28, 0.9, 0.22, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Catalogue                                                                 */
/* -------------------------------------------------------------------------- */

type Example = {
  label: string;
  hint: string;
  icon: React.ElementType;

  /* The activity's own iOS system colour, mirrored from island-activities so
     the tile and the island it presents read as the same object. */
  accent: string;
  build: () => IslandActivity;
};

type Chapter = {
  id: string;
  tab: string;
  title: string;
  copy: string;
  examples: Example[];
};

const CHAPTERS: Chapter[] = [
  {
    id: "system",
    tab: "System",
    title: "Instant. Familiar. Clear.",
    copy: "A quiet acknowledgement for the things your device is already doing.",
    examples: [
      {
        label: "Face ID",
        hint: "Authenticating",
        icon: ScanFace,
        accent: iOS.green,
        build: faceIdActivity,
      },
      {
        label: "Unlocked",
        hint: "Securely opened",
        icon: LockKeyhole,
        accent: iOS.green,
        build: unlockActivity,
      },
      {
        label: "Silent Mode",
        hint: "Ringer off",
        icon: BellOff,
        accent: iOS.orange,
        build: () => silentActivity(true),
      },
      {
        label: "Charging",
        hint: "82 percent",
        icon: Zap,
        accent: iOS.green,
        build: () => chargingActivity(82),
      },
      {
        label: "AirPods Pro",
        hint: "Connected",
        icon: Headphones,
        accent: iOS.blue,
        build: airpodsActivity,
      },
    ],
  },
  {
    id: "live",
    tab: "Live Activities",
    title: "The moment keeps moving.",
    copy: "Follow something as it happens without leaving what you are doing.",
    examples: [
      {
        label: "Timer",
        hint: "Counting down",
        icon: Timer,
        accent: iOS.orange,
        build: timerActivity,
      },
      {
        label: "Now Playing",
        hint: "Music controls",
        icon: Music,
        accent: iOS.pink,
        build: musicActivity,
      },
      {
        label: "Directions",
        hint: "Next turn",
        icon: CornerUpRight,
        accent: iOS.green,
        build: mapsActivity,
      },
      {
        label: "Voice Memo",
        hint: "Recording",
        icon: Mic,
        accent: iOS.red,
        build: recordingActivity,
      },
    ],
  },
  {
    id: "expanded",
    tab: "Expanded",
    title: "More detail. Right on cue.",
    copy: "Tap to reveal controls and context. Tap outside to fold it away.",
    examples: [
      {
        label: "Incoming Call",
        hint: "Tap to answer",
        icon: Phone,
        accent: iOS.green,
        build: callActivity,
      },
      {
        label: "Message",
        hint: "Quick reply",
        icon: MessageSquare,
        accent: iOS.green,
        build: messageActivity,
      },
      {
        label: "Ride Share",
        hint: "Arriving soon",
        icon: Car,
        accent: iOS.indigo,
        build: rideActivity,
      },
      {
        label: "Flight",
        hint: "Boarding pass",
        icon: Plane,
        accent: iOS.teal,
        build: flightActivity,
      },
      {
        label: "Live Score",
        hint: "Game update",
        icon: Trophy,
        accent: iOS.yellow,
        build: sportsActivity,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Hero device                                                               */
/* -------------------------------------------------------------------------- */

/* The device mock keeps literal pixel geometry rather than theme radii: it is
   a depiction of hardware, and its corners are a physical fact of the object,
   the same way ISLAND_SIZES are literal in the island itself. Every piece of
   app UI on this page follows --radius through the rounded-* scale. */
const REEL = [
  { key: "idle", width: 118, height: 33, radius: 18, hold: 1500 },
  { key: "silent", width: 178, height: 37, radius: 19, hold: 2400 },
  { key: "music", width: 238, height: 118, radius: 31, hold: 3400 },
] as const;

const PREVIEW_SPRING = {
  type: "spring" as const,
  stiffness: 320,
  damping: 27,
  mass: 1,
  restDelta: 0.05,
  restSpeed: 0.2,
};

const PREVIEW_FOCUS_IN = ["blur(12px)", "blur(3px)", "blur(0px)"];
const PREVIEW_FOCUS_OUT = ["blur(0px)", "blur(4px)", "blur(11px)"];

function DeviceReel() {
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const state = REEL[step];

  useEffect(() => {
    const id = setTimeout(
      () => setStep((current) => (current + 1) % REEL.length),
      state.hold,
    );

    return () => clearTimeout(id);
  }, [step, state.hold]);

  return (
    <div className="relative mx-auto w-[300px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -bottom-10 top-16 rounded-full bg-primary/25 blur-3xl"
      />

      <div className="relative rounded-[58px] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[10px] shadow-2xl">
        <div className="relative h-[596px] overflow-hidden rounded-[48px] bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_16%,#ff9ff3_0,transparent_38%),radial-gradient(circle_at_18%_64%,#54a0ff_0,transparent_44%),linear-gradient(165deg,#e8f1ff_0%,#b6a8f5_48%,#ffb489_100%)]" />

          <div className="relative z-10 flex items-center justify-between px-9 pt-5 text-lg font-semibold text-black/85">
            <span>9:41</span>

            <span className="flex items-center gap-1.5">
              <SignalHigh className="size-4" />
              <Wifi className="size-4" />
              <BatteryFull className="h-4 w-6" />
            </span>
          </div>

          <div className="absolute inset-x-0 top-3.5 z-20 flex justify-center">
            <motion.div
              animate={{
                width: state.width,
                height: state.height,
                borderRadius: state.radius,
              }}
              transition={reduceMotion ? { duration: 0.15 } : PREVIEW_SPRING}
              className="overflow-hidden bg-black text-white shadow-xl"
              style={{ willChange: "width, height", contain: "layout paint" }}
            >
              <AnimatePresence mode="sync" initial={false}>
                {state.key === "silent" && (
                  <motion.div
                    key="silent"
                    initial={{ opacity: 0, filter: PREVIEW_FOCUS_IN[0] }}
                    animate={{ opacity: 1, filter: PREVIEW_FOCUS_IN }}
                    exit={{ opacity: 0, filter: PREVIEW_FOCUS_OUT }}
                    transition={{ duration: 0.34, ease: EASE }}
                    className="flex h-full items-center justify-between px-3.5 text-xs font-medium"
                  >
                    <BellOff
                      className="size-4"
                      style={{ color: iOS.orange }}
                    />
                    <span>Silent Mode</span>
                    <span style={{ color: iOS.orange }}>On</span>
                  </motion.div>
                )}

                {state.key === "music" && (
                  <motion.div
                    key="music"
                    initial={{
                      opacity: 0,
                      filter: PREVIEW_FOCUS_IN[0],
                      scale: 0.92,
                    }}
                    animate={{ opacity: 1, filter: PREVIEW_FOCUS_IN, scale: 1 }}
                    exit={{
                      opacity: 0,
                      filter: PREVIEW_FOCUS_OUT,
                      scale: 0.95,
                    }}
                    transition={{ duration: 0.38, ease: EASE }}
                    className="flex h-full flex-col justify-between p-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="size-11 rounded-md"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${iOS.pink}, ${iOS.purple})`,
                        }}
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-semibold">
                          Midnight Drive
                        </p>
                        <p className="text-xs text-white/55">Neon Coast</p>
                      </div>

                      <Music className="size-4" style={{ color: iOS.pink }} />
                    </div>

                    <div className="h-[3px] overflow-hidden rounded-full bg-white/20">
                      <motion.div
                        animate={{ width: ["28%", "72%"] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        }}
                        className="h-full rounded-full bg-white"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-24 grid grid-cols-4 gap-x-6 gap-y-5 px-10">
            {Array.from({ length: 12 }).map((_, item) => (
              <div
                key={item}
                className="aspect-square rounded-xl bg-white/30 shadow-sm backdrop-blur-md"
              />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-6 flex justify-center">
            <div className="h-[5px] w-[134px] rounded-full bg-black/25" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pieces                                                                    */
/* -------------------------------------------------------------------------- */

function Tile({
  example,
  show,
}: {
  example: Example;
  show: (activity: IslandActivity) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => show(example.build())}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className="group flex min-h-[170px] w-full flex-col items-center justify-center gap-3.5 rounded-lg border bg-card p-5 text-center text-card-foreground shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      <span
        className="grid size-[58px] place-items-center rounded-md transition-transform duration-300 group-hover:scale-[1.07]"
        style={{
          color: example.accent,
          backgroundColor: `${example.accent}1a`,
        }}
      >
        <example.icon className="size-7" strokeWidth={1.9} />
      </span>

      <span>
        <span className="block text-lg font-semibold tracking-tight">
          {example.label}
        </span>

        <span className="mt-0.5 block text-xs text-muted-foreground">
          {example.hint}
        </span>
      </span>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

function Stage() {
  const { show } = useDynamicIsland();
  const [active, setActive] = useState(CHAPTERS[0].id);

  const chapter = useMemo(
    () => CHAPTERS.find((entry) => entry.id === active) ?? CHAPTERS[0],
    [active],
  );

  return (
    <div className="-mx-2 bg-background text-foreground">
      {/* ------------------------------- Hero ------------------------------- */}

      <section className="overflow-hidden border-b px-6 pt-20 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto max-w-[780px] text-center"
        >
          <p className="text-xl font-semibold text-primary">Dynamic Island</p>

          <h1 className="mt-3 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-7xl">
            A little space.
            <br />
            <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
              A lot of magic.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[620px] text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            Alerts, activities and controls take shape at the top of the screen,
            then fold away when you are done.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Button
              size="lg"
              className="rounded-full"
              onClick={() => show(musicActivity())}
            >
              See a Live Activity
            </Button>

            <Button
              variant="link"
              size="lg"
              className="px-0"
              onClick={() => show(callActivity())}
            >
              Try an incoming call &rsaquo;
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.94, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.05, delay: 0.12, ease: EASE }}
          className="mt-16 pb-4"
        >
          <DeviceReel />
        </motion.div>
      </section>

      {/* ----------------------------- Catalogue ---------------------------- */}

      <section className="bg-muted/40 px-6 py-20 sm:py-28">
        <div className="flex justify-center">
          <div className="inline-flex gap-1 rounded-full bg-muted p-1">
            <AnimatedBackground
              defaultValue={CHAPTERS[0].id}
              onValueChange={(id) => id && setActive(id)}
              className="rounded-full bg-background shadow-sm"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            >
              {CHAPTERS.map((entry) => (
                <button
                  key={entry.id}
                  data-id={entry.id}
                  type="button"
                  aria-label={entry.tab}
                  className={cn(
                    "rounded-full px-4 py-2 text-base font-medium transition-colors sm:px-6",
                    entry.id === active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {entry.tab}
                </button>
              ))}
            </AnimatedBackground>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-[1060px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              <div className="mx-auto max-w-[640px] text-center">
                <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  {chapter.title}
                </h2>

                <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  {chapter.copy}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {chapter.examples.map((example, index) => (
                  <motion.div
                    key={example.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.05 + index * 0.045,
                      ease: EASE,
                    }}
                  >
                    <Tile example={example} show={show} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ------------------------------ Craft ------------------------------- */}

      <section className="border-t px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-[980px]">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Every frame does
            <br />
            <span className="text-muted-foreground">something physical.</span>
          </h2>

          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {[
              {
                title: "Real springs",
                copy: "Geometry travels on a spring rather than a curve, so it overshoots and settles like an object with weight.",
              },
              {
                title: "Focus pull",
                copy: "Content arrives out of focus and resolves sharp, then softens again on the way out. The shell itself stays crisp.",
              },
              {
                title: "One tap deeper",
                copy: "Compact by default, expanded on tap, and folded away by a tap anywhere outside it.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="h-px w-full bg-border" />

                <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                  {item.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ Footer ------------------------------ */}

      <section className="border-t px-6 py-14 text-center">
        <p className="text-xs text-muted-foreground">
          Select an activity to present it. Tap the island to expand, tap
          anywhere outside to fold it away.
        </p>
      </section>
    </div>
  );
}

export default function DynamicIslandDemo() {
  return (
    <ContentLayout title="Dynamic Island">
      <DynamicIslandProvider>
        <Stage />
      </DynamicIslandProvider>
    </ContentLayout>
  );
}
