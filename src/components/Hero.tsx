"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsapConfig";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (
        reducedMotion ||
        !headingRef.current ||
        !roleRef.current ||
        !supportRef.current
      ) {
        return;
      }

      const headingSplit = SplitText.create(headingRef.current, {
        type: "chars",
        charsClass: "hero-char",
      });

      gsap.set(headingSplit.chars, {
        transformOrigin: "50% 100%",
      });

      const timeline = gsap.timeline({
        delay: 0.12,
        defaults: { ease: "power4.out" },
      });

      timeline
        .from(headingSplit.chars, {
          yPercent: 115,
          rotateX: -45,
          autoAlpha: 0,
          duration: 1.15,
          stagger: 0.035,
        })
        .from(
          [roleRef.current, supportRef.current],
          {
            yPercent: 130,
            autoAlpha: 0,
            duration: 0.95,
            stagger: 0.12,
          },
          "-=0.78",
        );

      return () => headingSplit.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-end pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20"
    >
      <div className="text-white">
        <div className="overflow-hidden [perspective:800px]">
          <h1 ref={headingRef} className="hero-heading mt-6">
            Alex Monro
          </h1>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="overflow-hidden">
            <p
              ref={roleRef}
              className="hero-subheading font-medium tracking-tight"
            >
              Software Developer
            </p>
          </div>

          <div className="overflow-hidden">
            <p
              ref={supportRef}
              className="hero-support font-medium tracking-tight md:text-right"
            >
              Front-end trained. Full-stack focused.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
