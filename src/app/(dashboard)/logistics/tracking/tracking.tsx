"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, PackageCheck, Truck, Warehouse, CircleDot } from "lucide-react";

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const timeline = [
  { icon: PackageCheck, title: "Order picked up", place: "Los Angeles, CA", time: "Feb 27, 8:00 AM", done: true },
  { icon: Warehouse, title: "Arrived at sorting hub", place: "Bakersfield, CA", time: "Feb 27, 2:15 PM", done: true },
  { icon: Truck, title: "In transit", place: "Fresno, CA", time: "Feb 28, 9:40 AM", done: true, active: true },
  { icon: Warehouse, title: "Out for delivery", place: "Thousand Oaks, CA", time: "Est. Feb 28, 4:00 PM", done: false },
  { icon: MapPin, title: "Delivered", place: "2401 Thousand Oaks Blvd", time: "Est. Feb 28, 6:00 PM", done: false },
];

export default function Tracking() {
  return (
    <ContentLayout title="Tracking">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        <div className="space-y-6 py-6 lg:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Track shipment</h2>
              <p className="text-muted-foreground mt-1">Load #9835 · Delivery</p>
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Enter tracking number…" className="pl-9 bg-muted border-none" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr,1.4fr]">
            <Card className="border-none bg-muted">
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-6 pl-2">
                  {timeline.map((t, i) => (
                    <div key={t.title} className="relative flex gap-4">
                      {i < timeline.length - 1 && (
                        <span
                          className={`absolute left-[19px] top-10 h-[calc(100%-8px)] w-0.5 ${
                            t.done ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                      <div
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          t.done ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
                        }`}
                      >
                        <t.icon className="h-4 w-4" />
                      </div>
                      <div className="pt-1">
                        <p className="flex items-center gap-2 text-sm font-medium">
                          {t.title}
                          {t.active && (
                            <Badge variant="secondary" className="gap-1">
                              <CircleDot className="h-3 w-3 text-emerald-500" /> Now
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">{t.place}</p>
                        <p className="text-xs text-muted-foreground">{t.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-muted overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-[420px] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://picsum.photos/seed/logi-map/900/840"
                    alt="Map"
                    className="h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-background/10" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <Truck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/90 p-4 backdrop-blur">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">Estimated arrival</p>
                        <p className="text-muted-foreground">Feb 28, 6:00 PM</p>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-none">
                        On time
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
