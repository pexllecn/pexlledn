"use client";

import { MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="sr-only skip-link">
        Skip to main content
      </a>
      <Sidebar />
      <div className="apple-workspace">
        <main
          id="main-content"
          tabIndex={-1}
          className={cn(
            "min-h-screen transition-[margin-left] ease-out duration-300 outline-none",
            sidebar?.isOpen === false ? "lg:ml-[52px]" : "lg:ml-56"
          )}
        >
          {children}
        </main>
      </div>
    </MotionConfig>
  );
}
