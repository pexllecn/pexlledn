"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Clock, Trophy, PlayCircle } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const stats = [
  { label: "Day streak", value: "18", icon: Flame },
  { label: "Hours learned", value: "42.5", icon: Clock },
  { label: "Courses done", value: "7", icon: Trophy },
  { label: "In progress", value: "3", icon: PlayCircle },
];

const inProgress = [
  { title: "3D Character Modeling Masterclass", author: "Diana Prince", pct: 62, next: "Lesson 14 · Rigging", seed: "edu-c1" },
  { title: "Full-Stack Web Development", author: "Marcus Lee", pct: 35, next: "Lesson 22 · REST APIs", seed: "edu-c2" },
  { title: "UX Research From Scratch", author: "Amara Okafor", pct: 88, next: "Lesson 12 · Synthesis", seed: "edu-c5" },
];

const weekly = [
  { d: "Mon", h: 1.2 },
  { d: "Tue", h: 2.1 },
  { d: "Wed", h: 0.8 },
  { d: "Thu", h: 2.6 },
  { d: "Fri", h: 1.7 },
  { d: "Sat", h: 3.2 },
  { d: "Sun", h: 1.1 },
];

export default function LearningProgress() {
  const max = Math.max(...weekly.map((w) => w.h));
  return (
    <ContentLayout title="Progress">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Your progress</h2>
            <p className="text-muted-foreground mt-1">Keep the streak going 🔥</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label} className="border-none bg-muted">
                <CardContent className="p-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tabular-nums leading-none">
                      {s.value}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
            <Card className="border-none bg-muted">
              <CardHeader>
                <CardTitle>Continue learning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {inProgress.map((c) => (
                  <div key={c.seed} className="flex items-center gap-4">
                    <Image
                      src={`https://picsum.photos/seed/${c.seed}/160/160`}
                      alt={c.title}
                      width={160}
                      height={160}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-snug line-clamp-1">{c.title}</p>
                      <p className="text-xs text-muted-foreground mb-2">{c.next}</p>
                      <Progress value={c.pct} className="h-2" />
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-semibold tabular-nums">{c.pct}%</span>
                      <Button size="sm" variant="outline" className="mt-2 block">
                        Resume
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none bg-muted">
              <CardHeader>
                <CardTitle>This week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-end justify-between gap-2">
                  {weekly.map((w) => (
                    <div key={w.d} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-md bg-primary/80"
                        style={{ height: `${(w.h / max) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{w.d}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total this week</span>
                  <Badge variant="secondary">12.7 hours</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
