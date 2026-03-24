"use client";

import { useState } from "react";

const Accoridan = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    {
      title: "Services",
      content:
        "Front-end development, responsive UI implementation, and clean component architecture built for speed and maintainability.",
    },
    {
      title: "Stack",
      content:
        "React, Next.js, TypeScript, Tailwind CSS, and modern tooling focused on performance, accessibility, and smooth interactions.",
    },
    {
      title: "Workflow",
      content:
        "I design and build in tight iterations: plan, prototype, ship, then refine based on real-world feedback and analytics.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex((previous) => (previous === index ? null : index));
  };

  return (
    <div className="w-full border-t border-zinc-800">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.title} className="border-b border-zinc-800">
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full py-5 flex items-center justify-between"
            >
              <span className="text-lg tracking-wide font-semibold text-zinc-50">
                {item.title}
              </span>
              <span
                className={`text-3xl transition-transform duration-700 ease-out ${
                  isOpen ? "rotate-135 text-zinc-300" : "rotate-0 text-zinc-50"
                }`}
              >
                +
              </span>
            </button>

            <div
              className={`grid transition-all duration-700 ease-in-out ${
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              }`}
            >
              <p className="overflow-hidden text-base leading-relaxed text-zinc-50 pr-6">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accoridan;
