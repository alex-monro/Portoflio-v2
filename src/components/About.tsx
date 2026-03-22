"use client";

import React from "react";

const About = () => {
  return (
    <>
      {/* About */}
      <section className="px-6 lg:px-8 py-24">
        <h2 className="text-6xl uppercase font-bold mb-24">About</h2>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-2xl lg:text-4xl font-semibold tracking-tight leading-[1.2]">
              Front-end developer based in Vancouver with a background in music
              production. I build fast, clean digital experiences with a focus
              on motion, performance, and the details most people skip over.
              Currently studying at BCIT and building for real clients.
            </p>
          </div>
        </div>
      </section>

      {/* Music */}
      <section className="px-6 lg:px-8 py-24">
        <h2 className="text-6xl uppercase font-bold mb-24">Music</h2>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-2xl lg:text-4xl font-semibold tracking-tight leading-[1.2]">
              Multi-platinum, Grammy-nominated music producer under the name
              Eza. Sync placement in the Dumb Money trailer. Years of
              collaborating with artists and producers across North America
              taught me that the details nobody consciously notices are exactly
              what makes something feel right. I carried that into development.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
