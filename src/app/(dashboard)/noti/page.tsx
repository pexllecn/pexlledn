"use client";

import React from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  DynamicIslandProvider,
  useDynamicIsland,
  type IslandActivity,
} from "@/components/ui/dynamic-island";
import {
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
  BellOff,
  BatteryCharging,
  Phone,
  Music,
  CornerUpRight,
  Mic,
  Timer,
  ShieldCheck,
  Lock,
  MessageCircle,
  Plane,
  Car,
  Trophy,
  Headphones,
} from "lucide-react";

type Example = {
  label: string;
  hint: string;
  icon: React.ElementType;
  build: () => IslandActivity;
};

const GROUPS: { title: string; examples: Example[] }[] = [
  {
    title: "System",
    examples: [
      { label: "Face ID", hint: "Authenticating", icon: ShieldCheck, build: faceIdActivity },
      { label: "Unlocked", hint: "iPhone unlocked", icon: Lock, build: unlockActivity },
      { label: "Silent Mode", hint: "Ringer toggle", icon: BellOff, build: () => silentActivity(true) },
      { label: "Charging", hint: "Battery status", icon: BatteryCharging, build: () => chargingActivity(82) },
      { label: "AirPods", hint: "Device connected", icon: Headphones, build: airpodsActivity },
    ],
  },
  {
    title: "Live Activities",
    examples: [
      { label: "Timer", hint: "Countdown", icon: Timer, build: timerActivity },
      { label: "Now Playing", hint: "Music player", icon: Music, build: () => musicActivity() },
      { label: "Directions", hint: "Maps navigation", icon: CornerUpRight, build: mapsActivity },
      { label: "Voice Memo", hint: "Recording", icon: Mic, build: recordingActivity },
    ],
  },
  {
    title: "Rich / Expandable",
    examples: [
      { label: "Incoming Call", hint: "Tap to expand", icon: Phone, build: () => callActivity() },
      { label: "Message", hint: "Tap to expand", icon: MessageCircle, build: () => messageActivity() },
      { label: "Ride Share", hint: "Arriving soon", icon: Car, build: rideActivity },
      { label: "Flight", hint: "Boarding pass", icon: Plane, build: flightActivity },
      { label: "Live Score", hint: "NBA game", icon: Trophy, build: sportsActivity },
    ],
  },
];

function Playground() {
  const { show } = useDynamicIsland();

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-28 md:pt-36">
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.4 }}
        className="mb-10 text-center"
      >
        <div className="mx-auto mb-5 flex h-9 w-[130px] items-center justify-center rounded-full bg-black shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
          <span className="text-[11px] font-medium tracking-wide text-white/50">
            tap a card ↑
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Dynamic Island
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          A faithful replica of Apple&apos;s Dynamic Island — fluid spring
          morphing, blur cross-fades and live activities. Trigger any example
          below; the ones marked “tap to expand” open when you tap the island.
        </p>
      </motion.div>

      <div className="space-y-10">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {group.title}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.examples.map((ex) => (
                <motion.button
                  key={ex.label}
                  onClick={() => show(ex.build())}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-foreground/20 hover:bg-accent"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                    <ex.icon className="h-5 w-5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold">
                      {ex.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {ex.hint}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>
          </section>
        ))}
      </div>
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
