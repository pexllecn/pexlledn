"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const columns = [
  {
    name: "New",
    total: "$42k",
    accent: "bg-sky-500",
    cards: [
      { company: "Acme Co.", contact: "Jerome Bell", value: "$12,000", avatar: "/avatar-40-01.jpg" },
      { company: "Globex", contact: "Dianne Russell", value: "$8,500", avatar: "/avatar-40-02.jpg" },
      { company: "Initech", contact: "Cody Fisher", value: "$21,500", avatar: "/avatar-40-03.jpg" },
    ],
  },
  {
    name: "Qualified",
    total: "$68k",
    accent: "bg-violet-500",
    cards: [
      { company: "Umbrella", contact: "Kristin Watson", value: "$34,000", avatar: "/avatar-40-04.jpg" },
      { company: "Soylent", contact: "Guy Hawkins", value: "$34,000", avatar: "/avatar-40-05.jpg" },
    ],
  },
  {
    name: "Proposal",
    total: "$55k",
    accent: "bg-amber-500",
    cards: [
      { company: "Hooli", contact: "Robert Fox", value: "$28,000", avatar: "/avatar-32-01.jpg" },
      { company: "Pied Piper", contact: "Jane Cooper", value: "$27,000", avatar: "/avatar-40-01.jpg" },
    ],
  },
  {
    name: "Won",
    total: "$91k",
    accent: "bg-emerald-500",
    cards: [
      { company: "Stark Ind.", contact: "Wade Warren", value: "$61,000", avatar: "/avatar-40-02.jpg" },
      { company: "Wayne Ent.", contact: "Esther Howard", value: "$30,000", avatar: "/avatar-40-03.jpg" },
    ],
  },
];

export default function Pipeline() {
  return (
    <ContentLayout title="Pipeline">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Pipeline</h2>
              <p className="text-muted-foreground mt-1">$256k across 9 deals</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New deal
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.name} className="rounded-xl bg-muted p-3">
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${col.accent}`} />
                    <span className="text-sm font-medium">{col.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {col.cards.length}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground tabular-nums">
                    {col.total}
                  </span>
                </div>
                <div className="space-y-2">
                  {col.cards.map((c) => (
                    <div
                      key={c.company}
                      className="rounded-lg bg-background p-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{c.company}</p>
                        <span className="text-sm font-semibold tabular-nums">
                          {c.value}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={c.avatar} alt={c.contact} />
                          <AvatarFallback>{c.contact[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {c.contact}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full rounded-lg border border-dashed py-2 text-xs text-muted-foreground transition-colors hover:bg-background">
                    + Add deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
