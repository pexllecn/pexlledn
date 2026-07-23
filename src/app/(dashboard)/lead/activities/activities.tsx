"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, Calendar, FileText, CheckCircle2, Plus } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const feed = [
  { icon: Phone, title: "Call with Jerome Bell", desc: "Discussed enterprise rollout timeline", time: "10 min ago", tint: "text-emerald-600 bg-emerald-500/10", avatar: "/avatar-40-01.jpg" },
  { icon: Mail, title: "Email sent to Umbrella", desc: "Shared the updated proposal deck", time: "1 hour ago", tint: "text-sky-600 bg-sky-500/10", avatar: "/avatar-40-04.jpg" },
  { icon: CheckCircle2, title: "Deal marked as Won", desc: "Acme Co. · $61,000", time: "3 hours ago", tint: "text-violet-600 bg-violet-500/10", avatar: "/avatar-40-01.jpg" },
  { icon: Calendar, title: "Meeting scheduled", desc: "Demo with Initech · Tomorrow 2:00 PM", time: "Yesterday", tint: "text-amber-600 bg-amber-500/10", avatar: "/avatar-40-03.jpg" },
  { icon: FileText, title: "Note added", desc: "Globex needs SOC2 docs before signing", time: "Yesterday", tint: "text-rose-600 bg-rose-500/10", avatar: "/avatar-40-02.jpg" },
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
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Activities</h2>
              <p className="text-muted-foreground mt-1">Your recent CRM activity</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Log activity
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
            <Card className="border-none bg-muted">
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {feed.map((f, i) => (
                  <div key={i} className="flex gap-4 rounded-lg p-2.5 transition-colors hover:bg-background/60">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${f.tint}`}>
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{f.title}</p>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{f.time}</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={f.avatar} alt="" />
                      <AvatarFallback>·</AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none bg-muted">
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tasks.map((t) => (
                  <div
                    key={t.title}
                    className="flex items-center gap-3 rounded-lg bg-background/60 p-3"
                  >
                    <CheckCircle2
                      className={`h-5 w-5 ${
                        t.done ? "text-emerald-500" : "text-muted-foreground/40"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm ${
                          t.done ? "text-muted-foreground line-through" : "font-medium"
                        }`}
                      >
                        {t.title}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{t.due}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
