"use client";

import { useState } from "react";
import { Cinema, card, AccentButton } from "../components/media-ui";
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

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-orange-500" : "bg-white/15"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}`}
      />
    </button>
  );
}

function Row({ title, desc, on, toggle }: { title: string; desc: string; on: boolean; toggle: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-white/5 py-3.5 first:border-t-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-0.5 text-xs text-neutral-500">{desc}</p>
      </div>
      <Toggle on={on} onClick={toggle} />
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
    <div className={`${card} p-6`}>
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-orange-400">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
          <p className="text-xs text-neutral-500">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

const qualities = ["Auto", "480p", "720p", "1080p", "4K"];
const accents = [
  { name: "Orange", cls: "bg-orange-500" },
  { name: "Rose", cls: "bg-rose-500" },
  { name: "Sky", cls: "bg-sky-500" },
  { name: "Emerald", cls: "bg-emerald-500" },
  { name: "Violet", cls: "bg-violet-500" },
];

export default function Settings() {
  const [quality, setQuality] = useState("1080p");
  const [accent, setAccent] = useState("Orange");
  const [storage, setStorage] = useState(12);
  const [flags, setFlags] = useState<Record<string, boolean>>({
    autoplay: true,
    continuous: true,
    gapless: false,
    motion: false,
    cinematic: true,
    chNew: true,
    recs: true,
    updates: false,
    history: true,
    privateP: false,
    ads: false,
    wifi: true,
    cellular: false,
  });
  const t = (k: string) => setFlags((f) => ({ ...f, [k]: !f[k] }));

  return (
    <Cinema title="Settings">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white">Media settings</h2>
          <p className="mt-1 text-sm text-neutral-400">Tune playback, appearance and storage to taste</p>
        </div>

        {/* profile */}
        <div className={`${card} flex flex-wrap items-center gap-4 p-6`}>
          <div className="h-16 w-16 overflow-hidden rounded-full ring-1 ring-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar-80-01.jpg" alt="Profile" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold text-white">Alex Rivera</p>
            <p className="text-sm text-neutral-500">alex@media.app</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 px-3 py-1 text-xs font-medium text-orange-400">
            <Sparkles className="h-3 w-3" /> Premium
          </span>
          <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-200 hover:bg-white/5">Edit profile</button>
        </div>

        {/* playback */}
        <Panel icon={Play} title="Playback" desc="How your media plays by default">
          <div className="mb-4">
            <p className="mb-2 text-sm font-medium text-white">Streaming quality</p>
            <div className="flex flex-wrap gap-2">
              {qualities.map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    quality === q ? "bg-orange-500 text-white" : "bg-white/5 text-neutral-300 hover:bg-white/10"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <Row title="Autoplay next" desc="Automatically play the next item in a queue" on={flags.autoplay} toggle={() => t("autoplay")} />
          <Row title="Continuous playback" desc="Pick up where you left off across devices" on={flags.continuous} toggle={() => t("continuous")} />
          <Row title="Gapless audio" desc="Remove silence between tracks" on={flags.gapless} toggle={() => t("gapless")} />
        </Panel>

        {/* appearance */}
        <Panel icon={Palette} title="Appearance" desc="Personalize how Media looks">
          <p className="mb-3 text-sm font-medium text-white">Accent color</p>
          <div className="mb-4 flex flex-wrap gap-3">
            {accents.map((a) => (
              <button key={a.name} onClick={() => setAccent(a.name)} className="flex flex-col items-center gap-1.5">
                <span className={`h-10 w-10 rounded-full ${a.cls} ${accent === a.name ? "ring-2 ring-white ring-offset-2 ring-offset-[#0d0d10]" : ""}`} />
                <span className="text-1xs text-neutral-500">{a.name}</span>
              </button>
            ))}
          </div>
          <Row title="Reduce motion" desc="Minimize animations across the app" on={flags.motion} toggle={() => t("motion")} />
          <Row title="Cinematic mode" desc="Dim the interface while watching videos" on={flags.cinematic} toggle={() => t("cinematic")} />
        </Panel>

        {/* notifications */}
        <Panel icon={Bell} title="Notifications" desc="Choose what you hear about">
          <Row title="New from your channels" desc="When a followed creator goes live or posts" on={flags.chNew} toggle={() => t("chNew")} />
          <Row title="Recommendations" desc="Weekly picks based on your taste" on={flags.recs} toggle={() => t("recs")} />
          <Row title="Product updates" desc="News about new features" on={flags.updates} toggle={() => t("updates")} />
        </Panel>

        {/* privacy */}
        <Panel icon={Shield} title="Privacy" desc="Control your data and history">
          <Row title="Save watch history" desc="Used to improve your recommendations" on={flags.history} toggle={() => t("history")} />
          <Row title="Private profile" desc="Hide your activity from other users" on={flags.privateP} toggle={() => t("privateP")} />
          <Row title="Personalized ads" desc="Show ads based on your interests" on={flags.ads} toggle={() => t("ads")} />
        </Panel>

        {/* storage */}
        <Panel icon={HardDrive} title="Storage & data" desc="Manage downloads and network use">
          <div className="mb-2 flex items-center justify-between text-sm text-neutral-200">
            <span className="flex items-center gap-2"><Download className="h-4 w-4 text-neutral-500" /> Download cache limit</span>
            <span className="font-semibold tabular-nums text-white">{storage} GB</span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            value={storage}
            onChange={(e) => setStorage(Number(e.target.value))}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-orange-500"
          />
          <div className="mt-1 flex justify-between text-1xs text-neutral-600"><span>0 GB</span><span>50 GB</span></div>
          <div className="mt-4">
            <Row title="Download over Wi-Fi only" desc="Avoid using mobile data for downloads" on={flags.wifi} toggle={() => t("wifi")} />
            <Row title="Stream in high quality on cellular" desc="May use significantly more data" on={flags.cellular} toggle={() => t("cellular")} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-white/5 p-3">
            <Wifi className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-neutral-200">Connected · downloading over Wi-Fi</span>
            <button className="ml-auto rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/5">Clear cache</button>
          </div>
        </Panel>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Monitor className="h-5 w-5 text-neutral-500" />
            <div>
              <p className="text-sm font-medium text-white">Connected devices</p>
              <p className="text-xs text-neutral-500">3 devices signed in</p>
            </div>
          </div>
          <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-200 hover:bg-white/5">Manage</button>
        </div>

        <div className="flex justify-end gap-2 pb-1">
          <button className="rounded-full px-4 py-2 text-sm text-neutral-400 hover:text-white">Reset</button>
          <AccentButton>Save changes</AccentButton>
        </div>
      </div>
    </Cinema>
  );
}
