"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeftRight,
  Clock,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Search,
  Users,
} from "lucide-react";

type Flight = {
  airline: string;
  code: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: string;
  price: string;
  best?: boolean;
};

const flights: Flight[] = [
  { airline: "ANA", code: "NH 211", from: "JFK", to: "KIX", depart: "10:45", arrive: "14:30+1", duration: "13h 45m", stops: "Nonstop", price: "$980", best: true },
  { airline: "Japan Airlines", code: "JL 5", from: "JFK", to: "HND", depart: "13:10", arrive: "16:55+1", duration: "14h 05m", stops: "Nonstop", price: "$1,040" },
  { airline: "Emirates", code: "EK 204", from: "JFK", to: "KIX", depart: "22:20", arrive: "06:10+2", duration: "19h 50m", stops: "1 stop · DXB", price: "$860" },
  { airline: "Korean Air", code: "KE 82", from: "JFK", to: "KIX", depart: "12:50", arrive: "18:20+1", duration: "16h 30m", stops: "1 stop · ICN", price: "$910" },
];

const booked = {
  airline: "ANA",
  code: "NH 211",
  from: "New York (JFK)",
  to: "Osaka (KIX)",
  date: "Aug 12, 2026",
  seat: "14A · Window",
  gate: "B22",
};

export default function FlightsPage() {
  const [trip, setTrip] = useState("round");

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Flights">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div>
            <h2 className="text-3xl font-normal">Flights</h2>
            <p className="text-muted-foreground mt-1">
              Search fares and manage your bookings
            </p>
          </div>

          <Card className="bg-muted border-none">
            <CardHeader>
              <Tabs value={trip} onValueChange={setTrip}>
                <TabsList>
                  <TabsTrigger value="round">Round trip</TabsTrigger>
                  <TabsTrigger value="one">One way</TabsTrigger>
                  <TabsTrigger value="multi">Multi-city</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-4">
              <div className="space-y-2">
                <Label>From</Label>
                <div className="relative">
                  <PlaneTakeoff className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="New York (JFK)" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <div className="relative">
                  <PlaneLanding className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="Osaka (KIX)" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Depart</Label>
                <Input type="date" defaultValue="2026-08-12" />
              </div>
              <div className="space-y-2">
                <Label>Travellers</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input defaultValue="2 adults" className="pl-9" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Search flights
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <div className="lg:col-span-4 space-y-3">
              {flights.map((f) => (
                <Card key={f.code} className="bg-muted border-none">
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3 sm:w-40">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Plane className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm leading-none">{f.airline}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {f.code}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center gap-3">
                      <div className="text-center">
                        <p className="text-lg tabular-nums leading-none">
                          {f.depart}
                        </p>
                        <p className="text-1xs text-muted-foreground mt-1">
                          {f.from}
                        </p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-1xs text-muted-foreground">
                          {f.duration}
                        </p>
                        <div className="relative my-1">
                          <Separator />
                          <ArrowRight className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                        </div>
                        <p className="text-1xs text-muted-foreground">
                          {f.stops}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg tabular-nums leading-none">
                          {f.arrive}
                        </p>
                        <p className="text-1xs text-muted-foreground mt-1">
                          {f.to}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                      {f.best && <Badge variant="success">Best value</Badge>}
                      <div className="text-right">
                        <p className="text-lg tabular-nums leading-none">
                          {f.price}
                        </p>
                        <Button size="sm" className="mt-2">
                          Select
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="lg:col-span-3 bg-muted border-none h-fit">
              <CardHeader>
                <Badge variant="success" className="w-fit">
                  Booked
                </Badge>
                <CardTitle className="pt-1">Your next flight</CardTitle>
                <CardDescription>{booked.date}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl tabular-nums leading-none">JFK</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {booked.from.split("(")[0]}
                    </p>
                  </div>
                  <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
                  <div className="text-right">
                    <p className="text-2xl tabular-nums leading-none">KIX</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {booked.to.split("(")[0]}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-1xs text-muted-foreground">Flight</p>
                    <p className="text-sm mt-1">{booked.code}</p>
                  </div>
                  <div>
                    <p className="text-1xs text-muted-foreground">Seat</p>
                    <p className="text-sm mt-1">14A</p>
                  </div>
                  <div>
                    <p className="text-1xs text-muted-foreground">Gate</p>
                    <p className="text-sm mt-1">{booked.gate}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  Check in opens in 22 days
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
