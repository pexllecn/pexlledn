"use client";

import Image from "next/image";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, MoreHorizontal, CalendarClock, Video } from "lucide-react";

const stages = [
  { key: "Applied", count: 8, pct: 100, color: "bg-sky-500" },
  { key: "Screening", count: 3, pct: 60, color: "bg-violet-500" },
  { key: "Interview", count: 2, pct: 40, color: "bg-amber-500" },
  { key: "Offer", count: 1, pct: 20, color: "bg-emerald-500" },
];

const apps = [
  { company: "Dropbox", role: "UI Designer", logo: "https://logo.clearbit.com/dropbox.com", location: "San Francisco · Remote", stage: "Interview", applied: "2d ago", pct: 60, tint: "text-amber-600 bg-amber-500/10" },
  { company: "Airbnb", role: "Product Designer", logo: "https://logo.clearbit.com/airbnb.com", location: "New York · Hybrid", stage: "Screening", applied: "4d ago", pct: 40, tint: "text-violet-600 bg-violet-500/10" },
  { company: "Spotify", role: "Design Systems Lead", logo: "https://logo.clearbit.com/spotify.com", location: "Stockholm · Remote", stage: "Offer", applied: "1w ago", pct: 90, tint: "text-emerald-600 bg-emerald-500/10" },
  { company: "Figma", role: "Senior Product Designer", logo: "https://logo.clearbit.com/figma.com", location: "Remote", stage: "Applied", applied: "3d ago", pct: 20, tint: "text-sky-600 bg-sky-500/10" },
  { company: "Notion", role: "Brand Designer", logo: "https://logo.clearbit.com/notion.so", location: "San Francisco", stage: "Applied", applied: "5d ago", pct: 20, tint: "text-sky-600 bg-sky-500/10" },
];

export default function Applications() {
  return (
    <ContentLayout title="Applications">
      <FadeIn>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Applications</h2>
          <p className="mt-1 text-muted-foreground">Track where you stand · 14 active</p>
        </div>

        {/* funnel */}
        <div className={`${surface} p-6`}>
          <div className="grid gap-4 sm:grid-cols-4">
            {stages.map((s) => (
              <div key={s.key}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{s.key}</span>
                  <span className="text-2xl font-semibold tabular-nums">{s.count}</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* list */}
          <div className="space-y-3">
            {apps.map((a) => (
              <div key={a.company + a.role} className={`${surface} flex flex-wrap items-center gap-4 p-4`}>
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-muted">
                  <Image src={a.logo} alt={a.company} width={32} height={32} className="h-8 w-8 object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{a.role}</p>
                  <p className="text-sm text-muted-foreground">{a.company}</p>
                </div>
                <div className="hidden w-40 sm:block">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-foreground" style={{ width: `${a.pct}%` }} />
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {a.applied}</span>
                <span className={`rounded-full px-2.5 py-1 text-1xs ${a.tint}`}>{a.stage}</span>
                <Button size="icon" variant="ghost" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>

          {/* next interview */}
          <aside className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 p-6 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs"><CalendarClock className="h-3.5 w-3.5" /> Next interview</span>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                  <Image src="https://logo.clearbit.com/dropbox.com" alt="Dropbox" width={28} height={28} className="h-7 w-7 object-contain" />
                </div>
                <div>
                  <p className="font-semibold">UI Designer</p>
                  <p className="text-sm text-white/80">Dropbox · Tomorrow, 3:00 PM</p>
                </div>
              </div>
              <Button className="mt-5 w-full rounded-full bg-white text-indigo-700 hover:bg-white/90"><Video className="mr-2 h-4 w-4" /> Join interview</Button>
            </div>

            <div className={`${surface} p-5`}>
              <SectionTitle title="This week" />
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[{ v: "6", l: "Applied" }, { v: "3", l: "Replied" }, { v: "2", l: "Interviews" }].map((s) => (
                  <div key={s.l} className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xl font-semibold tabular-nums">{s.v}</p>
                    <p className="text-1xs text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
