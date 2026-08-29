"use client";

import React from "react";
import { motion } from "framer-motion";
import type { IslandActivity } from "@/components/ui/dynamic-island";

/* -------------------------------------------------------------------------- */
/*  iOS system palette (dark, vibrant)                                         */
/* -------------------------------------------------------------------------- */

export const iOS = {
  green: "#30D158",
  orange: "#FF9F0A",
  red: "#FF453A",
  blue: "#0A84FF",
  teal: "#64D2FF",
  pink: "#FF375F",
  yellow: "#FFD60A",
  purple: "#BF5AF2",
  indigo: "#5E5CE6",
};

/* -------------------------------------------------------------------------- */
/*  Apple-style SF glyphs (hand-drawn to match the real symbols)              */
/* -------------------------------------------------------------------------- */

const FaceIdGlyph: React.FC<{ className?: string; color?: string }> = ({
  className,
  color = iOS.green,
}) => (
  <svg viewBox="0 0 28 28" fill="none" className={className}>
    <g stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9.5V7a3 3 0 0 1 3-3h2.5" />
      <path d="M18.5 4H21a3 3 0 0 1 3 3v2.5" />
      <path d="M24 18.5V21a3 3 0 0 1-3 3h-2.5" />
      <path d="M9.5 24H7a3 3 0 0 1-3-3v-2.5" />
      <path d="M10.2 11.5v2" />
      <path d="M17.8 11.5v2" />
      <path d="M14 11.6v3.4l-1.3 1" />
      <path d="M10.4 18.4c1.1 1 2.3 1.5 3.6 1.5s2.5-.5 3.6-1.5" />
    </g>
  </svg>
);

const AirPodsGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 28 28" fill="none" className={className}>
    <g fill="#fff">
      <path d="M8.6 5.4c-2 0-3.3 1.9-3.3 4.4 0 2 1.1 3.3 2.5 3.3 1 0 1.6-.6 1.6-1.8V7.1c0-1-.4-1.7-.8-1.7Z" />
      <rect x="8" y="12" width="1.7" height="9.4" rx=".85" />
      <path d="M19.4 5.4c2 0 3.3 1.9 3.3 4.4 0 2-1.1 3.3-2.5 3.3-1 0-1.6-.6-1.6-1.8V7.1c0-1 .4-1.7.8-1.7Z" />
      <rect x="18.3" y="12" width="1.7" height="9.4" rx=".85" />
    </g>
  </svg>
);

const LockGlyph: React.FC<{ className?: string; color?: string }> = ({
  className,
  color = iOS.green,
}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="10.5" width="14" height="10" rx="3" fill={color} />
    <path
      d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="15" r="1.6" fill="#000" />
  </svg>
);

const BellSlashGlyph: React.FC<{ className?: string; color?: string }> = ({
  className,
  color = iOS.orange,
}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M6 15.5V11a6 6 0 0 1 9.3-5M18 12v3.5l1.5 2H8"
      stroke={color}
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.2 20a2 2 0 0 0 3.6 0"
      stroke={color}
      strokeWidth="1.9"
      strokeLinecap="round"
    />
    <path d="M4 4l16 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BoltGlyph: React.FC<{ className?: string; color?: string }> = ({
  className,
  color = iOS.green,
}) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill={color} />
  </svg>
);

const ManeuverGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M9 20v-7a4 4 0 0 1 4-4h4"
      stroke="#fff"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 6l4 3-4 3"
      stroke="#fff"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneGlyph: React.FC<{ className?: string; color?: string }> = ({
  className,
  color = "#fff",
}) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      d="M6.6 3.6 8.9 3c.6-.1 1.2.2 1.4.8l1 2.4c.2.5.1 1.1-.3 1.5L9.5 9.1a12 12 0 0 0 5.4 5.4l1.4-1.5c.4-.4 1-.5 1.5-.3l2.4 1c.6.2.9.8.8 1.4l-.6 2.3c-.1.6-.7 1.1-1.3 1A16 16 0 0 1 4.7 4.9c-.1-.6.3-1.2 1-1.3Z"
      fill={color}
    />
  </svg>
);

const PhoneDownGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      d="M6.6 3.6 8.9 3c.6-.1 1.2.2 1.4.8l1 2.4c.2.5.1 1.1-.3 1.5L9.5 9.1a12 12 0 0 0 5.4 5.4l1.4-1.5c.4-.4 1-.5 1.5-.3l2.4 1c.6.2.9.8.8 1.4l-.6 2.3c-.1.6-.7 1.1-1.3 1A16 16 0 0 1 4.7 4.9c-.1-.6.3-1.2 1-1.3Z"
      fill="#fff"
      transform="rotate(135 12 12)"
    />
  </svg>
);

const MicGlyph: React.FC<{ className?: string; color?: string }> = ({
  className,
  color = iOS.red,
}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="9" y="3" width="6" height="11" rx="3" fill={color} />
    <path
      d="M6 11a6 6 0 0 0 12 0M12 17v3"
      stroke={color}
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  </svg>
);

const PlaneGlyph: React.FC<{ className?: string; color?: string }> = ({
  className,
  color = iOS.blue,
}) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      d="M21 15.5 13.5 12V5.5a1.5 1.5 0 0 0-3 0V12L3 15.5V17l7.5-2v3.5L8 20v1.4l4-1 4 1V20l-2.5-1.5V15l7.5 2v-1.5Z"
      fill={color}
    />
  </svg>
);

const CarGlyph: React.FC<{ className?: string; color?: string }> = ({
  className,
  color = "#A3E635",
}) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      d="M5 11l1.4-3.4A2 2 0 0 1 8.3 6.3h7.4a2 2 0 0 1 1.9 1.3L19 11l1.3.5a2 2 0 0 1 1.2 1.8V16a1 1 0 0 1-1 1h-1v.5a1.5 1.5 0 0 1-3 0V17H7.5v.5a1.5 1.5 0 0 1-3 0V17h-1a1 1 0 0 1-1-1v-2.7a2 2 0 0 1 1.2-1.8L5 11Z"
      fill={color}
    />
    <circle cx="6.5" cy="16.5" r="1.2" fill="#000" />
    <circle cx="17.5" cy="16.5" r="1.2" fill="#000" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Animated primitives                                                        */
/* -------------------------------------------------------------------------- */

// Apple's "now playing" 4-bar indicator.
const NowPlayingBars: React.FC<{ color?: string; size?: number }> = ({
  color = iOS.pink,
  size = 18,
}) => (
  <div className="flex items-end gap-[3px]" style={{ height: size }}>
    {[0.55, 1, 0.4, 0.8].map((h, i) => (
      <motion.span
        key={i}
        className="w-[3px] rounded-full"
        style={{ backgroundColor: color }}
        animate={{ height: ["25%", `${h * 100}%`, "35%", "85%", "30%"] }}
        transition={{
          duration: 0.95,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: i * 0.14,
        }}
      />
    ))}
  </div>
);

const Waveform: React.FC<{ color?: string; bars?: number; size?: number }> = ({
  color = iOS.green,
  bars = 9,
  size = 18,
}) => (
  <div className="flex items-center gap-[3px]" style={{ height: size }}>
    {Array.from({ length: bars }).map((_, i) => (
      <motion.span
        key={i}
        className="w-[3px] rounded-full"
        style={{ backgroundColor: color }}
        animate={{ height: ["22%", "95%", "45%", "70%", "28%"] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: i * 0.08,
        }}
      />
    ))}
  </div>
);

