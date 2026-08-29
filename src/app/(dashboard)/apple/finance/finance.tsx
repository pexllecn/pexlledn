"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  CardHead,
  Hair,
  Legend,
  RangePill,
  Row,
  Segmented,
  Stat,
  Surface,
} from "../components/apple-ui";
import { Area, Gauge, Meter } from "../components/apple-charts";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Car,
  CreditCard,
  Landmark,
  PiggyBank,
  Plane,
  Repeat,
  ShoppingBag,
  Utensils,
  Wallet,
  Wifi,
} from "lucide-react";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const balance = [
  6200, 6800, 6400, 7300, 7900, 7600, 8400, 9100, 8800, 9600, 10400, 11800,
];

const cards = [
  {
    name: "Apple Card",
    number: "•••• 4412",
    holder: "M. Esmergül",
    balance: "$1,284.20",
    from: "#1C1C1E",
    to: "#3A3A3C",
    text: "text-white",
  },
  {
    name: "Titanium",
    number: "•••• 8830",
    holder: "M. Esmergül",
    balance: "$642.75",
    from: "#0A6CFF",
    to: "#8E5BF6",
    text: "text-white",
  },
  {
    name: "Savings",
    number: "•••• 1097",
    holder: "M. Esmergül",
    balance: "$18,940.00",
    from: "#A3E635",
    to: "#2BD4C0",
    text: "text-neutral-900",
  },
];

const categories = [
  { label: "Shopping", pct: 34, color: A.lime, amount: "$1,140" },
  { label: "Dining", pct: 26, color: A.blue, amount: "$872" },
  { label: "Travel", pct: 22, color: A.purple, amount: "$738" },
  { label: "Utilities", pct: 18, color: A.pink, amount: "$604" },
];

const budgets = [
  { icon: <ShoppingBag className="h-3.5 w-3.5" />, label: "Shopping", spent: 1140, cap: 1400, color: A.lime },
  { icon: <Utensils className="h-3.5 w-3.5" />, label: "Dining", spent: 872, cap: 900, color: A.blue },
  { icon: <Plane className="h-3.5 w-3.5" />, label: "Travel", spent: 738, cap: 1200, color: A.purple },
  { icon: <Wifi className="h-3.5 w-3.5" />, label: "Utilities", spent: 604, cap: 650, color: A.pink },
  { icon: <Car className="h-3.5 w-3.5" />, label: "Transport", spent: 218, cap: 500, color: A.orange },
];

const transactions = [
  { icon: <ShoppingBag className="h-3.5 w-3.5" />, tint: A.lime, name: "Apple Store", meta: "Today · Shopping", amount: "-$249.00" },
  { icon: <Utensils className="h-3.5 w-3.5" />, tint: A.blue, name: "Blue Bottle Coffee", meta: "Today · Dining", amount: "-$8.40" },
  { icon: <ArrowDownLeft className="h-3.5 w-3.5" />, tint: A.green, name: "Payroll — Board Inc.", meta: "Yesterday · Income", amount: "+$6,200.00" },
  { icon: <Plane className="h-3.5 w-3.5" />, tint: A.purple, name: "Lufthansa", meta: "2 days ago · Travel", amount: "-$412.60" },
  { icon: <Wifi className="h-3.5 w-3.5" />, tint: A.pink, name: "Fiber Internet", meta: "3 days ago · Utilities", amount: "-$59.00" },
  { icon: <Repeat className="h-3.5 w-3.5" />, tint: A.orange, name: "iCloud+ 2TB", meta: "4 days ago · Subscription", amount: "-$9.99" },
];

const actions = [
  { icon: <ArrowUpRight className="h-4 w-4" />, label: "Send" },
  { icon: <ArrowDownLeft className="h-4 w-4" />, label: "Request" },
  { icon: <Landmark className="h-4 w-4" />, label: "Transfer" },
  { icon: <PiggyBank className="h-4 w-4" />, label: "Save" },
];

