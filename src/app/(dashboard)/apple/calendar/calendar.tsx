"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  Segmented,
  Stepper,
  tone,
} from "../components/apple-ui";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  Clock,
  MapPin,
  Users,
  Video,
} from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Event = {
  day: number;
  start: number; // hour, 24h
  length: number; // hours
  title: string;
  where: string;
  color: string;
};

const events: Event[] = [
  { day: 0, start: 9, length: 1, title: "Design standup", where: "Studio 2", color: A.blue },
  { day: 0, start: 13.5, length: 1.5, title: "Component review", where: "Zoom", color: A.purple },
  { day: 1, start: 10, length: 2, title: "Motion workshop", where: "Studio 1", color: A.orange },
  { day: 2, start: 9.5, length: 1, title: "1:1 · Livia", where: "Room 4", color: A.green },
  { day: 2, start: 15, length: 2, title: "Design critique", where: "Studio 2", color: A.pink },
  { day: 3, start: 11, length: 1.5, title: "Roadmap sync", where: "Zoom", color: A.blue },
  { day: 3, start: 16, length: 1, title: "Type audit", where: "Desk", color: A.teal },
  { day: 4, start: 9, length: 3, title: "Ship review", where: "Auditorium", color: A.purple },
  { day: 5, start: 11, length: 2, title: "Long run", where: "Bosphorus", color: A.lime },
  { day: 6, start: 14, length: 1.5, title: "Portfolio edit", where: "Home", color: A.orange },
];

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const ROW = 52; // px per hour

const agenda = [
  { time: "09:00", title: "Design standup", where: "Studio 2", people: 6, color: A.blue },
  { time: "11:00", title: "Roadmap sync", where: "Zoom", people: 12, color: A.purple },
  { time: "13:30", title: "Component review", where: "Zoom", people: 4, color: A.pink },
  { time: "16:00", title: "Type audit", where: "Desk", people: 1, color: A.teal },
];

const calendars = [
  { label: "Work", color: A.blue, on: true },
  { label: "Personal", color: A.orange, on: true },
  { label: "Fitness", color: A.lime, on: true },
  { label: "Family", color: A.pink, on: false },
  { label: "Holidays", color: A.teal, on: false },
];

const MINI = Array.from({ length: 35 }, (_, i) => i - 2); // 5-week grid, offset start

export default function CalendarPage() {
  return (
    <AppleShell
      title="Calendar"
      action="New event"
      aside={<Segmented options={["Day", "Week", "Month"]} value="Week" />}
    >
      <div className="grid gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
        {/* Rail */}
        <div className="min-w-0 space-y-4">
          <Card className={cn("min-w-0 p-5", tone.plain)}>
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-foreground">July 2026</p>
              <Stepper label="Jul" />
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-xs text-muted-foreground">
                  {d}
                </span>
              ))}
              {MINI.map((n) => {
                const valid = n >= 1 && n <= 31;
                return (
                  <span
                    key={n}
                    className={`flex h-8 items-center justify-center rounded-full text-xs tabular-nums ${
                      n === 5
                        ? "bg-primary font-semibold text-primary-foreground"
                        : valid
                        ? "text-foreground"
                        : "text-muted-foreground/40"
                    }`}
                  >
                    {valid ? n : n <= 0 ? 30 + n : n - 31}
                  </span>
                );
              })}
            </div>
          </Card>

          <Card className={cn("min-w-0 overflow-hidden", tone.plain)}>
            <p className="px-5 py-4 text-base font-medium text-foreground">
              My calendars
            </p>
            <Separator />
            {calendars.map((c, i) => (
              <React.Fragment key={c.label}>
                {i > 0 && <Separator className="ml-5 w-auto" />}
                <div className="flex items-center gap-3 px-5 py-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="flex-1 text-base text-foreground">{c.label}</span>
                  <Switch defaultChecked={c.on} />
                </div>
              </React.Fragment>
            ))}
          </Card>

          <Card className={cn("min-w-0 overflow-hidden", tone.plain)}>
            <p className="px-5 py-4 text-base font-medium text-foreground">
              Today · Sunday 5
            </p>
            <Separator />
            {agenda.map((a, i) => (
              <React.Fragment key={a.title}>
                {i > 0 && <Separator className="ml-5 w-auto" />}
                <div className="flex gap-3 px-5 py-3">
                  <span
                    className="mt-1 h-9 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: a.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-medium text-foreground">
                      {a.title}
                    </p>
                    <p className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {a.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {a.where}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {a.people}
                      </span>
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </Card>
        </div>

        {/* Week grid */}
        <Card className="min-w-0 overflow-hidden p-0">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm text-muted-foreground">Week of</p>
              <p className="mt-0.5 text-2xl font-semibold tracking-tight text-foreground">
                29 Jun – 5 Jul
              </p>
            </div>
            <Stepper label="This week" />
          </div>
          <Separator />

          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              {/* Day header */}
              <div className="grid grid-cols-[56px_repeat(7,minmax(0,1fr))] border-b border-border">
                <span />
                {DAYS.map((d, i) => (
                  <div key={d} className="px-2 py-3 text-center">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {d}
                    </p>
                    <p
                      className={`mx-auto mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold tabular-nums ${
                        i === 6
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {29 + i > 30 ? 29 + i - 30 : 29 + i}
                    </p>
                  </div>
                ))}
              </div>

              {/* Time grid */}
              <div className="relative grid grid-cols-[56px_repeat(7,minmax(0,1fr))]">
                <div>
                  {HOURS.map((h) => (
                    <div
                      key={h}
                      className="relative pr-2 text-right text-xs tabular-nums text-muted-foreground"
                      style={{ height: ROW }}
                    >
                      <span className="absolute -top-1.5 right-2">
                        {h > 12 ? `${h - 12} PM` : `${h} AM`}
                      </span>
                    </div>
                  ))}
                </div>

                {DAYS.map((d, dayIndex) => (
                  <div
                    key={d}
                    className="relative border-l border-border/60"
                  >
                    {HOURS.map((h) => (
                      <div
                        key={h}
                        className="border-b border-border/60"
                        style={{ height: ROW }}
                      />
                    ))}

                    {events
                      .filter((e) => e.day === dayIndex)
                      .map((e) => (
                        <div
                          key={e.title}
                          className="absolute left-1 right-1 overflow-hidden rounded-lg px-2 py-1.5"
                          style={{
                            top: (e.start - HOURS[0]) * ROW,
                            height: e.length * ROW - 4,
                            backgroundColor: `${e.color}1F`,
                            borderLeft: `3px solid ${e.color}`,
                          }}
                        >
                          <p className="truncate text-xs font-semibold text-foreground">
                            {e.title}
                          </p>
                          <p className="truncate text-1xs text-muted-foreground">
                            {e.where}
                          </p>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator />
          <div className="flex flex-wrap items-center gap-4 px-5 py-4">
            {calendars.slice(0, 3).map((c) => (
              <span key={c.label} className="flex items-center gap-1.5 text-sm">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: c.color }}
                />
                <span className="text-muted-foreground">{c.label}</span>
              </span>
            ))}
            <span className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground">
              <Video className="h-3.5 w-3.5" /> 3 video calls this week
            </span>
          </div>
        </Card>
      </div>
    </AppleShell>
  );
}
