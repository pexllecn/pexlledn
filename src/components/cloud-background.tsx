"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ shader */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

/**
 * Domain-warped fractal noise: fbm sampled through an earlier fbm pass. One
 * pass of plain noise gives you fog; it is the warping that makes the result
 * billow and curl like actual cloud, and that keeps the motion from reading
 * as a texture sliding behind a window.
 *
 * Cost is entirely per-pixel, and the two terms that set it are octave count
 * and warp depth. One warp level at four octaves is three fbm calls a pixel;
 * a second level costs nearly twice that, for curl a field this soft never
 * shows.
 */
const FRAG = `
precision highp float;

varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uTintLow;
uniform vec3 uTintHigh;
uniform vec3 uTintLit;
uniform float uAlpha;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  /* uRes is the element's size in CSS pixels, deliberately not the size of
     the drawing buffer. Scaling off the buffer ties cloud size to render
     resolution, so capping that buffer stretches one cloud across a whole
     ultrawide. Against CSS pixels a cloud is the same size on a phone, a
     laptop and a 2870px display, whatever resolution it is drawn at. */
  vec2 p = (vUv * uRes / 900.0) * 2.1;

  float t = uTime * 0.010;

  vec2 q = vec2(
    fbm(p + vec2(0.0, t)),
    fbm(p + vec2(5.2, 1.3) - t * 0.8)
  );

  /* Breathing the warp strength, and circling the point it is sampled from,
     is what makes the field churn rather than slide. A constant warp with a
     moving offset only ever translates the same shapes across the screen;
     varying the warp itself makes the masses swell, curl and fold into one
     another. Both are trigonometry on a value already computed, so the
     fluidity costs no extra noise. */
  float warp = 3.0 + 0.75 * sin(t * 1.7);
  vec2 swirl = vec2(sin(t * 1.3), cos(t * 1.1)) * 0.4;

  float f = fbm(p + warp * q + swirl);

  /* A lower floor than before gives the masses more body; the ramp stays
     wide so their edges still feather out rather than being cut out. */
  float density = smoothstep(0.30, 0.98, f + 0.18 * q.x);

  /* Fade toward the horizontal edges so the field never meets the frame. */
  float edge = smoothstep(0.0, 0.22, vUv.x) * smoothstep(0.0, 0.22, 1.0 - vUv.x);

  /* Three stops, which is what reads as thickness: wispy margins in a pale
     accent, a saturated body, then white where the cloud piles up. Two stops
     give an evenly tinted haze — it is the bright crest sitting against the
     coloured body that makes a cloud look like it has volume. */
  vec3 col = mix(uTintLow, uTintHigh, smoothstep(0.28, 0.60, f));
  col = mix(col, uTintLit, smoothstep(0.60, 0.95, f));

  /* Straight (unpremultiplied) alpha, matching the context's
     premultipliedAlpha: false. Blending is off and this is the only draw
     over a cleared buffer, so the compositor applies alpha exactly once.
     Premultiplying here as well is what put a grey cast over the field. */
  gl_FragColor = vec4(col, density * edge * uAlpha);
}
`;

/* ------------------------------------------------------------------ colour */

type Rgb = [number, number, number];

function hslToRgb(h: number, s: number, l: number): Rgb {
  const S = s / 100;
  const L = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = S * Math.min(L, 1 - L);
  const f = (n: number) =>
    L - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
  return [f(0), f(8), f(4)];
}

function mixRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

/** Reads `--primary` (an "H S% L%" triple) off the document. */
function readAccent(): Rgb {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  const n = raw.match(/-?[\d.]+/g);
  if (!n || n.length < 3) return hslToRgb(217, 100, 50);
  return hslToRgb(parseFloat(n[0]), parseFloat(n[1]), parseFloat(n[2]));
}

type Palette = { low: Rgb; high: Rgb; lit: Rgb; alpha: number };

function luma([r, g, b]: Rgb) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Pull a tint into the band where it can actually be seen against the page,
 * moving it along its own lightness and leaving its hue alone. A yellow
 * accent (luma ~0.82) darkens to amber on a white page; a blue one is
 * already dark enough and passes through untouched. The same rule run the
 * other way keeps a deep accent from sinking into a dark page.
 */
function legible(c: Rgb, dark: boolean): Rgb {
  if (dark) {
    const deficit = Math.max(0, 0.34 - luma(c));
    return mixRgb(c, [1, 1, 1], Math.min(0.4, deficit * 1.5));
  }
  const excess = Math.max(0, luma(c) - 0.6);
  return mixRgb(c, [0, 0, 0], Math.min(0.42, excess * 1.4));
}

/**
 * Three tints: a cloud's wispy margins, its body, and its lit crests.
 *
 * Both ends stay saturated. An earlier version ramped from a pale tint to a
 * dark one, and the midpoint of that ramp is grey — which is why it read as
 * smoke rather than cloud. Depth comes from density instead, and the accent
 * is bent slightly toward a companion sky hue so the field is not monotone.
 */
function palette(dark: boolean): Palette {
  const accent = legible(readAccent(), dark);
  const sky: Rgb = dark ? hslToRgb(216, 96, 58) : hslToRgb(214, 96, 60);
  const violet: Rgb = dark ? hslToRgb(268, 86, 62) : hslToRgb(266, 88, 66);

  const base = mixRgb(accent, sky, 0.28);

  /* Both tints sit on the light side of the accent and close together. The
     field should read as the chosen colour thinned with air, not as the
     colour shaded with black — keeping the ramp short is what stops the
     denser cores from going heavy. Alphas are low because the compositor
     now applies them once rather than twice. */
  return dark
    ? {
        low: mixRgb(base, [0.06, 0.08, 0.14], 0.24),
        high: mixRgb(mixRgb(base, violet, 0.14), [1, 1, 1], 0.2),
        lit: mixRgb(base, [1, 1, 1], 0.88),
        alpha: 0.62,
      }
    : {
        low: mixRgb(base, [1, 1, 1], 0.62),
        high: mixRgb(mixRgb(base, violet, 0.12), [1, 1, 1], 0.26),
        lit: mixRgb(base, [1, 1, 1], 0.95),
        alpha: 0.52,
      };
}

