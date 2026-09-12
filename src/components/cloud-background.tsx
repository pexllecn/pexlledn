import { cn } from "@/lib/utils";

/**
 * An ambient field of slowly drifting clouds.
 *
 * Pure CSS — no canvas, no animation frame loop, no client-side JavaScript —
 * so it costs nothing on the main thread and keeps drifting while React is
 * busy. Its colour is derived from `--primary`, so it follows the accent
 * picker, the preset and light/dark without being told.
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
  return (
    <div className={cn("cloudfield", className)} aria-hidden="true">
      <div className="cloudfield__wash" />

      {/* Two noise masks, so the wisps don't all share one silhouette. */}
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

      {grid ? <div className="cloudfield__grid" /> : null}
      {veil ? <div className="cloudfield__veil" /> : null}
    </div>
  );
}

export default CloudBackground;
