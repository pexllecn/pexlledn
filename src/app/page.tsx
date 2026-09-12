"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Blocks,
  Check,
  Layers3,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const ease = [0.22, 1, 0.36, 1] as const;
const apps = ["Media", "Banking", "Health", "Travel", "Commerce", "CRM"];

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const features = [
  {
    icon: Layers3,
    title: "A complete product system.",
    copy: "More than 40 connected applications, built with one coherent visual language.",
  },
  {
    icon: Blocks,
    title: "Made to become yours.",
    copy: "Composable shadcn/ui foundations make every surface simple to adapt and extend.",
  },
  {
    icon: Zap,
    title: "Remarkably responsive.",
    copy: "Fast navigation, fluid motion and thoughtful states on every screen size.",
  },
];

export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f5f7] text-[#1d1d1f] selection:bg-blue-600 selection:text-white dark:bg-black dark:text-[#f5f5f7]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-white/75 backdrop-blur-2xl dark:border-white/10 dark:bg-black/70">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="text-[17px] font-semibold tracking-tight">
            Pexlle
          </Link>
          <nav className="hidden items-center gap-8 text-xs text-black/70 dark:text-white/70 sm:flex">
            <Link
              href="#overview"
              className="transition-opacity hover:opacity-60"
            >
              Overview
            </Link>
            <Link href="#apps" className="transition-opacity hover:opacity-60">
              Apps
            </Link>
            <Link href="/comps" className="transition-opacity hover:opacity-60">
              Components
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Link
              href="/dashboard"
              className="rounded-full bg-[#0071e3] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#0077ed]"
            >
              Open demo
            </Link>
          </div>
        </div>
      </header>

      <section className="relative px-5 pb-24 pt-36 text-center sm:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[120px] dark:bg-blue-600/20" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="relative"
        >
          <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0066cc] dark:text-[#2997ff]">
            <Sparkles className="size-4" /> Pexlle Suite
          </p>
          <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[92px]">
            Every app you need.
            <span className="block bg-gradient-to-r from-[#007aff] via-[#af52de] to-[#ff2d55] bg-clip-text text-transparent">
              Beautifully connected.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-black/55 dark:text-white/55 sm:text-xl">
            A polished suite of real products, components and
            experiences—designed to help you move from an idea to something
            exceptional.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/dashboard"
              className="rounded-full bg-[#0071e3] px-7 py-3 text-[15px] font-medium text-white transition hover:scale-[1.02] hover:bg-[#0077ed]"
            >
              Explore the suite
            </Link>
            <Link
              href="/media/music"
              className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-[#0066cc] dark:text-[#2997ff]"
            >
              Watch it in action{" "}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.18, ease }}
          className="relative mx-auto mt-20 max-w-6xl"
        >
          <div className="absolute -inset-8 rounded-[48px] bg-gradient-to-b from-blue-400/20 to-purple-500/5 blur-3xl" />
          <div className="relative overflow-hidden rounded-[22px] border border-black/10 bg-white p-1.5 shadow-[0_35px_90px_rgba(0,0,0,.18)] dark:border-white/15 dark:bg-[#161617]">
            <Image
              src="/dashboard.png"
              width={1400}
              height={800}
              priority
              alt="Pexlle dashboard in light mode"
              className="w-full rounded-[16px] dark:hidden"
            />
            <Image
              src="/dashboardd.png"
              width={1400}
              height={800}
              priority
              alt="Pexlle dashboard in dark mode"
              className="hidden w-full rounded-[16px] dark:block"
            />
          </div>
        </motion.div>
      </section>

      <section
        id="apps"
        className="border-y border-black/[0.06] bg-white py-6 dark:border-white/10 dark:bg-[#0a0a0a]"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-sm font-medium text-black/45 dark:text-white/45">
          {apps.map((app) => (
            <span key={app}>{app}</span>
          ))}
        </div>
      </section>

      <section id="overview" className="mx-auto max-w-6xl px-5 py-28 sm:py-40">
        <Reveal className="max-w-4xl">
          <p className="text-sm font-semibold text-[#0066cc] dark:text-[#2997ff]">
            Built different
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.03] tracking-[-0.045em] sm:text-6xl">
            Deep functionality.
            <br />
            Disarmingly simple design.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[30px] bg-black/10 dark:bg-white/10 md:grid-cols-3">
          {features.map(({ icon: Icon, title, copy }) => (
            <Reveal key={title} className="bg-white p-8 dark:bg-[#111] sm:p-10">
              <Icon className="size-8 text-[#0071e3]" strokeWidth={1.7} />
              <h3 className="mt-16 text-2xl font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-black/55 dark:text-white/55">
                {copy}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-28 dark:bg-[#0a0a0a] sm:py-40">
        <Reveal className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-[#bf4800] dark:text-[#ff9f0a]">
              One suite. Endless possibilities.
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl">
              Start ahead.
              <br />
              Stay inspired.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-black/55 dark:text-white/55">
              Every page includes the details that usually take weeks:
              meaningful data, responsive states, dark mode and interactions
              that feel alive.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "40+ complete applications",
                "120+ production-ready pages",
                "Light and dark, everywhere",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-[#34c759] text-white">
                    <Check className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-[32px] bg-[#f5f5f7] p-5 dark:bg-[#161617] sm:p-8">
            <Image
              src="/mdashboard.png"
              width={900}
              height={720}
              alt="Pexlle application collection"
              className="w-full rounded-2xl shadow-2xl dark:hidden"
            />
            <Image
              src="/mdashd.png"
              width={900}
              height={720}
              alt="Pexlle application collection in dark mode"
              className="hidden w-full rounded-2xl shadow-2xl dark:block"
            />
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-28 text-center sm:py-40">
        <Reveal>
          <Play className="mx-auto size-10 fill-current" />
          <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
            See what you can make.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-black/55 dark:text-white/55">
            Explore every workflow. No setup, no signup, no limits on curiosity.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex rounded-full bg-[#0071e3] px-7 py-3 text-[15px] font-medium text-white hover:bg-[#0077ed]"
          >
            Launch the live demo
          </Link>
        </Reveal>
      </section>

      <footer className="border-t border-black/[0.06] px-5 py-8 text-xs text-black/45 dark:border-white/10 dark:text-white/45">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {new Date().getFullYear()} Pexlle Inc. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/signin">Sign in</Link>
            <Link href="/register">Create account</Link>
            <Link href="/comps">Components</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
