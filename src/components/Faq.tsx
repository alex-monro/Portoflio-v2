"use client";

import { useState } from "react";
import { faqs } from "@/lib/projects";

// "Not so frequently asked questions" — no visible title on purpose,
// the joke reveals itself. One item open at a time.
const Faq = () => {
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <div>
      {faqs.map((faq, i) => {
        const open = openFaq === i;

        return (
          <div key={faq.q} className="border-b border-zinc-300">
            <button
              type="button"
              onClick={() => setOpenFaq(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-0 py-4 text-left font-[inherit] text-[16.5px] font-semibold text-foreground"
            >
              <span>{faq.q}</span>
              <span
                aria-hidden="true"
                className="shrink-0 text-[20px] leading-none font-medium"
                style={{
                  transition: "transform 0.7s cubic-bezier(0.65,0,0.35,1)",
                  transform: open ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>

            <div
              style={{
                overflow: "hidden",
                maxHeight: open ? 100 : 0,
                opacity: open ? 1 : 0,
                transition: open
                  ? "max-height 0.8s cubic-bezier(0.65,0,0.35,1), opacity 0.6s ease 0.15s"
                  : "max-height 0.8s cubic-bezier(0.65,0,0.35,1), opacity 0.3s ease",
              }}
            >
              <p className="m-0 pr-8 pb-4 text-[16px] leading-[1.6] text-pretty text-muted">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
