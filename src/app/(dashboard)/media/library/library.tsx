"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cinema, card, cardHover, AccentButton } from "../components/media-ui";
import { Clock, Download, Heart, ListVideo, Play, Plus } from "lucide-react";

const tabs = ["Playlists", "Liked", "Recents", "Downloads"];

const summary = [
  { label: "Playlists", value: "24", icon: ListVideo },
  { label: "Liked", value: "312", icon: Heart },
  { label: "Downloaded", value: "48", icon: Download },
  { label: "Hours saved", value: "126", icon: Clock },
];

const playlists = [
  { name: "Focus Flow", items: 42, kind: "Music", seed: "lib-1", tint: "text-orange-300 bg-orange-500/25" },
  { name: "Weekend Watch", items: 18, kind: "Video", seed: "lib-2", tint: "text-rose-300 bg-rose-500/25" },
  { name: "Travel Shots", items: 214, kind: "Album", seed: "lib-3", tint: "text-sky-300 bg-sky-500/25" },
  { name: "Deep Talks", items: 26, kind: "Podcast", seed: "lib-4", tint: "text-amber-300 bg-amber-500/25" },
  { name: "Late Night", items: 33, kind: "Music", seed: "lib-5", tint: "text-violet-300 bg-violet-500/25" },
  { name: "Nature 4K", items: 12, kind: "Video", seed: "lib-6", tint: "text-emerald-300 bg-emerald-500/25" },
];

const rows: Record<string, { title: string; meta: string; seed: string }[]> = {
  Liked: [
    { title: "Midnight City", meta: "Neon Fields · Music", seed: "lib-l1" },
    { title: "Aurora Borealis 4K", meta: "Wild Frame · Video", seed: "lib-l2" },
    { title: "The Long Game", meta: "Signal & Noise · Podcast", seed: "lib-l3" },
    { title: "Iceland 2025", meta: "214 photos · Album", seed: "lib-l4" },
  ],
  Recents: [
    { title: "Design Systems Talk", meta: "Watched 2h ago", seed: "lib-r1" },
    { title: "Golden Hour", meta: "Played yesterday", seed: "lib-r2" },
    { title: "Coastline Timelapse", meta: "Watched 2 days ago", seed: "lib-r3" },
    { title: "Deep Focus Mix", meta: "Played 3 days ago", seed: "lib-r4" },
  ],
  Downloads: [
    { title: "Lo-fi Sunset Mix", meta: "Music · 48 MB", seed: "lib-d1" },
    { title: "Milky Way Timelapse", meta: "Video · 240 MB", seed: "lib-d2" },
    { title: "The Draft — Ep 61", meta: "Podcast · 62 MB", seed: "lib-d3" },
  ],
};

export default function Library() {
  const [tab, setTab] = useState("Playlists");

  return (
    <Cinema title="Library">
      {/* header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Your library</h2>
          <p className="mt-1 text-sm text-muted-foreground">Playlists, favorites and downloads — all in one place</p>
        </div>
        <AccentButton>
          <span className="flex items-center gap-2"><Plus className="h-4 w-4" /> New playlist</span>
        </AccentButton>
      </div>

      {/* summary */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((s) => (
          <div key={s.label} className={`${card} flex items-center gap-3 p-4`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground dark:bg-white/5">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold leading-none tabular-nums text-foreground">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* tabs */}
      <div className="mb-5 flex gap-6 border-b border-border dark:border-white/5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative -mb-px pb-3 text-sm transition-colors ${
              tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
            {tab === t && (
              <motion.span layoutId="libTab" className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-orange-500" />
            )}
          </button>
        ))}
      </div>

      {tab === "Playlists" ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {playlists.map((p) => (
            <div key={p.name} className="group cursor-pointer overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://picsum.photos/seed/${p.seed}/600/380`} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-1xs font-medium ${p.tint}`}>{p.kind}</span>
                <div className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-orange-500 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <Play className="ml-0.5 h-5 w-5 fill-current" />
                </div>
                <div className="absolute bottom-3 left-3">
                  <p className="text-sm font-semibold leading-none text-white">{p.name}</p>
                  <p className="mt-1 text-1xs text-white/60">{p.items} items</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {tab === "Downloads" && (
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-foreground">
              <Download className="h-4 w-4 text-emerald-500" />
              <span><span className="font-semibold">3 items</span> available offline · 350 MB used</span>
              <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground dark:bg-white/5">Auto-download on</span>
            </div>
          )}
          {rows[tab].map((it) => (
            <div key={it.seed} className={`group ${card} ${cardHover} flex items-center gap-4 p-3`}>
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://picsum.photos/seed/${it.seed}/120/120`} alt={it.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="h-4 w-4 fill-white text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{it.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{it.meta}</p>
              </div>
              {tab === "Liked" ? (
                <Heart className="h-4 w-4 shrink-0 fill-orange-500 text-orange-500" />
              ) : tab === "Downloads" ? (
                <Download className="h-4 w-4 shrink-0 text-muted-foreground" />
              ) : (
                <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      )}
    </Cinema>
  );
}
