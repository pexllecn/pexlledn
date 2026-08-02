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
  ScanFace,
  LockKeyhole,
  BellOff,
  Zap,
  Headphones,
  Timer,
  Music,
  CornerUpRight,
  Mic,
  Phone,
  MessageSquare,
  Car,
  Plane,
  Trophy,
  Sparkles,
  Hand,
  Wifi,
  BatteryFull,
  SignalHigh,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Example registry                                                           */
/* -------------------------------------------------------------------------- */

type Example = {
  label: string;
  hint: string;
  icon: React.ElementType;
  accent: string;
  build: () => IslandActivity;
};

const GROUPS: { title: string; blurb: string; examples: Example[] }[] = [
  {
    title: "System",
    blurb: "The quick, glanceable states iOS shows for hardware events.",
    examples: [
      { label: "Face ID", hint: "Authenticating", icon: ScanFace, accent: iOS.green, build: faceIdActivity },
      { label: "Unlocked", hint: "iPhone unlocked", icon: LockKeyhole, accent: iOS.green, build: unlockActivity },
      { label: "Silent Mode", hint: "Ringer toggle", icon: BellOff, accent: iOS.orange, build: () => silentActivity(true) },
      { label: "Charging", hint: "Battery status", icon: Zap, accent: iOS.green, build: () => chargingActivity(82) },
      { label: "AirPods Pro", hint: "Device connected", icon: Headphones, accent: iOS.blue, build: airpodsActivity },
    ],
  },
  {
    title: "Live Activities",
    blurb: "Persistent, animated states that keep updating in real time.",
    examples: [
      { label: "Timer", hint: "Countdown ring", icon: Timer, accent: iOS.orange, build: timerActivity },
      { label: "Now Playing", hint: "Music player", icon: Music, accent: iOS.pink, build: () => musicActivity() },
      { label: "Directions", hint: "Maps navigation", icon: CornerUpRight, accent: iOS.green, build: mapsActivity },
      { label: "Voice Memo", hint: "Live waveform", icon: Mic, accent: iOS.red, build: recordingActivity },
    ],
  },
  {
    title: "Rich & Expandable",
    blurb: "Tap the island once it appears to expand into a full card.",
    examples: [
      { label: "Incoming Call", hint: "Tap to expand", icon: Phone, accent: iOS.green, build: () => callActivity() },
      { label: "Message", hint: "Tap to expand", icon: MessageSquare, accent: iOS.green, build: () => messageActivity() },
      { label: "Ride Share", hint: "Arriving soon", icon: Car, accent: "#A3E635", build: rideActivity },
      { label: "Flight", hint: "Boarding pass", icon: Plane, accent: iOS.teal, build: flightActivity },
      { label: "Live Score", hint: "NBA game", icon: Trophy, accent: iOS.yellow, build: sportsActivity },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Hero — a live iPhone mock that loops the morph                             */
/* -------------------------------------------------------------------------- */

const PHONE_STATES = [
  { key: "idle", w: 116, h: 33, r: 17 },
  { key: "ring", w: 168, h: 35, r: 18 },
  { key: "music", w: 240, h: 132, r: 32 },
] as const;

function PhoneMock() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setI((v) => (v + 1) % PHONE_STATES.length),
      2600
    );
    return () => clearInterval(id);
  }, []);
  const s = PHONE_STATES[i];

  return (
    <div className="relative mx-auto w-[280px]">
      {/* glow */}
      <div
        className="absolute -inset-8 -z-10 rounded-[60px] opacity-60 blur-3xl"
        style={{
          background:
            "conic-gradient(from 120deg, #FF375F55, #0A84FF55, #30D15855, #FF375F55)",
        }}
      />
      {/* device */}
      <div className="relative rounded-[52px] bg-black p-[10px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
        <div className="relative h-[560px] overflow-hidden rounded-[44px]">
          {/* wallpaper */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-600 via-fuchsia-600 to-orange-500" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.28),transparent_55%)]" />

          {/* status bar */}
          <div className="relative z-10 flex items-center justify-between px-8 pt-4 text-white">
            <span className="text-[15px] font-semibold">9:41</span>
            <div className="flex items-center gap-1.5">
              <SignalHigh className="h-4 w-4" />
              <Wifi className="h-4 w-4" />
              <BatteryFull className="h-5 w-5" />
            </div>
          </div>

          {/* the island */}
          <div className="absolute inset-x-0 top-3 z-20 flex justify-center">
            <motion.div
              className="flex items-center justify-center overflow-hidden bg-black text-white ring-1 ring-white/10"
              animate={{ width: s.w, height: s.h, borderRadius: s.r }}
              transition={{ type: "spring", stiffness: 380, damping: 30, mass: 1 }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {s.key === "idle" && (
                  <motion.div
                    key="i"
                    initial={{ opacity: 0, filter: "blur(6px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(6px)" }}
                    className="h-full w-full"
                  />
                )}
                {s.key === "ring" && (
                  <motion.div
                    key="r"
                    initial={{ opacity: 0, filter: "blur(6px)", scale: 0.9 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(6px)", scale: 0.9 }}
                    className="flex w-full items-center justify-between px-3"
                  >
                    <BellOff className="h-4 w-4" style={{ color: iOS.orange }} />
                    <span className="text-[12px] font-medium">Silent</span>
                    <span
                      className="text-[12px] font-semibold"
                      style={{ color: iOS.orange }}
                    >
                      On
                    </span>
                  </motion.div>
                )}
                {s.key === "music" && (
                  <motion.div
                    key="m"
                    initial={{ opacity: 0, filter: "blur(6px)", scale: 0.94 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(6px)", scale: 0.94 }}
                    className="flex h-full w-full flex-col justify-between p-3.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-10 w-10 rounded-[9px] bg-gradient-to-br from-fuchsia-500 to-indigo-600" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold">
                          Midnight Drive
                        </p>
                        <p className="truncate text-[11px] text-white/55">
                          Neon Coast
                        </p>
                      </div>
                      <div className="flex items-end gap-[3px]" style={{ height: 16 }}>
                        {[0.5, 1, 0.4, 0.8].map((h, k) => (
                          <motion.span
                            key={k}
                            className="w-[3px] rounded-full"
                            style={{ backgroundColor: iOS.pink }}
                            animate={{ height: ["25%", `${h * 100}%`, "40%", "85%", "30%"] }}
                            transition={{
                              duration: 0.9,
                              repeat: Infinity,
                              repeatType: "mirror",
                              delay: k * 0.13,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
                      <motion.div
                        className="h-full rounded-full bg-white"
                        animate={{ width: ["30%", "70%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* app dots */}
          <div className="absolute bottom-8 left-0 right-0 grid grid-cols-4 gap-5 px-10">
            {Array.from({ length: 8 }).map((_, k) => (
              <div
                key={k}
                className="aspect-square rounded-[14px] bg-white/20 backdrop-blur-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  { icon: Sparkles, label: "Spring physics" },
  { icon: Hand, label: "Tap to expand" },
  { icon: Music, label: "Live Activities" },
];

function Playground() {
  const { show } = useDynamicIsland();

  return (
    <div className="mx-auto max-w-6xl px-3 pb-24 pt-20 md:pt-24">
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative overflow-hidden rounded-[36px] bg-[#08080a] px-6 py-12 text-white md:px-12 md:py-16">
        {/* aurora */}
        <motion.div
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-[90px]"
          style={{ background: "#FF375F" }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
        <motion.div
          className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full blur-[90px]"
          style={{ background: "#0A84FF" }}
          animate={{ x: [0, -30, 0], y: [0, 40, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 11, repeat: Infinity }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-20 left-1/3 h-72 w-72 rounded-full blur-[100px]"
          style={{ background: "#30D158" }}
          animate={{ x: [0, 30, 0], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 13, repeat: Infinity }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(8,8,10,0.6))]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] font-medium text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              iOS · Dynamic Island
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              The Dynamic Island,{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                on the web.
              </span>
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
              A pixel-faithful replica of Apple&apos;s Dynamic Island — fluid
              spring morphing, blur cross-fades and real Live Activities. Tap any
              card below and watch the top of your screen. Tap outside to dismiss.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {FEATURES.map((f) => (
                <span
                  key={f.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-white/80 ring-1 ring-white/10"
                >
                  <f.icon className="h-3.5 w-3.5" />
                  {f.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => show(musicActivity())}
                className="rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-black transition hover:bg-white/90 active:scale-95"
              >
                Play a demo
              </button>
              <button
                onClick={() => show(callActivity())}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-[14px] font-semibold text-white backdrop-blur transition hover:bg-white/10 active:scale-95"
              >
                Try a call
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden justify-center lg:flex"
          >
            <PhoneMock />
          </motion.div>
        </div>
      </section>

      {/* ---------------------------- EXAMPLES ------------------------------ */}
      <div className="mt-14 space-y-12">
        {GROUPS.map((group, gi) => (
          <motion.section
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: gi * 0.05 }}
          >
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight">{group.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{group.blurb}</p>
              </div>
              <span className="hidden shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground sm:block">
                {group.examples.length} examples
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {group.examples.map((ex) => (
                <motion.button
                  key={ex.label}
                  onClick={() => show(ex.build())}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl border border-border bg-card p-5 text-left transition-colors hover:border-foreground/15"
                >
                  {/* accent glow on hover */}
                  <span
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                    style={{ backgroundColor: ex.accent }}
                  />
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ring-inset ring-white/10 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${ex.accent}1f`,
                      color: ex.accent,
                    }}
                  >
                    <ex.icon className="h-5 w-5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[15px] font-semibold">
                      {ex.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {ex.hint}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <p className="mt-14 text-center text-xs text-muted-foreground">
        Built with Framer Motion · spring-morphing shell, blur cross-fade content,
        tap-to-expand and tap-outside-to-dismiss.
      </p>
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
