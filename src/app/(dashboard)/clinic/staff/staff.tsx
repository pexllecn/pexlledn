"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarClock, Mail, Plus, Star, Stethoscope } from "lucide-react";

const staff = [
  { name: "Dr. Elena Reyes", role: "General Practitioner", dept: "Primary Care", status: "Available", patients: 18, rating: 4.9, avatar: "/avatar-80-01.jpg", fallback: "ER" },
  { name: "Dr. Kwame Osei", role: "Cardiologist", dept: "Cardiology", status: "In session", patients: 12, rating: 4.8, avatar: "/avatar-80-02.jpg", fallback: "KO" },
  { name: "Dr. Simran Kaur", role: "Dermatologist", dept: "Dermatology", status: "Available", patients: 15, rating: 4.9, avatar: "/avatar-80-03.jpg", fallback: "SK" },
  { name: "Dr. Anders Lindqvist", role: "Obstetrician", dept: "Maternity", status: "On leave", patients: 9, rating: 5.0, avatar: "/avatar-80-04.jpg", fallback: "AL" },
  { name: "Nurse Rosa Gomez", role: "Head Nurse", dept: "Triage", status: "Available", patients: 24, rating: 4.7, avatar: "/avatar-80-05.jpg", fallback: "RG" },
  { name: "Dr. Yuki Tanaka", role: "Physiotherapist", dept: "Rehab", status: "In session", patients: 11, rating: 4.8, avatar: "/avatar-80-06.jpg", fallback: "YT" },
];

const statusVariant: Record<string, "success" | "yellow" | "secondary"> = {
  Available: "success",
  "In session": "yellow",
  "On leave": "secondary",
};

const departments = [
  { name: "Primary Care", staff: 8, load: 76 },
  { name: "Cardiology", staff: 4, load: 88 },
  { name: "Dermatology", staff: 3, load: 54 },
  { name: "Maternity", staff: 5, load: 62 },
];

export default function StaffPage() {
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Staff">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Staff</h2>
              <p className="text-muted-foreground mt-1">
                24 clinicians across 6 departments
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add staff member
            </Button>
          </div>

          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle>Department load</CardTitle>
              <CardDescription>Current capacity utilisation</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {departments.map((d) => (
                <div key={d.name} className="rounded-lg bg-background/60 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{d.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {d.staff} staff
                    </span>
                  </div>
                  <Progress value={d.load} className="h-1.5" />
                  <p className="text-xs text-muted-foreground">{d.load}% load</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {staff.map((s) => (
              <Card key={s.name} className="bg-muted border-none">
                <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                  <HoverCard openDelay={100}>
                    <HoverCardTrigger asChild>
                      <Avatar className="h-12 w-12 cursor-pointer">
                        <AvatarImage src={s.avatar} />
                        <AvatarFallback>{s.fallback}</AvatarFallback>
                      </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={s.avatar} />
                          <AvatarFallback>{s.fallback}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{s.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {s.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        {s.dept} · {s.rating}★ · {s.patients} patients today.
                        Available for consults and roster changes.
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{s.name}</CardTitle>
                    <CardDescription className="truncate">
                      {s.role}
                    </CardDescription>
                  </div>
                  <Badge variant={statusVariant[s.status]}>{s.status}</Badge>
                </CardHeader>
                <CardContent className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Stethoscope className="h-3.5 w-3.5" />
                    {s.dept}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-current text-[#f5a623]" />
                    {s.rating}
                  </span>
                </CardContent>
                <CardFooter className="gap-2">
                  <div className="flex-1 text-xs text-muted-foreground">
                    <span className="text-foreground tabular-nums">
                      {s.patients}
                    </span>{" "}
                    patients today
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast(`Opening ${s.name}'s roster`)}
                  >
                    <CalendarClock className="mr-2 h-4 w-4" />
                    Roster
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle>Department directory</CardTitle>
              <CardDescription>
                Expand a department to see who&apos;s on today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {departments.map((d) => {
                  const members = staff.filter((s) => s.dept === d.name);
                  return (
                    <AccordionItem key={d.name} value={d.name}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <span>{d.name}</span>
                          <Badge variant="secondary">{d.staff} staff</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {members.length ? (
                            members.map((m) => (
                              <div
                                key={m.name}
                                className="flex items-center gap-3 rounded-lg bg-background/60 p-2.5"
                              >
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={m.avatar} />
                                  <AvatarFallback>{m.fallback}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm leading-none">
                                    {m.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {m.role}
                                  </p>
                                </div>
                                <Badge variant={statusVariant[m.status]}>
                                  {m.status}
                                </Badge>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              No one rostered in this department today.
                            </p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
