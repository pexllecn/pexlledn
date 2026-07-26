"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  CalendarDays,
  CalendarIcon,
  Clock,
  Droplet,
  HeartPulse,
  Plus,
  Thermometer,
  Video,
} from "lucide-react";

type Appt = {
  patient: string;
  reason: string;
  time: string;
  duration: string;
  doctor: string;
  room: string;
  type: "In-person" | "Telehealth";
  status: "Confirmed" | "Waiting" | "Completed";
  avatar: string;
  fallback: string;
  day: "today" | "tomorrow";
};

const appointments: Appt[] = [
  { patient: "Emma Johnson", reason: "Annual check-up", time: "09:00", duration: "30 min", doctor: "Dr. Reyes", room: "Room 3", type: "In-person", status: "Completed", avatar: "/avatar-80-01.jpg", fallback: "EJ", day: "today" },
  { patient: "Liam Chen", reason: "Cardiology follow-up", time: "09:45", duration: "20 min", doctor: "Dr. Osei", room: "Room 1", type: "In-person", status: "Waiting", avatar: "/avatar-80-02.jpg", fallback: "LC", day: "today" },
  { patient: "Sofia Rossi", reason: "Lab review", time: "10:30", duration: "15 min", doctor: "Dr. Reyes", room: "Telehealth", type: "Telehealth", status: "Confirmed", avatar: "/avatar-80-03.jpg", fallback: "SR", day: "today" },
  { patient: "Noah Patel", reason: "Dermatology consult", time: "11:15", duration: "30 min", doctor: "Dr. Kaur", room: "Room 4", type: "In-person", status: "Confirmed", avatar: "/avatar-80-04.jpg", fallback: "NP", day: "today" },
  { patient: "Ava Martinez", reason: "Prenatal check", time: "13:00", duration: "40 min", doctor: "Dr. Lindqvist", room: "Room 2", type: "In-person", status: "Confirmed", avatar: "/avatar-80-05.jpg", fallback: "AM", day: "today" },
  { patient: "Ethan Brooks", reason: "Physio assessment", time: "09:30", duration: "45 min", doctor: "Dr. Osei", room: "Room 5", type: "In-person", status: "Confirmed", avatar: "/avatar-80-06.jpg", fallback: "EB", day: "tomorrow" },
  { patient: "Mia Wong", reason: "Nutrition consult", time: "10:15", duration: "30 min", doctor: "Dr. Kaur", room: "Telehealth", type: "Telehealth", status: "Confirmed", avatar: "/avatar-80-07.jpg", fallback: "MW", day: "tomorrow" },
];

const statusVariant: Record<Appt["status"], "success" | "yellow" | "secondary"> = {
  Confirmed: "success",
  Waiting: "yellow",
  Completed: "secondary",
};

export default function AppointmentsPage() {
  const [day, setDay] = useState<"today" | "tomorrow">("today");
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 6, 5));

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const list = appointments.filter((a) => a.day === day);

  return (
    <ContentLayout title="Appointments">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Appointments</h2>
              <p className="text-muted-foreground mt-1">
                Manage the clinic schedule and patient queue
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {date ? date.toLocaleDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Book appointment
              </Button>
            </div>
          </div>

          <Tabs value={day} onValueChange={(v) => setDay(v as typeof day)}>
            <TabsList>
              <TabsTrigger value="today">Today · 5</TabsTrigger>
              <TabsTrigger value="tomorrow">Tomorrow · 2</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-4 lg:grid-cols-2">
            {list.map((a) => (
              <Card key={a.patient} className="bg-muted border-none">
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex flex-col items-center justify-center rounded-lg bg-background/60 px-3 py-2 shrink-0">
                    <CalendarDays className="h-4 w-4 text-muted-foreground mb-1" />
                    <span className="text-sm tabular-nums">{a.time}</span>
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={a.avatar} />
                          <AvatarFallback>{a.fallback}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm leading-none truncate">
                            {a.patient}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {a.reason}
                          </p>
                        </div>
                      </div>
                      <Badge variant={statusVariant[a.status]}>{a.status}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {a.duration}
                      </span>
                      <span>{a.doctor}</span>
                      <span className="flex items-center gap-1">
                        {a.type === "Telehealth" ? (
                          <Video className="h-3 w-3" />
                        ) : null}
                        {a.room}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            View chart
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[320px] sm:w-[440px] overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={a.avatar} />
                                <AvatarFallback>{a.fallback}</AvatarFallback>
                              </Avatar>
                              {a.patient}
                            </SheetTitle>
                            <SheetDescription>
                              {a.reason} · {a.doctor} · {a.time}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid grid-cols-2 gap-3 py-6">
                            {[
                              { label: "Heart rate", value: "72 bpm", icon: HeartPulse },
                              { label: "Temp", value: "36.7°C", icon: Thermometer },
                              { label: "SpO₂", value: "98%", icon: Activity },
                              { label: "Glucose", value: "5.4 mmol", icon: Droplet },
                            ].map((v) => (
                              <div
                                key={v.label}
                                className="rounded-lg bg-muted p-3"
                              >
                                <v.icon className="h-4 w-4 text-muted-foreground" />
                                <p className="text-lg tabular-nums mt-2 leading-none">
                                  {v.value}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {v.label}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-3">
                            <p className="text-sm font-medium">
                              Treatment progress
                            </p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Care plan</span>
                                <span>68%</span>
                              </div>
                              <Progress value={68} className="h-2" />
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                      {a.type === "Telehealth" ? (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() =>
                            toast.success(`Starting call with ${a.patient}…`)
                          }
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Start call
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() =>
                            toast.success(`${a.patient} checked in`, {
                              description: `${a.room} · ${a.doctor}`,
                            })
                          }
                        >
                          Check in
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
