"use client";

import Link from "next/link";
import { Cinema, Rail, Label, card, cardHover, AccentButton } from "./components/media-ui";
import {
  Play,
  Image as ImageIcon,
  Headphones,
  Film,
  Radio,
  ChevronRight,
  Flame,
  Heart,
  TrendingUp,
} from "lucide-react";

const quick = [
  { href: "/media/photos", label: "Photos", sub: "3,204 items", icon: ImageIcon, tint: "bg-sky-500" },
  { href: "/media/music", label: "Music", sub: "512 tracks", icon: Headphones, tint: "bg-orange-500" },
  { href: "/media/videos", label: "Videos", sub: "148 videos", icon: Film, tint: "bg-rose-500" },
  { href: "/media/live", label: "Live TV", sub: "24 channels", icon: Radio, tint: "bg-emerald-500" },
];

const jumpBack = [
  { title: "Nebula — Season 2", sub: "Ep 4 · 22 min left", seed: "fd-jb1", pct: 62 },
  { title: "Lo-fi Sunset Mix", sub: "Playlist · 1h 12m", seed: "fd-jb2", pct: 35 },
  { title: "Design Systems Talk", sub: "18 min left", seed: "fd-jb3", pct: 78 },
  { title: "Coastline Timelapse", sub: "4K · 6 min", seed: "fd-jb4", pct: 12 },
];

const newForYou = [
  { title: "Aurora Borealis 4K", meta: "Video · Wild Frame", seed: "fd-nf1" },
  { title: "Midnight City", meta: "Track · Neon Fields", seed: "fd-nf2" },
  { title: "The Long Game", meta: "Podcast · Signal & Noise", seed: "fd-nf3" },
  { title: "Street Photography", meta: "Album · 36 photos", seed: "fd-nf4" },
  { title: "Deep Ocean", meta: "Video · BlueWorld", seed: "fd-nf5" },
];

const charts = [
  { title: "Welcome To Horrorwood", artist: "Ice Nine Kills", seed: "fd-c1", plays: "1.2M" },
  { title: "Blood Orange", artist: "Berried Alive", seed: "fd-c2", plays: "842K" },
  { title: "Soul Decay", artist: "Make Them Suffer", seed: "fd-c3", plays: "512K" },
  { title: "A Little Bit Off", artist: "FFDP", seed: "fd-c4", plays: "324K" },
];

const creators = [
  { name: "Wild Frame", tag: "Nature", seed: "fd-cr1" },
  { name: "Neon Fields", tag: "Music", seed: "fd-cr2" },
  { name: "Designly", tag: "Design", seed: "fd-cr3" },
  { name: "BlueWorld", tag: "Docs", seed: "fd-cr4" },
];

export default function Media() {
  return (
    <Cinema title="Media">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* MAIN */}
        <div className="min-w-0 space-y-7">
          {/* Spotlight hero */}
          <div className="group relative overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/fd-hero/1200/520"
              alt="Featured"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
            <div className="absolute inset-0 flex items-center justify-end px-8">
              <span className="select-none text-5xl font-extrabold uppercase tracking-tight text-white/[0.06] sm:text-7xl">
                Tonight
              </span>
            </div>
            <div className="relative flex min-h-[300px] flex-col justify-end p-7 sm:p-9">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-orange-500/15 px-3 py-1 text-xs font-medium text-orange-400">
                <Flame className="h-3.5 w-3.5" /> Editor&apos;s pick
              </span>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                Between Death and Dreams
              </h2>
              <p className="mt-3 max-w-md text-sm text-neutral-300">
                A cinematic night session — mixed media, curated for you and
                ready to play across every device.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <AccentButton>
                  <span className="flex items-center gap-2">
                    <Play className="h-4 w-4 fill-current" /> Play now
                  </span>
                </AccentButton>
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick access */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {quick.map((q) => (
              <Link key={q.label} href={q.href} className="group">
                <div className={`${card} ${cardHover} flex items-center gap-3 p-4`}>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${q.tint} text-white`}>
                    <q.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{q.label}</p>
                    <p className="truncate text-xs text-neutral-500">{q.sub}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Jump back in */}
          <div>
            <Label action="See all">Jump back in</Label>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {jumpBack.map((j) => (
                <div key={j.seed} className="group cursor-pointer">
                  <div className="relative aspect-video overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${j.seed}/400/240`}
                      alt={j.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                        <Play className="ml-0.5 h-4 w-4 fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div className="h-full bg-orange-500" style={{ width: `${j.pct}%` }} />
                    </div>
                  </div>
                  <p className="mt-2 truncate text-sm font-medium text-white">{j.title}</p>
                  <p className="truncate text-xs text-neutral-500">{j.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New for you */}
          <div>
            <Label action="See all">New for you</Label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {newForYou.map((n) => (
                <div key={n.seed} className="group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${n.seed}/300/300`}
                      alt={n.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-orange-500 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    </div>
                  </div>
                  <p className="mt-2 truncate text-sm font-medium text-white">{n.title}</p>
                  <p className="truncate text-xs text-neutral-500">{n.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT RAIL */}
        <aside className="space-y-7">
          <Rail title="Top charts">
            {charts.map((c, i) => (
              <div key={c.seed} className="group flex items-center gap-3">
                <span className="w-5 text-center text-lg font-bold text-white/15 tabular-nums">
                  {i + 1}
                </span>
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${c.seed}/80/80`}
                    alt={c.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{c.title}</p>
                  <p className="truncate text-xs text-neutral-500">{c.artist}</p>
                </div>
                <span className="shrink-0 text-xs text-neutral-500">{c.plays}</span>
              </div>
            ))}
          </Rail>

          <Rail title="Your creators">
            {creators.map((c) => (
              <div key={c.seed} className="group flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${c.seed}/80/80`}
                    alt={c.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{c.name}</p>
                  <p className="truncate text-xs text-neutral-500">{c.tag}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-neutral-600 transition-transform group-hover:translate-x-0.5" />
              </div>
            ))}
          </Rail>

          <div className={`${card} p-5`}>
            <div className="flex items-center gap-2 text-orange-400">
              <TrendingUp className="h-4 w-4" />
              <p className="text-sm font-medium">This week</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { v: "42h", l: "Watched" },
                { v: "128", l: "Added" },
                { v: "18", l: "Trending" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-xl font-semibold text-white tabular-nums">{s.v}</p>
                  <p className="text-1xs text-neutral-500">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Cinema>
  );
}
