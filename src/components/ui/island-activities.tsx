"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BellOff,
  BatteryCharging,
  Phone,
  PhoneOff,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Navigation,
  CornerUpRight,
  Mic,
  Timer as TimerIcon,
  ShieldCheck,
  Lock,
  MessageCircle,
  Plane,
  Car,
  Trophy,
  Volume2,
} from "lucide-react";
import type { IslandActivity } from "@/components/ui/dynamic-island";

/* -------------------------------------------------------------------------- */
/*  Small shared pieces                                                        */
/* -------------------------------------------------------------------------- */

const Blob: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div
    className={
      "flex h-7 w-7 items-center justify-center rounded-full " + (className ?? "")
    }
  >
    {children}
  </div>
);

// The animated equalizer used by the music activities.
const Equalizer: React.FC<{ color?: string; playing?: boolean }> = ({
  color = "#f0abfc",
  playing = true,
}) => (
  <div className="flex h-5 items-end gap-[3px]">
    {[0.5, 0.9, 0.35, 0.75, 0.55].map((h, i) => (
      <motion.span
        key={i}
        className="w-[3px] rounded-full"
        style={{ backgroundColor: color }}
        initial={{ height: "30%" }}
        animate={
          playing
            ? { height: ["25%", `${h * 100}%`, "40%", "90%", "35%"] }
            : { height: "30%" }
        }
        transition={{
          duration: 0.9,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: i * 0.12,
        }}
      />
    ))}
  </div>
);

// A live audio waveform (call / voice memo).
const Waveform: React.FC<{ color?: string }> = ({ color = "#4ade80" }) => (
  <div className="flex h-5 items-center gap-[3px]">
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.span
        key={i}
        className="w-[3px] rounded-full"
        style={{ backgroundColor: color }}
        animate={{ height: ["20%", "95%", "45%", "70%", "25%"] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: i * 0.09,
        }}
      />
    ))}
  </div>
);

const Cover: React.FC<{ src?: string; className?: string }> = ({
  src,
  className,
}) => (
  <div
    className={
      "overflow-hidden rounded-[10px] bg-gradient-to-br from-fuchsia-500 to-indigo-600 " +
      (className ?? "h-8 w-8")
    }
  >
    {src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className="h-full w-full object-cover" />
    ) : (
      <div className="flex h-full w-full items-center justify-center">
        <Music className="h-4 w-4 text-white" />
      </div>
    )}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Activity builders                                                          */
/* -------------------------------------------------------------------------- */

export const faceIdActivity = (): IslandActivity => ({
  id: "face-id",
  size: "minimal",
  duration: 2600,
  collapsed: (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        <ShieldCheck className="h-5 w-5 text-sky-400" strokeWidth={2.4} />
      </motion.div>
    </div>
  ),
});

export const unlockActivity = (): IslandActivity => ({
  id: "unlock",
  size: "compact",
  duration: 2400,
  leading: (
    <Blob className="bg-emerald-500/15">
      <Lock className="h-4 w-4 text-emerald-400" />
    </Blob>
  ),
  center: <span className="text-[13px] font-medium">iPhone Unlocked</span>,
  trailing: <span className="w-7" />,
});

export const silentActivity = (silent = true): IslandActivity => ({
  id: "silent",
  size: "compact",
  duration: 2600,
  leading: (
    <Blob className="bg-white/10">
      <BellOff className="h-4 w-4 text-orange-400" />
    </Blob>
  ),
  center: (
    <span className="text-[13px] font-medium">
      {silent ? "Silent" : "Ring"}
    </span>
  ),
  trailing: (
    <span className="pr-1 text-[13px] font-semibold text-orange-400">
      {silent ? "On" : "Off"}
    </span>
  ),
});

export const chargingActivity = (percent = 82): IslandActivity => ({
  id: "charging",
  size: "compact",
  duration: 3000,
  leading: (
    <Blob>
      <BatteryCharging className="h-5 w-5 text-emerald-400" />
    </Blob>
  ),
  trailing: (
    <span className="pr-1 text-[15px] font-semibold text-emerald-400">
      {percent}%
    </span>
  ),
});

export const timerActivity = (): IslandActivity => {
  return {
    id: "timer",
    size: "compact",
    expandedSize: "expanded",
    duration: 6000,
    leading: (
      <Blob className="bg-orange-500/15">
        <TimerIcon className="h-4 w-4 text-orange-400" />
      </Blob>
    ),
    trailing: (
      <span className="pr-1 font-mono text-[15px] font-semibold tabular-nums text-orange-400">
        4:32
      </span>
    ),
    expanded: (
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center gap-3">
          <Blob className="h-9 w-9 bg-orange-500/15">
            <TimerIcon className="h-5 w-5 text-orange-400" />
          </Blob>
          <div>
            <p className="text-[13px] text-white/60">Timer</p>
            <p className="font-mono text-3xl font-semibold tabular-nums">
              04:32
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 rounded-full bg-white/10 py-2 text-[13px] font-medium transition hover:bg-white/15">
            Cancel
          </button>
          <button className="flex-1 rounded-full bg-orange-500 py-2 text-[13px] font-semibold text-black transition hover:bg-orange-400">
            Pause
          </button>
        </div>
      </div>
    ),
  };
};

