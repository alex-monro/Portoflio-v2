"use client";

import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsapConfig";

const ProjectAnimations = () => {
  useGSAP(() => {
    const split = SplitText.create(".project-title", {
      type: "chars",
      mask: "chars",
    });

    gsap.from(split.chars, {
      yPercent: 100,
      stagger: { each: 0.025, from: "start" },
      duration: 0.9,
      ease: "power3.out",
      delay: 0.1,
    });

    gsap.from(".project-media", {
      y: 50,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.from(".project-meta > *", {
      y: 30,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.4,
    });

    gsap.from(".project-reflection", {
      y: 40,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".project-reflection",
        start: "top 85%",
      },
    });
  });

  return null;
};

export default ProjectAnimations;
