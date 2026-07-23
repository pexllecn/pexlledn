"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Phone, Plus, Truck } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const drivers = [
  { name: "Miguel Santos", id: "DRV-201", trips: 482, rating: 4.9, status: "On route", vehicle: "TRK-9835", avatar: "/avatar-40-01.jpg", tint: "bg-emerald-500/10 text-emerald-600" },
  { name: "Anna Kowalski", id: "DRV-202", trips: 356, rating: 4.8, status: "Available", vehicle: "TRK-9834", avatar: "/avatar-40-02.jpg", tint: "bg-sky-500/10 text-sky-600" },
  { name: "David Chen", id: "DRV-203", trips: 611, rating: 5.0, status: "On route", vehicle: "TRK-9832", avatar: "/avatar-40-03.jpg", tint: "bg-emerald-500/10 text-emerald-600" },
  { name: "Sara Lopez", id: "DRV-204", trips: 289, rating: 4.7, status: "On route", vehicle: "TRK-9831", avatar: "/avatar-40-04.jpg", tint: "bg-emerald-500/10 text-emerald-600" },
  { name: "Tom Becker", id: "DRV-205", trips: 174, rating: 4.6, status: "Off duty", vehicle: "—", avatar: "/avatar-40-05.jpg", tint: "bg-muted text-muted-foreground" },
  { name: "Priya Patel", id: "DRV-206", trips: 402, rating: 4.9, status: "Available", vehicle: "TRK-9830", avatar: "/avatar-32-01.jpg", tint: "bg-sky-500/10 text-sky-600" },
];

export default function Drivers() {
  return (
    <ContentLayout title="Drivers">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Drivers</h2>
              <p className="text-muted-foreground mt-1">6 drivers · 4 currently on route</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add driver
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drivers.map((d) => (
              <Card key={d.id} className="border-none bg-muted">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={d.avatar} alt={d.name} />
                        <AvatarFallback>{d.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.id}</p>
                      </div>
                    </div>
                    <Badge className={`${d.tint} border-none`}>{d.status}</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-background/60 py-2">
                      <p className="text-sm font-semibold tabular-nums">{d.trips}</p>
                      <p className="text-1xs text-muted-foreground">Trips</p>
                    </div>
                    <div className="rounded-lg bg-background/60 py-2">
                      <p className="flex items-center justify-center gap-1 text-sm font-semibold text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-current" /> {d.rating}
                      </p>
                      <p className="text-1xs text-muted-foreground">Rating</p>
                    </div>
                    <div className="rounded-lg bg-background/60 py-2">
                      <p className="flex items-center justify-center gap-1 text-sm font-semibold">
                        <Truck className="h-3.5 w-3.5" />
                      </p>
                      <p className="text-1xs text-muted-foreground">{d.vehicle}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="mr-1.5 h-4 w-4" /> Call
                    </Button>
                    <Button size="sm" className="flex-1">
                      View
                    </Button>
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
