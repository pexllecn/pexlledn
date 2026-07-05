"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarClock,
  Plus,
  Repeat,
  Send,
  Zap,
} from "lucide-react";

const payees = [
  { name: "Sarah Lin", handle: "@sarahlin", avatar: "/avatar-40-01.jpg", fallback: "SL" },
  { name: "Marco Diaz", handle: "@marcod", avatar: "/avatar-40-02.jpg", fallback: "MD" },
  { name: "Priya Nair", handle: "@priyan", avatar: "/avatar-40-03.jpg", fallback: "PN" },
  { name: "Tom Weber", handle: "@tomw", avatar: "/avatar-40-04.jpg", fallback: "TW" },
  { name: "Landlord", handle: "@rent", avatar: "/avatar-40-05.jpg", fallback: "LL" },
];

const scheduled = [
  { name: "Apartment Rent", next: "Aug 1", amount: "$1,850.00", cadence: "Monthly", icon: Repeat },
  { name: "Electric — ConEd", next: "Jul 12", amount: "$94.20", cadence: "Monthly", icon: Zap },
  { name: "Gym Membership", next: "Jul 15", amount: "$39.00", cadence: "Monthly", icon: Repeat },
  { name: "Car Insurance", next: "Jul 20", amount: "$142.00", cadence: "Monthly", icon: CalendarClock },
];

export default function PaymentsPage() {
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState(0);

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Payments">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <div className="flex-1 space-y-4 lg:p-4 py-6">
          <div>
            <h2 className="text-3xl font-normal">Payments</h2>
            <p className="text-muted-foreground mt-1">
              Send money, pay bills and manage recurring transfers
            </p>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 md:col-span-3 bg-muted border-none">
              <CardHeader>
                <CardTitle>Send money</CardTitle>
                <CardDescription>Instant transfer to a payee</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Recipient</Label>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {payees.map((p, i) => (
                      <button
                        key={p.handle}
                        onClick={() => setSelected(i)}
                        className={`flex shrink-0 flex-col items-center gap-1.5 rounded-lg border p-2 w-20 transition-colors ${
                          selected === i
                            ? "border-primary/50 bg-primary/10"
                            : "border-transparent bg-background/60"
                        }`}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={p.avatar} />
                          <AvatarFallback>{p.fallback}</AvatarFallback>
                        </Avatar>
                        <span className="text-1xs truncate w-full text-center">
                          {p.name.split(" ")[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="amount"
                      inputMode="decimal"
                      placeholder="0.00"
                      className="pl-7 text-lg tabular-nums"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>From account</Label>
                  <Select defaultValue="checking">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">
                        Everyday Checking · $12,480.55
                      </SelectItem>
                      <SelectItem value="savings">
                        Savings Vault · $9,200.00
                      </SelectItem>
                      <SelectItem value="business">
                        Business Account · $3,000.00
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">Note (optional)</Label>
                  <Input id="note" placeholder="What's it for?" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={!amount}>
                  <Send className="mr-2 h-4 w-4" />
                  Send {amount ? `$${amount}` : "money"} to{" "}
                  {payees[selected].name.split(" ")[0]}
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-4 bg-muted border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="space-y-1.5">
                  <CardTitle>Scheduled payments</CardTitle>
                  <CardDescription>
                    {scheduled.length} upcoming this month
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New
                </Button>
              </CardHeader>
              <CardContent className="space-y-1">
                {scheduled.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex items-center gap-3 py-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <s.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-none">{s.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Next: {s.next}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm tabular-nums leading-none">
                          {s.amount}
                        </p>
                        <Badge variant="secondary" className="mt-1 text-1xs">
                          {s.cadence}
                        </Badge>
                      </div>
                    </div>
                    {i < scheduled.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
