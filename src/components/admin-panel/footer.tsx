import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="z-20 w-full bg-muted dark:bg-muted">
      <div className="mx-auto max-w-7xl sm:pt-4 pb-16">
        <div className="flex flex-col justify-center items-center relative">
          {/* ... (previous logo and text content) ... */}

          <p className="text-sm mt-2 text-muted-foreground">
            Made with <span className="text-red-500">❤️</span> by Khaled Alkurdi
          </p>

          <p className="text-xs text-muted-foreground/50 dark:text-muted-foreground/40 mt-1">
            &copy; {currentYear} Pexlle. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
