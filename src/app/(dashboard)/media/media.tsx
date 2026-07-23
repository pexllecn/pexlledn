"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Clock,
  Film,
  Flame,
  HardDrive,
  Headphones,
  Image as ImageIcon,
  Mic,
  Play,
  Plus,
  Radio,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  MediaPage,
  SectionHeading,
  glass,
  glassHover,
  accent,
} from "./components/media-ui";

const shortcuts = [
  { href: "/media/photos", label: "Photos", sub: "3,204 items", icon: ImageIcon, tint: "bg-sky-500" },
  { href: "/media/music", label: "Music", sub: "512 tracks", icon: Headphones, tint: "bg-violet-600" },
  { href: "/media/videos", label: "Videos", sub: "148 videos", icon: Film, tint: "bg-rose-500" },
  { href: "/media/live", label: "Live TV", sub: "24 channels", icon: Radio, tint: "bg-emerald-500" },
];

const stats = [
  { label: "Total media", value: "3,864", sub: "+128 this week", icon: Sparkles },
  { label: "Watch time", value: "42h", sub: "This month", icon: Clock },
  { label: "Trending now", value: "18", sub: "In your circle", icon: TrendingUp },
  { label: "Storage used", value: "68%", sub: "340 GB of 500 GB", icon: HardDrive },
];

const continueWatching = [
  { title: "Nebula — Season 2", sub: "Ep 4 · 22 min left", seed: "media-cw-1", progress: 62 },
  { title: "Lo-fi Sunset Mix", sub: "Playlist · 1h 12m", seed: "media-cw-2", progress: 35 },
  { title: "Design Systems Talk", sub: "18 min left", seed: "media-cw-3", progress: 78 },
  { title: "Coastline Timelapse", sub: "4K · 6 min", seed: "media-cw-4", progress: 12 },
];

const categories = [
  { name: "Documentary", count: 42, seed: "cat-1" },
  { name: "Music Videos", count: 88, seed: "cat-2" },
  { name: "Nature & 4K", count: 31, seed: "cat-3" },
  { name: "Podcasts", count: 64, seed: "cat-4" },
  { name: "Talks", count: 27, seed: "cat-5" },
  { name: "Travel", count: 53, seed: "cat-6" },
];

const recentlyAdded = [
  { title: "City of Lights", meta: "Video · 12:04", seed: "ra-1", icon: Film },
  { title: "Ocean Ambience", meta: "Music · 58:20", seed: "ra-2", icon: Headphones },
  { title: "Studio Session #12", meta: "Podcast · 41:10", seed: "ra-3", icon: Mic },
  { title: "Golden Fields", meta: "Album · 36 photos", seed: "ra-4", icon: ImageIcon },
];

const trending = [
  { title: "Aurora Borealis 4K", cat: "Video", seed: "media-tr-1", views: "1.2M" },
  { title: "Midnight City", cat: "Music", seed: "media-tr-2", views: "842K" },
  { title: "Street Photography", cat: "Album", seed: "media-tr-3", views: "512K" },
  { title: "Deep Focus", cat: "Podcast", seed: "media-tr-4", views: "324K" },
];

const creators = [
  { name: "Wild Frame", handle: "@wildframe", avatar: "/avatar-40-01.jpg", tag: "Nature" },
  { name: "Neon Fields", handle: "@neonfields", avatar: "/avatar-40-02.jpg", tag: "Music" },
  { name: "Designly", handle: "@designly", avatar: "/avatar-40-03.jpg", tag: "Design" },
  { name: "BlueWorld", handle: "@blueworld", avatar: "/avatar-40-04.jpg", tag: "Docs" },
];

export default function Media() {
  return (
    <MediaPage title="Media">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/media-hero-v3/1800/800"
            alt="Featured"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        </div>
        <div className="relative p-7 sm:p-12 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium">
            <Flame className="h-3.5 w-3.5 text-orange-500" /> Featured today
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
            Your world of media,{" "}
            <span className="text-violet-600 dark:text-violet-400">
              beautifully together
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 text-base max-w-lg">
            Photos, music, videos and live streams — curated, organized and
            ready wherever you are.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className={`rounded-full ${accent}`}>
              <Link href="/media/videos">
                <Play className="mr-2 h-4 w-4 fill-current" /> Start watching
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full bg-background/70"
            >
              <Link href="/media/library">Open library</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {shortcuts.map((s) => (
          <Link key={s.label} href={s.href} className="group">
            <div className={`${glass} ${glassHover} p-5`}>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.tint} text-white`}
              >
                <s.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 font-semibold tracking-tight">{s.label}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{s.sub}</p>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`${glass} p-5`}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">
              {s.value}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Continue watching */}
      <div className="space-y-4">
        <SectionHeading
          title="Continue watching"
          subtitle="Pick up where you left off"
          action={
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link href="/media/library">
                See all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {continueWatching.map((c) => (
            <div key={c.title} className={`group ${glass} overflow-hidden`}>
              <div className="relative aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${c.seed}/600/340`}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-black">
                    <Play className="h-5 w-5 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                  <div
                    className="h-full bg-violet-500"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium leading-none truncate">
                  {c.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browse categories */}
      <div className="space-y-4">
        <SectionHeading title="Browse by category" subtitle="Jump into a mood" />
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <div
              key={c.name}
              className="group relative aspect-square overflow-hidden rounded-2xl border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${c.seed}/300/300`}
                alt={c.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-1xs text-white/70 mt-0.5">{c.count} items</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-up: recently added + trending */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={`${glass} p-6`}>
          <SectionHeading
            title="Recently added"
            action={
              <Button variant="ghost" size="sm" className="rounded-full">
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
            }
          />
          <div className="mt-4 space-y-1">
            {recentlyAdded.map((r) => (
              <div
                key={r.title}
                className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <r.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-none truncate">
                    {r.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{r.meta}</p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Play className="h-4 w-4 fill-current" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className={`${glass} p-6`}>
          <SectionHeading
            title={
              <span className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-violet-500" /> Trending this
                week
              </span>
            }
          />
          <div className="mt-4 space-y-1">
            {trending.map((t, i) => (
              <div
                key={t.title}
                className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/50"
              >
                <span className="w-6 text-center text-lg font-bold text-muted-foreground tabular-nums">
                  {i + 1}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${t.seed}/120/120`}
                  alt={t.title}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-none truncate">
                    {t.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t.cat} · {t.views}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creators to follow */}
      <div className="space-y-4">
        <SectionHeading title="Creators you follow" subtitle="New drops from your list" />
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {creators.map((c) => (
            <div key={c.handle} className={`${glass} p-4 flex items-center gap-3`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.avatar}
                alt={c.name}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-none truncate">
                  {c.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{c.handle}</p>
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-1xs text-muted-foreground">
                {c.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MediaPage>
  );
}
