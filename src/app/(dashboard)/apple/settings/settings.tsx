"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  Row,
  Segmented,
} from "../components/apple-ui";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
          <Card className="min-w-0 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-2xl font-medium text-foreground/60">
                M
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xl font-semibold tracking-tight text-foreground">
                  Mertcan Esmergül
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  Apple Account · iCloud+ 2 TB
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>

            <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search settings" className="rounded-full pl-8" />
              </div>
          </Card>

          {groups.map((g) => (
            <div key={g.title}>
              <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {g.title}
              </p>
              <Card className="min-w-0 overflow-hidden">
                {g.rows.map((r, i) => (
                  <React.Fragment key={r.title}>
                    {i > 0 && <Separator className="ml-14 w-auto" />}
                    <Row
                      icon={r.icon}
                      tint={r.tint}
                      title={r.title}
                      subtitle={r.subtitle}
                      right={
                        r.toggle ? (
                          <Switch defaultChecked={r.on} />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )
                      }
                    />
                  </React.Fragment>
                ))}
              </Card>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div className="min-w-0 space-y-4">
          <Card className="min-w-0 p-5">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-[#8E5BF6]" />
              <p className="text-base font-medium text-foreground">Appearance</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Light", icon: <Sun className="h-4 w-4" />, active: true },
                { label: "Dark", icon: <Moon className="h-4 w-4" /> },
                { label: "Auto", icon: <Monitor className="h-4 w-4" /> },
              ].map((m) => (
                <Button variant="ghost" key={m.label}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border py-3 transition-colors ${
                    m.active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input text-muted-foreground hover:bg-muted"
                  }`}>
                  {m.icon}
                  <span className="text-xs font-medium">{m.label}</span>
                </Button>
              ))}
            </div>

            <p className="mt-5 text-sm text-muted-foreground">Accent colour</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {accents.map((a) => (
                <Button variant="ghost" key={a.name}
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
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Text size</span>
                <span className="tabular-nums text-muted-foreground">Default</span>
              </div>
              <Meter pct={50} color={A.blue} />
            </div>

            <div className="mt-5">
              <Segmented options={["Compact", "Comfortable"]} value="Comfortable" />
            </div>
          </Card>

          <Card className="min-w-0 overflow-hidden">
            <p className="px-5 py-4 text-base font-medium text-foreground">
              Motion & contrast
            </p>
            <Separator />
            {motion.map((m, i) => (
              <React.Fragment key={m.label}>
                {i > 0 && <Separator className="ml-5 w-auto" />}
                <div className="flex items-center gap-3 px-5 py-3">
                  <span className="flex-1 text-base text-foreground">{m.label}</span>
                  <Switch defaultChecked={m.on} />
                </div>
              </React.Fragment>
            ))}
          </Card>

          <Card className="min-w-0 p-5">
            <p className="text-base font-medium text-foreground">Storage</p>
            <div className="mt-4 flex items-center gap-4">
              <Donut pct={72} color={A.blue} size={92} label="72%" />
              <div>
                <p className="text-xl font-semibold tabular-nums text-foreground">
                  464 GB
                </p>
                <p className="text-xs text-muted-foreground">used of 1 TB</p>
              </div>
            </div>
            <div className="mt-5 space-y-2.5">
              {storage.map((s) => (
                <div key={s.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
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
          </Card>

          <Card className="min-w-0 p-5">
            <p className="text-base font-medium text-foreground">About</p>
            <div className="mt-3 space-y-2 text-sm">
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
          </Card>
        </div>
      </div>
    </AppleShell>
  );
}