// A depleting countdown ring, like the Clock live activity.
const RingTimer: React.FC<{
  color?: string;
  size?: number;
  seconds?: number;
  label?: string;
  stroke?: number;
}> = ({ color = iOS.orange, size = 24, seconds = 272, label, stroke = 3 }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c * 0.12 }}
          animate={{ strokeDashoffset: c }}
          transition={{ duration: seconds, ease: "linear" }}
        />
      </svg>
      {label && (
        <span
          className="absolute inset-0 flex items-center justify-center font-mono font-semibold tabular-nums"
          style={{ color, fontSize: size * 0.32 }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

const Blob: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div
    className={
      "flex items-center justify-center rounded-full " +
      (className ?? "h-7 w-7")
    }
  >
    {children}
  </div>
);

const Cover: React.FC<{ src?: string; className?: string }> = ({
  src,
  className,
}) => (
  <div
    className={
      "overflow-hidden rounded-[9px] bg-gradient-to-br from-fuchsia-500 to-indigo-600 " +
      (className ?? "h-8 w-8")
    }
  >
    {src && (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className="h-full w-full object-cover" />
    )}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Activities                                                                 */
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
        transition={{ type: "spring", stiffness: 380, damping: 16 }}
      >
        <FaceIdGlyph className="h-6 w-6" color={iOS.green} />
      </motion.div>
    </div>
  ),
});

export const unlockActivity = (): IslandActivity => ({
  id: "unlock",
  size: "compact",
  duration: 2400,
  leading: <LockGlyph className="h-5 w-5" color={iOS.green} />,
  center: <span className="text-[13px] font-medium">iPhone Unlocked</span>,
  trailing: <span className="w-5" />,
});

export const silentActivity = (silent = true): IslandActivity => ({
  id: "silent",
  size: "compact",
  duration: 2600,
  leading: <BellSlashGlyph className="h-5 w-5" color={iOS.orange} />,
  center: (
    <span className="text-[13px] font-medium">
      {silent ? "Silent" : "Ring"}
    </span>
  ),
  trailing: (
    <span
      className="pr-0.5 text-[13px] font-semibold"
      style={{ color: iOS.orange }}
    >
      {silent ? "On" : "Off"}
    </span>
  ),
});

export const chargingActivity = (percent = 82): IslandActivity => ({
  id: "charging",
  size: "compact",
  duration: 3000,
  leading: <BoltGlyph className="h-5 w-5" color={iOS.green} />,
  trailing: (
    <span
      className="pr-0.5 text-[15px] font-semibold tabular-nums"
      style={{ color: iOS.green }}
    >
      {percent}%
    </span>
  ),
});

export const airpodsActivity = (): IslandActivity => ({
  id: "airpods",
  size: "compact",
  duration: 3000,
  leading: <AirPodsGlyph className="h-6 w-6" />,
  center: <span className="text-[13px] font-medium">AirPods Pro</span>,
  trailing: (
    <span
      className="pr-0.5 text-[13px] font-semibold tabular-nums"
      style={{ color: iOS.green }}
    >
      98%
    </span>
  ),
});

