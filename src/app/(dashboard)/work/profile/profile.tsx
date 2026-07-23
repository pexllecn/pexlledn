"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Briefcase, GraduationCap, Download } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const skills = [
  { name: "Product Design", pct: 92 },
  { name: "Prototyping", pct: 85 },
  { name: "Design Systems", pct: 88 },
  { name: "User Research", pct: 74 },
];

const experience = [
  { role: "Senior Product Designer", company: "Airbnb", period: "2022 — Present", icon: Briefcase },
  { role: "Product Designer", company: "Spotify", period: "2019 — 2022", icon: Briefcase },
  { role: "BFA, Interaction Design", company: "RISD", period: "2015 — 2019", icon: GraduationCap },
];

export default function Profile() {
  return (
    <ContentLayout title="Profile">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <Card className="border-none bg-muted">
            <CardContent className="flex flex-wrap items-center gap-5 p-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/avatar-80-01.jpg" alt="Profile" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-semibold tracking-tight">Alex Rivera</h2>
                <p className="text-muted-foreground">Senior Product Designer</p>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> San Francisco, CA
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> alex@rivera.design
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Resume
                </Button>
                <Button>Edit profile</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-none bg-muted">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((s) => (
                  <div key={s.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span>{s.name}</span>
                      <span className="tabular-nums text-muted-foreground">{s.pct}%</span>
                    </div>
                    <Progress value={s.pct} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none bg-muted">
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experience.map((e) => (
                  <div key={e.role} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground">
                      <e.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{e.role}</p>
                      <p className="text-sm text-muted-foreground">{e.company}</p>
                      <p className="text-xs text-muted-foreground">{e.period}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-none bg-muted">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Product designer with 7+ years crafting calm, human-centered
                interfaces for consumer and B2B products. I care about systems
                thinking, tight feedback loops, and shipping polished work.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Figma", "Design Systems", "Prototyping", "Research", "Motion"].map(
                  (t) => (
                    <Badge key={t} variant="secondary" className="font-normal">
                      {t}
                    </Badge>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
