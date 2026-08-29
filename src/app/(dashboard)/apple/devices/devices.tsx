"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  AppleShell,
  A,
  Row,
  Stat,
  stagger,
} from "../components/apple-ui";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Donut, Meter, Spark } from "../components/apple-charts";
import {
  Battery,
  Bluetooth,
  Headphones,
  Laptop,
  MapPin,
  Monitor,
  RefreshCw,
  Shield,
  Smartphone,
  Tablet,
  Volume2,
  Watch,
  Wifi,
} from "lucide-react";

const devices = [
  {
    name: "MacBook Pro 16\"",
    model: "M4 Max · 48 GB",
    icon: <Laptop className="h-5 w-5" />,
    tint: A.blue,
    battery: 82,
    storage: 68,
    where: "Studio · Istanbul",
    status: "This device",
    trend: [72, 78, 74, 80, 84, 82, 82],
  },
  {
    name: "iPhone 17 Pro",
    model: "256 GB · Natural Titanium",
    icon: <Smartphone className="h-5 w-5" />,
    tint: A.purple,
    battery: 64,
    storage: 74,
    where: "Kadıköy · 2 min ago",
    status: "Online",
    trend: [90, 84, 78, 72, 68, 66, 64],
  },
  {
    name: "iPad Pro 13\"",
    model: "M4 · 1 TB",
    icon: <Tablet className="h-5 w-5" />,
    tint: A.teal,
    battery: 41,
    storage: 52,
    where: "Home · 1 hr ago",
    status: "Online",
    trend: [62, 58, 54, 50, 46, 43, 41],
  },
  {
    name: "Apple Watch Ultra",
    model: "49 mm · Titanium",
    icon: <Watch className="h-5 w-5" />,
    tint: A.orange,
    battery: 93,
    storage: 22,
    where: "On wrist",
    status: "Online",
    trend: [98, 97, 96, 95, 94, 93, 93],
  },
  {
    name: "Studio Display",
    model: "27\" 5K Retina",
    icon: <Monitor className="h-5 w-5" />,
    tint: A.gray,
    battery: 100,
    storage: 4,
    where: "Studio · Istanbul",
    status: "Connected",
    trend: [100, 100, 100, 100, 100, 100, 100],
  },
  {
    name: "AirPods Pro 3",
    model: "USB-C · MagSafe",
    icon: <Headphones className="h-5 w-5" />,
    tint: A.pink,
    battery: 58,
    storage: 0,
    where: "In case · nearby",
    status: "Connected",
    trend: [84, 78, 72, 68, 64, 60, 58],
  },
];

const network = [
  { icon: <Wifi className="h-3.5 w-3.5" />, tint: A.blue, label: "Wi-Fi", meta: "Studio 5G · 867 Mbps", on: true },
  { icon: <Bluetooth className="h-3.5 w-3.5" />, tint: A.blue, label: "Bluetooth", meta: "4 devices paired", on: true },
  { icon: <MapPin className="h-3.5 w-3.5" />, tint: A.green, label: "Find My", meta: "All devices visible", on: true },
  { icon: <Shield className="h-3.5 w-3.5" />, tint: A.orange, label: "Private Relay", meta: "On for this network", on: true },
  { icon: <RefreshCw className="h-3.5 w-3.5" />, tint: A.purple, label: "Handoff", meta: "Continue across devices", on: false },
  { icon: <Volume2 className="h-3.5 w-3.5" />, tint: A.pink, label: "AirPlay receiver", meta: "Anyone on same network", on: false },
];

export default function Devices() {
  return (
    <AppleShell title="Devices" action="Add device">
      <div className="min-w-0 space-y-4">
        <motion.div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
          <Stat icon={<Laptop className="h-4 w-4" />} label="Signed in" value="6" hint="devices on this Apple Account" />
          <Stat icon={<Battery className="h-4 w-4" />} label="Average battery" value="73%" delta={-4.2} />
          <Stat icon={<Wifi className="h-4 w-4" />} label="Network" value="867" hint="Mbps on Studio 5G" delta={2.8} />
          <Stat icon={<Shield className="h-4 w-4" />} label="Security" value="All clear" hint="2FA on · no alerts" />
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-4 sm:grid-cols-2">
            {devices.map((d) => (
              <Card key={d.name} className="p-5">
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: d.tint }}
                  >
                    {d.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold text-foreground">
                      {d.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {d.model}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md bg-[#34C759]/12 px-2 py-0.5 text-xs font-medium text-[#248A3D] dark:text-[#5CE07E]">
                    {d.status}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <Donut
                    pct={d.battery}
                    color={d.battery < 45 ? A.orange : A.green}
                    size={78}
                    label={`${d.battery}%`}
                  />
                  <div className="min-w-0 flex-1 space-y-3">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Storage</span>
                        <span className="tabular-nums text-muted-foreground">
                          {d.storage}%
                        </span>
                      </div>
                      <Meter pct={d.storage} color={d.tint} />
                    </div>
                    <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" /> {d.where}
                    </p>
                  </div>
                  <Spark data={d.trend} color={d.tint} className="hidden sm:block" />
                </div>
              </Card>
            ))}
          </div>

          <div className="min-w-0 space-y-4">
            <Card className="min-w-0 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4">
                <MapPin className="h-4 w-4 text-[#34C759]" />
                <p className="text-base font-medium text-foreground">Find My</p>
              </div>
              <Separator />
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://picsum.photos/seed/ap-findmy/600/420"
                  alt="Map showing device locations"
                  className="h-[220px] w-full object-cover"
                />
                {[
                  { top: "32%", left: "38%", tint: A.blue },
                  { top: "54%", left: "62%", tint: A.purple },
                  { top: "68%", left: "28%", tint: A.teal },
                ].map((p, i) => (
                  <span
                    key={i}
                    className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white shadow-md"
                    style={{ top: p.top, left: p.left, backgroundColor: p.tint }}
                  />
                ))}
              </div>
              <Separator />
              <p className="px-5 py-3 text-xs text-muted-foreground">
                3 devices near Istanbul · updated 2 min ago
              </p>
            </Card>

            <Card className="min-w-0 overflow-hidden">
              <p className="px-5 py-4 text-base font-medium text-foreground">
                Connectivity
              </p>
              <Separator />
              {network.map((n, i) => (
                <React.Fragment key={n.label}>
                  {i > 0 && <Separator className="ml-14 w-auto" />}
                  <Row
                    icon={n.icon}
                    tint={n.tint}
                    title={n.label}
                    subtitle={n.meta}
                    right={<Switch defaultChecked={n.on} />}
                  />
                </React.Fragment>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </AppleShell>
  );
}