export const callActivity = (
  caller = "Emma Thompson",
  avatar = "https://i.pravatar.cc/150?u=emma.thompson"
): IslandActivity => ({
  id: "call",
  size: "compact",
  expandedSize: "tall",
  autoExpand: false,
  duration: 8000,
  leading: (
    <div className="flex items-center gap-2">
      <img
        src={avatar}
        alt=""
        className="h-7 w-7 rounded-full object-cover"
      />
    </div>
  ),
  trailing: <Waveform color="#4ade80" />,
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt=""
          className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10"
        />
        <div>
          <p className="text-[15px] font-semibold">{caller}</p>
          <p className="text-[13px] text-emerald-400">mobile · calling…</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-2">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 transition hover:bg-red-400">
          <PhoneOff className="h-5 w-5 text-white" />
        </button>
        <Waveform color="#ffffff" />
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 transition hover:bg-emerald-400">
          <Phone className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  ),
});

export const musicActivity = (
  title = "Midnight Drive",
  artist = "Neon Coast",
  cover = "https://i.pravatar.cc/150?u=mitchell.luo"
): IslandActivity => ({
  id: "music",
  size: "compact",
  expandedSize: "expanded",
  duration: 7000,
  leading: <Cover src={cover} />,
  trailing: <Equalizer />,
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3">
        <Cover src={cover} className="h-12 w-12" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold">{title}</p>
          <p className="truncate text-[13px] text-white/55">{artist}</p>
        </div>
        <Equalizer />
      </div>
      <div>
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-white"
            initial={{ width: "18%" }}
            animate={{ width: "62%" }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>
        <div className="mt-2 flex items-center justify-center gap-8 text-white">
          <SkipBack className="h-5 w-5 fill-white" />
          <Pause className="h-6 w-6 fill-white" />
          <SkipForward className="h-5 w-5 fill-white" />
        </div>
      </div>
    </div>
  ),
});

export const mapsActivity = (): IslandActivity => ({
  id: "maps",
  size: "compact",
  expandedSize: "expanded",
  duration: 6000,
  leading: (
    <Blob className="bg-emerald-500/20">
      <CornerUpRight className="h-4 w-4 text-emerald-400" />
    </Blob>
  ),
  center: (
    <span className="text-[13px] font-medium text-white/80">Turn right</span>
  ),
  trailing: (
    <span className="pr-1 text-[15px] font-semibold text-emerald-400">
      400 ft
    </span>
  ),
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3">
        <Blob className="h-11 w-11 bg-emerald-500/20">
          <CornerUpRight className="h-6 w-6 text-emerald-400" />
        </Blob>
        <div>
          <p className="text-2xl font-semibold text-emerald-400">400 ft</p>
          <p className="text-[13px] text-white/70">
            Turn right onto Market St
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-[13px] text-white/60">
        <span className="flex items-center gap-1.5">
          <Navigation className="h-4 w-4 text-emerald-400" /> 12 min
        </span>
        <span>3.4 mi</span>
        <span>10:24 AM</span>
      </div>
    </div>
  ),
});

export const airpodsActivity = (): IslandActivity => ({
  id: "airpods",
  size: "compact",
  duration: 3000,
  leading: (
    <Blob>
      <Volume2 className="h-4 w-4 text-white" />
    </Blob>
  ),
  center: <span className="text-[13px] font-medium">AirPods Pro</span>,
  trailing: (
    <span className="pr-1 text-[13px] font-semibold text-white/70">
      Connected
    </span>
  ),
});

export const recordingActivity = (): IslandActivity => ({
  id: "recording",
  size: "compact",
  expandedSize: "expanded",
  duration: 6000,
  leading: (
    <div className="flex items-center gap-2">
      <motion.span
        className="h-3 w-3 rounded-full bg-red-500"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <span className="font-mono text-[13px] tabular-nums text-red-400">
        0:14
      </span>
    </div>
  ),
  trailing: <Waveform color="#f87171" />,
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3">
        <Blob className="h-11 w-11 bg-red-500/15">
          <Mic className="h-5 w-5 text-red-400" />
        </Blob>
        <div>
          <p className="text-[15px] font-semibold">Voice Memo</p>
          <p className="font-mono text-[13px] tabular-nums text-red-400">
            Recording · 0:14
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Waveform color="#f87171" />
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 transition hover:bg-red-400">
          <span className="h-3.5 w-3.5 rounded-[3px] bg-white" />
        </button>
      </div>
    </div>
  ),
});

