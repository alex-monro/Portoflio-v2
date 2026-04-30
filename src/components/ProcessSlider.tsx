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
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing rounded-sm"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        tabIndex={0}
        aria-label={`Slide ${current + 1} of ${images.length}`}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
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
        <div className="flex items-center justify-center gap-4 mt-5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-50 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === current ? "true" : undefined}
                className="flex items-center justify-center w-6 h-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-50"
              >
                <span className={`rounded-full transition-all duration-300 block ${
                  i === current ? "w-3 h-3 bg-zinc-50" : "w-3 h-3 bg-zinc-600 hover:bg-zinc-400"
                }`} />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-50 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProcessSlider;
