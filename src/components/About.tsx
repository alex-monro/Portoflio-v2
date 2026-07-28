"use client";

import { useRef } from "react";
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
      className="w-full border-t border-zinc-300 py-20 text-zinc-950 md:py-28 lg:py-36"
    >
      <div className="grid gap-y-10 md:gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="overflow-hidden lg:col-span-4">
          <h2 className="about-label section-heading">About Me</h2>
        </div>

        <div className="flex flex-col gap-5 md:gap-6 lg:col-start-6 lg:col-span-7 lg:pt-1">
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
