"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Download,
  HardDrive,
  Monitor,
  Palette,
  Play,
  Sparkles,
  Wifi,
} from "lucide-react";
import { MediaPage, GradientText, glass } from "../components/media-ui";

const qualities = ["Auto", "480p", "720p", "1080p", "4K"];

function Row({
  title,
  desc,
  defaultChecked,
}: {
  title: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${glass} p-6`}>
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

const accents = [
  { name: "Violet", cls: "from-violet-500 to-fuchsia-500" },
  { name: "Rose", cls: "from-rose-500 to-orange-400" },
  { name: "Sky", cls: "from-sky-500 to-cyan-400" },
  { name: "Emerald", cls: "from-emerald-500 to-teal-400" },
  { name: "Amber", cls: "from-amber-500 to-yellow-400" },
];

export default function Settings() {
  const [quality, setQuality] = useState("1080p");
  const [accent, setAccent] = useState("Violet");
  const [storage, setStorage] = useState([12]);

  return (
    <MediaPage title="Settings">
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight">
            Media <GradientText>settings</GradientText>
          </h2>
          <p className="mt-1.5 text-muted-foreground">
            Tune playback, appearance and storage to taste
          </p>
        </div>

        {/* Profile */}
        <div className="overflow-hidden rounded-3xl border border-border/60">
          <div className="relative h-28 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
          </div>
          <div className="bg-card/70 p-6 pt-0 backdrop-blur-xl">
            <div className="-mt-10 flex items-end gap-4">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarImage src="/avatar-80-01.jpg" alt="Profile" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="flex-1 pb-1">
                <p className="text-lg font-semibold">Alex Rivera</p>
                <p className="text-sm text-muted-foreground">alex@media.app</p>
              </div>
              <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 py-1 text-xs font-medium text-white">
                <Sparkles className="h-3 w-3" /> Premium
              </span>
            </div>
          </div>
        </div>

        {/* Playback */}
        <Card icon={Play} title="Playback" desc="How your media plays by default">
          <div className="mb-4">
            <p className="mb-2 text-sm font-medium">Streaming quality</p>
            <div className="flex flex-wrap gap-2">
              {qualities.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-all ${
                    quality === q
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/25"
                      : "bg-muted hover:bg-muted/70"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <Separator />
          <Row title="Autoplay next" desc="Automatically play the next item in a queue" defaultChecked />
          <Separator />
          <Row title="Continuous playback" desc="Pick up where you left off across devices" defaultChecked />
          <Separator />
          <Row title="Gapless audio" desc="Remove silence between tracks" />
        </Card>

        {/* Appearance */}
        <Card icon={Palette} title="Appearance" desc="Personalize how Media looks">
          <p className="mb-3 text-sm font-medium">Accent color</p>
          <div className="flex flex-wrap gap-3">
            {accents.map((a) => (
              <button
                key={a.name}
                onClick={() => setAccent(a.name)}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  className={`h-10 w-10 rounded-full bg-gradient-to-br ${a.cls} transition-transform ${
                    accent === a.name
                      ? "scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-card"
                      : ""
                  }`}
                />
                <span className="text-1xs text-muted-foreground">{a.name}</span>
              </button>
            ))}
          </div>
          <Separator className="my-4" />
          <Row title="Reduce motion" desc="Minimize animations across the app" />
          <Separator />
          <Row title="Cinematic mode" desc="Dim the interface while watching videos" defaultChecked />
        </Card>

        {/* Notifications */}
        <Card icon={Bell} title="Notifications" desc="Choose what you hear about">
          <Row title="New from your channels" desc="When a followed creator goes live or posts" defaultChecked />
          <Separator />
          <Row title="Recommendations" desc="Weekly picks based on your taste" defaultChecked />
          <Separator />
          <Row title="Product updates" desc="News about new features" />
        </Card>

        {/* Storage */}
        <Card icon={HardDrive} title="Storage & data" desc="Manage downloads and network use">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Download className="h-4 w-4 text-muted-foreground" />
              Download cache limit
            </span>
            <span className="font-semibold tabular-nums">{storage[0]} GB</span>
          </div>
          <Slider value={storage} onValueChange={setStorage} max={50} step={1} />
          <div className="mt-1 flex justify-between text-1xs text-muted-foreground">
            <span>0 GB</span>
            <span>50 GB</span>
          </div>
          <Separator className="my-4" />
          <Row title="Download over Wi-Fi only" desc="Avoid using mobile data for downloads" defaultChecked />
          <Separator />
          <Row title="Stream in high quality on cellular" desc="May use significantly more data" />
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-muted p-3">
            <Wifi className="h-4 w-4 text-emerald-500" />
            <span className="text-sm">Connected · downloading over Wi-Fi</span>
            <Button variant="outline" size="sm" className="ml-auto rounded-full">
              Clear cache
            </Button>
          </div>
        </Card>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-border p-4">
          <div className="flex items-center gap-3">
            <Monitor className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Connected devices</p>
              <p className="text-xs text-muted-foreground">3 devices signed in</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-full">
            Manage
          </Button>
        </div>

        <div className="flex justify-end gap-2 pb-2">
          <Button variant="ghost" className="rounded-full">
            Reset
          </Button>
          <Button className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-none shadow-lg shadow-fuchsia-500/25 hover:opacity-90">
            Save changes
          </Button>
        </div>
      </div>
    </MediaPage>
  );
}
