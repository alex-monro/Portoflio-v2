"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    try {
      sessionStorage.setItem("soft-nav", "true");
    } catch {}

    requestAnimationFrame(() => {
      lenis.resize();

      const hash = window.location.hash;

      if (hash && hash !== "#top") {
        const target = document.querySelector(hash);
        if (target instanceof HTMLElement) {
          lenis.scrollTo(target, { immediate: true });
          return;
        }
      }

      lenis.scrollTo(0, { immediate: true });
    });
  }, [pathname]);

  return <>{children}</>;
};

export default SmoothScroll;
