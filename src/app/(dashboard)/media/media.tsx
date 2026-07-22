"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const shortcuts = [
  {
    href: "/media/photos",
    label: "Photos",
    sub: "3,204 items",
    icon: ImageIcon,
    tint: "from-sky-500 to-cyan-400",
  },
  {
    href: "/media/music",
    label: "Music",
    sub: "512 tracks",
    icon: Headphones,
    tint: "from-violet-500 to-fuchsia-500",
  },
  {
    href: "/media/videos",
    label: "Videos",
    sub: "148 videos",
    icon: Film,
    tint: "from-rose-500 to-orange-400",
  },
  {
    href: "/media/live",
    label: "Live TV",
    sub: "24 channels",
    icon: Radio,
    tint: "from-emerald-500 to-teal-400",
  },
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
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Media">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-2xl border-none">
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/media-hero/1600/600"
                alt="Featured"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            </div>
            <div className="relative p-6 sm:p-10 max-w-xl">
              <Badge className="mb-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-none">
                <Flame className="mr-1 h-3 w-3" /> Featured
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-normal leading-tight">
                Your whole world of media, in one place
              </h2>
              <p className="text-muted-foreground mt-3">
                Photos, music, videos and live streams — beautifully organized
                and ready wherever you are.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-none hover:opacity-90"
                >
                  <Link href="/media/videos">
                    <Play className="mr-2 h-4 w-4 fill-current" /> Start watching
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/media/library">Go to library</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Shortcuts */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {shortcuts.map((s) => (
              <Link key={s.label} href={s.href}>
                <Card className="group bg-muted border-none overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.tint} text-white shadow-md`}
                    >
                      <s.icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium leading-none">{s.label}</p>
                      <p className="text-xs text-muted-foreground mt-1.5">
                        {s.sub}
                      </p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label} className="bg-muted border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-normal">
                    {s.label}
                  </CardTitle>
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-normal tabular-nums">
                    {s.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{s.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue watching */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-normal">Continue watching</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/media/library">
                See all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {continueWatching.map((c) => (
              <Card
                key={c.title}
                className="group bg-muted border-none overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${c.seed}/600/340`}
                    alt={c.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black">
                      <Play className="h-5 w-5 fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/25">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm leading-none truncate">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{c.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trending */}
          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> Trending this week
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {trending.map((t, i) => (
                <div
                  key={t.title}
                  className="flex items-center gap-3 rounded-xl bg-background/60 p-3"
                >
                  <span className="text-2xl font-semibold text-muted-foreground/40 tabular-nums w-6">
                    {i + 1}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${t.seed}/120/120`}
                    alt={t.title}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm leading-none truncate">{t.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.cat} · {t.views}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
