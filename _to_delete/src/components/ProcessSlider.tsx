"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

type SlideImage = {
  src: string;
  alt: string;
};

const ProcessSlider = ({ images, tall }: { images: SlideImage[]; tall?: boolean }) => {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.clientX - startX.current;
    if (delta < -40) next();
    else if (delta > 40) prev();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  if (images.length === 0) return null;

  return (
    <div className="w-full select-none" role="region" aria-label="Image gallery" aria-roledescription="carousel">
      <div
        className="relative w-full cursor-grab overflow-hidden rounded-lg bg-white active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          isDragging.current = false;
        }}
        onKeyDown={onKeyDown}
        tabIndex={0}
        aria-label={`Slide ${current + 1} of ${images.length}`}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${images.length}`}
              aria-hidden={i !== current}
              className={`relative w-full shrink-0 ${tall ? "h-[360px] lg:h-[620px]" : "h-[260px] lg:h-[420px]"}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                draggable={false}
                className="object-contain object-center pointer-events-none"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-base font-medium tabular-nums" aria-live="polite">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-400 transition-colors hover:border-zinc-950 hover:bg-zinc-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 3L5 8l5 5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-400 transition-colors hover:border-zinc-950 hover:bg-zinc-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessSlider;