export const timerActivity = (): IslandActivity => ({
  id: "timer",
  size: "compact",
  expandedSize: "expanded",
  duration: 6000,
  leading: <RingTimer color={iOS.orange} size={22} seconds={272} />,
  trailing: (
    <span
      className="pr-0.5 font-mono text-[15px] font-semibold tabular-nums"
      style={{ color: iOS.orange }}
    >
      4:32
    </span>
  ),
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3.5">
        <RingTimer color={iOS.orange} size={52} seconds={272} stroke={5} />
        <div>
          <p className="text-[13px] text-white/55">Timer</p>
          <p className="font-mono text-3xl font-semibold tabular-nums leading-tight">
            04:32
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 rounded-full bg-white/[0.14] py-2 text-[13px] font-medium transition active:scale-95">
          Cancel
        </button>
        <button
          className="flex-1 rounded-full py-2 text-[13px] font-semibold text-black transition active:scale-95"
          style={{ backgroundColor: iOS.orange }}
        >
          Pause
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
  leading: <Cover src={cover} className="h-7 w-7" />,
  trailing: <NowPlayingBars color={iOS.pink} />,
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3">
        <Cover src={cover} className="h-12 w-12" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold">{title}</p>
          <p className="truncate text-[13px] text-white/55">{artist}</p>
        </div>
        <NowPlayingBars color={iOS.pink} size={20} />
      </div>
      <div>
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-white"
            initial={{ width: "22%" }}
            animate={{ width: "64%" }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>
        <div className="mt-2 flex items-center justify-center gap-9 text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
            <path d="M7 6v12M20 6l-9 6 9 6V6z" />
          </svg>
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
            <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
          </svg>
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
            <path d="M17 6v12M4 6l9 6-9 6V6z" />
          </svg>
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
    <Blob className="h-6 w-6 rounded-[7px]" >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-[7px]"
        style={{ backgroundColor: iOS.green }}
      >
        <ManeuverGlyph className="h-4 w-4" />
      </span>
    </Blob>
  ),
  center: <span className="text-[13px] font-medium text-white/85">Market St</span>,
  trailing: (
    <span
      className="pr-0.5 text-[15px] font-semibold tabular-nums"
      style={{ color: iOS.green }}
    >
      400 ft
    </span>
  ),
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3.5">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ backgroundColor: iOS.green }}
        >
          <ManeuverGlyph className="h-6 w-6" />
        </span>
        <div>
          <p className="text-2xl font-semibold" style={{ color: iOS.green }}>
            400 ft
          </p>
          <p className="text-[13px] text-white/70">Turn right onto Market St</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-[13px] text-white/55">
        <span className="font-semibold text-white">12 min</span>
        <span>3.4 mi</span>
        <span>10:24 AM</span>
      </div>
    </div>
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
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: iOS.red }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <span
        className="font-mono text-[13px] tabular-nums"
        style={{ color: iOS.red }}
      >
        0:14
      </span>
    </div>
  ),
  trailing: <Waveform color={iOS.red} bars={7} />,
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3.5">
        <Blob className="h-11 w-11 bg-white/[0.08]">
          <MicGlyph className="h-6 w-6" color={iOS.red} />
        </Blob>
        <div>
          <p className="text-[15px] font-semibold">Voice Memo</p>
          <p
            className="font-mono text-[13px] tabular-nums"
            style={{ color: iOS.red }}
          >
            Recording · 0:14
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Waveform color={iOS.red} bars={16} />
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full active:scale-95"
          style={{ backgroundColor: iOS.red }}
        >
          <span className="h-3.5 w-3.5 rounded-[3px] bg-white" />
        </button>
      </div>
    </div>
  ),
});

export const callActivity = (
  caller = "Emma Thompson",
  avatar = "https://i.pravatar.cc/150?u=emma.thompson"
): IslandActivity => ({
  id: "call",
  size: "compact",
  expandedSize: "tall",
  duration: 9000,
  leading: (
    <span
      className="flex h-6 w-6 items-center justify-center rounded-full"
      style={{ backgroundColor: iOS.green }}
    >
      <PhoneGlyph className="h-3.5 w-3.5" />
    </span>
  ),
  trailing: <Waveform color={iOS.green} bars={7} />,
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt=""
          className="h-12 w-12 rounded-full object-cover ring-2 ring-white/10"
        />
        <div>
          <p className="text-[16px] font-semibold">{caller}</p>
          <p className="text-[13px]" style={{ color: iOS.green }}>
            calling…
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-1">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full active:scale-95"
          style={{ backgroundColor: iOS.red }}
        >
          <PhoneDownGlyph className="h-5 w-5" />
        </button>
        <Waveform color="#ffffff" bars={9} size={22} />
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full active:scale-95"
          style={{ backgroundColor: iOS.green }}
        >
          <PhoneGlyph className="h-5 w-5" />
        </button>
      </div>
    </div>
  ),
});

