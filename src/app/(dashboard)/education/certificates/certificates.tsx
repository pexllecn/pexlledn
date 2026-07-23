"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Download, Share2, CheckCircle2, Lock, Sparkles } from "lucide-react";

const earned = [
  { title: "UX Research From Scratch", issued: "Mar 2026", id: "UX-2026-1042", grad: "from-violet-600 to-indigo-600", seed: "edu-c5" },
  { title: "Product Photography Basics", issued: "Feb 2026", id: "PH-2026-0088", grad: "from-sky-600 to-cyan-600", seed: "edu-c4" },
  { title: "Brand Identity & Strategy", issued: "Jan 2026", id: "BR-2026-0311", grad: "from-emerald-600 to-teal-600", seed: "edu-c3" },
];

const locked = [
  { title: "3D Character Modeling Masterclass", pct: 62 },
  { title: "Full-Stack Web Development", pct: 35 },
];

export default function Certificates() {
  return (
    <ContentLayout title="Certificates">
      <FadeIn>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Certificates</h2>
          <p className="mt-1 text-muted-foreground">3 earned · 2 in progress</p>
        </div>

        {/* Showcase hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-8 text-white">
          <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5" /> Verified credentials
              </span>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">You&apos;ve earned 3 certificates</h3>
              <p className="mt-2 max-w-md text-sm text-white/80">
                Share them to LinkedIn, add to your résumé, or download a
                verified PDF anytime.
              </p>
              <Button className="mt-5 rounded-full bg-white text-violet-700 hover:bg-white/90">
                <Share2 className="mr-2 h-4 w-4" /> Share all
              </Button>
            </div>
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
              <Award className="h-12 w-12" />
            </div>
          </div>
        </div>

        <SectionTitle title="Earned" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {earned.map((c) => (
            <div key={c.id} className={`overflow-hidden ${surface}`}>
              <div className={`relative bg-gradient-to-br ${c.grad} p-6 text-white`}>
                <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_80%_20%,white,transparent_45%)]" />
                <div className="relative flex items-start justify-between">
                  <Award className="h-8 w-8" />
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-1xs">Certificate</span>
                </div>
                <p className="relative mt-6 text-lg font-semibold leading-snug">{c.title}</p>
                <p className="relative mt-1 text-xs text-white/70">Certificate of Completion</p>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" /> Verified
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Issued {c.issued} · ID {c.id}</p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="flex-1 rounded-full"><Download className="mr-1.5 h-4 w-4" /> PDF</Button>
                  <Button size="sm" variant="outline" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`${surface} p-6`}>
          <SectionTitle title="Almost there" subtitle="Finish these to unlock" />
          <div className="mt-4 space-y-3">
            {locked.map((l) => (
              <div key={l.title} className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 font-medium">{l.title}</p>
                  <Progress value={l.pct} className="mt-2 h-2" />
                </div>
                <span className="shrink-0 text-sm font-semibold tabular-nums">{l.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
