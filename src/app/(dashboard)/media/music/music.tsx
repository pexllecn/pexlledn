"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Heart,
  ListMusic,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { MediaPage, SectionHeading, glass, glassHover } from "../components/media-ui";

type Track = {
  title: string;
  artist: string;
  seed: string;
  duration: number;
};

const queue: Track[] = [
  { title: "Midnight City", artist: "Neon Fields", seed: "mu-1", duration: 243 },
  { title: "Golden Hour", artist: "Coastline", seed: "mu-2", duration: 198 },
  { title: "Weightless", artist: "Ambient Co.", seed: "mu-3", duration: 276 },
  { title: "Paper Planes", artist: "Vela", seed: "mu-4", duration: 211 },
  { title: "Slow Dive", artist: "Mono Lake", seed: "mu-5", duration: 254 },
  { title: "Afterglow", artist: "Kite Season", seed: "mu-6", duration: 189 },
];

const albums = [
  { title: "Neon Skyline", artist: "Neon Fields", seed: "mu-al-1" },
  { title: "Coastal", artist: "Coastline", seed: "mu-al-2" },
  { title: "Stillness", artist: "Ambient Co.", seed: "mu-al-3" },
  { title: "Paper Trails", artist: "Vela", seed: "mu-al-4" },
  { title: "Deep Water", artist: "Mono Lake", seed: "mu-al-5" },
];

const artists = [
  { name: "Neon Fields", seed: "mu-ar-1", listeners: "1.2M" },
  { name: "Coastline", seed: "mu-ar-2", listeners: "842K" },
  { name: "Ambient Co.", seed: "mu-ar-3", listeners: "512K" },
  { name: "Vela", seed: "mu-ar-4", listeners: "318K" },
  { name: "Mono Lake", seed: "mu-ar-5", listeners: "204K" },
  { name: "Kite Season", seed: "mu-ar-6", listeners: "156K" },
];

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function Music() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({ 0: true });
  const [volume, setVolume] = useState(70);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = queue[current];

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setElapsed((e) => (e >= track.duration ? 0 : e + 1));
      }, 1000);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, track.duration]);

  const select = (i: number) => {
    setCurrent(i);
    setElapsed(0);
    setPlaying(true);
  };
  const next = () => select((current + 1) % queue.length);
  const prev = () => select((current - 1 + queue.length) % queue.length);

  return (
    <MediaPage title="Music">
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Now playing */}
        <div className="lg:col-span-2 rounded-2xl border bg-card">
          <div className="p-6 sm:p-8 flex flex-col items-center text-center">
            <motion.div
              key={track.seed}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${track.seed}/500/500`}
                alt={track.title}
                className="h-full w-full object-cover"
              />
            </motion.div>

            <div className="mt-6 w-full">
              <div className="flex items-start justify-between gap-3">
                <div className="text-left min-w-0">
                  <h2 className="text-2xl font-semibold tracking-tight truncate">
                    {track.title}
                  </h2>
                  <p className="text-muted-foreground">{track.artist}</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() =>
                    setLiked((l) => ({ ...l, [current]: !l[current] }))
                  }
                >
                  <Heart
                    className={`h-5 w-5 ${
                      liked[current] ? "fill-violet-600 text-violet-600" : ""
                    }`}
                  />
                </Button>
              </div>

              <div className="mt-5">
                <Slider
                  value={[elapsed]}
                  max={track.duration}
                  step={1}
                  onValueChange={(v) => setElapsed(v[0])}
                />
                <div className="mt-1.5 flex justify-between text-xs text-muted-foreground tabular-nums">
                  <span>{fmt(elapsed)}</span>
                  <span>{fmt(track.duration)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Shuffle className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full" onClick={prev}>
                  <SkipBack className="h-5 w-5 fill-current" />
                </Button>
                <Button
                  size="icon"
                  onClick={() => setPlaying((p) => !p)}
                  className="h-16 w-16 rounded-full bg-violet-600 text-white hover:bg-violet-700"
                >
                  {playing ? (
                    <Pause className="h-6 w-6 fill-current" />
                  ) : (
                    <Play className="h-6 w-6 fill-current" />
                  )}
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full" onClick={next}>
                  <SkipForward className="h-5 w-5 fill-current" />
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Repeat className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={(v) => setVolume(v[0])}
                />
                <span className="w-8 text-right text-xs text-muted-foreground tabular-nums">
                  {volume}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Queue */}
        <div className={`lg:col-span-3 ${glass} p-4 sm:p-6`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListMusic className="h-5 w-5" />
              <h3 className="text-lg font-semibold tracking-tight">Up next</h3>
            </div>
            <span className="text-sm text-muted-foreground">
              {queue.length} tracks
            </span>
          </div>
          <div className="space-y-1">
            {queue.map((t, i) => {
              const isActive = i === current;
              return (
                <button
                  key={t.seed}
                  onClick={() => select(i)}
                  className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors ${
                    isActive ? "bg-violet-500/10" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${t.seed}/120/120`}
                      alt={t.title}
                      className="h-full w-full object-cover"
                    />
                    {isActive && playing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="flex items-end gap-0.5">
                          {[0, 1, 2].map((b) => (
                            <motion.span
                              key={b}
                              className="w-0.5 rounded-full bg-white"
                              animate={{ height: [4, 12, 4] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                delay: b * 0.15,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-medium leading-none ${
                        isActive ? "text-violet-600 dark:text-violet-400" : ""
                      }`}
                    >
                      {t.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {t.artist}
                    </p>
                  </div>
                  {liked[i] && (
                    <Heart className="h-3.5 w-3.5 shrink-0 fill-violet-600 text-violet-600" />
                  )}
                  <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                    {fmt(t.duration)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recommended albums */}
      <div className="space-y-4">
        <SectionHeading title="Recommended albums" subtitle="Based on your taste" />
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {albums.map((a) => (
            <div
              key={a.seed}
              className={`group ${glass} ${glassHover} cursor-pointer p-3`}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${a.seed}/300/300`}
                  alt={a.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-violet-600 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <Play className="h-4 w-4 fill-current" />
                </div>
              </div>
              <p className="mt-2.5 truncate text-sm font-medium">{a.title}</p>
              <p className="truncate text-xs text-muted-foreground">{a.artist}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top artists */}
      <div className="space-y-4">
        <SectionHeading title="Top artists" subtitle="On repeat this month" />
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {artists.map((ar) => (
            <div
              key={ar.seed}
              className={`${glass} ${glassHover} cursor-pointer p-4 text-center`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${ar.seed}/200/200`}
                alt={ar.name}
                className="mx-auto h-20 w-20 rounded-full object-cover"
              />
              <p className="mt-3 truncate text-sm font-medium">{ar.name}</p>
              <p className="text-xs text-muted-foreground">
                {ar.listeners} listeners
              </p>
            </div>
          ))}
        </div>
      </div>
    </MediaPage>
  );
}
