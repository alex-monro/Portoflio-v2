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

    // Stop synchronously so the GSAP ticker can't push Lenis toward its old
    // targetScroll (e.g. Y=800 from the previous page) while the double-rAF
    // is pending. Without this the ticker fires every 16ms and snaps the new
    // page to the bottom before our scrollTo(0) gets a chance to run.
    lenis.stop();

    const outerId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Stale callback — a newer navigation has already taken over.
        // Don't call start() here; the newer effect's callback will do it.
        if (gen !== generation.current) return;

        const hash = window.location.hash;
        const target = hash ? document.querySelector(hash) : null;

        if (target) {
          // scrollTo with immediate resets Lenis's internal targetScroll +
          // animatedScroll to the target while stopped, so start() resumes
          // from the right place instead of the previous page's position.
          lenis.scrollTo(target as HTMLElement, { immediate: true });
          // Clean the hash from the URL so navigating away and back doesn't
          // accumulate it into /#works#works.
          history.replaceState(null, "", window.location.pathname);
        } else {
          lenis.scrollTo(0, { immediate: true });
        }

        // Re-enable AFTER position is set — calling start() before scrollTo()
        // was the previous bug: Lenis would resume toward Y=800 for one frame.
        lenis.start();
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
