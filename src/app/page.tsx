"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
  type MotionValue,
} from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Play,
  Star,
  Check,
  Sparkles,
  Clapperboard,
  LayoutGrid,
  Moon,
  Component,
  Zap,
  BarChart3,
  ShieldCheck,
  Palette,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ helpers */

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {Math.round(val)}
      {suffix}
    </span>
  );
}

function Tilt({ children }: { children: React.ReactNode }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });
  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 7);
        rx.set(-py * 7);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{
        rotateX: srx as unknown as MotionValue<number>,
        rotateY: sry as unknown as MotionValue<number>,
        transformPerspective: 1200,
      }}
      className="[transform-style:preserve-3d]"
    >
      {children}
    </motion.div>
  );
}

const apps = [
  "Media", "Banking", "Clinic", "Fitness", "Restaurant", "Travel",
  "Real Estate", "Education", "Medical", "Logistics", "Work", "Leads",
  "Kanban", "Mail", "Social", "E-commerce",
];

const bento = [
  {
    title: "A cinematic media suite",
    desc: "Full music, video, photo and live-TV players — layered, dark and beautiful.",
    icon: Clapperboard,
    grad: "from-orange-500 to-rose-500",
    span: "md:col-span-2",
    href: "/media/music",
    media: true,
  },
  {
    title: "40+ ready-made apps",
    desc: "Banking, medical, logistics, CRM and more.",
    icon: LayoutGrid,
    grad: "from-violet-500 to-fuchsia-500",
    span: "",
    href: "/dashboard",
  },
  {
    title: "Flawless dark mode",
    desc: "Every screen adapts to light & dark.",
    icon: Moon,
    grad: "from-sky-500 to-indigo-500",
    span: "",
    href: "/dashboard",
  },
  {
    title: "Rich analytics",
    desc: "Charts, KPIs and dashboards out of the box.",
    icon: BarChart3,
    grad: "from-emerald-500 to-teal-500",
    span: "",
    href: "/medical/reports",
  },
  {
    title: "Built on shadcn/ui",
    desc: "Accessible components you already love.",
    icon: Component,
    grad: "from-amber-500 to-orange-500",
    span: "",
    href: "/comps",
  },
];

const stats = [
  { to: 40, suffix: "+", label: "Full apps" },
  { to: 120, suffix: "+", label: "Pages" },
  { to: 100, suffix: "%", label: "Responsive" },
  { to: 5, suffix: "★", label: "Design rating" },
];

const testimonials = [
  { name: "Maya Chen", role: "Product Designer", avatar: "/avatar-40-01.jpg", quote: "The polish is unreal. I shipped a client dashboard in a weekend." },
  { name: "Leo Martins", role: "Frontend Lead", avatar: "/avatar-40-02.jpg", quote: "Every page feels considered. The dark mode alone sold my team." },
  { name: "Sara Okafor", role: "Founder", avatar: "/avatar-40-03.jpg", quote: "It looks like a product, not a template. That's rare." },
];

/* ------------------------------------------------------------------ page */

