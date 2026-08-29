"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  Hair,
  Row,
  Segmented,
  Surface,
  Toggle,
} from "../components/apple-ui";
import { Donut, Meter } from "../components/apple-charts";
import {
  Accessibility,
  Bell,
  Bluetooth,
  ChevronRight,
  Cloud,
  Focus,
  Globe,
  Keyboard,
  Lock,
  Monitor,
  Moon,
  Palette,
  Search,
  Shield,
  Sun,
  Volume2,
  Wifi,
} from "lucide-react";

const groups = [
  {
    title: "Network",
    rows: [
      { icon: <Wifi className="h-3.5 w-3.5" />, tint: A.blue, title: "Wi-Fi", subtitle: "Studio 5G", toggle: true, on: true },
      { icon: <Bluetooth className="h-3.5 w-3.5" />, tint: A.blue, title: "Bluetooth", subtitle: "4 devices", toggle: true, on: true },
      { icon: <Globe className="h-3.5 w-3.5" />, tint: A.orange, title: "Network", subtitle: "Ethernet, VPN, DNS", chevron: true },
    ],
  },
  {
    title: "Personal",
    rows: [
      { icon: <Bell className="h-3.5 w-3.5" />, tint: A.red, title: "Notifications", subtitle: "Banners, badges, sounds", chevron: true },
      { icon: <Volume2 className="h-3.5 w-3.5" />, tint: A.pink, title: "Sound", subtitle: "Alert volume 68%", chevron: true },
      { icon: <Focus className="h-3.5 w-3.5" />, tint: A.purple, title: "Focus", subtitle: "Work · until 18:00", toggle: true, on: true },
      { icon: <Monitor className="h-3.5 w-3.5" />, tint: A.teal, title: "Screen Time", subtitle: "6h 12m daily average", chevron: true },
    ],
  },
  {
    title: "Privacy & Security",
    rows: [
      { icon: <Lock className="h-3.5 w-3.5" />, tint: A.gray, title: "Lock Screen", subtitle: "Require password after 5 min", chevron: true },
      { icon: <Shield className="h-3.5 w-3.5" />, tint: A.blue, title: "Privacy & Security", subtitle: "FileVault on · 2FA on", chevron: true },
      { icon: <Cloud className="h-3.5 w-3.5" />, tint: A.blue, title: "iCloud", subtitle: "184 GB of 2 TB used", chevron: true },
    ],
  },
  {
    title: "Input",
    rows: [
      { icon: <Keyboard className="h-3.5 w-3.5" />, tint: A.gray, title: "Keyboard", subtitle: "Shortcuts, dictation", chevron: true },
      { icon: <Accessibility className="h-3.5 w-3.5" />, tint: A.blue, title: "Accessibility", subtitle: "VoiceOver, Zoom, Motion", chevron: true },
    ],
  },
];

const motion = [
  { label: "Reduce motion", on: false },
  { label: "Reduce transparency", on: false },
  { label: "Increase contrast", on: false },
  { label: "Differentiate without colour", on: true },
];

const accents = [
  { name: "Blue", color: A.blue },
  { name: "Purple", color: A.purple },
  { name: "Pink", color: A.pink },
  { name: "Red", color: A.red },
  { name: "Orange", color: A.orange },
  { name: "Green", color: A.green },
  { name: "Teal", color: A.teal },
  { name: "Graphite", color: A.gray },
];

const storage = [
  { label: "Applications", pct: 32, size: "148 GB", color: A.blue },
  { label: "Photos", pct: 26, size: "121 GB", color: A.lime },
  { label: "Documents", pct: 18, size: "84 GB", color: A.purple },
  { label: "System Data", pct: 14, size: "65 GB", color: A.pink },
  { label: "macOS", pct: 10, size: "46 GB", color: A.gray },
];

