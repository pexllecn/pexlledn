"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Mic, Pause, Play, Plus, Rewind, FastForward } from "lucide-react";
import {
  MediaPage,
  GradientText,
  SectionHeading,
  glass,
  glassHover,
} from "../components/media-ui";

const featured = {
  title: "The Long Game — Building for the Next Decade",
  show: "Signal & Noise",
  seed: "pod-feat",
  desc: "A wide-ranging conversation on patience, compounding and why the best products are never rushed.",
  len: "1h 04m",
};

const cats = ["Top", "Technology", "Business", "Design", "Science", "Culture", "Health"];

const episodes = [
  { title: "Designing calm software", show: "Signal & Noise", len: "48:12", when: "Today", seed: "pod-1", progress: 30 },
  { title: "The economics of attention", show: "Deep Focus", len: "1:02:40", when: "Yesterday", seed: "pod-2", progress: 0 },
  { title: "Writing that lasts", show: "The Draft", len: "37:05", when: "2 days ago", seed: "pod-3", progress: 100 },
  { title: "Sound design secrets", show: "In The Mix", len: "55:20", when: "4 days ago", seed: "pod-4", progress: 0 },
  { title: "Cities of the future", show: "Blueprint", len: "1:11:00", when: "1 week ago", seed: "pod-5", progress: 0 },
];

const shows = [
  { name: "Signal & Noise", eps: 142, seed: "pod-s1" },
  { name: "Deep Focus", eps: 88, seed: "pod-s2" },
  { name: "The Draft", eps: 61, seed: "pod-s3" },
  { name: "In The Mix", eps: 204, seed: "pod-s4" },
];

const charts = [
  { name: "The Long Game", author: "Signal & Noise", seed: "pod-c1" },
  { name: "Deep Work Daily", author: "Deep Focus", seed: "pod-c2" },
  { name: "Blueprints", author: "Blueprint", seed: "pod-c3" },
  { name: "First Draft", author: "The Draft", seed: "pod-c4" },
  { name: "On Repeat", author: "In The Mix", seed: "pod-c5" },
];

export default function Podcasts() {
  const [playing, setPlaying] = useState(false);
  const [cat, setCat] = useState("Top");

  return (
    <MediaPage title="Podcasts">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight">
            <GradientText>Podcasts</GradientText>
          </h2>
          <p className="mt-1.5 text-muted-foreground">
            Fresh episodes from shows you follow
          </p>
        </div>
        <Button variant="outline" className="rounded-full">
          <Mic className="mr-2 h-4 w-4" /> Browse shows
        </Button>
      </div>

      {/* Categories */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              cat === c ? "bg-violet-600 text-white" : "border bg-card hover:bg-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured player (flat) */}
      <div className={`${glass} flex flex-col items-center gap-6 p-6 sm:flex-row sm:p-8`}>
        <div className="relative aspect-square w-44 shrink-0 overflow-hidden rounded-2xl border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/${featured.seed}/400/400`}
            alt={featured.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            Featured episode
          </span>
          <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-tight">
            {featured.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {featured.show} · {featured.len}
          </p>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            {featured.desc}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 sm:justify-start">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Rewind className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => setPlaying((p) => !p)}
              className="h-14 w-14 rounded-full bg-violet-600 text-white hover:bg-violet-700"
            >
              {playing ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <FastForward className="h-5 w-5" />
            </Button>
            <div className="ml-3 hidden max-w-xs flex-1 sm:block">
              <Slider defaultValue={[18]} max={100} step={1} />
            </div>
          </div>
        </div>
      </div>

      {/* Latest episodes */}
      <SectionHeading title="Latest episodes" subtitle="From your subscriptions" />
      <div className="space-y-2">
        {episodes.map((e) => (
          <div
            key={e.seed}
            className={`group ${glass} ${glassHover} flex items-center gap-4 p-3`}
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${e.seed}/160/160`}
                alt={e.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Play className="h-5 w-5 fill-current text-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{e.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {e.show} · {e.when}
              </p>
              {e.progress > 0 && e.progress < 100 && (
                <div className="mt-2 h-1 w-full max-w-xs rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-violet-500"
                    style={{ width: `${e.progress}%` }}
                  />
                </div>
              )}
              {e.progress === 100 && (
                <span className="text-1xs text-emerald-500">Played</span>
              )}
            </div>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
              {e.len}
            </span>
            <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Two-up: your shows + top charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={`${glass} p-6`}>
          <SectionHeading title="Your shows" subtitle="Subscriptions" />
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {shows.map((s) => (
              <div key={s.name} className="group cursor-pointer text-center">
                <div className="relative aspect-square overflow-hidden rounded-xl border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${s.seed}/200/200`}
                    alt={s.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 truncate text-xs font-medium">{s.name}</p>
                <p className="text-1xs text-muted-foreground">{s.eps} eps</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${glass} p-6`}>
          <SectionHeading title="Top charts" subtitle="Popular right now" />
          <div className="mt-4 space-y-1">
            {charts.map((c, i) => (
              <div
                key={c.seed}
                className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/50"
              >
                <span className="w-5 text-center text-lg font-bold text-muted-foreground tabular-nums">
                  {i + 1}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${c.seed}/120/120`}
                  alt={c.name}
                  className="h-11 w-11 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {c.author}
                  </p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Play className="h-4 w-4 fill-current" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MediaPage>
  );
}
