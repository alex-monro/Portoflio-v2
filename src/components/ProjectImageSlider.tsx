"use client";

import type { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type ProjectImageSliderProps = {
  images: string[];
  title: string;
};

export default function ProjectImageSlider({
  images,
  title,
}: ProjectImageSliderProps) {
  const validImages = images.filter(Boolean);

  if (!validImages.length) {
    return <div className=""></div>;
  }

  if (validImages.length === 1) {
    return (
      <div className="rounded-lg overflow-hidden">
        <img
          src={validImages[0]}
          alt={`${title} screenshot 1`}
          className="w-full aspect-[16/9] object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      className="mySwiper rounded-lg overflow-hidden"
      style={
        {
          "--swiper-pagination-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-color": "#888888",
        } as CSSProperties
      }
    >
      {validImages.map((image, index) => (
        <SwiperSlide key={`${title}-${index}`}>
          <img
            src={image}
            alt={`${title} screenshot ${index + 1}`}
            className="w-full aspect-[16/9] object-cover"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