export default function Settings() {
  const [accent, setAccent] = React.useState("Blue");

  return (
    <AppleShell title="Settings" showFilters={false} notifications={1}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-4">
          {/* Account */}
          <Surface className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/[0.06] text-[22px] font-medium text-foreground/60 dark:bg-white/[0.08]">
                M
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[17px] font-semibold tracking-[-0.01em] text-foreground">
                  Mertcan Esmergül
                </p>
                <p className="truncate text-[13px] text-muted-foreground">
                  Apple Account · iCloud+ 2 TB
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>

            <label className="mt-4 flex h-9 items-center gap-2 rounded-full bg-black/[0.045] px-3.5 dark:bg-white/[0.06]">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Search settings"
                className="w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
              />
            </label>
          </Surface>

          {groups.map((g) => (
            <div key={g.title}>
              <p className="mb-2 px-2 text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
                {g.title}
              </p>
              <Surface className="overflow-hidden">
                {g.rows.map((r, i) => (
                  <React.Fragment key={r.title}>
                    {i > 0 && <Hair className="ml-14" />}
                    <Row
                      icon={r.icon}
                      tint={r.tint}
                      title={r.title}
                      subtitle={r.subtitle}
                      right={
                        r.toggle ? (
                          <Toggle checked={r.on} />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )
                      }
                    />
                  </React.Fragment>
                ))}
              </Surface>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div className="min-w-0 space-y-4">
          <Surface className="p-5">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-[#8E5BF6]" />
              <p className="text-[14px] font-medium text-foreground">Appearance</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Light", icon: <Sun className="h-4 w-4" />, active: true },
                { label: "Dark", icon: <Moon className="h-4 w-4" /> },
                { label: "Auto", icon: <Monitor className="h-4 w-4" /> },
              ].map((m) => (
                <button
                  key={m.label}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border py-3 transition-colors ${
                    m.active
                      ? "border-[#0A6CFF] bg-[#0A6CFF]/[0.07] text-[#0A6CFF]"
                      : "border-black/[0.07] text-muted-foreground hover:bg-black/[0.03] dark:border-white/[0.08] dark:hover:bg-white/[0.05]"
                  }`}
                >
                  {m.icon}
                  <span className="text-[12px] font-medium">{m.label}</span>
                </button>
              ))}
            </div>

            <p className="mt-5 text-[13px] text-muted-foreground">Accent colour</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {accents.map((a) => (
                <button
                  key={a.name}
                  onClick={() => setAccent(a.name)}
                  aria-label={a.name}
                  className={`h-7 w-7 rounded-full transition-transform ${
                    accent === a.name
                      ? "ring-2 ring-offset-2 ring-offset-background"
                      : "hover:scale-110"
                  }`}
                  style={{
                    backgroundColor: a.color,
                    boxShadow:
                      accent === a.name ? `0 0 0 2px ${a.color}` : undefined,
                  }}
                />
              ))}
            </div>

            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-[13px]">
                <span className="text-muted-foreground">Text size</span>
                <span className="tabular-nums text-muted-foreground">Default</span>
              </div>
              <Meter pct={50} color={A.blue} />
            </div>

            <div className="mt-5">
              <Segmented options={["Compact", "Comfortable"]} value="Comfortable" />
            </div>
          </Surface>

          <Surface className="overflow-hidden">
            <p className="px-5 py-4 text-[14px] font-medium text-foreground">
              Motion & contrast
            </p>
            <Hair />
            {motion.map((m, i) => (
              <React.Fragment key={m.label}>
                {i > 0 && <Hair className="ml-5" />}
                <div className="flex items-center gap-3 px-5 py-3">
                  <span className="flex-1 text-[14px] text-foreground">{m.label}</span>
                  <Toggle checked={m.on} />
                </div>
              </React.Fragment>
            ))}
          </Surface>

          <Surface className="p-5">
            <p className="text-[14px] font-medium text-foreground">Storage</p>
            <div className="mt-4 flex items-center gap-4">
              <Donut pct={72} color={A.blue} size={92} label="72%" />
              <div>
                <p className="text-[18px] font-semibold tabular-nums text-foreground">
                  464 GB
                </p>
                <p className="text-[12px] text-muted-foreground">used of 1 TB</p>
              </div>
            </div>
            <div className="mt-5 space-y-2.5">
              {storage.map((s) => (
                <div key={s.label}>
                  <div className="mb-1 flex items-center justify-between text-[12px]">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.label}
                    </span>
                    <span className="tabular-nums text-muted-foreground">{s.size}</span>
                  </div>
                  <Meter pct={s.pct} color={s.color} />
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="p-5">
            <p className="text-[14px] font-medium text-foreground">About</p>
            <div className="mt-3 space-y-2 text-[13px]">
              {[
                ["Version", "Apple Design 1.0"],
                ["Build", "2026.8.28"],
                ["Chip", "M4 Max"],
                ["Memory", "48 GB"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium tabular-nums text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </div>
    </AppleShell>
  );
}
