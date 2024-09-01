import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export default function Component() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#c3c5c9_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 opacity-60 dark:from-blue-600 dark:via-blue-500 dark:to-blue-400 dark:opacity-60"></div>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
        <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md rounded-full shadow-sm">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center">
                <Link href="#" className="flex-shrink-0">
                  <Image
                    src="/pexlleh.png"
                    alt="Logo"
                    width={116}
                    height={32}
                    className="h-6 w-auto"
                  />
                </Link>
              </div>
              <nav className=" md:flex space-x-8 items-center align-middle">
                <Link
                  href="#"
                  className="text-sm font-normal text-gray-700 hover:text-gray-900"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="text-sm font-normal text-gray-700 hover:text-gray-900"
                >
                  Customers
                </Link>
                <Link
                  href="#"
                  className="text-sm font-normal text-gray-700 hover:text-gray-900"
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="text-sm font-normal text-gray-700 hover:text-gray-900"
                >
                  Docs
                </Link>
              </nav>
              <div className="flex items-center"></div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow pt-12 relative z-10">
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
              <p className="text-lg text-gray-600 my-8 max-w-2xl mx-auto">
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
            </div>
          </div>
        </section>
      </main>
      <footer className="relative z-10 w-full py-8 bg-opacity-70 backdrop-blur-md mt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center mb-2">
              <Image
                src="/pexlleh.png"
                alt="Logo"
                width={116}
                height={32}
                className="h-5 w-auto"
              />
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
