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

    const preventZoomOnFocus = (e: Event) => {
      e.preventDefault();
      // You can add a small delay here if needed
      // setTimeout(() => {
      //   const target = e.target as HTMLElement;
      //   target.blur();
      //   target.focus();
      // }, 100);
    };

    document.addEventListener("touchmove", disableZoom, { passive: false });
    document.addEventListener("touchstart", disableZoom, { passive: false });
    disableDoubleTapZoom();

    // Prevent zoom on input focus
    document.addEventListener("focus", preventZoomOnFocus, true);

    return () => {
      document.removeEventListener("touchmove", disableZoom);
      document.removeEventListener("touchstart", disableZoom);
      document.removeEventListener("focus", preventZoomOnFocus, true);
    };
  }, []);

  return null;
}