export const rideActivity = (): IslandActivity => ({
  id: "ride",
  size: "compact",
  expandedSize: "expanded",
  duration: 6000,
  leading: (
    <Blob className="bg-white/10">
      <Car className="h-4 w-4 text-lime-400" />
    </Blob>
  ),
  center: <span className="text-[13px] font-medium">Arriving</span>,
  trailing: (
    <span className="pr-1 text-[15px] font-semibold text-lime-400">3 min</span>
  ),
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Blob className="h-11 w-11 bg-lime-500/15">
            <Car className="h-5 w-5 text-lime-400" />
          </Blob>
          <div>
            <p className="text-[15px] font-semibold">Marcus · Tesla</p>
            <p className="text-[13px] text-white/60">White · 7XYZ 123</p>
          </div>
        </div>
        <span className="text-2xl font-semibold text-lime-400">3 min</span>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={
              "h-1 flex-1 rounded-full " +
              (i < 10 ? "bg-lime-400" : "bg-white/15")
            }
          />
        ))}
      </div>
    </div>
  ),
});

export const flightActivity = (): IslandActivity => ({
  id: "flight",
  size: "compact",
  expandedSize: "expanded",
  duration: 6000,
  leading: (
    <Blob className="bg-sky-500/15">
      <Plane className="h-4 w-4 text-sky-400" />
    </Blob>
  ),
  center: <span className="text-[13px] font-medium">SF → NYC</span>,
  trailing: (
    <span className="pr-1 text-[13px] font-semibold text-sky-400">
      Boarding
    </span>
  ),
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="text-center">
          <p className="text-xl font-semibold">SFO</p>
          <p className="text-[12px] text-white/55">10:40 AM</p>
        </div>
        <div className="flex flex-1 items-center px-3">
          <span className="h-[2px] flex-1 bg-white/25" />
          <Plane className="mx-1 h-4 w-4 -rotate-45 text-sky-400" />
          <span className="h-[2px] flex-1 bg-white/25" />
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">JFK</p>
          <p className="text-[12px] text-white/55">7:15 PM</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-white/60">Gate B12 · Seat 14C</span>
        <span className="rounded-full bg-sky-500/20 px-2.5 py-1 font-semibold text-sky-400">
          Boarding
        </span>
      </div>
    </div>
  ),
});

export const sportsActivity = (): IslandActivity => ({
  id: "sports",
  size: "compact",
  expandedSize: "expanded",
  duration: 6000,
  leading: <span className="pl-1 text-[13px] font-semibold">LAL 78</span>,
  center: <Trophy className="h-4 w-4 text-amber-400" />,
  trailing: (
    <span className="pr-1 text-[13px] font-semibold">82 BOS</span>
  ),
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-[13px] font-bold">
            LAL
          </div>
          <span className="text-2xl font-bold">78</span>
        </div>
        <div className="text-center">
          <p className="text-[13px] font-semibold text-amber-400">Q4 · 2:14</p>
          <p className="text-[12px] text-white/50">NBA</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-[13px] font-bold">
            BOS
          </div>
          <span className="text-2xl font-bold">82</span>
        </div>
      </div>
      <p className="text-center text-[12px] text-white/50">
        Tap for play-by-play
      </p>
    </div>
  ),
});

export const messageActivity = (
  name = "John Doe",
  avatar = "https://i.pravatar.cc/150?u=john.smith"
): IslandActivity => ({
  id: "message",
  size: "default",
  expandedSize: "expanded",
  autoExpand: false,
  duration: 5000,
  collapsed: (
    <div className="flex h-full w-full items-center gap-3 px-4">
      <img src={avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold leading-tight">
          {name}
        </p>
        <p className="truncate text-[13px] leading-tight text-white/60">
          Hey! Are we still on for lunch?
        </p>
      </div>
      <MessageCircle className="h-5 w-5 shrink-0 text-emerald-400" />
    </div>
  ),
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-[15px] font-semibold">{name}</p>
          <p className="text-[13px] text-white/55">Messages · now</p>
        </div>
      </div>
      <p className="text-[14px] text-white/85">Hey! Are we still on for lunch?</p>
      <div className="flex gap-2">
        <button className="flex-1 rounded-full bg-white/10 py-2 text-[13px] font-medium transition hover:bg-white/15">
          Remind me
        </button>
        <button className="flex-1 rounded-full bg-emerald-500 py-2 text-[13px] font-semibold text-black transition hover:bg-emerald-400">
          Reply
        </button>
      </div>
    </div>
  ),
});
