"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Warehouse, MapPin, Package, Plus } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const warehouses = [
  { name: "West Hub", city: "Los Angeles, CA", capacity: 78, items: "12,480", staff: 42, seed: "wh-1", status: "Operational" },
  { name: "Central Depot", city: "Denver, CO", capacity: 54, items: "8,210", staff: 28, seed: "wh-2", status: "Operational" },
  { name: "North Terminal", city: "Portland, OR", capacity: 91, items: "18,900", staff: 55, seed: "wh-3", status: "Near full" },
  { name: "East Yard", city: "Newark, NJ", capacity: 33, items: "5,140", staff: 19, seed: "wh-4", status: "Operational" },
];

export default function Warehouses() {
  return (
    <ContentLayout title="Warehouses">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Warehouses</h2>
              <p className="text-muted-foreground mt-1">4 facilities · 44,730 items stored</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add facility
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {warehouses.map((w) => (
              <Card key={w.name} className="border-none bg-muted overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-32 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://picsum.photos/seed/${w.seed}/200/300`}
                        alt={w.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold flex items-center gap-2">
                            <Warehouse className="h-4 w-4" /> {w.name}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" /> {w.city}
                          </p>
                        </div>
                        <Badge
                          className={`border-none ${
                            w.capacity > 85
                              ? "bg-amber-500/10 text-amber-600"
                              : "bg-emerald-500/10 text-emerald-600"
                          }`}
                        >
                          {w.status}
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                          <span>Capacity</span>
                          <span className="tabular-nums">{w.capacity}%</span>
                        </div>
                        <Progress value={w.capacity} className="h-2" />
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Package className="h-4 w-4" /> {w.items}
                        </span>
                        <span>{w.staff} staff</span>
                      </div>
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
