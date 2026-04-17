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
  // Incremented on every route change so stale rAF callbacks self-abort.
  // Fixes scroll getting stuck when navigating rapidly: cleanup can't cancel
  // the inner rAF (innerId isn't set until the outer rAF fires, after cleanup
  // may have already run), so without this check stale scrollTo calls pile up
  // and leave Lenis with mismatched internal/native scroll positions.
  const generation = useRef(0);

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

    const gen = ++generation.current;

    // Double rAF:
    //   First  — React has committed the new page to the DOM
    //   Second — browser has finished layout, Lenis can read element positions
    const outerId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // A newer navigation fired — do nothing, let that effect handle scroll
        if (gen !== generation.current) return;

        const hash = window.location.hash;
        const target = hash ? document.querySelector(hash) : null;

        if (target) {
          lenis.scrollTo(target as HTMLElement, { immediate: true });
          // Remove the hash from the URL after jumping to the section.
          // Without this, navigating away and back appends #works onto an already
          // hashed URL, producing /#works#works after enough back-and-forth.
          history.replaceState(null, "", window.location.pathname);
        } else {
          lenis.scrollTo(0, { immediate: true });
        }

        ScrollTrigger.refresh();
      });
    });

    return () => cancelAnimationFrame(outerId);
  }, [pathname]);

  return (
    <ReactLenis root options={{ duration: 1.2, autoRaf: false, syncTouch: true }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
