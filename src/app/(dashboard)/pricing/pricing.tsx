"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AvatarGroup } from "@/components/ui/avatar-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { cn } from "@/lib/utils";
import {
  Check,
  Sparkles,
  Rocket,
  Building2,
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

type Billing = "monthly" | "annual";

interface Plan {
  title: string;
  icon: React.ElementType;
  description: string;
  monthly: number | null;
  annual: number | null;
  priceLabel?: string;
  features: { text: string; isNew?: boolean }[];
  cta: string;
  highlighted?: boolean;
  isCurrent?: boolean;
}

const plans: Plan[] = [
  {
    title: "Free",
    icon: Sparkles,
    description: "For individuals that just want to explore.",
    monthly: 0,
    annual: 0,
    features: [
      { text: "Access to the chat playground", isNew: true },
      { text: "200 credits / month" },
      { text: "Community support" },
      { text: "1 project workspace" },
    ],
    cta: "Current plan",
    isCurrent: true,
  },
  {
    title: "Premium",
    icon: Rocket,
    description: "For users that want more messages and generations.",
    monthly: 20,
    annual: 200,
    features: [
      { text: "Everything in Free" },
      { text: "Higher usage limits", isNew: true },
      { text: "5,000 credits / month" },
      { text: "Vision generations" },
      { text: "Custom themes & private mode" },
      { text: "Priority email support" },
    ],
    cta: "Upgrade to Premium",
    highlighted: true,
  },
  {
    title: "Enterprise",
    icon: Building2,
    description: "For teams that require robust features and higher limits.",
    monthly: null,
    annual: null,
    priceLabel: "Custom",
    features: [
      { text: "Everything in Premium" },
      { text: "Custom usage limits", isNew: true },
      { text: "Unlimited workspaces" },
      { text: "SAML SSO & SCIM" },
      { text: "Dedicated success manager" },
      { text: "99.9% uptime SLA" },
    ],
    cta: "Talk to sales",
  },
];

const stats = [
  { value: "40k+", label: "Teams building" },
  { value: "120M+", label: "Generations shipped" },
  { value: "4.9/5", label: "Average rating" },
  { value: "99.9%", label: "Uptime SLA" },
];

const faqs = [
  {
    q: "Can I change plans at any time?",
    a: "Absolutely. Upgrade, downgrade or cancel whenever you like — changes are prorated and take effect immediately.",
  },
  {
    q: "What happens when I run out of credits?",
    a: "You can top up credits at any time, or upgrade to a higher plan for a larger monthly allowance. Your work is never deleted.",
  },
  {
    q: "Do you offer a discount for annual billing?",
    a: "Yes — switching to annual billing saves you roughly two months compared to paying monthly.",
  },
  {
    q: "Is there a free trial for Premium?",
    a: "Every new workspace starts on the Free plan with generous limits, so you can explore before committing to Premium.",
  },
];

const avatars = [
  { src: "https://i.pravatar.cc/80?u=p1", fallback: "A" },
  { src: "https://i.pravatar.cc/80?u=p2", fallback: "B" },
  { src: "https://i.pravatar.cc/80?u=p3", fallback: "C" },
  { src: "https://i.pravatar.cc/80?u=p4", fallback: "D" },
  { src: "https://i.pravatar.cc/80?u=p5", fallback: "E" },
];

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const Icon = plan.icon;
  const price =
    plan.priceLabel ??
    (billing === "monthly" ? plan.monthly : plan.annual);
  const suffix =
    plan.priceLabel || price === 0
      ? ""
      : billing === "monthly"
      ? "/mo"
      : "/yr";

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border p-6 transition-all",
        plan.highlighted
          ? "border-primary/40 bg-card shadow-xl shadow-primary/10"
          : "border-border bg-card hover:-translate-y-1 hover:shadow-lg"
      )}
    >
      {plan.highlighted && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-b from-primary/25 to-transparent blur-xl"
          />
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 bg-primary px-3 py-1 text-primary-foreground">
            <Star className="h-3 w-3 fill-current" />
            Most popular
          </Badge>
        </>
      )}

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl",
            plan.highlighted
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{plan.title}</h3>
        </div>
      </div>

      <p className="mt-3 min-h-[40px] text-sm text-muted-foreground">
        {plan.description}
      </p>

      <div className="mt-4 flex items-end gap-1">
        <span className="text-4xl font-semibold tracking-tight tabular-nums">
          {typeof price === "number" ? `$${price}` : price}
        </span>
        {suffix && (
          <span className="mb-1 text-sm text-muted-foreground">{suffix}</span>
        )}
      </div>

      {plan.highlighted ? (
        <Button
          className="mt-5 w-full"
          variant="expandIcon"
          Icon={ArrowRight}
          iconPlacement="right"
        >
          {plan.cta}
        </Button>
      ) : (
        <Button
          className="mt-5 w-full"
          variant="outline"
          disabled={plan.isCurrent}
        >
          {plan.cta}
        </Button>
      )}

      <div className="mt-6 h-px w-full bg-border" />

      <ul className="mt-5 space-y-3">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                plan.highlighted
                  ? "bg-primary text-primary-foreground"
                  : "bg-emerald-500/15 text-emerald-500"
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="text-muted-foreground">{feature.text}</span>
            {feature.isNew && (
              <Badge variant="primary" className="ml-auto shrink-0 text-1xs">
                New
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Pricing">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants}
      >
        <div className="relative overflow-hidden">
          {/* ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-16 z-0 flex justify-center"
          >
            <div className="h-72 w-[720px] rounded-full bg-primary/15 blur-[130px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-2 py-8 sm:px-4">
            {/* Hero */}
            <div className="text-center">
              <div className="flex justify-center">
                <Badge
                  variant="secondary"
                  className="gap-1.5 rounded-full px-3 py-1 text-xs"
                >
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  Simple, usage-based pricing
                </Badge>
              </div>
              <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Pricing that scales{" "}
                <span className="text-primary">with your ambition</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
                From solo builders to enterprise teams, pick a plan that fits.
                No hidden fees, cancel anytime.
              </p>

              {/* social proof */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <AvatarGroup avatars={avatars} max={5} />
                <div className="text-left">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Loved by 40,000+ teams
                  </p>
                </div>
              </div>

              {/* Billing toggle */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <Tabs
                  value={billing}
                  onValueChange={(v) => setBilling(v as Billing)}
                >
                  <TabsList>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="annual">Annual</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Badge className="gap-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  Save 20%
                </Badge>
              </div>
            </div>

            {/* Plans */}
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard key={plan.title} plan={plan} billing={billing} />
              ))}
            </div>

            {/* Guarantee */}
            <div className="mx-auto mt-6 flex max-w-5xl items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              14-day money-back guarantee · No credit card required to start
            </div>

            {/* Stats strip */}
            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="mx-auto mt-16 max-w-3xl">
              <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
                Frequently asked questions
              </h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Everything you need to know about plans and billing.
              </p>
              <Accordion type="single" collapsible className="mt-6 w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-medium">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* CTA */}
            <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-8 text-center sm:p-12">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to build something great?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                Start free today and upgrade whenever you&apos;re ready. It only
                takes a minute.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  variant="expandIcon"
                  Icon={ArrowRight}
                  iconPlacement="right"
                >
                  Get started free
                </Button>
                <Button size="lg" variant="outline">
                  Contact sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
