"use client";

import { useState } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Clock, Users, Search, Play, ArrowRight, TrendingUp } from "lucide-react";

const cats = ["All", "Design", "Development", "Marketing", "Business", "Photography"];

const featured = {
  title: "Advanced 3D Modelling in Blender",
  author: "Diana Prince",
  rating: 4.9,
  students: "12.4k",
  hours: 18,
  price: "$89",
  seed: "edu-feat",
  tag: "Bestseller",
};

const courses = [
  { title: "Full-Stack Web Development", author: "Marcus Lee", cat: "Development", rating: 4.8, students: "24.1k", hours: 42, price: "$120", seed: "edu-c2", big: true },
  { title: "Brand Identity & Strategy", author: "Sofia Alvarez", cat: "Marketing", rating: 4.7, students: "8.9k", hours: 12, price: "$69", seed: "edu-c3" },
  { title: "Product Photography Basics", author: "Ken Tanaka", cat: "Photography", rating: 4.9, students: "15.2k", hours: 9, price: "$49", seed: "edu-c4" },
  { title: "UX Research From Scratch", author: "Amara Okafor", cat: "Design", rating: 4.8, students: "6.7k", hours: 15, price: "$79", seed: "edu-c5" },
  { title: "Growth Marketing Playbook", author: "Liam Byrne", cat: "Business", rating: 4.6, students: "5.1k", hours: 11, price: "$99", seed: "edu-c6" },
];

const topCats = [
  { name: "Development", count: 214, pct: 90, color: "bg-violet-500" },
  { name: "Design", count: 168, pct: 72, color: "bg-sky-500" },
  { name: "Marketing", count: 132, pct: 58, color: "bg-emerald-500" },
  { name: "Photography", count: 96, pct: 42, color: "bg-amber-500" },
];

const topInstructors = [
  { name: "Diana Prince", role: "3D Artist", seed: "edu-i1" },
  { name: "Marcus Lee", role: "Engineer", seed: "edu-i2" },
  { name: "Ken Tanaka", role: "Photographer", seed: "edu-i4" },
];

function Rating({ v }: { v: number }) {
  return (
    <span className="flex items-center gap-1 text-amber-500">
      <Star className="h-3.5 w-3.5 fill-current" /> {v}
    </span>
  );
}

export default function Courses() {
  const [cat, setCat] = useState("All");

  return (
    <ContentLayout title="Courses">
      <FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Explore courses</h2>
            <p className="mt-1 text-muted-foreground">842 courses across 12 categories</p>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses…" className="border-none bg-muted pl-9" />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-6">
            {/* Featured hero */}
            <div className="group relative overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${featured.seed}/1100/460`}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
              <div className="relative flex min-h-[300px] flex-col justify-end p-7 sm:p-9">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-200">
                  <TrendingUp className="h-3.5 w-3.5" /> {featured.tag}
                </span>
                <h3 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                  {featured.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <span>By {featured.author}</span>
                  <Rating v={featured.rating} />
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {featured.students}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.hours}h</span>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button className="rounded-full bg-white text-black hover:bg-white/90">
                    <Play className="mr-2 h-4 w-4 fill-current" /> Start · {featured.price}
                  </Button>
                  <Button variant="outline" className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
                    Preview
                  </Button>
                </div>
              </div>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    cat === c ? "bg-foreground text-background" : "bg-muted hover:bg-muted/70"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Bento grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => (
                <div
                  key={c.seed}
                  className={`group overflow-hidden ${surface} ${c.big ? "sm:col-span-2 lg:col-span-2" : ""}`}
                >
                  <div className={`relative overflow-hidden ${c.big ? "aspect-[2/1]" : "aspect-video"}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${c.seed}/700/380`}
                      alt={c.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-0.5 text-1xs font-medium">
                      {c.cat}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                        <Play className="ml-0.5 h-5 w-5 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium leading-snug line-clamp-1">{c.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{c.author}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <Rating v={c.rating} />
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.students}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {c.hours}h</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold">{c.price}</span>
                      <Button size="sm" variant="secondary" className="rounded-full">Enroll</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right rail */}
          <aside className="space-y-6">
            <div className={`${surface} p-5`}>
              <SectionTitle title="Top categories" />
              <div className="mt-4 space-y-4">
                {topCats.map((t) => (
                  <div key={t.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span>{t.name}</span>
                      <span className="text-muted-foreground">{t.count}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${surface} p-5`}>
              <SectionTitle title="Top instructors" />
              <div className="mt-4 space-y-3">
                {topInstructors.map((i) => (
                  <div key={i.seed} className="group flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://picsum.photos/seed/${i.seed}/80/80`} alt={i.name} className="h-10 w-10 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{i.name}</p>
                      <p className="text-xs text-muted-foreground">{i.role}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-5 text-white">
              <p className="text-lg font-semibold">Go Pro</p>
              <p className="mt-1 text-sm text-white/80">Unlimited access to every course and certificate.</p>
              <Button className="mt-4 rounded-full bg-white text-violet-700 hover:bg-white/90">Upgrade</Button>
            </div>
          </aside>
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
