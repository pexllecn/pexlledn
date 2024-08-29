"use client";

import { useEffect } from "react";

export function ZoomDisabler() {
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

    return () => {
      document.removeEventListener("touchmove", disableZoom);
      document.removeEventListener("touchstart", disableZoom);
    };
  }, []);

  return null;
}
