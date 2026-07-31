"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

const CaseSlider = ({ images }: { images: GalleryImage[] }) => {
  const [slide, setSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const count = images.length;

  const prev = () => setSlide((s) => (s + count - 1) % count);
  const next = () => setSlide((s) => (s + 1) % count);

  const finishDrag = (
    event: React.PointerEvent<HTMLDivElement>,
    cancelled = false,
  ) => {
    if (!isDragging) return;

    const threshold = Math.min(120, event.currentTarget.clientWidth * 0.14);

    if (!cancelled && Math.abs(dragOffset) >= threshold) {
      if (dragOffset < 0) next();
      else prev();
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setDragOffset(0);
    setIsDragging(false);
  };

  if (count === 0) return null;

  return (
    <div>
      <figure className="m-0 overflow-hidden rounded-[10px] bg-white">
        <div
          className={`flex aspect-video select-none ${
            count > 1
              ? isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
              : ""
          }`}
          onPointerDown={(event) => {
            if (count < 2 || !event.isPrimary || event.button !== 0) return;
            dragStartX.current = event.clientX;
            event.currentTarget.setPointerCapture(event.pointerId);
            setIsDragging(true);
          }}
          onPointerMove={(event) => {
            if (!isDragging || !event.isPrimary) return;
            setDragOffset(event.clientX - dragStartX.current);
          }}
          onPointerUp={(event) => finishDrag(event)}
          onPointerCancel={(event) => finishDrag(event, true)}
          style={{
            touchAction: "pan-y",
            transition: isDragging
              ? "none"
              : "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
            transform: `translateX(calc(-${slide * 100}% + ${dragOffset}px))`,
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
                draggable={false}
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
