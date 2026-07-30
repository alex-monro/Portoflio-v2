"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    lenisRef.current = lenis;
    window.__appLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      delete window.__appLenis;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // useLayoutEffect fires synchronously before the browser paints — this stops
  // Lenis and resets native scroll before the GSAP ticker can fire a single
  // frame toward the previous page's scroll position.
  useLayoutEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.stop();
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect fires after paint — by then Lenis is already stopped and native
  // scroll is at 0, so the rAF just needs to resize and re-enable.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    try {
      sessionStorage.setItem("soft-nav", "true");
    } catch {}

    const id = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();

      let targetId: string | null = null;
      try {
        targetId = sessionStorage.getItem("pendingScrollTarget");
        if (targetId) sessionStorage.removeItem("pendingScrollTarget");
      } catch {}

      if (!targetId) {
        const hash = window.location.hash;
        if (hash && hash !== "#top") targetId = hash.replace("#", "");
      }

      if (targetId) {
        const target = document.getElementById(targetId);
        if (target instanceof HTMLElement) {
          lenis.scrollTo(target, { immediate: true, force: true });
          lenis.start();
          return;
        }
      }

      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.start();
    }, 80);

    return () => clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
};

export default SmoothScroll;
