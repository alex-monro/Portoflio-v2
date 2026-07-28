"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import { personalInfo } from "@/lib/projects";

const About = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) return;

      gsap.from([".about-label", ".about-copy"], {
        y: 28,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full border-t border-zinc-300 py-24 text-zinc-950 md:py-32 lg:py-40"
    >
      <div className="grid gap-y-10 md:gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <h2 className="about-label text-sm font-semibold uppercase tracking-wide">
            About
          </h2>
        </div>

        <div className="flex flex-col gap-5 md:gap-6 lg:col-start-6 lg:col-span-7 lg:pt-1">
          {personalInfo.bio.map((paragraph, i) => (
            <p key={i} className="about-copy text-xl leading-snug md:text-2xl lg:text-3xl">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
