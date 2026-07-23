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
  Shield,
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

function Panel({
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
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground">
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
  { name: "Violet", cls: "bg-violet-600" },
  { name: "Rose", cls: "bg-rose-500" },
  { name: "Sky", cls: "bg-sky-500" },
  { name: "Emerald", cls: "bg-emerald-500" },
  { name: "Amber", cls: "bg-amber-500" },
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

        {/* Profile (flat) */}
        <div className={`${glass} p-6`}>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/avatar-80-01.jpg" alt="Profile" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold">Alex Rivera</p>
              <p className="text-sm text-muted-foreground">alex@media.app</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-400">
              <Sparkles className="h-3 w-3" /> Premium
            </span>
            <Button variant="outline" size="sm" className="rounded-full">
              Edit profile
            </Button>
          </div>
        </div>

        {/* Playback */}
        <Panel icon={Play} title="Playback" desc="How your media plays by default">
          <div className="mb-4">
            <p className="mb-2 text-sm font-medium">Streaming quality</p>
            <div className="flex flex-wrap gap-2">
              {qualities.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    quality === q
                      ? "bg-violet-600 text-white"
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
        </Panel>

        {/* Appearance */}
        <Panel icon={Palette} title="Appearance" desc="Personalize how Media looks">
          <p className="mb-3 text-sm font-medium">Accent color</p>
          <div className="flex flex-wrap gap-3">
            {accents.map((a) => (
              <button
                key={a.name}
                onClick={() => setAccent(a.name)}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  className={`h-10 w-10 rounded-full ${a.cls} ${
                    accent === a.name
                      ? "ring-2 ring-foreground ring-offset-2 ring-offset-card"
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
        </Panel>

        {/* Notifications */}
        <Panel icon={Bell} title="Notifications" desc="Choose what you hear about">
          <Row title="New from your channels" desc="When a followed creator goes live or posts" defaultChecked />
          <Separator />
          <Row title="Recommendations" desc="Weekly picks based on your taste" defaultChecked />
          <Separator />
          <Row title="Product updates" desc="News about new features" />
        </Panel>

        {/* Privacy */}
        <Panel icon={Shield} title="Privacy" desc="Control your data and history">
          <Row title="Save watch history" desc="Used to improve your recommendations" defaultChecked />
          <Separator />
          <Row title="Private profile" desc="Hide your activity from other users" />
          <Separator />
          <Row title="Personalized ads" desc="Show ads based on your interests" />
        </Panel>

        {/* Storage */}
        <Panel icon={HardDrive} title="Storage & data" desc="Manage downloads and network use">
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
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-muted p-3">
            <Wifi className="h-4 w-4 text-emerald-500" />
            <span className="text-sm">Connected · downloading over Wi-Fi</span>
            <Button variant="outline" size="sm" className="ml-auto rounded-full">
              Clear cache
            </Button>
          </div>
        </Panel>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed p-4">
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
          <Button variant="ghost" className="rounded-full">Reset</Button>
          <Button className="rounded-full bg-violet-600 text-white hover:bg-violet-700">
            Save changes
          </Button>
        </div>
      </div>
    </MediaPage>
  );
}
