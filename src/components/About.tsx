"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import { personalInfo } from "@/lib/projects";

const About = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".about-label", {
        y: "100%",
        autoAlpha: 0,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: { start: "top 80%" },
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
        <figure className="relative w-full lg:w-1/4 shrink-0 overflow-hidden aspect-[4/5] m-0">
          <Image
            src="/photos/alex.jpg"
            alt="Alex Monro, front-end developer, pictured outdoors"
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="object-cover rounded-sm"
          />
        </figure>

        <div className="flex flex-col gap-10 lg:w-3/5">
          {personalInfo.bio.map((paragraph, i) => (
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
