"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Star, Users, BookOpen, Award, ArrowRight } from "lucide-react";

const spotlight = {
  name: "Diana Prince",
  role: "3D Artist & Educator",
  bio: "Award-winning 3D artist with 12 years in film and games. Teaches 48k students the craft of character modelling in Blender.",
  rating: 4.9,
  students: "48.2k",
  courses: 12,
  seed: "edu-i1",
  tags: ["Blender", "3D", "Character Design", "Sculpting"],
};

const instructors = [
  { name: "Marcus Lee", role: "Senior Full-Stack Engineer", rating: 4.8, students: "62.1k", courses: 8, seed: "edu-i2", accent: "from-sky-500 to-cyan-500" },
  { name: "Sofia Alvarez", role: "Brand Strategist", rating: 4.7, students: "21.9k", courses: 6, seed: "edu-i3", accent: "from-rose-500 to-orange-500" },
  { name: "Ken Tanaka", role: "Commercial Photographer", rating: 4.9, students: "33.4k", courses: 5, seed: "edu-i4", accent: "from-amber-500 to-yellow-500" },
  { name: "Amara Okafor", role: "UX Research Lead", rating: 4.8, students: "18.7k", courses: 7, seed: "edu-i5", accent: "from-violet-500 to-fuchsia-500" },
  { name: "Liam Byrne", role: "Growth Marketer", rating: 4.6, students: "12.3k", courses: 4, seed: "edu-i6", accent: "from-emerald-500 to-teal-500" },
  { name: "Noah Kim", role: "Motion Designer", rating: 4.9, students: "27.5k", courses: 9, seed: "edu-i7", accent: "from-indigo-500 to-blue-500" },
];

export default function Instructors() {
  return (
    <ContentLayout title="Instructors">
      <FadeIn>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Meet the instructors</h2>
          <p className="mt-1 text-muted-foreground">Learn from industry experts and top creators</p>
        </div>

        {/* Spotlight */}
        <div className={`relative overflow-hidden ${surface}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent" />
          <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
            <div className="relative shrink-0">
              <div className="h-32 w-32 overflow-hidden rounded-3xl ring-4 ring-background shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://picsum.photos/seed/${spotlight.seed}/240/240`} alt={spotlight.name} className="h-full w-full object-cover" />
              </div>
              <span className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-white shadow-md">
                <Award className="h-4 w-4" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-400">
                Instructor of the month
              </span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{spotlight.name}</h3>
              <p className="text-muted-foreground">{spotlight.role}</p>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">{spotlight.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {spotlight.tags.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
            <div className="grid shrink-0 grid-cols-3 gap-4 sm:grid-cols-1 sm:gap-3">
              {[
                { icon: Star, v: spotlight.rating, l: "Rating", c: "text-amber-500" },
                { icon: Users, v: spotlight.students, l: "Students", c: "" },
                { icon: BookOpen, v: spotlight.courses, l: "Courses", c: "" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-muted/60 p-3 text-center sm:w-28">
                  <s.icon className={`mx-auto h-4 w-4 ${s.c || "text-muted-foreground"}`} />
                  <p className="mt-1 text-lg font-semibold tabular-nums">{s.v}</p>
                  <p className="text-1xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionTitle title="All instructors" subtitle="42 experts teaching on the platform" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((it) => (
            <div key={it.seed} className={`group overflow-hidden ${surface}`}>
              <div className={`h-20 bg-gradient-to-r ${it.accent}`} />
              <div className="px-6 pb-6">
                <div className="-mt-10 h-20 w-20 overflow-hidden rounded-2xl ring-4 ring-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://picsum.photos/seed/${it.seed}/160/160`} alt={it.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-3 text-lg font-semibold">{it.name}</h3>
                <p className="text-sm text-muted-foreground">{it.role}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 text-amber-500"><Star className="h-3.5 w-3.5 fill-current" /> {it.rating}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {it.students}</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {it.courses}</span>
                </div>
                <Button variant="outline" className="mt-5 w-full rounded-full group-hover:bg-muted">
                  View profile <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
