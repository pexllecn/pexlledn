"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASING, DURATION } from "@/lib/motion";
import { computeMorph, SYSTEM_PROFILE, type Footprint } from "@/lib/island-physics";
import {
  GhostIcon,
  MountainIcon,
  OdysseyIcon,
  PirateIcon,
  RabbitIcon,
} from "./app-icons";

/** useLayoutEffect warns during SSR; this is the standard isomorphic swap. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface App {
  id: string;
  name: string;
  tagline: string;
  Icon: () => React.JSX.Element;
  description: string;
}

const APPS: App[] = [
  {
    id: "odyssey",
    name: "The Oddysey",
    tagline: "Explore unknown galaxies.",
    Icon: OdysseyIcon,
    description:
      "Throughout their journey, players will encounter diverse alien races, each with their own unique cultures and technologies. Engage in thrilling space combat, negotiate complex diplomatic relations, and make critical decisions that affect the balance of power in the galaxy.",
  },
  {
    id: "rabbits",
    name: "Angry Rabbits",
    tagline: "They are coming for you.",
    Icon: RabbitIcon,
    description:
      "The burrow has emptied and the fields are moving. Read the tracks, ration what you salvage, and decide each night whether to fortify the barn or push deeper into the hedgerows. Every rabbit you meet remembers how you treated the last one.",
  },
  {
    id: "ghosts",
    name: "Ghost town",
    tagline: "Scarry ghosts.",
    Icon: GhostIcon,
    description:
      "A mining town that emptied overnight, and the residents never quite left. Sweep each building with a failing lamp, piece together what happened from the objects people abandoned mid-sentence, and learn which of the three hauntings can actually be reasoned with.",
  },
  {
    id: "pirates",
    name: "Pirates in the jungle",
    tagline: "Find the treasure.",
    Icon: PirateIcon,
    description:
      "The map is real, the crew is not trustworthy, and the island rearranges itself between tides. Chart the interior, trade favours with a rival captain you will probably regret, and work out which markings on the old stones are directions and which are warnings.",
  },
  {
    id: "mountains",
    name: "Lost in the mountains",
    tagline: "Be careful.",
    Icon: MountainIcon,
    description:
      "Weather closes in faster than you can descend. Manage warmth, rope and daylight across a range that offers no straight path down, and choose between the route you know and the one that is shorter on every map you have left.",
  },
];

/**
 * Nominal footprints, used until each shape has been measured once.
 *
 * Same estimate-then-measure pattern the island uses: the physics wants real
 * geometry, and real geometry is only knowable after a render.
 */
const ROW_ESTIMATE: Footprint = { w: 560, h: 76 };
const CARD_ESTIMATE: Footprint = { w: 600, h: 230 };

