"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsapConfig";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.3,
      });

      const split = SplitText.create(".hero-heading", {
        type: "chars, words",
        mask: "words",
      });

      tl.from(split.chars, {
        yPercent: 110,
        rotateX: -90,
        stagger: { each: 0.025, from: "start" },
        duration: 1.2,
        ease: "power4.out",
      });

      tl.from(
        ".hero-subheading",
        { y: 20, autoAlpha: 0, duration: 1.5 },
        "-=0.4",
      );
    },
    { scope: containerRef },
  );

  const scrollToWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#works");
    if (window.__appLenis && target instanceof HTMLElement) {
      window.__appLenis.scrollTo(target, { duration: 1.2 });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-svh flex flex-col justify-center section-shell "
    >
      <div>
        <h1 className="hero-heading mt-6">
          Front-End
          <br />
          Developer
        </h1>
        <p className="hero-subheading mt-6  font-medium tracking-tight ">
          UI/UX · Design · Functionality
        </p>
      </div>

      <a
        href="#works"
        onClick={scrollToWorks}
        className="hero-scroll absolute bottom-10 flex items-center gap-2 font-medium text-lg uppercase tracking-widest link-fade  lg:text-xl"
      >
        Scroll ↓
      </a>
    </section>
  );
};

export default Hero;