export const messageActivity = (
  name = "John Appleseed",
  avatar = "https://i.pravatar.cc/150?u=john.smith"
): IslandActivity => ({
  id: "message",
  size: "default",
  expandedSize: "expanded",
  duration: 5000,
  collapsed: (
    <div className="flex h-full w-full items-center gap-3 px-4">
      <img src={avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold leading-tight">
          {name}
        </p>
        <p className="truncate text-[13px] leading-tight text-white/60">
          Are we still on for lunch?
        </p>
      </div>
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: iOS.green }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
          <path d="M4 4h16v12H7l-3 3V4z" />
        </svg>
      </span>
    </div>
  ),
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-3">
        <img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
        <div>
          <p className="text-[15px] font-semibold">{name}</p>
          <p className="text-[13px] text-white/55">Messages · now</p>
        </div>
      </div>
      <p className="text-[14px] text-white/85">Are we still on for lunch?</p>
      <div className="flex gap-2">
        <button className="flex-1 rounded-full bg-white/[0.14] py-2 text-[13px] font-medium active:scale-95">
          Remind me
        </button>
        <button
          className="flex-1 rounded-full py-2 text-[13px] font-semibold text-black active:scale-95"
          style={{ backgroundColor: iOS.green }}
        >
          Reply
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
  leading: <CarGlyph className="h-6 w-6" />,
  center: <span className="text-[13px] font-medium">Arriving</span>,
  trailing: (
    <span className="pr-0.5 text-[15px] font-semibold" style={{ color: "#A3E635" }}>
      3 min
    </span>
  ),
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Blob className="h-11 w-11 bg-white/[0.08]">
            <CarGlyph className="h-6 w-6" />
          </Blob>
          <div>
            <p className="text-[15px] font-semibold">Marcus · Tesla</p>
            <p className="text-[13px] text-white/55">White · 7XYZ 123</p>
          </div>
        </div>
        <span className="text-2xl font-semibold" style={{ color: "#A3E635" }}>
          3 min
        </span>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{ backgroundColor: i < 10 ? "#A3E635" : "rgba(255,255,255,0.15)" }}
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
  leading: <PlaneGlyph className="h-5 w-5" color={iOS.teal} />,
  center: <span className="text-[13px] font-medium">SFO → JFK</span>,
  trailing: (
    <span className="pr-0.5 text-[13px] font-semibold" style={{ color: iOS.teal }}>
      Boarding
    </span>
  ),
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="text-center">
          <p className="text-xl font-semibold">SFO</p>
          <p className="text-[12px] text-white/50">10:40 AM</p>
        </div>
        <div className="flex flex-1 items-center px-3">
          <span className="h-[2px] flex-1 bg-white/20" />
          <PlaneGlyph className="mx-1 h-5 w-5" color={iOS.teal} />
          <span className="h-[2px] flex-1 bg-white/20" />
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">JFK</p>
          <p className="text-[12px] text-white/50">7:15 PM</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-white/55">Gate B12 · Seat 14C</span>
        <span
          className="rounded-full px-2.5 py-1 font-semibold text-black"
          style={{ backgroundColor: iOS.teal }}
        >
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
  leading: <span className="pl-0.5 text-[13px] font-bold">LAL 78</span>,
  center: (
    <span
      className="text-[11px] font-bold uppercase tracking-wide"
      style={{ color: iOS.yellow }}
    >
      Q4
    </span>
  ),
  trailing: <span className="pr-0.5 text-[13px] font-bold">82 BOS</span>,
  expanded: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#552583] text-[12px] font-bold">
            LAL
          </div>
          <span className="text-2xl font-bold">78</span>
        </div>
        <div className="text-center">
          <p className="text-[13px] font-semibold" style={{ color: iOS.yellow }}>
            Q4 · 2:14
          </p>
          <p className="text-[12px] text-white/45">NBA</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#007A33] text-[12px] font-bold">
            BOS
          </div>
          <span className="text-2xl font-bold">82</span>
        </div>
      </div>
      <p className="text-center text-[12px] text-white/45">Tap for play-by-play</p>
    </div>
  ),
});