/* --------------------------------------------------------------- component */

/** Render the field at a fraction of device pixels. It is all soft cloud, so
 *  half resolution is indistinguishable and roughly four times cheaper. */
const RENDER_SCALE = 0.4;

/** And never larger than this on the long edge. Cost is entirely pixel-bound,
 *  so past this the extra pixels buy nothing visible on a field this soft but
 *  cost plenty on an ultrawide or a phone GPU. */
const MAX_EDGE = 1100;

/** The drift takes minutes to turn over, so there is nothing to see in a
 *  60fps frame that a 30fps one misses — and it halves the GPU work. */
const MIN_FRAME_MS = 1000 / 30;

function useClouds(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    // One full-screen triangle — cheaper than a quad and has no seam.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uTintLow = gl.getUniformLocation(prog, "uTintLow");
    const uTintHigh = gl.getUniformLocation(prog, "uTintHigh");
    const uTintLit = gl.getUniformLocation(prog, "uTintLit");
    const uAlpha = gl.getUniformLocation(prog, "uAlpha");

    const isDark = () => document.documentElement.classList.contains("dark");

    let target = palette(isDark());
    let current: Palette = {
      low: [...target.low] as Rgb,
      high: [...target.high] as Rgb,
      lit: [...target.lit] as Rgb,
      alpha: target.alpha,
    };

    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let w = Math.max(1, Math.round(rect.width * dpr * RENDER_SCALE));
      let h = Math.max(1, Math.round(rect.height * dpr * RENDER_SCALE));
      const over = Math.max(w, h) / MAX_EDGE;
      if (over > 1) {
        w = Math.max(1, Math.round(w / over));
        h = Math.max(1, Math.round(h / over));
      }
      if (w === width && h === height) return;
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      // CSS pixels, not buffer pixels — see the note in the shader.
      gl.uniform2f(uRes, rect.width, rect.height);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let start = performance.now();
    let running = true;
    let last = -Infinity;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!running) return;
      if (now - last < MIN_FRAME_MS) return;
      last = now;
      resize();

      // Ease the palette toward its target so a theme change dissolves.
      const k = 0.06;
      current = {
        low: mixRgb(current.low, target.low, k),
        high: mixRgb(current.high, target.high, k),
        lit: mixRgb(current.lit, target.lit, k),
        alpha: current.alpha + (target.alpha - current.alpha) * k,
      };

      const t = reduced.matches ? 0 : (now - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform3f(uTintLow, current.low[0], current.low[1], current.low[2]);
      gl.uniform3f(uTintHigh, current.high[0], current.high[1], current.high[2]);
      gl.uniform3f(uTintLit, current.lit[0], current.lit[1], current.lit[2]);
      gl.uniform1f(uAlpha, current.alpha);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    // Don't burn frames on a hidden tab.
    const onVisibility = () => {
      running = !document.hidden;
      if (running) start = performance.now() - (performance.now() - start);
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Follow the accent picker, the preset and light/dark.
    const observer = new MutationObserver(() => {
      target = palette(isDark());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-color", "data-preset"],
    });

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      // Deliberately no WEBGL_lose_context here. getContext hands back the
      // same context for the life of the canvas element, so losing it would
      // leave a remount — StrictMode's double-invoke among them — with a
      // dead context it can never recover. The context goes with the canvas.
    };
  }, [canvasRef]);

  return failed;
}

/**
 * An ambient field of slowly billowing clouds.
 *
 * The cloud itself is a WebGL fragment shader — domain-warped fractal noise,
 * rendered at half resolution on a single full-screen triangle. That is what
 * buys real cloud texture; layered CSS gradients can only ever give you a
 * soft wash. If WebGL is unavailable the CSS field in globals.css stands in.
 *
 * Colour is derived from `--primary`, so the field follows the accent picker,
 * the preset and light/dark, easing between them rather than snapping.
 *
 * Render it inside a positioned ancestor; it fills that ancestor.
 */
export function CloudBackground({
  className,
  grid = true,
  veil = true,
}: {
  className?: string;
  /** The faint plotting grid across the top of the frame. */
  grid?: boolean;
  /** Fade the field into the page background near the fold. */
  veil?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const failed = useClouds(canvasRef);

  return (
    <div className={cn("cloudfield", className)} aria-hidden="true">
      <div className="cloudfield__wash" />

      <canvas ref={canvasRef} className="cloudfield__canvas" />

      {/* Static stand-in wherever WebGL can't run. */}
      {failed ? (
        <>
          <div className="cloudfield__mask">
            <div className="cloud cloud--1" />
            <div className="cloud cloud--2" />
            <div className="cloud cloud--3" />
          </div>
          <div className="cloudfield__mask cloudfield__mask--b">
            <div className="cloud cloud--4" />
            <div className="cloud cloud--5" />
            <div className="cloud cloud--6" />
          </div>
        </>
      ) : null}

      {grid ? <div className="cloudfield__grid" /> : null}
      {veil ? <div className="cloudfield__veil" /> : null}
    </div>
  );
}

export default CloudBackground;
