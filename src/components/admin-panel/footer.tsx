import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="z-20 w-full bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center relative">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Pexlle. All rights reserved.
          </p>
          <p className="text-sm md:text-sm text-center leading-loose text-muted-foreground/50 relative mb-1">
            Made by Khaled Alkurdi - Powered by{" "}
            <Link
              href="https://github.com/salimi-my/shadcn-ui-sidebar"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Pexlle
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
