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
      const trigger = { trigger: containerRef.current };

      gsap.from(".works-label", {
        y: 60,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { ...trigger, start: "top 80%" },
      });

      gsap.from(".project-card-anim", {
        y: 60,
        autoAlpha: 0,
        duration: 2,
        stagger: 0.18,
        ease: "power4.out",
        scrollTrigger: { ...trigger, start: "top 70%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} id="works" className="section-shell">
      <div className="">
        <h2 className="works-label pb-14 section-heading tracking-tight">
          Works
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            className="project-card-anim"
            priority={i === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default Works;
