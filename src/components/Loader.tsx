"use client";

import { useEffect, useState } from "react";

const COUNT_DURATION_MS = 1500;
const FADE_DURATION_MS = 500;
const HOLD_AT_100_MS = 150;

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      setProgress(100);
      setHidden(true);
      setRemoved(true);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const finish = () => {
      window.setTimeout(() => setHidden(true), HOLD_AT_100_MS);
      window.setTimeout(
        () => setRemoved(true),
        HOLD_AT_100_MS + FADE_DURATION_MS,
      );
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / COUNT_DURATION_MS) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        const fontsReady =
          typeof document !== "undefined" && "fonts" in document
            ? document.fonts.ready
            : Promise.resolve();
        fontsReady.then(finish).catch(finish);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950 transition-opacity duration-500 ease-out ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="text-sm font-medium tabular-nums text-zinc-50">
        {progress}%
      </span>
    </div>
  );
};

export default Loader;
