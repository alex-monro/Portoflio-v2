"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    if (dotRef.current && ringRef.current) {
      gsap.set([dotRef.current, ringRef.current], { scale: 1 });
    }
  }, { dependencies: [pathname] });

  useGSAP(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    document.documentElement.classList.add("cursor-custom");

    gsap.set([dot, ring], { opacity: 0 });

    const xTo = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    let started = false;

    const onMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);

      if (!started) {
        started = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
      }
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) {
        gsap.to(ring, { scale: 2.5, duration: 0.3, ease: "power2.out" });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };

    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) {
        gsap.to(ring, { scale: 1, duration: 0.2, ease: "power2.out" });
        gsap.to(dot, { scale: 1, duration: 0.15 });
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("click", onClick);

    return () => {
      document.documentElement.classList.remove("cursor-custom");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("click", onClick);
    };
  });

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-cursor h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-50"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-cursor h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-50"
      />
    </>
  );
};

export default Cursor;
