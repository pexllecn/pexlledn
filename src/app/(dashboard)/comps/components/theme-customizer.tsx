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

const radiusOptions = [
  { label: "0", value: "0" },
  { label: "0.5", value: "0.5" },
  { label: "0.75", value: "0.75" },
  { label: "1", value: "1" },
  { label: "1.5", value: "1.5" },
  { label: "2.5", value: "2.5" },
] as const;

interface ThemeCustomizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeCustomizer({ open, onOpenChange }: ThemeCustomizerProps) {
  const { radius, color, setRadius, setColor } = useTheme();
  const { theme, setTheme } = useNextTheme();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Theme Settings</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
