"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Mail, Briefcase, GraduationCap, Download, Eye, Send, Star } from "lucide-react";

const skills = [
  { name: "Product Design", pct: 92 },
  { name: "Prototyping", pct: 85 },
  { name: "Design Systems", pct: 88 },
  { name: "User Research", pct: 74 },
];

const experience = [
  { role: "Senior Product Designer", company: "Airbnb", period: "2022 — Present", icon: Briefcase, c: "bg-rose-500" },
  { role: "Product Designer", company: "Spotify", period: "2019 — 2022", icon: Briefcase, c: "bg-emerald-500" },
  { role: "BFA, Interaction Design", company: "RISD", period: "2015 — 2019", icon: GraduationCap, c: "bg-violet-500" },
];

export default function Profile() {
  return (
    <ContentLayout title="Profile">
      <FadeIn>
        {/* header */}
        <div className={`overflow-hidden ${surface}`}>
          <div className="relative h-32 bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500">
            <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_30%,white,transparent_40%)]" />
          </div>
          <div className="px-6 pb-6">
            <div className="-mt-12 flex flex-wrap items-end gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-3xl border-4 border-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/avatar-80-01.jpg" alt="Alex Rivera" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1 pb-1">
                <h2 className="text-2xl font-semibold tracking-tight">Alex Rivera</h2>
                <p className="text-muted-foreground">Senior Product Designer</p>
              </div>
              <div className="flex gap-2 pb-1">
                <Button variant="outline" className="rounded-full"><Download className="mr-2 h-4 w-4" /> Resume</Button>
                <Button className="rounded-full"><Send className="mr-2 h-4 w-4" /> Message</Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> San Francisco, CA</span>
              <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> alex@rivera.design</span>
              <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> 1.2k profile views</span>
            </div>
          </div>
        </div>

        {/* stat row */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { v: "7", l: "Years exp." },
            { v: "48", l: "Projects" },
            { v: "4.9", l: "Rating", star: true },
            { v: "12", l: "Awards" },
          ].map((s) => (
            <div key={s.l} className={`${surface} p-5 text-center`}>
              <p className="flex items-center justify-center gap-1 text-2xl font-semibold tabular-nums">
                {s.star && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}{s.v}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* skills */}
          <div className={`${surface} p-6`}>
            <SectionTitle title="Skills" />
            <div className="mt-4 space-y-4">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span>{s.name}</span><span className="text-muted-foreground tabular-nums">{s.pct}%</span>
                  </div>
                  <Progress value={s.pct} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* experience timeline */}
          <div className={`${surface} p-6`}>
            <SectionTitle title="Experience" />
            <div className="relative mt-4 space-y-5 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
              {experience.map((e) => (
                <div key={e.role} className="relative flex gap-4">
                  <div className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${e.c} text-white ring-4 ring-card`}>
                    <e.icon className="h-4 w-4" />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-sm font-medium">{e.role}</p>
                    <p className="text-sm text-muted-foreground">{e.company}</p>
                    <p className="text-xs text-muted-foreground">{e.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${surface} p-6`}>
          <SectionTitle title="About" />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Product designer with 7+ years crafting calm, human-centered
            interfaces for consumer and B2B products. I care about systems
            thinking, tight feedback loops, and shipping polished work.
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Figma", "Design Systems", "Prototyping", "Research", "Motion"].map((t) => (
              <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>
            ))}
          </div>
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
