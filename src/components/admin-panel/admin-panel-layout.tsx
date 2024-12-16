"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { BottomNav } from "./bottomnav";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <div className="p-2 bg-muted">
        <main
          className={cn(
            "p-2 mb-20 shadow-md shadow-black/5 rounded-lg border-r dark:border dark:border-muted-background min-h-[calc(100vh_-_52px)] bg-background transition-[margin-left] ease-in-out duration-300",
            sidebar?.isOpen === false ? "lg:ml-[52px]" : "lg:ml-56"
          )}
        >
          {children}
        </main>
      </div>
      <BottomNav />
    </>
  );
}
