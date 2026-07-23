"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Share2, CheckCircle2, Lock } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const earned = [
  { title: "UX Research From Scratch", issued: "Mar 2026", id: "UX-2026-1042", color: "bg-violet-500" },
  { title: "Product Photography Basics", issued: "Feb 2026", id: "PH-2026-0088", color: "bg-sky-500" },
  { title: "Brand Identity & Strategy", issued: "Jan 2026", id: "BR-2026-0311", color: "bg-emerald-500" },
];

const locked = [
  { title: "3D Character Modeling Masterclass", pct: 62 },
  { title: "Full-Stack Web Development", pct: 35 },
];

export default function Certificates() {
  return (
    <ContentLayout title="Certificates">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Certificates</h2>
            <p className="text-muted-foreground mt-1">
              3 earned · 2 in progress
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {earned.map((c) => (
              <Card key={c.id} className="border-none bg-muted overflow-hidden">
                <CardContent className="p-0">
                  <div className={`${c.color} p-6 text-white`}>
                    <Award className="h-8 w-8" />
                    <p className="mt-4 text-lg font-semibold leading-snug">{c.title}</p>
                    <p className="text-sm text-white/80 mt-1">Certificate of Completion</p>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" /> Verified
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Issued {c.issued} · ID {c.id}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="mr-1.5 h-4 w-4" /> PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none bg-muted">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Almost there</h3>
              <div className="space-y-3">
                {locked.map((l) => (
                  <div
                    key={l.title}
                    className="flex items-center gap-4 rounded-lg bg-background/60 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium line-clamp-1">{l.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Complete the course to unlock
                      </p>
                    </div>
                    <Badge variant="secondary">{l.pct}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