export default function AppStoreCards() {
  const [openId, setOpenId] = useState<string | null>(null);
  /**
   * Height of the row currently standing in as a spacer, measured from that
   * row at the moment it was opened. Reading row zero and assuming the rest
   * match left the list 8px short — close enough to look like a glitch and
   * not close enough to be one you can name.
   */
  const [openRowHeight, setOpenRowHeight] = useState(ROW_ESTIMATE.h);
  const reduced = useReducedMotion() ?? false;

  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Footprints for the shape currently being morphed. Measured on first sight
   * of each side, so a long description opens more calmly than a short one
   * rather than every card sharing one hand-picked spring.
   */
  const rowFootprint = useRef<Footprint>({ ...ROW_ESTIMATE });
  const cardFootprints = useRef<Record<string, Footprint>>({});

  const openRow = useCallback((id: string, box: Footprint) => {
    rowFootprint.current = box;
    setOpenRowHeight(box.h);
    setOpenId(id);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const el = cardRef.current;
    if (openId && el && el.offsetWidth > 0) {
      cardFootprints.current[openId] = { w: el.offsetWidth, h: el.offsetHeight };
    }
  }, [openId]);

  /**
   * The morph spring, derived from how far the row actually has to travel to
   * become this card — the same computeMorph the Dynamic Island uses, on the
   * same restrained profile. A tall card gets a longer, calmer spring than a
   * short one, and nobody tuned that per app.
   */
  const springFor = useCallback(
    (id: string | null) => {
      const to = (id && cardFootprints.current[id]) || CARD_ESTIMATE;
      return computeMorph(rowFootprint.current, to, SYSTEM_PROFILE, reduced).spring;
    },
    [reduced]
  );

  const spring = springFor(openId);
  const open = APPS.find((a) => a.id === openId) ?? null;

  // Escape closes, because a surface that covers the list has to be leaveable
  // from the keyboard as well as by tapping away from it.
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <div className="relative isolate overflow-hidden rounded-[22px] border border-white/10 bg-[#0B0B0D] px-4 py-3 sm:px-6 sm:py-5">
      <ul className="relative">
        {APPS.map((app, i) => {
          const isOpen = openId === app.id;
          return (
            <li key={app.id} className="relative">
              {i > 0 ? (
                <div
                  aria-hidden
                  className="ml-[72px] h-px bg-white/[0.08] sm:ml-[84px]"
                />
              ) : null}

              {isOpen ? (
                // The row keeps its space while its content is busy being a
                // card. Without this the list collapses under the overlay and
                // the card animates back into a position that has moved.
                <div style={{ height: openRowHeight }} aria-hidden />
              ) : (
                <Row
                  app={app}
                  spring={spring}
                  onOpen={(box) => openRow(app.id, box)}
                />
              )}
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {open ? (
          <>
            {/* Dim to focus. The list stays visible underneath so the card
                still reads as belonging to it, rather than as a new screen. */}
            <motion.div
              key="scrim"
              className="absolute inset-0 z-10 bg-black/55 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.dropdown, ease: EASING.out }}
              onClick={() => setOpenId(null)}
            />
            <div
              key="card-layer"
              className="pointer-events-none absolute inset-0 z-20 grid place-items-center p-3 sm:p-5"
            >
              <ExpandedCard
                ref={cardRef}
                app={open}
                spring={spring}
                reduced={reduced}
                onClose={() => setOpenId(null)}
              />
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

//
// --------------- Collapsed row ---------------
//

function Row({
  app,
  spring,
  onOpen,
}: {
  app: App;
  spring: ReturnType<typeof computeMorph>["spring"];
  onOpen: (box: Footprint) => void;
}) {
  const { Icon } = app;
  const selfRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    const el = selfRef.current;
    onOpen(
      el && el.offsetHeight > 0
        ? { w: el.offsetWidth, h: el.offsetHeight }
        : { ...ROW_ESTIMATE }
    );
  };

  return (
    <motion.div
      ref={selfRef}
      layoutId={`card-${app.id}`}
      transition={spring}
      style={{ borderRadius: 18 }}
      className="relative"
    >
      {/* The hit area is a real button covering the row, painted underneath the
          content. The content layer above it is pointer-transparent so clicks
          fall through to here — except the Get button, which opts back in.
          Nesting Get inside this button would be invalid HTML and would make
          the whole row fire when someone meant to tap Get. */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label={`Show more about ${app.name}`}
        className={cn(
          "absolute inset-0 z-0 rounded-[18px] outline-none",
          "transition-colors duration-press ease-fluid",
          "focus-visible:ring-2 focus-visible:ring-white/40",
          "active:bg-white/[0.06]",
          "[@media(hover:hover)and(pointer:fine)]:hover:bg-white/[0.04]"
        )}
      />

      <div className="pointer-events-none relative z-10 flex items-center gap-3.5 px-2 py-3 sm:gap-4">
      <motion.div
        layoutId={`icon-${app.id}`}
        transition={spring}
        style={{ borderRadius: 14 }}
        className="h-[54px] w-[54px] shrink-0 overflow-hidden sm:h-[60px] sm:w-[60px]"
      >
        <Icon />
      </motion.div>

      <div className="min-w-0 flex-1">
        <motion.p
          layoutId={`name-${app.id}`}
          transition={spring}
          className="truncate text-[15px] font-semibold leading-tight text-white"
        >
          {app.name}
        </motion.p>
        <motion.p
          layoutId={`tagline-${app.id}`}
          transition={spring}
          className="truncate text-[14px] leading-tight text-white/55"
        >
          {app.tagline}
        </motion.p>
      </div>

        <GetButton id={app.id} spring={spring} />
      </div>
    </motion.div>
  );
}

//
// --------------- Expanded card ---------------
//

function ExpandedCard({
  ref,
  app,
  spring,
  reduced,
  onClose,
}: {
  ref?: React.Ref<HTMLDivElement>;
  app: App;
  spring: ReturnType<typeof computeMorph>["spring"];
  reduced: boolean;
  onClose: () => void;
}) {
  const { Icon } = app;
  return (
    <motion.div
      ref={ref}
      layoutId={`card-${app.id}`}
      transition={spring}
      style={{ borderRadius: 22 }}
      role="dialog"
      aria-modal="true"
      aria-label={app.name}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "pointer-events-auto w-full max-w-[600px]",
        "bg-[#1C1C1E] p-4 sm:p-5",
        "shadow-[0_24px_70px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.07)]"
      )}
    >
      <div className="flex items-center gap-3.5 sm:gap-4">
        <motion.div
          layoutId={`icon-${app.id}`}
          transition={spring}
          style={{ borderRadius: 16 }}
          className="h-[62px] w-[62px] shrink-0 overflow-hidden sm:h-[68px] sm:w-[68px]"
        >
          <Icon />
        </motion.div>

        <div className="min-w-0 flex-1">
          <motion.p
            layoutId={`name-${app.id}`}
            transition={spring}
            className="truncate text-[16px] font-semibold leading-tight text-white"
          >
            {app.name}
          </motion.p>
          <motion.p
            layoutId={`tagline-${app.id}`}
            transition={spring}
            className="truncate text-[14px] leading-tight text-white/55"
          >
            {app.tagline}
          </motion.p>
        </div>

        <GetButton id={app.id} spring={spring} />
      </div>

      {/* The description is the one thing with no counterpart in the row, so it
          is the one thing that fades rather than morphs. It waits a beat for
          the shape to start opening — arriving with the card makes the two read
          as unrelated — and leaves fast, so it never lingers over a shrinking
          card. */}
      <motion.p
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: DURATION.modal,
            ease: EASING.out,
            delay: reduced ? 0 : 0.07,
          },
        }}
        exit={{
          opacity: 0,
          transition: { duration: DURATION.tooltip, ease: EASING.out },
        }}
        className="mt-4 text-[14.5px] leading-relaxed text-white/60"
      >
        {app.description}
      </motion.p>

      <button type="button" onClick={onClose} className="sr-only">
        Close {app.name}
      </button>
    </motion.div>
  );
}

function GetButton({
  id,
  spring,
}: {
  id: string;
  spring: ReturnType<typeof computeMorph>["spring"];
}) {
  return (
    <motion.button
      layoutId={`get-${id}`}
      transition={spring}
      type="button"
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "pointer-events-auto shrink-0 rounded-full bg-white/[0.12] px-[18px] py-[7px]",
        "text-[13px] font-bold tracking-wide text-[#0A84FF]",
        "transition-[transform,background-color] duration-press ease-fluid",
        "active:scale-[0.97]",
        "[@media(hover:hover)and(pointer:fine)]:hover:bg-white/[0.18]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]/60"
      )}
    >
      Get
    </motion.button>
  );
}
