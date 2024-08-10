"use client";
import Link from "next/link";
import Image from "next/image";
import { PanelsTopLeft } from "lucide-react";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { ChevronRight } from "lucide-react";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const LogoSection = ({ logo }: { logo: string }) => (
  <div className="logo-container space-y-4 flex justify-center items-center py-4 md:block">
    <Link href="/">
      <div
        className="logo-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Image
          src={logo}
          alt="Pexlle Logo"
          className="logo-image py-2"
          width={150}
          height={50}
        />
      </div>
    </Link>
  </div>
);
export default function HomePage() {
  const { theme = "light", setTheme } = useTheme();
  const [logo, setLogo] = useState("/pexlleh.png");
  useEffect(() => {
    const effectiveTheme = theme === "system" ? "light" : theme;
    setLogo(effectiveTheme === "light" ? "/pexlleh.png" : "/pexllelight.png");
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <header className="z-[50] sticky top-0 w-full bg-background/35 border-b backdrop-blur-sm dark:bg-black/35 border-border/40">
        <div className="container h-14 flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <LogoSection logo={logo} />
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
              <Link href="https://github.com/pexllecn?tab=repositories">
                <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-8 md:pb-8 lg:py-8 lg:pb-6">
            <div className="z-10 flex  items-center justify-center">
              <AnimatedGradientText>
                🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  Introducing Pexlle
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            </div>
            <span
              style={{
                transform: "translateY(20px)",
                animation: "fadeUp 2s ease-out 0.25s forwards"
              }}
              className="text-center text-5xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]"
            >
              <span className="text-gradient_indigo-purple font-bold">
                Build your {""}
              </span>
              website Beautifully.
            </span>
            <span
              style={{
                transform: "translateY(20px)",
                animation: "fadeUp 2s ease-out 0.35s forwards"
              }}
              className="max-w-[750px] text-lg text-center text-muted-foreground"
            >
              My aim is to start a journey where we build beautiful looking
              websites, Shadcn provided the best components so far, Vercel made
              it easier than ever to deploy your project. Let the journey
              start!.
            </span>
            <div className="flex w-full items-center justify-center space-x-4 py-8 ">
              <Button
                variant="expandIcon"
                Icon={ArrowRightIcon}
                iconPlacement="right"
              >
                <Link href="/signin">Enter the demo</Link>{" "}
              </Button>
            </div>
          </section>
          <div className="w-full flex justify-center relative">
            <Image
              src="/demo-light-min.png"
              width={1080}
              height={608}
              alt="demo"
              priority
              className="border rounded-xl shadow-sm dark:hidden"
            />
            <Image
              src="/demo-dark-min.png"
              width={1080}
              height={608}
              alt="demo-dark"
              priority
              className="border border-zinc-600 rounded-xl shadow-sm hidden dark:block dark:shadow-gray-500/5"
            />
            <Image
              src="/demo-mobile-light-min.png"
              width={228}
              height={494}
              alt="demo-mobile"
              className="border rounded-xl absolute bottom-0 right-0 hidden lg:block dark:hidden"
            />
            <Image
              src="/demo-mobile-dark-min.png"
              width={228}
              height={494}
              alt="demo-mobile"
              className="border border-zinc-600 rounded-xl absolute bottom-0 right-0 hidden dark:lg:block"
            />
          </div>
        </div>
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Built on top of{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/pexllecn?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