export default function Finance() {
  return (
    <AppleShell title="Wallet" action="Add card" actionIcon={<CreditCard className="h-4 w-4" />}>
      <div className="min-w-0 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat icon={<Wallet className="h-4 w-4" />} label="Total balance" value="$20,866" delta={11.2} />
          <Stat icon={<ArrowDownLeft className="h-4 w-4" />} label="Income" value="$6,200" delta={3.4} />
          <Stat icon={<ArrowUpRight className="h-4 w-4" />} label="Spending" value="$3,354" delta={-6.1} />
          <Stat icon={<PiggyBank className="h-4 w-4" />} label="Saved" value="$2,846" delta={18.9} />
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Surface className="p-5">
            <p className="text-[14px] font-medium text-foreground">Your cards</p>
            <div className="mt-4 space-y-3">
              {cards.map((c) => (
                <div
                  key={c.number}
                  className={`rounded-2xl p-4 ${c.text}`}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[13px] font-medium opacity-80">{c.name}</span>
                    <CreditCard className="h-4 w-4 opacity-70" />
                  </div>
                  <p className="mt-6 text-[20px] font-semibold tracking-[-0.02em] tabular-nums">
                    {c.balance}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[12px] opacity-75">
                    <span className="tabular-nums">{c.number}</span>
                    <span>{c.holder}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {actions.map((a) => (
                <button
                  key={a.label}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-black/[0.06] py-3 transition-colors hover:bg-black/[0.03] dark:border-white/[0.07] dark:hover:bg-white/[0.05]"
                >
                  <span className="text-foreground/70">{a.icon}</span>
                  <span className="text-[12px] text-muted-foreground">{a.label}</span>
                </button>
              ))}
            </div>
          </Surface>

          <Surface className="p-5 xl:col-span-2">
            <CardHead
              title="Balance"
              value="$20,866"
              delta={11.2}
              right={<Segmented options={["Weekly", "Monthly", "Yearly"]} />}
            />
            <Area
              className="mt-6"
              data={balance}
              color={A.green}
              labels={MONTHS}
              ticks={["$12K", "$8K", "$4K", "$0"]}
              height={260}
            />
          </Surface>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Surface className="p-5">
            <CardHead title="Spending" value="$3,354" delta={-6.1} right={<RangePill />} />
            <Gauge
              className="mt-4"
              segments={categories}
              value="34%"
              caption="Shopping"
            />
            <Legend
              className="mt-2 justify-center"
              items={categories.map((c) => ({
                label: c.label,
                value: c.amount,
                color: c.color,
              }))}
            />
          </Surface>

          <Surface className="p-5">
            <CardHead title="Budgets" value="5 active" right={<RangePill label="July" />} />
            <div className="mt-6 space-y-4">
              {budgets.map((b) => (
                <div key={b.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13px] font-medium text-foreground">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-[7px] text-white"
                        style={{ backgroundColor: b.color }}
                      >
                        {b.icon}
                      </span>
                      {b.label}
                    </span>
                    <span className="text-[12px] tabular-nums text-muted-foreground">
                      ${b.spent} / ${b.cap}
                    </span>
                  </div>
                  <Meter pct={(b.spent / b.cap) * 100} color={b.color} />
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-[14px] font-medium text-foreground">Transactions</p>
              <span className="text-[13px] text-muted-foreground">Last 7 days</span>
            </div>
            <Hair />
            {transactions.map((t, i) => (
              <React.Fragment key={t.name}>
                {i > 0 && <Hair className="ml-14" />}
                <Row
                  icon={t.icon}
                  tint={t.tint}
                  title={t.name}
                  subtitle={t.meta}
                  right={
                    <span
                      className={`text-[13px] font-semibold tabular-nums ${
                        t.amount.startsWith("+")
                          ? "text-[#248A3D] dark:text-[#5CE07E]"
                          : "text-foreground"
                      }`}
                    >
                      {t.amount}
                    </span>
                  }
                />
              </React.Fragment>
            ))}
          </Surface>
        </div>
      </div>
    </AppleShell>
  );
}
