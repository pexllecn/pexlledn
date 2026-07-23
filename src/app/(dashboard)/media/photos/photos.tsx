"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cinema, Label, AccentButton } from "../components/media-ui";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  MapPin,
  Share2,
  Sparkles,
  X,
} from "lucide-react";

const albums = [
  { name: "Iceland 2025", count: 214, seed: "ph-alb-1" },
  { name: "City Nights", count: 88, seed: "ph-alb-2" },
  { name: "Family", count: 512, seed: "ph-alb-3" },
  { name: "Food Diary", count: 143, seed: "ph-alb-4" },
];

const people = [
  { name: "Emma", seed: "ph-p1" },
  { name: "Liam", seed: "ph-p2" },
  { name: "Olivia", seed: "ph-p3" },
  { name: "Noah", seed: "ph-p4" },
  { name: "Ava", seed: "ph-p5" },
  { name: "Mia", seed: "ph-p6" },
];

const photos = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  seed: `ph-grid-${i}`,
  span: [2, 7, 10, 15].includes(i) ? "row-span-2" : "row-span-1",
  place: ["Reykjavík", "Tokyo", "Lisbon", "Oslo", "Kyoto"][i % 5],
  liked: i % 4 === 0,
}));

export default function Photos() {
  const [active, setActive] = useState<number | null>(null);
  const close = () => setActive(null);
  const step = (d: number) =>
    setActive((c) => (c === null ? c : (c + d + photos.length) % photos.length));

  return (
    <Cinema title="Photos">
      {/* Memory hero */}
      <div className="relative mb-7 overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/ph-hero/1200/440"
          alt="On this day"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="relative flex min-h-[240px] flex-col justify-end p-7 sm:p-9">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-300">
            <Sparkles className="h-3.5 w-3.5" /> On this day · one year ago
          </span>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
            Your trip to Iceland
          </h2>
          <p className="mt-2 max-w-md text-sm text-neutral-300">
            24 memories, rediscovered — set to a slow cinematic fade.
          </p>
          <div className="mt-5">
            <AccentButton>Play memory</AccentButton>
          </div>
        </div>
      </div>

      {/* Albums */}
      <Label action="See all">Albums</Label>
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {albums.map((a) => (
          <div key={a.name} className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${a.seed}/600/450`}
              alt={a.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="font-semibold text-white">{a.name}</p>
              <p className="text-xs text-white/60">{a.count} photos</p>
            </div>
          </div>
        ))}
      </div>

      {/* People */}
      <Label action="See all">People</Label>
      <div className="mb-8 flex flex-wrap gap-5">
        {people.map((p) => (
          <div key={p.name} className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 overflow-hidden rounded-full ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${p.seed}/120/120`}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs text-neutral-400">{p.name}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <Label action={null}>All photos</Label>
      <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden rounded-2xl ${p.span}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${p.seed}/500/500`}
              alt={`Photo ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/25" />
            {p.liked && (
              <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40">
                <Heart className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
              </span>
            )}
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              <MapPin className="h-3 w-3" /> {p.place}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={close}
          >
            <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" onClick={close}>
              <X className="h-5 w-5" />
            </button>
            <button
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={active}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-h-[80vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${photos[active].seed}/1200/800`}
                alt="Preview"
                className="max-h-[80vh] rounded-2xl object-contain"
              />
              <div className="mt-3 flex items-center justify-between text-white">
                <span className="flex items-center gap-1.5 text-sm">
                  <MapPin className="h-4 w-4" /> {photos[active].place}
                </span>
                <div className="flex items-center gap-1">
                  {[Heart, Share2, Download].map((Ic, k) => (
                    <button key={k} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10">
                      <Ic className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            <button
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); step(1); }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Cinema>
  );
}