export default function Landing() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [logo, setLogo] = useState("/pexlleh.png");

  useEffect(() => {
    setMounted(true);
    const eff = resolvedTheme || theme;
    setLogo(eff === "dark" ? "/pexllelight.png" : "/pexlleh.png");
  }, [theme, resolvedTheme]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* ---------------- background ---------------- */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* dotted pattern */}
        <div
          className={cn(
            "absolute inset-0 [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,black,black_35%,transparent_75%)]",
            resolvedTheme === "dark"
              ? "bg-[radial-gradient(#26262c_1px,transparent_1px)]"
              : "bg-[radial-gradient(#c7c9cf_1px,transparent_1px)]"
          )}
        />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[40%] -left-40 h-96 w-96 rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="absolute top-[70%] -right-40 h-96 w-96 rounded-full bg-orange-500/15 blur-[120px]" />
      </div>

      {/* ---------------- nav ---------------- */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-border/60 bg-background/60 px-4 py-2 shadow-lg shadow-black/5 backdrop-blur-xl">
          <Link href="/" className="flex items-center pl-1">
            <Image src={logo} alt="Pexlle" width={104} height={30} className="h-6 w-auto" />
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            <Link href="#features" className="transition-colors hover:text-foreground">Features</Link>
            <Link href="#apps" className="transition-colors hover:text-foreground">Apps</Link>
            <Link href="/comps" className="transition-colors hover:text-foreground">Components</Link>
          </nav>
          <div className="flex items-center gap-1.5">
            <ModeToggle />
            <Button
              asChild
              size="sm"
              variant="expandIcon"
              Icon={ArrowRight}
              iconPlacement="right"
              className="rounded-full"
            >
              <Link href="/dashboard">Open app</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ---------------- hero ---------------- */}
      <section className="relative mx-auto max-w-6xl px-4 pt-36 text-center sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex justify-center"
        >
          <AnimatedGradientText>
            <Sparkles className="mr-1 size-3.5 text-orange-500" />
            <hr className="mx-2 h-4 w-px shrink-0 bg-border" />
            <span className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
              Now with 40+ full apps
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="mx-auto mt-7 max-w-4xl text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl md:text-7xl"
        >
          Build your dashboard,{" "}
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
            beautifully.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          A stunning admin suite with 40+ real apps, 120+ pages and a
          cinematic media experience — crafted on Next.js and shadcn/ui,
          light &amp; dark out of the box.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.19 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            variant="expandIcon"
            Icon={ArrowRight}
            iconPlacement="right"
            className="rounded-full px-7 text-base shadow-lg shadow-primary/20"
          >
            <Link href="/dashboard">Enter the demo</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-border/70 bg-background/60 px-7 text-base backdrop-blur">
            <Link href="/media/music">
              <Play className="mr-2 h-4 w-4 fill-current" /> See the media app
            </Link>
          </Button>
        </motion.div>

        {/* social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground"
        >
          <div className="flex -space-x-2.5">
            {["/avatar-40-01.jpg", "/avatar-40-02.jpg", "/avatar-40-03.jpg", "/avatar-40-04.jpg"].map((a) => (
              <Image key={a} src={a} alt="" width={28} height={28} className="h-7 w-7 rounded-full border-2 border-background object-cover" />
            ))}
          </div>
          <span className="flex items-center gap-1">
            <span className="flex text-amber-400">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </span>
            Loved by 2,000+ builders
          </span>
        </motion.div>

        {/* hero mockup with tilt + floating chips */}
        <motion.div
          initial={{ y: 40, scale: 0.98 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -top-10 -bottom-10 z-0 rounded-[48px] bg-primary/25 blur-3xl"
          />
          <div className="relative z-10">
          <Tilt>
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
              <Image
                src="/dashboard.png"
                width={1400}
                height={800}
                alt="Pexlle dashboard"
                priority
                className="w-full dark:hidden"
              />
              <Image
                src="/dashboardd.png"
                width={1400}
                height={800}
                alt="Pexlle dashboard dark"
                priority
                className="hidden w-full dark:block"
              />
            </div>

            {/* floating chips */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-16 hidden rounded-2xl border border-border/60 bg-background/80 p-3 shadow-xl backdrop-blur-xl sm:block"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white">
                  <Clapperboard className="h-4 w-4" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-semibold">Media suite</p>
                  <p className="text-1xs text-muted-foreground">8 rich pages</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 bottom-16 hidden rounded-2xl border border-border/60 bg-background/80 p-3 shadow-xl backdrop-blur-xl sm:block"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  <BarChart3 className="h-4 w-4" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-semibold">+128 this week</p>
                  <p className="text-1xs text-emerald-500">Live analytics</p>
                </div>
              </div>
            </motion.div>
          </Tilt>
          </div>
        </motion.div>
      </section>

      {/* ---------------- marquee ---------------- */}
      <section id="apps" className="relative mt-24 sm:mt-32">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          One suite · every industry
        </p>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            className="flex w-max gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 26, ease: "linear", repeat: Infinity }}
          >
            {[...apps, ...apps].map((a, i) => (
              <span
                key={i}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border/60 bg-card/60 px-5 py-2 text-sm font-medium text-muted-foreground backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 to-orange-500" />
                {a}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- stats ---------------- */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:mt-32">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur md:grid-cols-4 md:p-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------- bento features ---------------- */}
      <section id="features" className="mx-auto mt-24 max-w-6xl px-4 sm:mt-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything you need,{" "}
            <span className="bg-gradient-to-r from-violet-500 to-orange-500 bg-clip-text text-transparent">
              already built
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Not a starter kit — a finished product you can make your own.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {bento.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05} className={b.span}>
              <Link href={b.href}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${b.grad} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`} />
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${b.grad} text-white shadow-lg`}>
                    <b.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>

                  {b.media && (
                    <div className="relative mt-5 aspect-[16/7] overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1420] to-[#0c0a10]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-black shadow-xl transition-transform group-hover:scale-110">
                          <Play className="ml-0.5 h-5 w-5 fill-current" />
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-end gap-[3px]">
                        {Array.from({ length: 40 }).map((_, k) => (
                          <span
                            key={k}
                            className={`w-full rounded-full ${k < 14 ? "bg-orange-500" : "bg-white/20"}`}
                            style={{ height: `${8 + Math.abs(Math.sin(k * 1.3) * 26)}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* extra small feature */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-border/60 bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-lg">
                <Zap className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold tracking-tight">Fast by default</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">Next.js App Router, static-first, buttery transitions.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- showcase split ---------------- */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:mt-36">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-400">
              <Palette className="h-3.5 w-3.5" /> Designed to impress
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              A dashboard for absolutely everything
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From a cinematic music player to CRM pipelines, medical records
              and logistics maps — every app is thoughtfully designed and
              production-ready.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "40+ complete apps, 120+ pages",
                "Pixel-perfect light & dark themes",
                "Charts, kanban, tables, players & more",
                "Accessible shadcn/ui components",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="expandIcon"
              Icon={ArrowRight}
              iconPlacement="right"
              className="mt-8 rounded-full"
            >
              <Link href="/dashboard">Browse the apps</Link>
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div aria-hidden className="pointer-events-none absolute -inset-6 z-0 rounded-[36px] bg-primary/20 blur-2xl" />
              <div className="relative z-10 overflow-hidden rounded-2xl border border-border/60 shadow-2xl">
                <Image src="/dashboard.png" width={900} height={560} alt="Apps" className="w-full dark:hidden" />
                <Image src="/dashboardd.png" width={900} height={560} alt="Apps dark" className="hidden w-full dark:block" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- testimonials ---------------- */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:mt-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Builders love it</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-border/60 bg-card p-6">
                <div className="flex text-amber-400">
                  {[0, 1, 2, 3, 4].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:mt-36">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 p-10 text-center text-white sm:p-16">
            <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_80%,white,transparent_35%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5" /> Free to explore
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Start building something beautiful
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Jump into the live demo and click through every app — no signup required.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  variant="expandIcon"
                  Icon={ArrowRight}
                  iconPlacement="right"
                  className="rounded-full bg-white px-8 text-base text-violet-700 hover:bg-white/90"
                >
                  <Link href="/dashboard">Launch the demo</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 bg-white/10 px-8 text-base text-white backdrop-blur hover:bg-white/20 hover:text-white">
                  <Link href="/comps">View components</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- footer ---------------- */}
      <footer className="mx-auto mt-24 max-w-6xl px-4 pb-12">
        <div className="rounded-3xl border border-border/60 bg-card/50 p-8 backdrop-blur">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-center sm:text-left">
              <Image src={logo} alt="Pexlle" width={110} height={32} className="mx-auto h-7 w-auto sm:mx-0" />
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                A beautifully crafted admin & app suite built on Next.js and shadcn/ui.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
              {[
                ["Product", [["Apps", "/dashboard"], ["Media", "/media/music"], ["Components", "/comps"]]],
                ["Company", [["Pricing", "/pricing"], ["Sign in", "/signin"], ["Register", "/register"]]],
                ["Legal", [["Terms", "#"], ["Privacy", "#"], ["Contact", "#"]]],
              ].map(([title, links]) => (
                <div key={title as string}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title as string}</p>
                  <ul className="space-y-1.5">
                    {(links as string[][]).map(([l, href]) => (
                      <li key={l}><Link href={href} className="text-muted-foreground transition-colors hover:text-foreground">{l}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} Pexlle Inc. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Made with <span className="text-rose-500">❤</span> by Khaled Alkurdi
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
