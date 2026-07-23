"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Input } from "@/components/ui/input";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import {
  Layout,
  AlertCircle,
  User,
  Navigation,
  ToggleLeft,
  MessageSquare,
  ChevronDown,
  List,
  Sliders,
  HelpCircle,
  Sparkles,
  Search,
  ChevronRight,
  BetweenVerticalEnd,
  ArrowRight,
  Component as ComponentIcon,
  Boxes,
  Layers,
} from "lucide-react";
import { ButtonIcon, InputIcon } from "@radix-ui/react-icons";

interface Comp {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  category: string;
}

const components: Comp[] = [
  { name: "Accordion", href: "/comps/accordions", icon: <Layout />, description: "Expandable content sections", category: "Layout" },
  { name: "Alerts & Banners", href: "/comps/alerts-notifications-banners", icon: <AlertCircle />, description: "User feedback components", category: "Feedback" },
  { name: "Avatar & Badge", href: "/comps/avatars-badges", icon: <User />, description: "User representation elements", category: "Data Display" },
  { name: "Breadcrumb & Pagination", href: "/comps/breadcrumbs-paginations", icon: <Navigation />, description: "Navigation helpers", category: "Navigation" },
  { name: "Button", href: "/comps/buttons", icon: <ButtonIcon className="h-5 w-5" />, description: "Interactive buttons", category: "Input" },
  { name: "Checkbox, Radio & Switch", href: "/comps/checks-radios-switches", icon: <ToggleLeft />, description: "Selection controls", category: "Input" },
  { name: "Dialog", href: "/comps/dialogs", icon: <MessageSquare />, description: "Modal windows", category: "Overlay" },
  { name: "Dropdown & Popover", href: "/comps/dropdowns-popovers", icon: <ChevronDown />, description: "Contextual menus", category: "Overlay" },
  { name: "Input & Textarea", href: "/comps/inputs", icon: <InputIcon className="h-5 w-5" />, description: "Text input fields", category: "Input" },
  { name: "Select", href: "/comps/selects", icon: <List />, description: "Option selection", category: "Input" },
  { name: "Slider", href: "/comps/sliders", icon: <Sliders />, description: "Range selection", category: "Input" },
  { name: "Tab", href: "/comps/tabs", icon: <BetweenVerticalEnd />, description: "Content organization", category: "Navigation" },
  { name: "Tooltip", href: "/comps/tooltips", icon: <HelpCircle />, description: "Contextual information", category: "Overlay" },
];

const catStyle: Record<string, { grad: string; tint: string }> = {
  Layout: { grad: "from-violet-500 to-fuchsia-500", tint: "text-violet-600 bg-violet-500/10 dark:text-violet-400" },
  Feedback: { grad: "from-rose-500 to-orange-500", tint: "text-rose-600 bg-rose-500/10 dark:text-rose-400" },
  "Data Display": { grad: "from-sky-500 to-cyan-500", tint: "text-sky-600 bg-sky-500/10 dark:text-sky-400" },
  Navigation: { grad: "from-emerald-500 to-teal-500", tint: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400" },
  Input: { grad: "from-amber-500 to-orange-500", tint: "text-amber-600 bg-amber-500/10 dark:text-amber-400" },
  Overlay: { grad: "from-indigo-500 to-blue-500", tint: "text-indigo-600 bg-indigo-500/10 dark:text-indigo-400" },
};

const ease = [0.22, 1, 0.36, 1] as const;

function Card({ c, i }: { c: Comp; i: number }) {
  const s = catStyle[c.category] ?? catStyle.Layout;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease, delay: Math.min(i * 0.03, 0.3) }}
    >
      <Link href={c.href} className="group block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${s.grad} opacity-15 blur-2xl transition-opacity group-hover:opacity-40`} />
          <div className="flex items-center justify-between">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.grad} text-white shadow-md [&_svg]:h-5 [&_svg]:w-5`}>
              {c.icon}
            </div>
            <span className={`rounded-full px-2.5 py-1 text-1xs font-medium ${s.tint}`}>
              {c.category}
            </span>
          </div>
          <h3 className="mt-4 text-lg font-semibold tracking-tight">{c.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            Explore component
            <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(components.map((c) => c.category)))];

  const filtered = components.filter((c) => {
    const matchesCat = activeCategory === "All" || c.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const stats = [
    { icon: ComponentIcon, value: components.length, label: "Components" },
    { icon: Boxes, value: categories.length - 1, label: "Categories" },
    { icon: Layers, value: "100%", label: "Accessible" },
  ];

  return (
    <ContentLayout title="Components">
      <div className="relative overflow-hidden">
        {/* ambient */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-10 z-0 flex justify-center">
          <div className="h-64 w-[680px] rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-500/15 to-orange-500/20 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-2 py-8 sm:px-4">
          {/* hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-center"
          >
            <div className="flex justify-center">
              <AnimatedGradientText>
                <Sparkles className="mr-1 size-3.5 text-violet-500" />
                <hr className="mx-2 h-4 w-px shrink-0 bg-border" />
                <span className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
                  Beautifully crafted UI components
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              The{" "}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                component
              </span>{" "}
              library
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              A collection of beautiful, accessible and functional UI components —
              click any to see it live.
            </p>

            {/* stats */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-2 rounded-full border bg-card/60 px-4 py-1.5 text-sm backdrop-blur">
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold tabular-nums">{s.value}</span>
                  <span className="text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>

            {/* search */}
            <div className="mx-auto mt-6 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search components…"
                  className="h-11 rounded-full border-border bg-card/70 pl-11 backdrop-blur focus-visible:ring-violet-500/40"
                />
              </div>
            </div>
          </motion.div>

          {/* category pills */}
          <div className="my-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  activeCategory === category
                    ? "bg-foreground text-background shadow-sm"
                    : "border bg-card/60 text-muted-foreground hover:bg-muted"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <Card key={c.name} c={c} i={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Search className="h-6 w-6" />
              </div>
              <p className="mt-4 text-lg font-medium">No components found</p>
              <p className="text-sm text-muted-foreground">Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </ContentLayout>
  );
}
