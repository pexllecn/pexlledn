"use client";

import { useState } from "react";
import { Cinema, Label, card, cardHover, AccentButton } from "../components/media-ui";
import { Play, Pause, Plus, Rewind, FastForward, Mic } from "lucide-react";

const cats = ["Top", "Technology", "Business", "Design", "Science", "Culture", "Health"];

const featured = {
  title: "The Long Game — Building for the Next Decade",
  show: "Signal & Noise",
  desc: "A wide-ranging conversation on patience, compounding and why the best products are never rushed.",
  len: "1h 04m",
  seed: "pod-feat",
};

const bars = Array.from({ length: 44 }, (_, i) =>
  Math.round(28 + 60 * Math.abs(Math.sin(i * 1.1) * Math.cos(i * 0.5)))
);

const episodes = [
  { title: "Designing calm software", show: "Signal & Noise", len: "48:12", when: "Today", seed: "pod-1", pct: 30 },
  { title: "The economics of attention", show: "Deep Focus", len: "1:02:40", when: "Yesterday", seed: "pod-2", pct: 0 },
  { title: "Writing that lasts", show: "The Draft", len: "37:05", when: "2 days ago", seed: "pod-3", pct: 100 },
  { title: "Sound design secrets", show: "In The Mix", len: "55:20", when: "4 days ago", seed: "pod-4", pct: 0 },
  { title: "Cities of the future", show: "Blueprint", len: "1:11:00", when: "1 week ago", seed: "pod-5", pct: 0 },
];

const shows = [
  { name: "Signal & Noise", eps: 142, seed: "pod-s1" },
  { name: "Deep Focus", eps: 88, seed: "pod-s2" },
  { name: "The Draft", eps: 61, seed: "pod-s3" },
  { name: "In The Mix", eps: 204, seed: "pod-s4" },
  { name: "Blueprint", eps: 33, seed: "pod-s5" },
];

export default function Podcasts() {
  const [playing, setPlaying] = useState(false);
  const [cat, setCat] = useState("Top");

  return (
    <Cinema title="Podcasts">
      {/* categories */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              cat === c ? "bg-orange-500 text-white" : "border border-white/10 text-neutral-300 hover:bg-white/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* featured player */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1c3e] via-[#201a30] to-[#12101a] p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="relative aspect-square w-44 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${featured.seed}/400/400`}
              alt={featured.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex rounded-full bg-orange-500/15 px-3 py-1 text-xs font-medium text-orange-400">
              Featured episode
            </span>
            <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-white">
              {featured.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-400">{featured.show} · {featured.len}</p>
            <p className="mt-3 max-w-lg text-sm text-neutral-400">{featured.desc}</p>

            {/* waveform + controls */}
            <div className="mt-5 flex items-center gap-4">
              <button className="text-neutral-400 hover:text-white"><Rewind className="h-5 w-5" /></button>
              <button
                onClick={() => setPlaying((p) => !p)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-600"
              >
                {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
              </button>
              <button className="text-neutral-400 hover:text-white"><FastForward className="h-5 w-5" /></button>
              <div className="flex h-8 flex-1 items-center gap-[3px]">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={`w-full rounded-full ${i < bars.length * 0.28 ? "bg-orange-500" : "bg-white/15"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <span className="shrink-0 text-xs tabular-nums text-neutral-400">18:04 / {featured.len}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* episodes */}
        <div>
          <Label action="See all">Latest episodes</Label>
          <div className="space-y-2">
            {episodes.map((e) => (
              <div key={e.seed} className={`group ${card} ${cardHover} flex items-center gap-4 p-3`}>
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://picsum.photos/seed/${e.seed}/120/120`} alt={e.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="h-5 w-5 fill-white text-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{e.title}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">{e.show} · {e.when}</p>
                  {e.pct > 0 && e.pct < 100 && (
                    <div className="mt-2 h-1 w-full max-w-xs rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-orange-500" style={{ width: `${e.pct}%` }} />
                    </div>
                  )}
                  {e.pct === 100 && <span className="text-1xs text-emerald-500">Played</span>}
                </div>
                <span className="shrink-0 text-xs tabular-nums text-neutral-500">{e.len}</span>
                <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-neutral-300 hover:bg-white/5">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* subscribed shows */}
        <aside>
          <Label action="See all">Your shows</Label>
          <div className="grid grid-cols-3 gap-4 xl:grid-cols-2">
            {shows.map((s) => (
              <div key={s.seed} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://picsum.photos/seed/${s.seed}/200/200`} alt={s.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="mt-2 truncate text-sm font-medium text-white">{s.name}</p>
                <p className="text-xs text-neutral-500">{s.eps} episodes</p>
              </div>
            ))}
          </div>
          <div className={`${card} mt-6 p-5`}>
            <Mic className="h-5 w-5 text-orange-400" />
            <p className="mt-3 text-sm font-medium text-white">Discover new shows</p>
            <p className="mt-1 text-xs text-neutral-500">
              Hand-picked podcasts based on what you listen to.
            </p>
            <AccentButton className="mt-4">Explore</AccentButton>
          </div>
        </aside>
      </div>
    </Cinema>
  );
}
