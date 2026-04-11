"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";

const bios = [
  "After studying Computer Science at the University of Victoria, I moved into music production where I earned credits on platinum and gold records, including a Grammy-nominated project.",
  "That experience shaped how I approach detail, iteration, and collaboration under pressure.",
  "I recently completed the British Columbia Institute of Technology's Front-End Web Developer program and have been building projects across both the front end and back end.",
];

const About = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".about-label", {
        y: "100%",
        autoAlpha: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 82%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-shell border-t border-zinc-800 w-full"
    >
      <div className="overflow-hidden mb-12 md:mb-20">
        <h2 className="about-label font-bold text-5xl md:text-7xl tracking-tight">
          About Me
        </h2>
      </div>

      <div className="flex flex-col gap-16 lg:flex-row lg:justify-between lg:items-start lg:gap-0">
        <div className="relative w-full lg:w-1/4 shrink-0 overflow-hidden group aspect-[4/5]">
          <Image
            src="/photos/alex.png"
            alt="Alex Monro"
            fill
            className="object-cover rounded-sm transition-all duration-1000 ease-out"
          />
        </div>

        <div className="flex flex-col gap-10 lg:w-3/5">
          {bios.map((paragraph, i) => (
            <p key={i} className="default-text">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
