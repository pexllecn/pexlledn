"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { FileText, Download, Pill, Activity, FlaskConical, Stethoscope, TrendingUp, TrendingDown } from "lucide-react";

const vitals = [
  { label: "Blood pressure", value: "128/82", unit: "mmHg", trend: "up", note: "+3", c: "text-rose-500" },
  { label: "Heart rate", value: "72", unit: "bpm", trend: "down", note: "-4", c: "text-emerald-500" },
  { label: "Temperature", value: "36.7", unit: "°C", trend: "up", note: "0.1", c: "text-amber-500" },
  { label: "Weight", value: "74", unit: "kg", trend: "down", note: "-0.5", c: "text-emerald-500" },
];

const history = [
  { icon: Stethoscope, title: "General Consultation", doctor: "Dr. Sarah Kim", date: "Mar 12, 2026", type: "Visit note", c: "bg-sky-500" },
  { icon: FlaskConical, title: "Blood Panel Results", doctor: "Lab · CityCare", date: "Mar 10, 2026", type: "Lab result", c: "bg-violet-500" },
  { icon: Pill, title: "Prescription — Lisinopril", doctor: "Dr. Sarah Kim", date: "Mar 10, 2026", type: "Prescription", c: "bg-emerald-500" },
  { icon: Activity, title: "ECG Report", doctor: "Cardiology Dept.", date: "Feb 28, 2026", type: "Diagnostic", c: "bg-rose-500" },
  { icon: FileText, title: "Discharge Summary", doctor: "Dr. Alan Ford", date: "Feb 20, 2026", type: "Summary", c: "bg-amber-500" },
];

export default function Records() {
  return (
    <ContentLayout title="Records">
      <FadeIn>
        {/* patient header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white sm:p-8 dark:from-slate-900 dark:to-black">
          <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative flex flex-wrap items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar-80-01.jpg" alt="Olivia Bennett" className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white/20" />
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-semibold tracking-tight">Olivia Bennett</h2>
              <p className="text-sm text-white/70">PT-1042 · 34 · Female</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["O+ blood type", "Hypertension", "No allergies"].map((t) => (
                  <span key={t} className="rounded-full bg-white/10 px-2.5 py-0.5 text-1xs">{t}</span>
                ))}
              </div>
            </div>
            <Button className="rounded-full bg-white text-slate-900 hover:bg-white/90">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {/* vitals */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {vitals.map((v) => (
            <div key={v.label} className={`${surface} p-5`}>
              <p className="text-sm text-muted-foreground">{v.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-2xl font-semibold tabular-nums">
                  {v.value} <span className="text-sm font-normal text-muted-foreground">{v.unit}</span>
                </p>
                <span className={`flex items-center gap-0.5 text-xs ${v.c}`}>
                  {v.trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />} {v.note}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* history timeline */}
        <div className={`${surface} p-6`}>
          <SectionTitle title="Medical history" action={<Button variant="outline" size="sm" className="rounded-full">Add record</Button>} />
          <div className="relative mt-5 space-y-4 before:absolute before:left-5 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
            {history.map((r) => (
              <div key={r.title} className="relative flex items-center gap-4">
                <div className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${r.c} text-white ring-4 ring-card`}>
                  <r.icon className="h-4 w-4" />
                </div>
                <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted/40 p-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.doctor} · {r.date}</p>
                  </div>
                  <span className="rounded-full bg-background px-2 py-0.5 text-1xs text-muted-foreground">{r.type}</span>
                  <Button size="icon" variant="ghost" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
