"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Strong ease-out. The built-in CSS curves are too weak to read as intentional. */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

//
// --------------- Ring ---------------
//

export function Ring() {
  const [isSilent, setIsSilent] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = setTimeout(() => setIsSilent((s) => !s), 2000);
    return () => clearTimeout(id);
  }, [isSilent]);

  return (
    <motion.div
      className="relative flex h-7 items-center justify-between px-2.5"
      animate={{ width: isSilent ? 148 : 128 }}
      transition={{ type: "spring", bounce: reduced ? 0 : 0.5, duration: 0.5 }}
    >
      <AnimatePresence>
        {isSilent ? (
          <motion.div
            initial={{ width: 0, opacity: 0, filter: "blur(4px)" }}
            animate={{ width: 40, opacity: 1, filter: "blur(0px)" }}
            exit={{ width: 0, opacity: 0, filter: "blur(4px)" }}
            transition={{ type: "spring", bounce: reduced ? 0 : 0.35, duration: 0.45 }}
            className="absolute left-[5px] h-[18px] w-10 rounded-full bg-[#FD4F30]"
          />
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={false}
        className="relative h-[12.75px] w-[11.25px]"
        animate={{
          // The bell actually rings: a decaying oscillation, not a single
          // wobble. Silencing it damps out in four beats instead of ten.
          rotate: reduced
            ? 0
            : isSilent
              ? [0, -15, 5, -2, 0]
              : [0, 20, -15, 12.5, -10, 10, -7.5, 7.5, -5, 5, 0],
          x: isSilent ? 9 : 0,
        }}
      >
        <svg
          className="absolute inset-0"
          width="11.25"
          height="12.75"
          viewBox="0 0 15 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.17969 13.3125H13.5625C14.2969 13.3125 14.7422 12.9375 14.7422 12.3672C14.7422 11.5859 13.9453 10.8828 13.2734 10.1875C12.7578 9.64844 12.6172 8.53906 12.5547 7.64062C12.5 4.64062 11.7031 2.57812 9.625 1.82812C9.32812 0.804688 8.52344 0 7.36719 0C6.21875 0 5.40625 0.804688 5.11719 1.82812C3.03906 2.57812 2.24219 4.64062 2.1875 7.64062C2.125 8.53906 1.98438 9.64844 1.46875 10.1875C0.789062 10.8828 0 11.5859 0 12.3672C0 12.9375 0.4375 13.3125 1.17969 13.3125ZM7.36719 16.4453C8.69531 16.4453 9.66406 15.4766 9.76562 14.3828H4.97656C5.07812 15.4766 6.04688 16.4453 7.36719 16.4453Z"
            fill="white"
          />
        </svg>
        {isSilent ? (
          <div className="absolute inset-0 h-5 -translate-y-[5px] translate-x-[5px] rotate-[-40deg]">
            <div className="h-4 w-fit rounded-full">
              <div className="flex h-full w-[3px] items-center justify-center rounded-full bg-[#FD4F30]">
                <div className="h-full w-[0.75px] rounded-full bg-white" />
              </div>
            </div>
          </div>
        ) : null}
      </motion.div>

      <div className="ml-auto flex items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {isSilent ? (
            <motion.span
              key="silent"
              initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              className="text-xs font-medium text-[#FD4F30]"
            >
              Silent
            </motion.span>
          ) : (
            <motion.span
              key="ring"
              initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
              className="text-xs font-medium text-white"
              style={{ originX: "right" }}
            >
              Ring
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

//
// --------------- Timer ---------------
//

export function Timer() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="flex w-[284px] items-center gap-2 py-3 pl-3.5 pr-5">
      <motion.button
        aria-label={isPaused ? "Resume timer" : "Pause timer"}
        onClick={() => setIsPaused((p) => !p)}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.16, ease: EASE_OUT }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5A3C07] transition-colors [@media(hover:hover)and(pointer:fine)]:hover:bg-[#694608]"
      >
        <AnimatePresence initial={false} mode="wait">
          {isPaused ? (
            <motion.svg
              key="play"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              transition={{ duration: 0.1 }}
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 fill-current text-[#FDB000]"
            >
              <path d="M0.9375 13.2422C1.25 13.2422 1.51562 13.1172 1.82812 12.9375L10.9375 7.67188C11.5859 7.28906 11.8125 7.03906 11.8125 6.625C11.8125 6.21094 11.5859 5.96094 10.9375 5.58594L1.82812 0.3125C1.51562 0.132812 1.25 0.015625 0.9375 0.015625C0.359375 0.015625 0 0.453125 0 1.13281V12.1172C0 12.7969 0.359375 13.2422 0.9375 13.2422Z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="pause"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              transition={{ duration: 0.1 }}
              viewBox="0 0 10 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 fill-current text-[#FDB000]"
            >
              <path d="M1.03906 12.7266H2.82031C3.5 12.7266 3.85938 12.3672 3.85938 11.6797V1.03906C3.85938 0.328125 3.5 0 2.82031 0H1.03906C0.359375 0 0 0.359375 0 1.03906V11.6797C0 12.3672 0.359375 12.7266 1.03906 12.7266ZM6.71875 12.7266H8.49219C9.17969 12.7266 9.53125 12.3672 9.53125 11.6797V1.03906C9.53125 0.328125 9.17969 0 8.49219 0H6.71875C6.03125 0 5.67188 0.359375 5.67188 1.03906V11.6797C5.67188 12.3672 6.03125 12.7266 6.71875 12.7266Z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      <button
        aria-label="Exit"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3C3D3C] text-white transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)and(pointer:fine)]:hover:bg-[#4A4B4A] active:scale-[0.9]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="ml-auto flex items-baseline gap-1.5 pr-0.5 text-[#F7A815]">
        <span className="text-sm font-medium leading-none text-inherit">Timer</span>
        <Counter paused={isPaused} />
      </div>
    </div>
  );
}

function Counter({ paused }: { paused?: boolean }) {
  const [count, setCount] = useState(60);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCount((c) => (c === 0 ? 60 : c - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [paused]);

  const countArray = count.toString().padStart(2, "0").split("");

  return (
    <div className="relative w-[64px] overflow-hidden whitespace-nowrap text-3xl font-light">
      0:
      <AnimatePresence initial={false} mode="popLayout">
        {countArray.map((n, i) => (
          <motion.div
            className="inline-block tabular-nums"
            key={n + i}
            initial={{ y: "12px", filter: "blur(2px)", opacity: 0 }}
            animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
            exit={{ y: "-12px", filter: "blur(2px)", opacity: 0 }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.45 }}
          >
            {n}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

//
// --------------- Charging ---------------
//

export function Charging() {
  const [percent, setPercent] = useState(64);

  useEffect(() => {
    const id = setInterval(() => {
      setPercent((p) => (p >= 100 ? 64 : p + 1));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-8 w-[150px] items-center justify-between px-3">
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 14 18" className="h-3.5 w-3.5 fill-[#34C759]" aria-hidden>
          <path d="M7.9 0 1 10h4.3l-.9 8L12 7.6H7.3L7.9 0Z" />
        </svg>
        <span className="text-xs font-medium tabular-nums text-[#34C759]">
          {percent}%
        </span>
      </div>

      {/* The battery reads as filling because the fill has real width, not
          because a colour is cycling. width is not a compositor property, but
          at 22px across on a single element it never reaches paint cost worth
          worrying about — and a transform-scaled fill would distort the
          rounded cap. */}
      <div className="relative h-[13px] w-[26px] rounded-[4px] border border-white/40">
        <motion.div
          className="absolute inset-[1.5px] w-auto origin-left rounded-[2px] bg-[#34C759]"
          animate={{ width: `calc(${percent}% - 3px)` }}
          transition={{ type: "spring", bounce: 0.18, duration: 0.7 }}
        />
        <div className="absolute -right-[3px] top-1/2 h-[5px] w-[2px] -translate-y-1/2 rounded-r-sm bg-white/40" />
      </div>
    </div>
  );
}

//
// --------------- Face ID ---------------
//

export function FaceId() {
  const [state, setState] = useState<"scanning" | "unlocked">("scanning");
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = setTimeout(
      () => setState((s) => (s === "scanning" ? "unlocked" : "scanning")),
      state === "scanning" ? 2400 : 1800
    );
    return () => clearTimeout(id);
  }, [state]);

  return (
    <div className="flex h-[92px] w-[168px] flex-col items-center justify-center gap-2.5">
      <div className="relative h-11 w-11">
        <AnimatePresence mode="popLayout" initial={false}>
          {state === "scanning" ? (
            <motion.div
              key="scan"
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
            >
              {/* Bracket corners, as on the device. */}
              <svg viewBox="0 0 44 44" className="h-11 w-11" fill="none" aria-hidden>
                <path
                  d="M2 13V6a4 4 0 0 1 4-4h7M31 2h7a4 4 0 0 1 4 4v7M42 31v7a4 4 0 0 1-4 4h-7M13 42H6a4 4 0 0 1-4-4v-7"
                  stroke="#0A84FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="19" r="1.8" fill="#0A84FF" />
                <circle cx="28" cy="19" r="1.8" fill="#0A84FF" />
                <path
                  d="M16.5 28c1.4 1.6 3.3 2.4 5.5 2.4s4.1-.8 5.5-2.4"
                  stroke="#0A84FF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>

              {/* Scan line. A linear sweep, because it is constant motion with
                  no start or stop to shape — easing it would imply intent
                  that a sensor sweep does not have. */}
              {!reduced ? (
                <motion.div
                  className="absolute inset-x-1 h-[2px] rounded-full bg-[#0A84FF]"
                  style={{ boxShadow: "0 0 10px 2px rgba(10,132,255,0.7)" }}
                  animate={{ top: ["12%", "80%", "12%"] }}
                  transition={{ duration: 1.9, ease: "linear", repeat: Infinity }}
                />
              ) : null}
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
              // The one place a little overshoot is earned: this is the
              // moment of success, seen rarely, and the pop is the feedback.
              transition={{ type: "spring", bounce: reduced ? 0 : 0.45, duration: 0.5 }}
            >
              <svg viewBox="0 0 44 44" className="h-11 w-11" fill="none" aria-hidden>
                <circle cx="22" cy="22" r="20" fill="#34C759" />
                <motion.path
                  d="M13 22.5 19.5 29 31.5 16"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.06 }}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
          className="text-xs font-medium text-white/90"
        >
          {state === "scanning" ? "Face ID" : "Unlocked"}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

//
// --------------- Now Playing ---------------
//

const BAR_COUNT = 4;

export function NowPlaying() {
  const [levels, setLevels] = useState<number[]>(() =>
    Array.from({ length: BAR_COUNT }, () => 0.45)
  );
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // A damped random walk, not `Math.random()` per frame. Real levels have
    // momentum: they drift toward a new value rather than teleporting, and
    // the spring below carries them the rest of the way. Pure random reads
    // as noise; this reads as audio.
    const id = setInterval(() => {
      setLevels((prev) =>
        prev.map((v) => {
          const next = v + (Math.random() - 0.5) * 0.85;
          return Math.min(1, Math.max(0.18, next));
        })
      );
    }, 170);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="flex h-[72px] w-[300px] items-center gap-3 px-3.5">
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-[10px] bg-gradient-to-br from-[#FF6A5B] via-[#E0407A] to-[#7B3FE4] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight text-white">
          Ordinary Things
        </p>
        <p className="truncate text-xs leading-tight text-white/55">
          Foster the People
        </p>
      </div>

      <div className="flex h-6 items-end gap-[3px]" aria-hidden>
        {levels.map((level, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-[#FF4E62]"
            animate={{ height: `${level * 100}%` }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.32 }}
            style={{ minHeight: 4 }}
          />
        ))}
      </div>
    </div>
  );
}

//
// --------------- Incoming Call ---------------
//

export function IncomingCall() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-[76px] w-[300px] items-center gap-3 px-3.5">
      <div className="relative shrink-0">
        {/* The ring pulse is the only thing telling you this is live rather
            than a log entry. It repeats, so it stays quiet: low opacity,
            wide easing, no scale past 1.6. */}
        {!reduced ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-[#34C759]"
            animate={{ scale: [1, 1.6], opacity: [0.45, 0] }}
            transition={{ duration: 1.6, ease: EASE_OUT, repeat: Infinity }}
          />
        ) : null}
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#3A3A3C] to-[#1C1C1E] text-sm font-semibold text-white">
          MK
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight text-white">
          Maya Kaur
        </p>
        <p className="truncate text-xs leading-tight text-white/55">
          mobile · incoming
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <motion.button
          aria-label="Decline call"
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.16, ease: EASE_OUT }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF3B30] transition-colors [@media(hover:hover)and(pointer:fine)]:hover:bg-[#FF554B]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-[135deg] fill-white" aria-hidden>
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.58 3.57a1 1 0 0 1-.25 1l-2.23 2.23Z" />
          </svg>
        </motion.button>
        <motion.button
          aria-label="Accept call"
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.16, ease: EASE_OUT }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#34C759] transition-colors [@media(hover:hover)and(pointer:fine)]:hover:bg-[#40D964]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden>
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.58 3.57a1 1 0 0 1-.25 1l-2.23 2.23Z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}

//
// --------------- Navigation ---------------
//

export function Navigation() {
  const [metres, setMetres] = useState(120);
  const startRef = useRef(120);

  useEffect(() => {
    const id = setInterval(() => {
      setMetres((m) => {
        if (m <= 10) {
          startRef.current = 120;
          return 120;
        }
        return m - 10;
      });
    }, 900);
    return () => clearInterval(id);
  }, []);

  const progress = 1 - metres / startRef.current;

  return (
    <div className="flex h-[68px] w-[292px] items-center gap-3 px-3.5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#0A84FF]">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden>
          <path d="M13.5 3.3a1 1 0 0 0-1.7.7v3H9a5 5 0 0 0-5 5v4a1 1 0 1 0 2 0v-4a3 3 0 0 1 3-3h2.8v3a1 1 0 0 0 1.7.7l5-5a1 1 0 0 0 0-1.4l-5-3Z" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-tight text-white">
          <span className="tabular-nums">{metres}</span> m · Turn right
        </p>
        <p className="truncate text-xs leading-tight text-white/55">
          onto Prinsengracht
        </p>
        {/* Progress is linear because it is a direct readout of distance —
            easing it would misreport where you actually are. */}
        <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full origin-left rounded-full bg-[#0A84FF]"
            animate={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
            transition={{ duration: 0.85, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
