"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Clock, Video, MapPin } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const days = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"];

const appts = [
  { time: "09:00", name: "Olivia Bennett", type: "Check-up", mode: "In-person", avatar: "/avatar-40-01.jpg", tint: "border-l-emerald-500" },
  { time: "10:30", name: "James Carter", type: "Follow-up", mode: "Video", avatar: "/avatar-40-02.jpg", tint: "border-l-sky-500" },
  { time: "12:00", name: "Sophia Nguyen", type: "Consultation", mode: "In-person", avatar: "/avatar-40-03.jpg", tint: "border-l-violet-500" },
  { time: "14:15", name: "William Chen", type: "Post-op review", mode: "Video", avatar: "/avatar-40-04.jpg", tint: "border-l-amber-500" },
  { time: "16:00", name: "Emma Rodriguez", type: "Check-up", mode: "In-person", avatar: "/avatar-40-05.jpg", tint: "border-l-rose-500" },
];

export default function Appointments() {
  return (
    <ContentLayout title="Appointments">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Appointments</h2>
              <p className="text-muted-foreground mt-1">Thursday, March 15 · 5 scheduled</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New appointment
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {days.map((d, i) => (
              <button
                key={d}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  i === 3 ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
            <Card className="border-none bg-muted">
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {appts.map((a) => (
                  <div
                    key={a.time}
                    className={`flex items-center gap-4 rounded-lg border-l-4 bg-background/60 p-4 ${a.tint}`}
                  >
                    <span className="w-14 text-sm font-semibold tabular-nums text-muted-foreground">
                      {a.time}
                    </span>
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={a.avatar} alt={a.name} />
                      <AvatarFallback>{a.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.type}</p>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      {a.mode === "Video" ? (
                        <Video className="h-3 w-3" />
                      ) : (
                        <MapPin className="h-3 w-3" />
                      )}
                      {a.mode}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none bg-muted">
              <CardHeader>
                <CardTitle>Up next</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-background/60 p-5 text-center">
                  <Avatar className="mx-auto h-16 w-16">
                    <AvatarImage src="/avatar-40-02.jpg" alt="James Carter" />
                    <AvatarFallback>JC</AvatarFallback>
                  </Avatar>
                  <p className="mt-3 font-semibold">James Carter</p>
                  <p className="text-sm text-muted-foreground">Follow-up · Video call</p>
                  <div className="mt-2 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" /> Starts in 24 min
                  </div>
                  <Button className="mt-4 w-full">
                    <Video className="mr-2 h-4 w-4" /> Join call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
