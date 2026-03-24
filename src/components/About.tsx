"use client";

import React, { useState } from "react";
import Accoridan from "./Accoridan";

const About = () => {
  return (
    <>
      {/* About */}
      <section id="about" className="px-6 lg:px-8 pt-24 pb-12">
        <h2 className="text-xl uppercase font-bold mb-12">About Me</h2>
        <div className="grid grid-cols-3 gap-8 mb-24">
          <div className="col-span-3 lg:col-span-2">
            <p className="text-2xl lg:text-4xl font-semibold mb-6">
              Hi, I&apos;m Alex!
            </p>
            <p className="text-2xl lg:text-3xl font-semibold tracking-tight leading-[1.3]">
              Front-end developer based in Vancouver with a background in music
              production. I build fast, clean digital experiences with a focus
              on motion, performance, and the details most people skip over.
              Currently studying at BCIT and building for real clients.
            </p>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-12">
          Not So Frequently Asked Questions
        </h2>
        <Accoridan />
      </section>
    </>
  );
};

export default About;
