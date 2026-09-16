import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "1xs": "0.625rem",
        xs: "0.75rem",
        sm: "0.8125rem",
        base: "0.875rem",
        lg: "1rem",
        xl: "1.125rem",
        "2xl": "1.25rem",
      },
      colors: {
        border: "hsl(var(--border))",
        bluesp: "var(--bluesp)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        spcolor: "hsl(var(--spcolor))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      /* Every step derives from --radius, which the theme customiser sets on
         the document. That is what makes the radius control authoritative:
         any `rounded-*` utility anywhere in the app follows it without the
         component having to know, so there is nothing to keep in sync by
         hand. `full` is the deliberate exception — avatars, status dots,
         spinners and progress bars are circles, not rounded rectangles, and
         squaring them reads as broken rather than as a squarer theme.
         max() guards the subtractive steps, which would otherwise compute
         negative and drop out at radius 0. */
      borderRadius: {
        none: "0px",
        sm: "max(0px, calc(var(--radius) - 4px))",
        DEFAULT: "max(0px, calc(var(--radius) - 2px))",
        md: "max(0px, calc(var(--radius) - 2px))",
        lg: "var(--radius)",
        xl: "calc(var(--radius) * 1.25)",
        "2xl": "calc(var(--radius) * 1.5)",
        "3xl": "calc(var(--radius) * 2)",
        full: "9999px",
      },
      /* Motion utilities backed by the tokens in globals.css, so `ease-fluid`
         and `duration-modal` mean the same thing everywhere and can be
         retuned in one place. Named for the interaction rather than the
         number: a component should ask for dropdown timing, not for 200ms. */
      transitionTimingFunction: {
        fluid: "var(--ease-fluid)",
        "fluid-in-out": "var(--ease-fluid-in-out)",
        drawer: "var(--ease-drawer)",
      },
      transitionDuration: {
        press: "var(--duration-press)",
        tooltip: "var(--duration-tooltip)",
        dropdown: "var(--duration-dropdown)",
        modal: "var(--duration-modal)",
        drawer: "var(--duration-drawer)",
      },
      animationTimingFunction: {
        fluid: "var(--ease-fluid)",
        "fluid-in-out": "var(--ease-fluid-in-out)",
        drawer: "var(--ease-drawer)",
      },
      animationDuration: {
        press: "var(--duration-press)",
        tooltip: "var(--duration-tooltip)",
        dropdown: "var(--duration-dropdown)",
        modal: "var(--duration-modal)",
        drawer: "var(--duration-drawer)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "collapsible-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-collapsible-content-height)",
          },
        },
        "collapsible-up": {
          from: {
            height: "var(--radix-collapsible-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down var(--duration-dropdown) var(--ease-fluid)",
        "accordion-up": "accordion-up var(--duration-dropdown) var(--ease-fluid)",
        "collapsible-down": "collapsible-down var(--duration-dropdown) var(--ease-fluid)",
        "collapsible-up": "collapsible-up var(--duration-dropdown) var(--ease-fluid)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
