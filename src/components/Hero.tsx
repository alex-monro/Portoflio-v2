"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
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
  const lenis = useLenis();
  const wordIndex = useRef(0);
  const wordRef = useRef<HTMLSpanElement>(null);
  const intervalId = useRef<number>(0);

  useGSAP(
    () => {
      // Create a Timeline For hero animations

      const tl = gsap.timeline({
        // Using Gsap Core easeing https://gsap.com/docs/v3/Eases/

        defaults: { ease: "power4.out" },
        delay: 0.3,
      });

      // Splitting the heading into characters, then masking each character.
      const split = SplitText.create(".hero-heading", {
        type: "chars",
        mask: "chars",
      });

      // Animating each character with a stagger effect https://gsap.com/docs/v3/Plugins/SplitText/
      tl.from(split.chars, {
        // Start off screen
        yPercent: 100,

        // Stagger each character
        stagger: { each: 0.02, from: "start" },
        duration: 1,
        ease: "power2.out",
      });

      tl.from(".hero-subheading", {
        yPercent: -100,
        autoAlpha: 0,
        duration: 2,
      });

      tl.from(".hero-scroll", {
        xPercent: 100,
        autoAlpha: 0,
        duration: 1,
      });

      const rotate = () => {
        gsap.killTweensOf(wordRef.current);
        gsap.to(wordRef.current, {
          yPercent: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power1.in",
          onComplete: () => {
            wordIndex.current = (wordIndex.current + 1) % words.length;
            if (wordRef.current) {
              wordRef.current.textContent = words[wordIndex.current];
            }
            gsap.set(wordRef.current, { yPercent: 50 });
            gsap.to(wordRef.current, {
              yPercent: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power1.out",
            });
          },
        });
      };

      intervalId.current = window.setInterval(rotate, 3000);

      return () => clearInterval(intervalId.current);
    },
    { scope: containerRef },
  );

  const scrollToWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("works");
    if (target) lenis?.scrollTo(target, { duration: 1.2 });
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
