"use client";

import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/theme-context";

const colors = [
  { name: "Black", value: "black", hex: "#000000" },
  { name: "Red", value: "red", hex: "#ef4444" },
  { name: "Pink", value: "pink", hex: "#ec4899" },
  { name: "Orange", value: "orange", hex: "#f97316" },
  { name: "Green", value: "green", hex: "#22c55e" },
  { name: "Blue", value: "blue", hex: "#3b82f6" },
  { name: "Yellow", value: "yellow", hex: "#F9D72F" },
  { name: "Violet", value: "violet", hex: "#8b5cf6" },
  { name: "Cyan", value: "cyan", hex: "#22d3ee" },
  { name: "Lime", value: "lime", hex: "#a3e635" },
] as const;

// Full-palette presets. Unlike Color (which tunes --primary only), a preset
// replaces background, card, muted, border, ring, charts and sidebar too.
const presets = [
  {
    name: "Default",
    value: "default",
    swatch: ["#ffffff", "#f5f5f5", "#e5e5e5"],
    hint: "The project palette",
  },
  {
    name: "Shadcn",
    value: "shadcn",
    swatch: ["#0b63f6", "#00c950", "#e8edee"],
    hint: "Blue primary, green charts",
  },
] as const;

const radiusOptions = [
  { label: "0", value: "0" },
  { label: "0.5", value: "0.5" },
  { label: "0.75", value: "0.75" },
  { label: "0.875", value: "0.875" },
  { label: "1", value: "1" },
  { label: "1.5", value: "1.5" },
  { label: "2.5", value: "2.5" },
] as const;

interface ThemeCustomizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeCustomizer({ open, onOpenChange }: ThemeCustomizerProps) {
  const {
    radius,
    color,
    preset,
    setRadius,
    setColor,
    setPreset,
    hideBottomNav,
    setHideBottomNav,
  } = useTheme();
  const { theme, setTheme } = useNextTheme();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[300px] sm:w-[400px] flex flex-col gap-0 max-h-[calc(100dvh-2rem)]">
        <SheetHeader className="shrink-0">
          <SheetTitle>Theme Settings</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4 flex-1 overflow-y-auto -mr-3 pr-3">
          <div className="space-y-2">
            <Label>Mode</Label>
            <div className="flex gap-4">
              <Button
                variant={theme === "light" ? "outline2" : "outline"}
                className="flex-1 justify-start gap-2 py-6 font-normal"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "outline2" : "outline"}
                className="flex-1 justify-start gap-2 py-6 font-normal"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Preset</Label>
            <div className="grid gap-2">
              {presets.map((p) => (
                <Button
                  key={p.value}
                  variant={preset === p.value ? "outline2" : "outline"}
                  className="h-auto justify-start gap-3 px-4 py-3"
                  onClick={() => {
                    setPreset(p.value);
                    // A preset ships its own primary and radius; apply them so
                    // choosing it lands the intended look, while leaving both
                    // controls free to change afterwards.
                    if (p.value === "shadcn") {
                      setColor("blue");
                      setRadius("0.875");
                    }
                  }}
                >
                  <span className="flex shrink-0 gap-1" aria-hidden="true">
                    {p.swatch.map((hex) => (
                      <span
                        key={hex}
                        className="h-4 w-4 rounded-md border border-muted"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </span>
                  <span className="flex flex-col items-start">
                    <span>{p.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {p.hint}
                    </span>
                  </span>
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {colors.map((c) => (
                <Button
                  key={c.value}
                  variant={color === c.value ? "outline2" : "outline"}
                  className="justify-start gap-2 px-4 py-6"
                  onClick={() => setColor(c.value)}
                >
                  <span
                    className=" rounded-lg lg:h-4 lg:w-4 h-2 w-2 border border-muted"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden="true"
                  />
                  <span className="capitalize">{c.name}</span>
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Radius</Label>
            <RadioGroup
              value={radius}
              onValueChange={setRadius}
              className="grid grid-cols-5 gap-2"
            >
              {radiusOptions.map((option) => (
                <div key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={`radius-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`radius-${option.value}`}
                    className="flex text-xs flex-col items-center justify-between rounded-lg border p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary/50 peer-data-[state=checked]:bg-primary/20 [&:has([data-state=checked])]:border-primary/20 "
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Navigation</Label>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5 pr-4">
                <p className="text-sm font-normal">Hide bottom navigation</p>
                <p className="text-xs text-muted-foreground">
                  Remove the floating dock at the bottom of the screen.
                </p>
              </div>
              <Switch
                checked={hideBottomNav}
                onCheckedChange={setHideBottomNav}
                aria-label="Hide bottom navigation"
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
