"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bike, Clock, ShoppingBag, Utensils } from "lucide-react";

type Order = {
  id: string;
  channel: "Dine-in" | "Takeaway" | "Delivery";
  where: string;
  time: string;
  total: string;
  status: "New" | "Cooking" | "Ready" | "Served";
  items: { name: string; qty: number }[];
};

const orders: Order[] = [
  { id: "#1046", channel: "Dine-in", where: "Table 4", time: "1 min ago", total: "$86.00", status: "New", items: [{ name: "Truffle Tagliatelle", qty: 2 }, { name: "Caprese Salad", qty: 1 }, { name: "Sparkling Water", qty: 2 }] },
  { id: "#1044", channel: "Dine-in", where: "Table 2", time: "8 min ago", total: "$142.50", status: "Cooking", items: [{ name: "Wagyu Burger", qty: 2 }, { name: "Miso Salmon", qty: 1 }, { name: "Fries", qty: 3 }] },
  { id: "#1043", channel: "Takeaway", where: "Counter", time: "10 min ago", total: "$34.00", status: "Ready", items: [{ name: "Margherita Pizza", qty: 1 }, { name: "Tiramisu", qty: 1 }] },
  { id: "#1041", channel: "Delivery", where: "Uber Eats", time: "14 min ago", total: "$52.20", status: "Cooking", items: [{ name: "Poke Bowl", qty: 2 }, { name: "Green Tea", qty: 2 }] },
  { id: "#1039", channel: "Dine-in", where: "Table 9", time: "22 min ago", total: "$98.00", status: "Served", items: [{ name: "Ribeye Steak", qty: 1 }, { name: "Red Wine", qty: 2 }] },
  { id: "#1038", channel: "Delivery", where: "DoorDash", time: "25 min ago", total: "$41.60", status: "Served", items: [{ name: "Pad Thai", qty: 2 }] },
];

const channelIcon = {
  "Dine-in": Utensils,
  Takeaway: ShoppingBag,
  Delivery: Bike,
};

const statusVariant: Record<Order["status"], "info" | "yellow" | "success" | "secondary"> = {
  New: "info",
  Cooking: "yellow",
  Ready: "success",
  Served: "secondary",
};

export default function OrdersPage() {
  const [filter, setFilter] = useState("all");

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const list = orders.filter((o) =>
    filter === "all" ? true : o.status.toLowerCase() === filter
  );

  return (
    <ContentLayout title="Orders">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Orders</h2>
              <p className="text-muted-foreground mt-1">
                Live board · {orders.length} active orders
              </p>
            </div>
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="cooking">Cooking</TabsTrigger>
                <TabsTrigger value="ready">Ready</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {list.map((o) => {
              const Icon = channelIcon[o.channel];
              return (
                <Card key={o.id} className="bg-muted border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{o.id}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {o.channel} · {o.where}
                        </p>
                      </div>
                    </div>
                    <Badge variant={statusVariant[o.status]}>{o.status}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-1.5">
                    {o.items.map((it) => (
                      <div
                        key={it.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          <span className="text-foreground tabular-nums">
                            {it.qty}×
                          </span>{" "}
                          {it.name}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex items-center justify-between pt-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {o.time}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm tabular-nums">{o.total}</span>
                      <Button
                        size="sm"
                        variant={o.status === "Ready" ? "default" : "outline"}
                      >
                        {o.status === "New"
                          ? "Accept"
                          : o.status === "Cooking"
                          ? "Mark ready"
                          : o.status === "Ready"
                          ? "Serve"
                          : "Details"}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
