"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, MoreHorizontal } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const stages = [
  { key: "Applied", count: 8, tint: "bg-sky-500/10 text-sky-600" },
  { key: "Screening", count: 3, tint: "bg-violet-500/10 text-violet-600" },
  { key: "Interview", count: 2, tint: "bg-amber-500/10 text-amber-600" },
  { key: "Offer", count: 1, tint: "bg-emerald-500/10 text-emerald-600" },
];

const apps = [
  { company: "Dropbox", role: "UI Designer", logo: "https://logo.clearbit.com/dropbox.com", location: "San Francisco · Remote", stage: "Interview", applied: "2d ago", tint: "bg-amber-500/10 text-amber-600" },
  { company: "Airbnb", role: "Product Designer", logo: "https://logo.clearbit.com/airbnb.com", location: "New York · Hybrid", stage: "Screening", applied: "4d ago", tint: "bg-violet-500/10 text-violet-600" },
  { company: "Spotify", role: "Design Systems Lead", logo: "https://logo.clearbit.com/spotify.com", location: "Stockholm · Remote", stage: "Offer", applied: "1w ago", tint: "bg-emerald-500/10 text-emerald-600" },
  { company: "Figma", role: "Senior Product Designer", logo: "https://logo.clearbit.com/figma.com", location: "Remote", stage: "Applied", applied: "3d ago", tint: "bg-sky-500/10 text-sky-600" },
  { company: "Notion", role: "Brand Designer", logo: "https://logo.clearbit.com/notion.so", location: "San Francisco", stage: "Applied", applied: "5d ago", tint: "bg-sky-500/10 text-sky-600" },
];

export default function Applications() {
  return (
    <ContentLayout title="Applications">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Applications</h2>
            <p className="text-muted-foreground mt-1">Track where you stand · 14 active</p>
          </div>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {stages.map((s) => (
              <Card key={s.key} className="border-none bg-muted">
                <CardContent className="p-5">
                  <Badge className={`${s.tint} border-none`}>{s.key}</Badge>
                  <p className="mt-3 text-3xl font-semibold tabular-nums">{s.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-3">
            {apps.map((a) => (
              <Card key={a.company + a.role} className="border-none bg-muted">
                <CardContent className="flex flex-wrap items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-background">
                    <Image
                      src={a.logo}
                      alt={a.company}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{a.role}</p>
                    <p className="text-sm text-muted-foreground">{a.company}</p>
                  </div>
                  <span className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
                    <MapPin className="h-4 w-4" /> {a.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {a.applied}
                  </span>
                  <Badge className={`${a.tint} border-none`}>{a.stage}</Badge>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
