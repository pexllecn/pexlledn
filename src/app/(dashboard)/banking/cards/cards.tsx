"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Lock,
  Nfc,
  Plus,
  Plane,
  ShoppingBag,
  Snowflake,
  Utensils,
  Wifi,
} from "lucide-react";

const cards = [
  {
    label: "Platinum Debit",
    holder: "KHALED ALKURDI",
    number: "4821",
    expiry: "08/28",
    scheme: "VISA",
    gradient: "from-primary to-primary/60",
    dark: false,
    spent: 1240,
    limit: 3000,
  },
  {
    label: "Travel Credit",
    holder: "KHALED ALKURDI",
    number: "7745",
    expiry: "11/27",
    scheme: "Mastercard",
    gradient: "from-zinc-800 to-zinc-950",
    dark: true,
    spent: 820,
    limit: 5000,
  },
];

const controls = [
  { label: "Online payments", icon: Wifi, on: true },
  { label: "International", icon: Plane, on: true },
  { label: "Contactless", icon: Nfc, on: true },
  { label: "ATM withdrawals", icon: Lock, on: false },
];

const cardSpend = [
  { name: "Dining", amount: "$318.40", pct: 34, icon: Utensils },
  { name: "Shopping", amount: "$540.10", pct: 58, icon: ShoppingBag },
  { name: "Travel", amount: "$210.00", pct: 22, icon: Plane },
];

export default function CardsPage() {
  const [active, setActive] = useState(0);
  const [frozen, setFrozen] = useState(false);
  const [toggles, setToggles] = useState(controls.map((c) => c.on));

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const current = cards[active];

  return (
    <ContentLayout title="Cards">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-3xl font-normal">Your Cards</h2>
              <p className="text-muted-foreground mt-1">
                Manage limits, freeze cards and review spend
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Request new card
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4 md:col-span-3 space-y-4">
              {cards.map((c, i) => (
                <button
                  key={c.number}
                  onClick={() => setActive(i)}
                  className={`block w-full text-left transition-transform ${
                    active === i ? "scale-100" : "scale-[0.97] opacity-70"
                  }`}
                >
                  <div
                    className={`relative aspect-[16/10] rounded-2xl bg-gradient-to-br ${c.gradient} p-5 text-white shadow-lg overflow-hidden`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-sm/none opacity-80">{c.label}</span>
                      <Nfc className="h-6 w-6 opacity-80" />
                    </div>
                    <div className="mt-8 flex items-center gap-3">
                      <div className="h-8 w-11 rounded-md bg-white/25" />
                      <span className="text-lg tracking-[0.2em] tabular-nums">
                        ···· {c.number}
                      </span>
                    </div>
                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-1xs opacity-70">Card holder</p>
                        <p className="text-sm">{c.holder}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-1xs opacity-70">Expires</p>
                        <p className="text-sm tabular-nums">{c.expiry}</p>
                      </div>
                      <span className="text-lg font-medium italic">
                        {c.scheme}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="col-span-4 space-y-4">
              <Card className="bg-muted border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div className="space-y-1.5">
                    <CardTitle>{current.label}</CardTitle>
                    <CardDescription>
                      Ending in {current.number} · Expires {current.expiry}
                    </CardDescription>
                  </div>
                  <Button
                    variant={frozen ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFrozen((f) => !f)}
                  >
                    <Snowflake className="mr-2 h-4 w-4" />
                    {frozen ? "Frozen" : "Freeze"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Monthly spend
                    </span>
                    <span className="tabular-nums">
                      ${current.spent.toLocaleString()} / $
                      {current.limit.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={(current.spent / current.limit) * 100}
                    className="h-2"
                  />
                </CardContent>
              </Card>

              <Card className="bg-muted border-none">
                <CardHeader>
                  <CardTitle>Card controls</CardTitle>
                  <CardDescription>
                    Toggle where this card can be used
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  {controls.map((control, i) => (
                    <div key={control.label}>
                      <div className="flex items-center gap-3 py-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-muted-foreground">
                          <control.icon className="h-4 w-4" />
                        </div>
                        <span className="flex-1 text-sm">{control.label}</span>
                        <Switch
                          checked={toggles[i]}
                          onCheckedChange={(v) =>
                            setToggles((prev) =>
                              prev.map((t, idx) => (idx === i ? v : t))
                            )
                          }
                        />
                      </div>
                      {i < controls.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-muted border-none">
            <CardHeader>
              <CardTitle>Spend by category</CardTitle>
              <CardDescription>This card, this month</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {cardSpend.map((s) => (
                <div
                  key={s.name}
                  className="rounded-lg bg-background/60 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <s.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm tabular-nums">{s.amount}</span>
                  </div>
                  <p className="text-sm">{s.name}</p>
                  <Progress value={s.pct} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
