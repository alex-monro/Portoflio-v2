// I had an issue where if I was scrolling and then clicked a link to a different page, the scroll
// on the new page would sometimes not reset to the top. I Found this Solution in the lenis docs:
//https://github.com/darkroomengineering/lenis/discussions/244 not sure if its the best solution but it works

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  // Sync Lenis with GSAP
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        lenisRef.current?.lenis?.scrollTo(target as HTMLElement, { immediate: true });
      }
    } else {
      lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return (
    <ReactLenis root options={{ lerp: 0.1, autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
