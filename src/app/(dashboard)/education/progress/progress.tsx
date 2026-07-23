"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flame, Clock, Trophy, PlayCircle, Award, Zap, Target, Medal } from "lucide-react";

const inProgress = [
  { title: "3D Character Modeling Masterclass", author: "Diana Prince", pct: 62, next: "Lesson 14 · Rigging", seed: "edu-c1" },
  { title: "Full-Stack Web Development", author: "Marcus Lee", pct: 35, next: "Lesson 22 · REST APIs", seed: "edu-c2" },
  { title: "UX Research From Scratch", author: "Amara Okafor", pct: 88, next: "Lesson 12 · Synthesis", seed: "edu-c5" },
];

const weekly = [
  { d: "Mon", h: 1.2 }, { d: "Tue", h: 2.1 }, { d: "Wed", h: 0.8 },
  { d: "Thu", h: 2.6 }, { d: "Fri", h: 1.7 }, { d: "Sat", h: 3.2 }, { d: "Sun", h: 1.1 },
];

const achievements = [
  { icon: Zap, name: "Fast Learner", desc: "5 lessons in a day", color: "text-amber-500 bg-amber-500/10", done: true },
  { icon: Flame, name: "On Fire", desc: "14-day streak", color: "text-rose-500 bg-rose-500/10", done: true },
  { icon: Target, name: "Focused", desc: "Finish a course", color: "text-violet-500 bg-violet-500/10", done: true },
  { icon: Medal, name: "Top 10%", desc: "Weekly leaderboard", color: "text-emerald-500 bg-emerald-500/10", done: false },
];

function Ring({ value }: { value: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
      <circle cx="60" cy="60" r={r} className="fill-none stroke-muted" strokeWidth="12" />
      <circle
        cx="60" cy="60" r={r}
        className="fill-none stroke-violet-600"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (value / 100) * c}
      />
    </svg>
  );
}

export default function LearningProgress() {
  const max = Math.max(...weekly.map((w) => w.h));
  const overall = 64;

  return (
    <ContentLayout title="Progress">
      <FadeIn>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Your progress</h2>
          <p className="mt-1 text-muted-foreground">Keep the streak going 🔥</p>
        </div>

        {/* Hero: ring + stats */}
        <div className={`grid gap-6 lg:grid-cols-[auto_1fr] ${surface} p-6 sm:p-8`}>
          <div className="relative mx-auto flex items-center justify-center">
            <Ring value={overall} />
            <div className="absolute text-center">
              <p className="text-3xl font-semibold tabular-nums">{overall}%</p>
              <p className="text-1xs text-muted-foreground">complete</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:self-center">
            {[
              { icon: Flame, v: "18", l: "Day streak", c: "text-rose-500" },
              { icon: Clock, v: "42.5h", l: "Learned", c: "text-sky-500" },
              { icon: Trophy, v: "7", l: "Completed", c: "text-amber-500" },
              { icon: PlayCircle, v: "3", l: "In progress", c: "text-violet-500" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-muted/50 p-4">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-background ${s.c}`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <p className="mt-3 text-2xl font-semibold tabular-nums">{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Continue */}
          <div className={`${surface} p-6`}>
            <SectionTitle title="Continue learning" />
            <div className="mt-4 space-y-4">
              {inProgress.map((c) => (
                <div key={c.seed} className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://picsum.photos/seed/${c.seed}/160/160`} alt={c.title} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 font-medium">{c.title}</p>
                    <p className="mb-2 text-xs text-muted-foreground">{c.next}</p>
                    <Progress value={c.pct} className="h-2" />
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-sm font-semibold tabular-nums">{c.pct}%</span>
                    <Button size="sm" variant="outline" className="mt-2 block rounded-full">Resume</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly */}
          <div className={`${surface} p-6`}>
            <SectionTitle title="This week" />
            <div className="mt-6 flex h-40 items-end justify-between gap-2">
              {weekly.map((w) => (
                <div key={w.d} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-violet-400"
                    style={{ height: `${(w.h / max) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{w.d}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm">
              <span className="text-muted-foreground">Total this week</span>
              <span className="font-semibold">12.7 hours</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <SectionTitle title="Achievements" subtitle="3 of 4 unlocked" />
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => (
            <div key={a.name} className={`${surface} p-5 ${a.done ? "" : "opacity-55"}`}>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.color}`}>
                <a.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 font-medium">{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.desc}</p>
              {a.done && (
                <span className="mt-3 inline-flex items-center gap-1 text-1xs text-emerald-600">
                  <Award className="h-3 w-3" /> Unlocked
                </span>
              )}
            </div>
          ))}
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
