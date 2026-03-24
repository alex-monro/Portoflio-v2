"use client";

import React from "react";
import Image from "next/image";
import Blackjack from "@/assets/images/blackjack.png";
import Flixi from "@/assets/images/flixi.png";
import Link from "next/link";

const Works = () => {
  return (
    <section id="works" className="min-h-screen px-6 lg:px-8 py-24">
      <h2 className="text-6xl uppercase font-bold mb-40">Works</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1 */}
        <div className=" rounded-2xl p-3 lg:p-4 pb-6 flex flex-col gap-4 ">
          <div className="aspect-[16/10] relative overflow-hidden rounded-sm">
            <Image
              src={Blackjack}
              alt="BlackJack game built with JavaScript"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex justify-between items-center px-2">
            <h3 className="text-sm lg:text-2xl font-semibold ">BlackJack</h3>
            <div className="flex gap-4"></div>
          </div>
          <div className="px-2">
            <p className="text-xs text-zinc-350 uppercase tracking-wide font-semibold">
              HTML, CSS, JavaScript
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <Link href="/projects/flixi">
          <div className="rounded-xl p-3 lg:p-4 pb-6 flex flex-col gap-4">
            <div className="aspect-[16/10] relative overflow-hidden rounded-sm">
              <Image
                src={Flixi}
                alt="Flixi movie database built with React"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex justify-between items-center px-2">
              <h3 className="text-sm lg:text-2xl font-semibold ">Flixi</h3>
            </div>
            <div className="px-2">
              <p className="text-xs text-zinc-350 uppercase tracking-wide font-semibold">
                React, TMDB API, CSS Modules
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Works;
