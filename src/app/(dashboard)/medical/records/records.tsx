"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Download, Pill, Activity, FlaskConical, Stethoscope } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const records = [
  { icon: Stethoscope, title: "General Consultation", doctor: "Dr. Sarah Kim", date: "Mar 12, 2026", type: "Visit note", tint: "text-sky-600 bg-sky-500/10" },
  { icon: FlaskConical, title: "Blood Panel Results", doctor: "Lab · CityCare", date: "Mar 10, 2026", type: "Lab result", tint: "text-violet-600 bg-violet-500/10" },
  { icon: Pill, title: "Prescription — Lisinopril", doctor: "Dr. Sarah Kim", date: "Mar 10, 2026", type: "Prescription", tint: "text-emerald-600 bg-emerald-500/10" },
  { icon: Activity, title: "ECG Report", doctor: "Cardiology Dept.", date: "Feb 28, 2026", type: "Diagnostic", tint: "text-rose-600 bg-rose-500/10" },
  { icon: FileText, title: "Discharge Summary", doctor: "Dr. Alan Ford", date: "Feb 20, 2026", type: "Summary", tint: "text-amber-600 bg-amber-500/10" },
];

const vitals = [
  { label: "Blood pressure", value: "128/82", unit: "mmHg" },
  { label: "Heart rate", value: "72", unit: "bpm" },
  { label: "Temperature", value: "36.7", unit: "°C" },
  { label: "Weight", value: "74", unit: "kg" },
];

export default function Records() {
  return (
    <ContentLayout title="Records">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <Card className="border-none bg-muted">
            <CardContent className="flex flex-wrap items-center gap-4 p-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/avatar-40-01.jpg" alt="Olivia Bennett" />
                <AvatarFallback>OB</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-semibold tracking-tight">Olivia Bennett</h2>
                <p className="text-muted-foreground">PT-1042 · 34 · Female · O+ blood type</p>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export records
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {vitals.map((v) => (
              <Card key={v.label} className="border-none bg-muted">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">{v.label}</p>
                  <p className="mt-2 text-2xl font-semibold tabular-nums">
                    {v.value}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      {v.unit}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none bg-muted">
            <CardHeader>
              <CardTitle>Medical history</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {records.map((r) => (
                <div
                  key={r.title}
                  className="flex items-center gap-4 rounded-lg bg-background/60 p-4"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${r.tint}`}>
                    <r.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.doctor} · {r.date}
                    </p>
                  </div>
                  <Badge variant="secondary">{r.type}</Badge>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
