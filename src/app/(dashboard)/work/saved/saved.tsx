"use client";

import Image from "next/image";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Bookmark, MapPin, DollarSign, Clock, Building2 } from "lucide-react";

const featured = {
  company: "Linear", role: "Product Engineer", logo: "https://logo.clearbit.com/linear.app",
  location: "Remote", salary: "$140k–$180k", type: "Full-time", level: "Senior",
  desc: "Build the tools the best software teams use every day. Small team, high craft, fast pace.",
};

const jobs = [
  { company: "Vercel", role: "Design Engineer", logo: "https://logo.clearbit.com/vercel.com", location: "Remote", salary: "$150k–$200k", type: "Full-time", level: "Senior", ago: "1d" },
  { company: "Stripe", role: "Frontend Engineer", logo: "https://logo.clearbit.com/stripe.com", location: "Dublin · Hybrid", salary: "$120k–$160k", type: "Full-time", level: "Mid", ago: "2d" },
  { company: "GitHub", role: "UX Designer", logo: "https://logo.clearbit.com/github.com", location: "Remote", salary: "$110k–$150k", type: "Contract", level: "Mid", ago: "3d" },
  { company: "Loom", role: "Brand Designer", logo: "https://logo.clearbit.com/loom.com", location: "San Francisco", salary: "$100k–$130k", type: "Full-time", level: "Mid", ago: "4d" },
  { company: "Webflow", role: "Motion Designer", logo: "https://logo.clearbit.com/webflow.com", location: "Remote", salary: "$95k–$125k", type: "Full-time", level: "Junior", ago: "5d" },
];

export default function Saved() {
  return (
    <ContentLayout title="Saved">
      <FadeIn>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Saved jobs</h2>
          <p className="mt-1 text-muted-foreground">6 roles you bookmarked</p>
        </div>

        {/* featured */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white sm:p-8 dark:from-slate-900 dark:to-black">
          <div className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative flex flex-wrap items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
              <Image src={featured.logo} alt={featured.company} width={40} height={40} className="h-10 w-10 object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-1xs">{featured.type}</span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-1xs">{featured.level}</span>
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{featured.role}</h3>
              <p className="text-sm text-white/70">{featured.company}</p>
              <p className="mt-2 max-w-lg text-sm text-white/70">{featured.desc}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {featured.location}</span>
                <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {featured.salary}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="rounded-full bg-white text-slate-900 hover:bg-white/90">Apply now</Button>
              <Button size="icon" variant="outline" className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"><Bookmark className="h-4 w-4 fill-current" /></Button>
            </div>
          </div>
        </div>

        <SectionTitle title="More saved" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <div key={j.company + j.role} className={`group ${surface} p-5`}>
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-muted">
                  <Image src={j.logo} alt={j.company} width={32} height={32} className="h-8 w-8 object-contain" />
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-foreground"><Bookmark className="h-4 w-4 fill-current" /></Button>
              </div>
              <p className="mt-4 font-semibold leading-snug">{j.role}</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground"><Building2 className="h-3.5 w-3.5" /> {j.company}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-1xs text-muted-foreground">{j.type}</span>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-1xs text-muted-foreground">{j.level}</span>
              </div>
              <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {j.location}</p>
                <p className="flex items-center gap-1.5"><DollarSign className="h-4 w-4" /> {j.salary}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> {j.ago} ago</span>
                <Button size="sm" className="rounded-full">Apply</Button>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
