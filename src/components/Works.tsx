"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";

const Works = ({ projects }: { projects: Project[] }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const trigger = containerRef.current;

      gsap.from(".project-card-anim", {
        y: 36,
        autoAlpha: 0,
        duration: 1.2,
        stagger: 0.14,
        ease: "power4.out",
        scrollTrigger: { trigger, start: "top 88%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="works"
      className="w-full pt-36 pb-24 text-zinc-950 md:pt-40 md:pb-32 lg:pt-44 lg:pb-40"
    >
      <div className="relative grid grid-cols-1 gap-y-24 md:grid-cols-2 md:gap-x-0 md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:w-px md:before:-translate-x-1/2 md:before:bg-zinc-300 md:before:content-[''] lg:gap-y-32">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            className={`project-card-anim ${
              i % 2 === 0 ? "md:pr-8 lg:pr-12" : "md:pl-8 lg:pl-12"
            }`}
            priority={i < 2}
          />
        ))}
      </div>
    </section>
  );
};

export default Works;
