"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, FileText, CheckCircle2, Plus, Clock } from "lucide-react";

const kpis = [
  { label: "Calls", value: "24", icon: Phone, c: "text-emerald-600 bg-emerald-500/10" },
  { label: "Emails", value: "58", icon: Mail, c: "text-sky-600 bg-sky-500/10" },
  { label: "Meetings", value: "12", icon: Calendar, c: "text-amber-600 bg-amber-500/10" },
  { label: "Tasks due", value: "7", icon: Clock, c: "text-rose-600 bg-rose-500/10" },
];

const feed = [
  { icon: Phone, title: "Call with Jerome Bell", desc: "Discussed enterprise rollout timeline", time: "10 min ago", c: "bg-emerald-500", avatar: "/avatar-40-01.jpg" },
  { icon: Mail, title: "Email sent to Umbrella", desc: "Shared the updated proposal deck", time: "1 hour ago", c: "bg-sky-500", avatar: "/avatar-40-04.jpg" },
  { icon: CheckCircle2, title: "Deal marked as Won", desc: "Acme Co. · $61,000", time: "3 hours ago", c: "bg-violet-500", avatar: "/avatar-40-01.jpg" },
  { icon: Calendar, title: "Meeting scheduled", desc: "Demo with Initech · Tomorrow 2:00 PM", time: "Yesterday", c: "bg-amber-500", avatar: "/avatar-40-03.jpg" },
  { icon: FileText, title: "Note added", desc: "Globex needs SOC2 docs before signing", time: "Yesterday", c: "bg-rose-500", avatar: "/avatar-40-02.jpg" },
];

const tasks = [
  { title: "Follow up with Kristin Watson", due: "Today", done: false },
  { title: "Send contract to Hooli", due: "Tomorrow", done: false },
  { title: "Prep demo for Initech", due: "Mar 22", done: false },
  { title: "Log call notes — Acme", due: "Done", done: true },
];

export default function Activities() {
  return (
    <ContentLayout title="Activities">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Activities</h2>
            <p className="mt-1 text-muted-foreground">Your recent CRM activity</p>
          </div>
          <Button><Plus className="mr-2 h-4 w-4" /> Log activity</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className={`${surface} flex items-center gap-3 p-5`}>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${k.c}`}>
                <k.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold leading-none tabular-nums">{k.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* timeline */}
          <div className={`${surface} p-6`}>
            <SectionTitle title="Timeline" />
            <div className="relative mt-5 space-y-5 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
              {feed.map((f, i) => (
                <div key={i} className="relative flex gap-4">
                  <div className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${f.c} text-white ring-4 ring-card`}>
                    <f.icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-1 items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{f.title}</p>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{f.time}</p>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* tasks */}
          <div className={`${surface} p-6`}>
            <SectionTitle title="Tasks" />
            <div className="mt-4 space-y-2">
              {tasks.map((t) => (
                <div key={t.title} className="flex items-center gap-3 rounded-xl bg-muted/40 p-3">
                  <CheckCircle2 className={`h-5 w-5 ${t.done ? "text-emerald-500" : "text-muted-foreground/40"}`} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm ${t.done ? "text-muted-foreground line-through" : "font-medium"}`}>{t.title}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{t.due}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
