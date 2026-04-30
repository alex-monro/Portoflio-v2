"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsapConfig";

const words = [
  "UI/UX",
  "Functionality",
  "Performance",
  "Accessibility",
  "Design",
];

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const wordIndex = useRef(0);
  const wordRef = useRef<HTMLSpanElement>(null);
  const intervalId = useRef<number>(0);

  useGSAP(
    () => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const isSoftNav = typeof sessionStorage !== "undefined" && !!sessionStorage.getItem("soft-nav");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: isSoftNav ? 0.3 : 1.8,
      });

      if (!reduced) {
        const split = SplitText.create(".hero-heading", {
          type: "chars",
          mask: "chars",
        });

        tl.from(split.chars, {
          yPercent: 100,
          stagger: { each: 0.015, from: "start" },
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        tl.from(".hero-heading", { autoAlpha: 0, duration: 0 });
      }

      tl.from(
        ".hero-subheading",
        {
          y: 16,
          autoAlpha: 0,
          duration: reduced ? 0 : 1.4,
        },
        "-=0.4",
      );

      tl.from(
        ".hero-scroll",
        {
          autoAlpha: 0,
          duration: reduced ? 0 : 0.8,
        },
        "-=0.6",
      );

      if (reduced) return;

      const rotate = () => {
        gsap.killTweensOf(wordRef.current);
        gsap.to(wordRef.current, {
          y: -8,
          opacity: 0,
          duration: 0.35,
          ease: "power1.in",
          onComplete: () => {
            if (!wordRef.current) return;
            wordIndex.current = (wordIndex.current + 1) % words.length;
            wordRef.current.textContent = words[wordIndex.current];
            gsap.set(wordRef.current, { y: 8 });
            gsap.to(wordRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.35,
              ease: "power1.out",
            });
          },
        });
      };

      intervalId.current = window.setInterval(rotate, 4500);

      return () => clearInterval(intervalId.current);
    },
    { scope: containerRef },
  );

  const scrollToWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("works");
    if (target) window.__appLenis?.scrollTo(target, { duration: 1.2 });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-svh flex flex-col justify-center section-shell"
    >
      <div>
        <h1 className="hero-heading mt-6">
          Front-End
          <br />
          Developer
        </h1>
        <p className="hero-subheading mt-6 font-medium tracking-tight">
          Specializing in{" "}
          <span ref={wordRef} className="inline-block">
            {words[0]}
          </span>
        </p>
      </div>

      <a
        href="#works"
        onClick={scrollToWorks}
        className="hero-scroll absolute bottom-10 flex items-center gap-2 link-fade lg:text-xl"
      >
        Scroll ↓
      </a>
    </section>
  );
};

export default Hero;
