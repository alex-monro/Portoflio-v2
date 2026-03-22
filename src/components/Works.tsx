"use client";

import React from "react";
import Image from "next/image";
import Blackjack from "@/assets/images/blackjack.png";
import Flixi from "@/assets/images/flixi.png";

const Works = () => {
  return (
    <section id="works" className="min-h-screen px-6 lg:px-8 py-24">
      <h2 className="text-6xl uppercase font-bold mb-40">Works</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1 */}
        <div className=" rounded-2xl p-3 lg:p-4 pb-6 flex flex-col gap-4">
          <div className="aspect-[16/10] relative overflow-hidden rounded-xl">
            <Image
              src={Blackjack}
              alt="BlackJack game built with JavaScript"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex justify-between items-center px-2">
            <h3 className="text-sm lg:text-base font-semibold uppercase tracking-wide">
              BlackJack
            </h3>
            <div className="flex gap-4"></div>
          </div>
          <div className="overflow-hidden px-2">
            <p className="text-xs text-zinc-350 uppercase tracking-widest">
              HTML, CSS, JavaScript
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl p-3 lg:p-4 pb-6 flex flex-col gap-4">
          <div className="aspect-[16/10] relative overflow-hidden rounded-xl">
            <Image
              src={Flixi}
              alt="Flixi movie database built with React"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex justify-between items-center px-2">
            <h3 className="text-sm lg:text-base font-semibold uppercase tracking-wide">
              Flixi
            </h3>
          </div>
          <div className="overflow-hidden px-2">
            <p className="text-xs text-zinc-350 uppercase tracking-widest">
              React, TMDB API, Node350
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
