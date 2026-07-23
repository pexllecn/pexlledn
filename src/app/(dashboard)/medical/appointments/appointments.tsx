"use client";

import { useState } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Video, MapPin, Calendar, CheckCircle2 } from "lucide-react";

const days = [
  { d: "Mon", n: 12 }, { d: "Tue", n: 13 }, { d: "Wed", n: 14 },
  { d: "Thu", n: 15 }, { d: "Fri", n: 16 }, { d: "Sat", n: 17 }, { d: "Sun", n: 18 },
];

const appts = [
  { time: "09:00", name: "Olivia Bennett", type: "Check-up", mode: "In-person", avatar: "/avatar-40-01.jpg", accent: "border-l-emerald-500", done: true },
  { time: "10:30", name: "James Carter", type: "Follow-up", mode: "Video", avatar: "/avatar-40-02.jpg", accent: "border-l-sky-500", next: true },
  { time: "12:00", name: "Sophia Nguyen", type: "Consultation", mode: "In-person", avatar: "/avatar-40-03.jpg", accent: "border-l-violet-500" },
  { time: "14:15", name: "William Chen", type: "Post-op review", mode: "Video", avatar: "/avatar-40-04.jpg", accent: "border-l-amber-500" },
  { time: "16:00", name: "Emma Rodriguez", type: "Check-up", mode: "In-person", avatar: "/avatar-40-05.jpg", accent: "border-l-rose-500" },
];

export default function Appointments() {
  const [sel, setSel] = useState(3);
  return (
    <ContentLayout title="Appointments">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Appointments</h2>
            <p className="mt-1 text-muted-foreground">Thursday, March 15 · 5 scheduled</p>
          </div>
          <Button><Plus className="mr-2 h-4 w-4" /> New appointment</Button>
        </div>

        {/* week selector */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, i) => (
            <button
              key={d.n}
              onClick={() => setSel(i)}
              className={`flex flex-col items-center gap-1 rounded-2xl border py-3 transition-colors ${
                i === sel ? "border-transparent bg-foreground text-background" : "bg-card hover:bg-muted"
              }`}
            >
              <span className="text-xs opacity-70">{d.d}</span>
              <span className="text-lg font-semibold tabular-nums">{d.n}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* schedule timeline */}
          <div className={`${surface} p-6`}>
            <SectionTitle title="Schedule" />
            <div className="relative mt-5 space-y-3 before:absolute before:left-[68px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
              {appts.map((a) => (
                <div key={a.time} className="relative flex items-center gap-4">
                  <span className="w-12 shrink-0 text-right text-sm font-semibold tabular-nums text-muted-foreground">{a.time}</span>
                  <span className={`z-10 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-card ${a.done ? "bg-emerald-500" : a.next ? "bg-sky-500" : "bg-muted-foreground/40"}`} />
                  <div className={`flex flex-1 items-center gap-3 rounded-xl border-l-4 bg-muted/40 p-3 ${a.accent}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.avatar} alt={a.name} className="h-9 w-9 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.type}</p>
                    </div>
                    {a.done ? (
                      <span className="flex items-center gap-1 text-1xs text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> Done</span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-background px-2 py-0.5 text-1xs text-muted-foreground">
                        {a.mode === "Video" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />} {a.mode}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* next up + stats */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-600 p-6 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs">
                <Clock className="h-3.5 w-3.5" /> Starts in 24 min
              </span>
              <div className="mt-4 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/avatar-40-02.jpg" alt="James Carter" className="h-14 w-14 rounded-full object-cover ring-2 ring-white/40" />
                <div>
                  <p className="text-lg font-semibold">James Carter</p>
                  <p className="text-sm text-white/80">Follow-up · Video call</p>
                </div>
              </div>
              <Button className="mt-5 w-full rounded-full bg-white text-sky-700 hover:bg-white/90">
                <Video className="mr-2 h-4 w-4" /> Join call
              </Button>
            </div>

            <div className={`${surface} p-5`}>
              <SectionTitle title="Today" />
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { v: "5", l: "Total", i: Calendar },
                  { v: "1", l: "Done", i: CheckCircle2 },
                  { v: "2", l: "Video", i: Video },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl bg-muted/50 p-3">
                    <s.i className="mx-auto h-4 w-4 text-muted-foreground" />
                    <p className="mt-1 text-xl font-semibold tabular-nums">{s.v}</p>
                    <p className="text-1xs text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
