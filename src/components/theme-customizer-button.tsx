"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { ThemeCustomizer } from "@/components/theme-customizer";

export function ThemeCustomizerButton() {
  const [customizeOpen, setCustomizeOpen] = useState(false);

  return (
    <>
      <ThemeCustomizer open={customizeOpen} onOpenChange={setCustomizeOpen} />
      <Button
        variant="primary"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-lg"
        onClick={() => setCustomizeOpen(true)}
      >
        <Settings className="h-5 w-5 animate-spin-slow" />
        <span className="sr-only">Customize theme</span>
      </Button>
    </>
  );
}
