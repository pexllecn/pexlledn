"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Truck, Fuel, Gauge, Wrench, Plus } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const stats = [
  { label: "Total vehicles", value: "48", icon: Truck },
  { label: "On route", value: "31", icon: Gauge },
  { label: "In maintenance", value: "4", icon: Wrench },
  { label: "Avg fuel", value: "72%", icon: Fuel },
];

const fleet = [
  { id: "TRK-9835", model: "Volvo FH16", driver: "Miguel Santos", status: "On route", fuel: 82, mileage: "142,500 km", tint: "bg-emerald-500/10 text-emerald-600" },
  { id: "TRK-9834", model: "Scania R500", driver: "Anna Kowalski", status: "Idle", fuel: 45, mileage: "98,200 km", tint: "bg-amber-500/10 text-amber-600" },
  { id: "TRK-9833", model: "MAN TGX", driver: "Unassigned", status: "Maintenance", fuel: 20, mileage: "210,800 km", tint: "bg-rose-500/10 text-rose-600" },
  { id: "TRK-9832", model: "Mercedes Actros", driver: "David Chen", status: "On route", fuel: 91, mileage: "56,400 km", tint: "bg-emerald-500/10 text-emerald-600" },
  { id: "TRK-9831", model: "DAF XF", driver: "Sara Lopez", status: "On route", fuel: 63, mileage: "121,900 km", tint: "bg-emerald-500/10 text-emerald-600" },
  { id: "TRK-9830", model: "Iveco S-Way", driver: "Unassigned", status: "Idle", fuel: 38, mileage: "88,000 km", tint: "bg-amber-500/10 text-amber-600" },
];

export default function Fleet() {
  return (
    <ContentLayout title="Fleet">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Fleet</h2>
              <p className="text-muted-foreground mt-1">Manage your vehicles</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add vehicle
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fleet.map((f) => (
              <Card key={f.id} className="border-none bg-muted">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-background">
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{f.id}</p>
                        <p className="text-xs text-muted-foreground">{f.model}</p>
                      </div>
                    </div>
                    <Badge className={`${f.tint} border-none`}>{f.status}</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Fuel className="h-3.5 w-3.5" /> Fuel
                      </span>
                      <span className="tabular-nums">{f.fuel}%</span>
                    </div>
                    <Progress value={f.fuel} className="h-2" />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{f.driver}</span>
                    <span className="tabular-nums text-muted-foreground">{f.mileage}</span>
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
