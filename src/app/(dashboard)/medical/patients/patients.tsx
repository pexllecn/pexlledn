"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Phone, Mail, MoreHorizontal } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const stats = [
  { label: "Total patients", value: "1,284" },
  { label: "New this month", value: "48" },
  { label: "Active cases", value: "126" },
  { label: "Discharged", value: "312" },
];

const patients = [
  { name: "Olivia Bennett", id: "PT-1042", age: 34, gender: "Female", condition: "Hypertension", status: "Active", last: "2 days ago", avatar: "/avatar-40-01.jpg" },
  { name: "James Carter", id: "PT-1043", age: 52, gender: "Male", condition: "Diabetes Type 2", status: "Active", last: "5 days ago", avatar: "/avatar-40-02.jpg" },
  { name: "Sophia Nguyen", id: "PT-1044", age: 28, gender: "Female", condition: "Asthma", status: "Stable", last: "1 week ago", avatar: "/avatar-40-03.jpg" },
  { name: "William Chen", id: "PT-1045", age: 41, gender: "Male", condition: "Post-op recovery", status: "Monitoring", last: "Yesterday", avatar: "/avatar-40-04.jpg" },
  { name: "Emma Rodriguez", id: "PT-1046", age: 63, gender: "Female", condition: "Arthritis", status: "Active", last: "3 days ago", avatar: "/avatar-40-05.jpg" },
];

const tint: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-600",
  Stable: "bg-sky-500/10 text-sky-600",
  Monitoring: "bg-amber-500/10 text-amber-600",
};

export default function Patients() {
  return (
    <ContentLayout title="Patients">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Patients</h2>
              <p className="text-muted-foreground mt-1">Manage patient records</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients…" className="pl-9 bg-muted border-none" />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add patient
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label} className="border-none bg-muted">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="mt-2 text-3xl font-semibold tabular-nums">{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none bg-muted">
            <CardContent className="p-0">
              <div className="hidden grid-cols-[2fr,1fr,1.5fr,1fr,1fr,auto] gap-4 border-b px-6 py-3 text-xs font-medium text-muted-foreground lg:grid">
                <span>Patient</span>
                <span>Age / Gender</span>
                <span>Condition</span>
                <span>Status</span>
                <span>Last visit</span>
                <span></span>
              </div>
              {patients.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-1 gap-4 border-b px-6 py-4 last:border-0 lg:grid-cols-[2fr,1fr,1.5fr,1fr,1fr,auto] lg:items-center"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={p.avatar} alt={p.name} />
                      <AvatarFallback>{p.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.id}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {p.age} · {p.gender}
                  </span>
                  <span className="text-sm">{p.condition}</span>
                  <span>
                    <Badge className={`${tint[p.status]} border-none`}>{p.status}</Badge>
                  </span>
                  <span className="text-sm text-muted-foreground">{p.last}</span>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
