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

  // Sync Lenis with GSAP ticker
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    // Kill any in-progress scroll so momentum doesn't bleed into the new page
    lenis.stop();

    let outerId: number;
    let innerId: number | undefined;

    // Double rAF:
    //   First  — waits for React to finish committing the new page to the DOM
    //   Second — waits for the browser to finish layout so Lenis can read element positions
    outerId = requestAnimationFrame(() => {
      innerId = requestAnimationFrame(() => {
        const hash = window.location.hash;
        const target = hash ? document.querySelector(hash) : null;

        lenis.start();

        if (target) {
          lenis.scrollTo(target as HTMLElement, { immediate: true });
        } else {
          lenis.scrollTo(0, { immediate: true });
        }

        // Refresh after position is set so ScrollTrigger recalculates from correct offsets
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(outerId);
      if (innerId !== undefined) cancelAnimationFrame(innerId);
    };
  }, [pathname]);

  return (
    <ReactLenis root options={{ duration: 1.2, autoRaf: false, syncTouch: true }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
