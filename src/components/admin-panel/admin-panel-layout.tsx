"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Footer } from "@/components/admin-panel/footer";
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
    <>
      <Sidebar />
      <div className="p-2 bg-muted ">
        <main
          className={cn(
            "pt-4 mb-4 shadow-md rounded-xl dark:border dark:border-muted-background min-h-[calc(100vh_-_52px)] bg-background transition-[margin-left] ease-in-out duration-300",
            sidebar?.isOpen === false ? "lg:ml-[60px]" : "lg:ml-52"
          )}
        >
          {children}
        </main>
      </div>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[60px]" : "lg:ml-52"
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
