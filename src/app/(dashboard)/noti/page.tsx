"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
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
  ChevronRight,
  CornerUpRight,
  Headphones,
  Hand,
  LockKeyhole,
  MessageSquare,
  Mic,
  Music,
  Phone,
  Plane,
  ScanFace,
  SignalHigh,
  Sparkles,
  Timer,
  Trophy,
  Wifi,
  Zap,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type Example = {
  label: string;
  hint: string;
  icon: React.ElementType;
  accent: string;
  build: () => IslandActivity;
};

type Group = {
  eyebrow: string;
  title: string;
  description: string;
  examples: Example[];
};

const GROUPS: Group[] = [
  {
    eyebrow: "System moments",
    title: "Instant. Familiar. Clear.",
    description:
      "Small acknowledgements for the things your device is doing right now.",
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
        hint: "82% charged",
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
    eyebrow: "Live Activities",
    title: "The moment keeps moving.",
    description: "Follow progress without leaving what you are doing.",
    examples: [
      {
        label: "Timer",
        hint: "Countdown",
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
    eyebrow: "Expanded experiences",
    title: "More detail. Right on cue.",
    description:
      "Tap to reveal controls and context, then tap outside to collapse and dismiss.",
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
        accent: "#A3E635",
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

const PHONE_STATES = [
  {
    key: "idle",
    width: 112,
    height: 32,
    radius: 17,
  },
  {
    key: "status",
    width: 174,
    height: 36,
    radius: 19,
  },
  {
    key: "playing",
    width: 232,
    height: 116,
    radius: 30,
  },
] as const;

function PhonePreview() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % PHONE_STATES.length);
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const state = PHONE_STATES[index];

  return (
    <div className="relative mx-auto w-[286px]">
      <div className="absolute inset-x-4 -bottom-7 h-28 rounded-full bg-blue-500/25 blur-3xl" />

      <div className="relative rounded-[54px] bg-[#171719] p-[9px] shadow-[0_40px_90px_rgba(0,0,0,.45)] ring-1 ring-black/40 dark:ring-white/15">
        <div className="relative h-[568px] overflow-hidden rounded-[46px] bg-[#d9e8ff]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,#f3c6ff_0,transparent_34%),radial-gradient(circle_at_20%_62%,#75baff_0,transparent_40%),linear-gradient(160deg,#e7f2ff,#b5a9f7_52%,#ffb68c)]" />

          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

          <div className="relative z-10 flex items-center justify-between px-8 pt-4 text-[13px] font-semibold text-black">
            <span>9:41</span>

            <span className="flex items-center gap-1">
              <SignalHigh className="size-3.5" />
              <Wifi className="size-3.5" />
              <BatteryFull className="h-4 w-5" />
            </span>
          </div>

          <div className="absolute inset-x-0 top-3 z-20 flex justify-center">
            <motion.div
              animate={{
                width: state.width,
                height: state.height,
                borderRadius: state.radius,
              }}
              transition={{
                type: "spring",
                stiffness: 430,
                damping: 34,
                mass: 0.8,
              }}
              className="overflow-hidden bg-black text-white shadow-xl"
            >
              <AnimatePresence mode="sync" initial={false}>
                {state.key === "status" && (
                  <motion.div
                    key="status"
                    initial={{
                      opacity: 0,
                      filter: "blur(7px)",
                    }}
                    animate={{
                      opacity: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      filter: "blur(7px)",
                    }}
                    className="flex h-full items-center justify-between px-3 text-[11px] font-medium"
                  >
                    <BellOff className="size-4 text-[#FF9F0A]" />

                    <span>Silent Mode</span>

                    <span className="text-[#FF9F0A]">On</span>
                  </motion.div>
                )}

                {state.key === "playing" && (
                  <motion.div
                    key="playing"
                    initial={{
                      opacity: 0,
                      filter: "blur(8px)",
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      filter: "blur(0px)",
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      filter: "blur(8px)",
                      scale: 0.98,
                    }}
                    className="flex h-full flex-col justify-between p-3.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="size-10 rounded-[9px] bg-gradient-to-br from-pink-500 to-violet-600" />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold">
                          Midnight Drive
                        </p>

                        <p className="text-[10px] text-white/50">
                          Neon Coast
                        </p>
                      </div>

                      <Music className="size-4 text-pink-400" />
                    </div>

                    <div className="h-1 overflow-hidden rounded-full bg-white/15">
                      <motion.div
                        animate={{
                          width: ["24%", "76%"],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="h-full rounded-full bg-white"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-8 grid grid-cols-4 gap-5 px-9">
            {Array.from({ length: 8 }).map((_, item) => (
              <div
                key={item}
                className="aspect-square rounded-[14px] bg-white/35 shadow-sm backdrop-blur-md"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({
  example,
  show,
}: {
  example: Example;
  show: (activity: IslandActivity) => void;
}) {
  return (
    <motion.button
      onClick={() => show(example.build())}
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.975,
      }}
      className="group flex min-h-36 flex-col justify-between rounded-[24px] border border-black/[0.06] bg-white p-5 text-left shadow-[0_1px_2px_rgba(0,0,0,.03)] transition-shadow hover:shadow-[0_16px_40px_rgba(0,0,0,.08)] dark:border-white/10 dark:bg-[#171719] dark:hover:shadow-black/40"
    >
      <div className="flex items-start justify-between">
        <span
          className="grid size-11 place-items-center rounded-[13px]"
          style={{
            color: example.accent,
            backgroundColor: `${example.accent}16`,
          }}
        >
          <example.icon className="size-5" strokeWidth={2} />
        </span>

        <ChevronRight className="size-4 text-black/20 transition-transform group-hover:translate-x-0.5 dark:text-white/20" />
      </div>

      <div>
        <p className="text-[15px] font-semibold tracking-tight">
          {example.label}
        </p>

        <p className="mt-0.5 text-xs text-black/45 dark:text-white/45">
          {example.hint}
        </p>
      </div>
    </motion.button>
  );
}

function Playground() {
  const { show } = useDynamicIsland();

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] dark:bg-black dark:text-[#f5f5f7]">
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-white px-5 py-20 dark:border-white/10 dark:bg-[#0a0a0a] sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-12 h-96 w-[680px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[110px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_360px]">
          <motion.div
            initial={{
              opacity: 0,
              y: 22,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.75,
              ease,
            }}
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-[#0071e3]">
              <Sparkles className="size-4" />
              Dynamic Island
            </p>

            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl">
              A little space.
              <br />

              <span className="bg-gradient-to-r from-[#007aff] via-[#af52de] to-[#ff2d55] bg-clip-text text-transparent">
                A lot of magic.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/50 dark:text-white/50">
              Explore fluid, glanceable activities that expand when you need
              more and disappear when you are done.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => show(musicActivity())}
                className="rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0077ed] active:scale-95"
              >
                Play a Live Activity
              </button>

              <button
                type="button"
                onClick={() => show(callActivity())}
                className="rounded-full bg-black/[0.06] px-6 py-3 text-sm font-medium transition hover:bg-black/10 active:scale-95 dark:bg-white/10 dark:hover:bg-white/15"
              >
                Try an incoming call
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-xs font-medium text-black/40 dark:text-white/40">
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-3.5" />
                Spring physics
              </span>

              <span className="flex items-center gap-1.5">
                <Hand className="size-3.5" />
                Tap to expand
              </span>

              <span className="flex items-center gap-1.5">
                <Music className="size-3.5" />
                Live updates
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.85,
              delay: 0.1,
              ease,
            }}
            className="hidden lg:block"
          >
            <PhonePreview />
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-28 px-5 py-24 sm:py-32">
        {GROUPS.map((group, groupIndex) => (
          <motion.section
            key={group.title}
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.65,
              delay: groupIndex * 0.04,
              ease,
            }}
          >
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold text-[#0071e3]">
                {group.eyebrow}
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                {group.title}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-black/50 dark:text-white/50">
                {group.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {group.examples.map((example) => (
                <ActivityCard
                  key={example.label}
                  example={example}
                  show={show}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <section className="border-t border-black/[0.06] bg-white px-5 py-16 text-center dark:border-white/10 dark:bg-[#0a0a0a]">
        <p className="text-xs text-black/40 dark:text-white/40">
          Select an activity · Tap to expand · Tap anywhere outside to collapse
          and dismiss
        </p>
      </section>
    </div>
  );
}

export default function DynamicIslandDemo() {
  return (
    <ContentLayout title="Dynamic Island">
      <DynamicIslandProvider>
        <Playground />
      </DynamicIslandProvider>
    </ContentLayout>
  );
}
