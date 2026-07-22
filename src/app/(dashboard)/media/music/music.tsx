"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
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

type Track = {
  title: string;
  artist: string;
  seed: string;
  duration: number; // seconds
};

const queue: Track[] = [
  { title: "Midnight City", artist: "Neon Fields", seed: "mu-1", duration: 243 },
  { title: "Golden Hour", artist: "Coastline", seed: "mu-2", duration: 198 },
  { title: "Weightless", artist: "Ambient Co.", seed: "mu-3", duration: 276 },
  { title: "Paper Planes", artist: "Vela", seed: "mu-4", duration: 211 },
  { title: "Slow Dive", artist: "Mono Lake", seed: "mu-5", duration: 254 },
  { title: "Afterglow", artist: "Kite Season", seed: "mu-6", duration: 189 },
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
        setElapsed((e) => {
          if (e >= track.duration) {
            return 0;
          }
          return e + 1;
        });
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

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Music">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="grid gap-4 lg:grid-cols-5">
            {/* Now playing */}
            <Card className="lg:col-span-2 border-none overflow-hidden relative">
              {/* Blurred backdrop */}
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${track.seed}/800/800`}
                  alt=""
                  className="h-full w-full object-cover scale-110 blur-2xl opacity-40"
                />
                <div className="absolute inset-0 bg-background/60" />
              </div>
              <CardContent className="relative p-6 flex flex-col items-center text-center">
                <motion.div
                  key={track.seed}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl shadow-2xl"
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
                      <h2 className="text-2xl font-normal truncate">
                        {track.title}
                      </h2>
                      <p className="text-muted-foreground">{track.artist}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        setLiked((l) => ({ ...l, [current]: !l[current] }))
                      }
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          liked[current]
                            ? "fill-fuchsia-500 text-fuchsia-500"
                            : ""
                        }`}
                      />
                    </Button>
                  </div>

                  {/* Progress */}
                  <div className="mt-5">
                    <Slider
                      value={[elapsed]}
                      max={track.duration}
                      step={1}
                      onValueChange={(v) => setElapsed(v[0])}
                      className="w-full"
                    />
                    <div className="mt-1.5 flex justify-between text-xs text-muted-foreground tabular-nums">
                      <span>{fmt(elapsed)}</span>
                      <span>{fmt(track.duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Button size="icon" variant="ghost">
                      <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={prev}>
                      <SkipBack className="h-5 w-5 fill-current" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => setPlaying((p) => !p)}
                      className="h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white border-none hover:opacity-90"
                    >
                      {playing ? (
                        <Pause className="h-6 w-6 fill-current" />
                      ) : (
                        <Play className="h-6 w-6 fill-current" />
                      )}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={next}>
                      <SkipForward className="h-5 w-5 fill-current" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Repeat className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Volume */}
                  <div className="mt-5 flex items-center gap-3">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={[volume]}
                      max={100}
                      step={1}
                      onValueChange={(v) => setVolume(v[0])}
                      className="w-full"
                    />
                    <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">
                      {volume}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Queue */}
            <Card className="lg:col-span-3 bg-muted border-none">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ListMusic className="h-5 w-5" />
                    <h3 className="text-lg font-normal">Up next</h3>
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
                        className={`w-full flex items-center gap-3 rounded-xl p-2.5 text-left transition-colors ${
                          isActive
                            ? "bg-background shadow-sm"
                            : "hover:bg-background/60"
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
                                    className="w-0.5 bg-white"
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
                            className={`text-sm leading-none truncate ${
                              isActive ? "text-foreground" : ""
                            }`}
                          >
                            {t.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {t.artist}
                          </p>
                        </div>
                        {liked[i] && (
                          <Heart className="h-3.5 w-3.5 fill-fuchsia-500 text-fuchsia-500 shrink-0" />
                        )}
                        <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                          {fmt(t.duration)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
