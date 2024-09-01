"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/mode-toggle";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LogoSection = ({ logo }: { logo: string }) => (
  <div className="logo-container space-y-4 flex justify-center items-center py-4 md:block">
    <Link href="/">
      <div className="logo-container flex justify-center items-center h-full">
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

export default function Component() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [logo, setLogo] = useState("/pexlleh.png");

  useEffect(() => {
    setMounted(true);
    const effectiveTheme = resolvedTheme || theme;
    setLogo(effectiveTheme === "dark" ? "/pexllelight.png" : "/pexlleh.png");
  }, [theme, resolvedTheme]);

  if (!mounted) {
    return null; // or a loading placeholder
  }
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#c3c5c9_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 opacity-60 dark:bg-slate-950 dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] dark:opacity-100"></div>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <div className="w-full max-w-2xl bg-background/40 text-primary backdrop-blur-lg rounded-full shadow-sm">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center">
                <Link href="#" className="flex-shrink-0">
                  <LogoSection logo={logo} />
                </Link>
              </div>
              <nav className=" md:flex space-x-8 items-center align-middle">
                <Link href="#" className="text-sm font-normal text-foreground">
                  Pricing
                </Link>
                <Link href="#" className="text-sm font-normal text-foreground">
                  Customers
                </Link>
                <Link href="#" className="text-sm font-normal text-foreground">
                  Blog
                </Link>
                <Link href="#" className="text-sm font-normal text-foreground">
                  Docs
                </Link>
                <ModeToggle />
              </nav>
              <div className="flex items-center"></div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow relative z-10">
        <section className="py-10 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-8 relative">
                <div className="z-10 flex items-center justify-center">
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
              </div>
              <span className="text-center text-5xl font-medium leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                <span className="text-gradient_indigo-purple font-normal mb-4">
                  Build your {""}
                </span>
                website Beautifully.
              </span>
              <p className="text-lg text-foreground/70 my-8 max-w-2xl mx-auto">
                My aim is to start a journey where we build beautiful looking
                websites, Shadcn provided the best components so far, Vercel
                made it easier than ever to deploy your project. Let the journey
                start!.{" "}
              </p>
              <div className="flex w-full items-center justify-center space-x-4 py-8 ">
                <Button
                  variant="expandIcon"
                  Icon={ArrowRightIcon}
                  iconPlacement="right"
                >
                  <Link href="/signin">Enter the demo</Link>{" "}
                </Button>
              </div>
              <div className="w-full flex justify-center relative">
                <Image
                  src="/dashboard.png"
                  width={1080}
                  height={608}
                  alt="demo"
                  priority
                  className="border-none rounded-lg shadow-sm dark:hidden"
                />
                <Image
                  src="/dashboardd.png"
                  width={1080}
                  height={608}
                  alt="demo-dark"
                  priority
                  className="border border-zinc-600 rounded-xl shadow-sm hidden dark:block dark:shadow-gray-500/5"
                />
                <Image
                  src="/mdashboard.png"
                  width={228}
                  height={494}
                  alt="demo-mobile"
                  className="border-none rounded-lg absolute bottom-0 right-0 hidden lg:block dark:hidden"
                />
                <Image
                  src="/mdashd.png"
                  width={228}
                  height={494}
                  alt="demo-mobile"
                  className="border border-zinc-600 rounded-xl absolute bottom-0 right-0 hidden dark:lg:block"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative z-10 w-full py-8 bg-opacity-70 backdrop-blur-md mt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center mb-2">
              <LogoSection logo={logo} />
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Pexlle Inc. All rights reserved.
            </p>
            <nav className="text-xs flex space-x-4 mt-2">
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                Terms
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
