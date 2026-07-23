"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Heart,
  MoreHorizontal,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  ListMusic,
  ChevronRight,
  Plus,
  Radio,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ data */

const tabs = ["Playlists", "Artists", "Albums", "Streams", "Friends' playlists"];

const playlists = [
  { name: "Workout at the gym", tracks: 29, dur: "2h 15m", date: "23 June, 2023", seed: "mu-p1" },
  { name: "Tracks without lyrics", tracks: 35, dur: "2h 15m", date: "27 April, 2023", seed: "mu-p2" },
  { name: "Funny stuff", tracks: 108, dur: "6h 48m", date: "12 February, 2023", seed: "mu-p3" },
  { name: "Careful driving vibes", tracks: 84, dur: "5h 09m", date: "18 May, 2023", seed: "mu-p4" },
  { name: "Philosophy during walking", tracks: 52, dur: "3h 59m", date: "21 December, 2022", seed: "mu-p5" },
];

const newReleases = [
  { title: "Calamity", meta: "Track · Annisokay · 2023", seed: "mu-nr1" },
  { title: "Last Resort (Reimagined)", meta: "Track · Falling in Reverse · 2023", seed: "mu-nr2" },
];

const listenMore = [
  { title: "Blood Orange", artist: "Berried Alive", seed: "mu-lm1" },
  { title: "Soul Decay", artist: "Make Them Suffer", seed: "mu-lm2" },
  { title: "A Little Bit Off", artist: "Five Finger Death Punch", seed: "mu-lm3" },
];

const favArtists = [
  { name: "Ice Nine Kills", subs: "432k subscribers", seed: "mu-fa1" },
  { name: "Bloodywood", subs: "31k subscribers", seed: "mu-fa2" },
  { name: "Bad Omens", subs: "183k subscribers", seed: "mu-fa3" },
  { name: "Lorna Shore", subs: "108k subscribers", seed: "mu-fa4" },
  { name: "Annisokay", subs: "79k subscribers", seed: "mu-fa5" },
];

const stats = [
  { label: "LIKES", value: "247", icon: Heart },
  { label: "TRACKS", value: "363", icon: ListMusic },
  { label: "STREAMS", value: "29", icon: Radio },
];

/* small deterministic waveform heights so SSR & client match */
const bars = Array.from({ length: 56 }, (_, i) =>
  Math.round(30 + 55 * Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.6)))
);

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/* ------------------------------------------------------------------ page */

