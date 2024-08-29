"use client";

import { useEffect } from "react";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import BottomNav from "@/components/admin-panel/bottomnav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const disableZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const disableDoubleTapZoom = () => {
      let lastTouchEnd = 0;
      document.addEventListener(
        "touchend",
        (e) => {
          const now = Date.now();
          if (now - lastTouchEnd <= 300) {
            e.preventDefault();
          }
          lastTouchEnd = now;
        },
        false
      );
    };

    document.addEventListener("touchmove", disableZoom, { passive: false });
    document.addEventListener("touchstart", disableZoom, { passive: false });
    disableDoubleTapZoom();

    // Set viewport
    const viewport = document.querySelector("meta[name=viewport]");
    if (viewport) {
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      );
    }

    return () => {
      document.removeEventListener("touchmove", disableZoom);
      document.removeEventListener("touchstart", disableZoom);
    };
  }, []);

  return (
    <AdminPanelLayout>
      {children}
      <BottomNav />
    </AdminPanelLayout>
  );
}
