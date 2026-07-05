"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Phone, Plus, Users, Utensils } from "lucide-react";

type Reservation = {
  name: string;
  time: string;
  guests: number;
  table: string;
  status: "Confirmed" | "Seated" | "Waitlist" | "No-show";
  note?: string;
  avatar: string;
  fallback: string;
  slot: "lunch" | "dinner";
};

const reservations: Reservation[] = [
  { name: "The Harrisons", time: "12:30", guests: 4, table: "T6", status: "Seated", note: "Anniversary", avatar: "/avatar-40-01.jpg", fallback: "HA", slot: "lunch" },
  { name: "Yuki Tanaka", time: "13:00", guests: 2, table: "T2", status: "Confirmed", avatar: "/avatar-40-02.jpg", fallback: "YT", slot: "lunch" },
  { name: "Marco Diaz", time: "13:15", guests: 6, table: "T9", status: "Waitlist", note: "High chair", avatar: "/avatar-40-03.jpg", fallback: "MD", slot: "lunch" },
  { name: "Priya Nair", time: "19:00", guests: 2, table: "T4", status: "Confirmed", note: "Window seat", avatar: "/avatar-40-04.jpg", fallback: "PN", slot: "dinner" },
  { name: "The Coles", time: "19:30", guests: 5, table: "T11", status: "Confirmed", avatar: "/avatar-40-05.jpg", fallback: "CO", slot: "dinner" },
  { name: "Sam Reid", time: "20:00", guests: 3, table: "T7", status: "Confirmed", note: "Gluten-free", avatar: "/avatar-80-06.jpg", fallback: "SR", slot: "dinner" },
  { name: "Ava Martinez", time: "20:45", guests: 2, table: "T3", status: "No-show", avatar: "/avatar-80-07.jpg", fallback: "AM", slot: "dinner" },
];

const statusVariant: Record<Reservation["status"], "success" | "info" | "yellow" | "decline"> = {
  Confirmed: "info",
  Seated: "success",
  Waitlist: "yellow",
  "No-show": "decline",
};

export default function ReservationsPage() {
  const [slot, setSlot] = useState<"lunch" | "dinner">("dinner");

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const list = reservations.filter((r) => r.slot === slot);
  const covers = list.reduce((s, r) => s + r.guests, 0);

  return (
    <ContentLayout title="Reservations">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Reservations</h2>
              <p className="text-muted-foreground mt-1">
                Saturday, July 5 · {covers} covers booked
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add reservation
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Total covers", value: covers, icon: Users },
              { label: "Tables booked", value: list.length, icon: Utensils },
              { label: "Waitlist", value: reservations.filter((r) => r.status === "Waitlist").length, icon: Clock },
              { label: "Seated now", value: reservations.filter((r) => r.status === "Seated").length, icon: Users },
            ].map((s) => (
              <Card key={s.label} className="bg-muted border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-normal">
                    {s.label}
                  </CardTitle>
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-normal tabular-nums">
                    {s.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs value={slot} onValueChange={(v) => setSlot(v as typeof slot)}>
            <TabsList>
              <TabsTrigger value="lunch">Lunch · 3</TabsTrigger>
              <TabsTrigger value="dinner">Dinner · 4</TabsTrigger>
            </TabsList>
          </Tabs>

          <Card className="bg-muted border-none">
            <CardContent className="space-y-1 pt-6">
              {list.map((r, i) => (
                <div key={r.name}>
                  <div className="flex items-center gap-3 py-3">
                    <div className="text-center w-12 shrink-0">
                      <p className="text-sm tabular-nums">{r.time}</p>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={r.avatar} />
                      <AvatarFallback>{r.fallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-none">{r.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {r.guests}
                        </span>
                        <span>·</span>
                        <span>{r.table}</span>
                        {r.note && (
                          <>
                            <span>·</span>
                            <span>{r.note}</span>
                          </>
                        )}
                      </p>
                    </div>
                    <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                  {i < list.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