export default function Music() {
  const [tab, setTab] = useState("Playlists");
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(115); // 1:55
  const [liked, setLiked] = useState(true);
  const [likes, setLikes] = useState<Record<string, boolean>>({
    "mu-lm1": true,
    "mu-lm2": true,
    "mu-lm3": true,
  });
  const [showPromo, setShowPromo] = useState(true);
  const [volume, setVolume] = useState(72);
  const total = 227; // 3:47
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(
        () => setElapsed((e) => (e >= total ? 0 : e + 1)),
        1000
      );
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  const pct = (elapsed / total) * 100;

  return (
    <ContentLayout title="Music">
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="pb-4"
      >
        {/* Cinematic dark surface */}
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#101014] to-[#08080b] text-neutral-200 ring-1 ring-white/5">
          {/* soft ambient glow */}
          <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-orange-600/10 blur-[120px]" />
          <div className="pointer-events-none absolute top-40 -left-20 h-72 w-72 rounded-full bg-violet-600/10 blur-[120px]" />

          <div className="relative grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_320px]">
            {/* ============================ MAIN ============================ */}
            <div className="min-w-0 space-y-6">
              {/* HERO ---------------------------------------------------- */}
              <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_1.35fr]">
                {/* Playlist of the day */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3a2b57] via-[#271f3d] to-[#141019] p-5">
                  <div className="relative z-10">
                    <p className="text-xs text-neutral-400">
                      69 tracks · 4 hours 37 minutes
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                      Playlist of the day
                    </h3>
                  </div>
                  {/* waveform behind cover */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-6 z-0 flex h-40 items-end justify-center gap-1 opacity-40">
                    {bars.slice(0, 32).map((h, i) => (
                      <span
                        key={i}
                        className="w-1 rounded-full bg-white/30"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="relative z-10 mt-5 flex justify-center">
                    <div className="relative aspect-square w-40 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl sm:w-44">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://picsum.photos/seed/mu-potd/400/400"
                        alt="Playlist of the day"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Featured video/track player */}
                <div className="group relative overflow-hidden rounded-3xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://picsum.photos/seed/mu-feature/900/560"
                    alt="Between Death and Dreams"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
                  {/* ghosted title */}
                  <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                    <span className="select-none text-3xl font-extrabold uppercase leading-none tracking-tight text-white/10 sm:text-4xl">
                      Between Death
                      <br /> and Dreams
                    </span>
                  </div>

                  <div className="relative flex h-full min-h-[280px] flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-neutral-300">
                          Brand of Sacrifice · April, 2023
                        </p>
                        <h3 className="mt-0.5 text-2xl font-semibold text-white">
                          Between Death and Dreams
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setLiked((v) => !v)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
                        >
                          <Heart className={`h-4 w-4 ${liked ? "fill-orange-500 text-orange-500" : ""}`} />
                        </button>
                        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <button
                        onClick={() => setPlaying((p) => !p)}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-black shadow-xl transition-transform group-hover:scale-105"
                      >
                        {playing ? (
                          <Pause className="h-6 w-6 fill-current" />
                        ) : (
                          <Play className="ml-0.5 h-6 w-6 fill-current" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                        <div className="h-full rounded-full bg-orange-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="shrink-0 text-xs tabular-nums text-neutral-300">
                        {fmt(elapsed)} / 4:12
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TABS + LIST -------------------------------------------- */}
              <div>
                <div className="flex items-center gap-6 border-b border-white/5">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`relative -mb-px whitespace-nowrap pb-3 text-sm transition-colors ${
                        tab === t ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                      }`}
                    >
                      {t}
                      {tab === t && (
                        <motion.span
                          layoutId="musicTab"
                          className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-orange-500"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-2 divide-y divide-white/5">
                  {playlists.map((p) => (
                    <div
                      key={p.seed}
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[auto_1.4fr_1fr_1fr_auto]"
                    >
                      <div className="relative h-11 w-11 overflow-hidden rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://picsum.photos/seed/${p.seed}/80/80`}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="truncate text-sm font-medium text-white">{p.name}</p>
                      <p className="hidden text-sm text-neutral-400 sm:block">
                        {p.tracks} tracks · {p.dur}
                      </p>
                      <p className="hidden text-sm text-neutral-400 sm:block">{p.date}</p>
                      <div className="flex items-center gap-1">
                        <button className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 opacity-0 transition-all hover:text-orange-500 group-hover:opacity-100">
                          <Play className="h-4 w-4 fill-current" />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:text-neutral-200">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROMO + STATS ------------------------------------------ */}
              <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                {showPromo && (
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3a2350] via-[#2a1c3e] to-[#171021] p-6">
                    {/* decorative blob */}
                    <div className="pointer-events-none absolute -right-6 top-1/2 h-56 w-56 -translate-y-1/2">
                      <div className="absolute inset-6 rounded-[42%_58%_63%_37%/45%_45%_55%_55%] bg-gradient-to-br from-pink-500 to-orange-500 blur-md" />
                      <div className="absolute inset-10 rounded-[58%_42%_37%_63%/55%_55%_45%_45%] bg-gradient-to-tr from-fuchsia-400 to-rose-500 opacity-80 blur-sm" />
                    </div>
                    <button
                      onClick={() => setShowPromo(false)}
                      className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="relative max-w-xs">
                      <h3 className="text-2xl font-semibold leading-tight text-white">
                        Check the power <br /> of Melo
                      </h3>
                      <p className="mt-3 text-sm text-neutral-300">
                        Enjoy uninterrupted music streaming with our premium
                        subscription.
                      </p>
                      <button className="mt-6 rounded-full bg-orange-500 px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
                        Upgrade
                      </button>
                    </div>
                  </div>
                )}

                <div className={showPromo ? "" : "lg:col-span-2"}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Statistics
                    </p>
                    <button className="text-xs text-orange-500 hover:underline">Explore</button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-1xs font-medium uppercase tracking-wider text-neutral-500">
                            {s.label}
                          </p>
                          <s.icon className="h-4 w-4 text-neutral-500" />
                        </div>
                        <p className="mt-2 text-2xl font-semibold tabular-nums text-white">
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ============================ RIGHT RAIL ============================ */}
            <aside className="space-y-7">
              {/* New releases */}
              <Rail title="New releases">
                {newReleases.map((r) => (
                  <div key={r.seed} className="group flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://picsum.photos/seed/${r.seed}/80/80`}
                        alt={r.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <Play className="h-4 w-4 fill-white text-white" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">{r.title}</p>
                      <p className="truncate text-xs text-neutral-500">{r.meta}</p>
                    </div>
                  </div>
                ))}
              </Rail>

              {/* Listen more often */}
              <Rail title="Listen more often">
                {listenMore.map((l) => (
                  <div key={l.seed} className="group flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://picsum.photos/seed/${l.seed}/80/80`}
                        alt={l.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{l.title}</p>
                      <p className="truncate text-xs text-neutral-500">{l.artist}</p>
                    </div>
                    <button
                      onClick={() => setLikes((m) => ({ ...m, [l.seed]: !m[l.seed] }))}
                      className="shrink-0"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          likes[l.seed] ? "fill-orange-500 text-orange-500" : "text-neutral-500"
                        }`}
                      />
                    </button>
                    <button className="shrink-0 text-neutral-600 hover:text-neutral-300">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </Rail>

              {/* Favourite artists — ranked */}
              <Rail title="Favourite artists">
                {favArtists.map((a, i) => (
                  <div key={a.seed} className="group flex items-center gap-3">
                    <span className="w-6 shrink-0 text-center text-2xl font-bold text-white/10">
                      {i + 1}
                    </span>
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://picsum.photos/seed/${a.seed}/80/80`}
                        alt={a.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{a.name}</p>
                      <p className="truncate text-xs text-neutral-500">{a.subs}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-neutral-600 transition-transform group-hover:translate-x-0.5" />
                  </div>
                ))}
              </Rail>
            </aside>
          </div>

          {/* ============================ PLAYER BAR ============================ */}
          <div className="relative border-t border-white/5 bg-black/40 px-5 py-4 backdrop-blur sm:px-7">
            <div className="flex flex-wrap items-center gap-4">
              {/* now playing */}
              <div className="flex min-w-[200px] items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://picsum.photos/seed/mu-now/80/80"
                    alt="Welcome To Horrorwood"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    Welcome To Horrorwood
                  </p>
                  <p className="truncate text-xs text-neutral-500">Ice Nine Kills</p>
                </div>
              </div>

              {/* transport */}
              <div className="flex items-center gap-3">
                <button className="text-neutral-400 hover:text-white">
                  <SkipBack className="h-5 w-5 fill-current" />
                </button>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
                >
                  {playing ? (
                    <Pause className="h-5 w-5 fill-current" />
                  ) : (
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  )}
                </button>
                <button className="text-neutral-400 hover:text-white">
                  <SkipForward className="h-5 w-5 fill-current" />
                </button>
                <button className="ml-1 text-orange-500">
                  <Heart className="h-5 w-5 fill-current" />
                </button>
              </div>

              {/* waveform progress */}
              <div className="flex min-w-[220px] flex-1 items-center gap-3">
                <div className="flex h-8 flex-1 items-center gap-[3px]">
                  {bars.map((h, i) => {
                    const on = (i / bars.length) * 100 <= pct;
                    return (
                      <span
                        key={i}
                        className={`w-full rounded-full ${on ? "bg-orange-500" : "bg-white/15"}`}
                        style={{ height: `${h}%` }}
                      />
                    );
                  })}
                </div>
                <span className="shrink-0 text-xs tabular-nums text-neutral-400">
                  {fmt(elapsed)} / {fmt(total)}
                </span>
              </div>

              {/* volume + controls */}
              <div className="flex items-center gap-3">
                <Volume2 className="h-4 w-4 text-neutral-400" />
                <div className="hidden h-1 w-24 overflow-hidden rounded-full bg-white/15 sm:block">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: `${volume}%` }} />
                </div>
                <button className="text-neutral-500 hover:text-white">
                  <Shuffle className="h-4 w-4" />
                </button>
                <button className="text-neutral-500 hover:text-white">
                  <Repeat className="h-4 w-4" />
                </button>
                <button className="text-neutral-500 hover:text-white">
                  <ListMusic className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}

/* ------------------------------------------------------------------ helpers */

function Rail({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          {title}
        </p>
        <button className="text-xs text-orange-500 hover:underline">See all</button>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
