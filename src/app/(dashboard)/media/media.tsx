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
  Play,
  Radio,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  MediaPage,
  GradientText,
  SectionHeading,
  glass,
  glassHover,
} from "./components/media-ui";

const shortcuts = [
  { href: "/media/photos", label: "Photos", sub: "3,204 items", icon: ImageIcon, tint: "from-sky-500 to-cyan-400" },
  { href: "/media/music", label: "Music", sub: "512 tracks", icon: Headphones, tint: "from-violet-500 to-fuchsia-500" },
  { href: "/media/videos", label: "Videos", sub: "148 videos", icon: Film, tint: "from-rose-500 to-orange-400" },
  { href: "/media/live", label: "Live TV", sub: "24 channels", icon: Radio, tint: "from-emerald-500 to-teal-400" },
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

const trending = [
  { title: "Aurora Borealis 4K", cat: "Video", seed: "media-tr-1", views: "1.2M" },
  { title: "Midnight City", cat: "Music", seed: "media-tr-2", views: "842K" },
  { title: "Street Photography", cat: "Album", seed: "media-tr-3", views: "512K" },
  { title: "Deep Focus", cat: "Podcast", seed: "media-tr-4", views: "324K" },
];

export default function Media() {
  return (
    <MediaPage title="Media">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[28px] border border-border/60">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/media-hero-v2/1800/800"
            alt="Featured"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-[100px]" />
        </div>
        <div className="relative p-7 sm:p-12 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            <Flame className="h-3.5 w-3.5 text-orange-300" /> Featured today
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
            Your world of media, <GradientText>beautifully together</GradientText>
          </h2>
          <p className="text-muted-foreground mt-4 text-base max-w-lg">
            Photos, music, videos and live streams — curated, organized and
            ready wherever you are.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-none shadow-lg shadow-fuchsia-500/25 hover:opacity-90"
            >
              <Link href="/media/videos">
                <Play className="mr-2 h-4 w-4 fill-current" /> Start watching
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-border/70 bg-background/50 backdrop-blur-md"
            >
              <Link href="/media/library">Open library</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Shortcuts — bento tiles */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {shortcuts.map((s) => (
          <Link key={s.label} href={s.href} className="group">
            <div className={`${glass} ${glassHover} relative overflow-hidden p-5`}>
              <div
                className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${s.tint} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`}
              />
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.tint} text-white shadow-lg`}
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
            <div
              key={c.title}
              className={`group ${glass} ${glassHover} overflow-hidden`}
            >
              <div className="relative aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${c.seed}/600/340`}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-black shadow-xl">
                    <Play className="h-5 w-5 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div
                    className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-500"
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

      {/* Trending */}
      <div className={`${glass} p-6`}>
        <SectionHeading
          title={
            <span className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-fuchsia-500" /> Trending this
              week
            </span>
          }
        />
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {trending.map((t, i) => (
            <div
              key={t.title}
              className="group flex items-center gap-3 rounded-2xl bg-muted/60 p-3 transition-colors hover:bg-muted"
            >
              <span className="w-6 text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-violet-500 to-fuchsia-500 tabular-nums">
                {i + 1}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${t.seed}/120/120`}
                alt={t.title}
                className="h-12 w-12 rounded-xl object-cover"
              />
              <div className="min-w-0">
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
    </MediaPage>
  );
}
