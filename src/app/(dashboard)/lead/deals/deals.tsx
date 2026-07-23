"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, TrendingUp, DollarSign, Target } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const stats = [
  { label: "Open deals", value: "$256k", icon: DollarSign },
  { label: "Win rate", value: "34%", icon: Target },
  { label: "Avg deal size", value: "$28.4k", icon: TrendingUp },
];

const deals = [
  { name: "Enterprise plan — Acme Co.", owner: "Jerome Bell", value: "$61,000", stage: "Won", prob: 100, close: "Mar 8", avatar: "/avatar-40-01.jpg", tint: "bg-emerald-500/10 text-emerald-600" },
  { name: "Annual license — Umbrella", owner: "Kristin Watson", value: "$34,000", stage: "Proposal", prob: 70, close: "Mar 21", avatar: "/avatar-40-04.jpg", tint: "bg-amber-500/10 text-amber-600" },
  { name: "Pilot — Initech", owner: "Cody Fisher", value: "$21,500", stage: "Qualified", prob: 45, close: "Apr 2", avatar: "/avatar-40-03.jpg", tint: "bg-violet-500/10 text-violet-600" },
  { name: "Renewal — Hooli", owner: "Robert Fox", value: "$28,000", stage: "Proposal", prob: 65, close: "Mar 30", avatar: "/avatar-32-01.jpg", tint: "bg-amber-500/10 text-amber-600" },
  { name: "New logo — Globex", owner: "Dianne Russell", value: "$8,500", stage: "New", prob: 20, close: "Apr 15", avatar: "/avatar-40-02.jpg", tint: "bg-sky-500/10 text-sky-600" },
];

export default function Deals() {
  return (
    <ContentLayout title="Deals">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Deals</h2>
              <p className="text-muted-foreground mt-1">Your active opportunities</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New deal
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((s) => (
              <Card key={s.label} className="border-none bg-muted">
                <CardContent className="p-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-muted-foreground">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tabular-nums leading-none">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none bg-muted">
            <CardContent className="p-0">
              {deals.map((d) => (
                <div
                  key={d.name}
                  className="grid grid-cols-1 gap-3 border-b px-6 py-4 last:border-0 lg:grid-cols-[2.2fr,1.4fr,1fr,1fr] lg:items-center"
                >
                  <div>
                    <p className="text-sm font-medium">{d.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={d.avatar} alt={d.owner} />
                        <AvatarFallback>{d.owner[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{d.owner}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={d.prob} className="h-2 flex-1" />
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {d.prob}%
                    </span>
                  </div>
                  <Badge className={`${d.tint} border-none w-fit`}>{d.stage}</Badge>
                  <div className="flex items-center justify-between lg:justify-end lg:gap-6">
                    <span className="text-xs text-muted-foreground">Close {d.close}</span>
                    <span className="text-sm font-semibold tabular-nums">{d.value}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
