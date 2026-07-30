"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

const CaseSlider = ({ images }: { images: GalleryImage[] }) => {
  const [slide, setSlide] = useState(0);
  const count = images.length;

  const prev = () => setSlide((s) => (s + count - 1) % count);
  const next = () => setSlide((s) => (s + 1) % count);

  if (count === 0) return null;

  return (
    <div>
      <figure className="m-0 overflow-hidden rounded-[10px] bg-white">
        <div
          className="flex aspect-video"
          style={{
            transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
            transform: `translateX(-${slide * 100}%)`,
          }}
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="relative h-full w-full flex-[0_0_100%]"
              aria-hidden={i !== slide}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 960px) 100vw, 45vw"
                className={
                  img.fit === "contain" ? "object-contain" : "object-cover"
                }
              />
            </div>
          ))}
        </div>
      </figure>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-end gap-[14px]">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous screen"
            className="slider-arrow slider-arrow-prev"
          >
            ←
          </button>
          <span
            aria-live="polite"
            className="text-[13px] font-medium text-[#3f3f46] tabular-nums"
          >
            {slide + 1} / {count}
          </span>
          <button
            type="button"
            onClick={next}
            aria-label="Next screen"
            className="slider-arrow slider-arrow-next"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default CaseSlider;
