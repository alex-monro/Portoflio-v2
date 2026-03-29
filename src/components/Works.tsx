"use client";

import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Blackjack from "@/assets/images/blackjack.png";
import Flixi from "@/assets/images/flixi.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Project = {
  slug: string;
  title: string;
  image: StaticImageData;
  video: string;
};

const projects: Project[] = [
  {
    slug: "blackjack",
    title: "BlackJack",
    image: Blackjack,
    video: "/videos/blackjack-Video.mp4",
  },
  {
    slug: "flixi",
    title: "Flixi",
    image: Flixi,
    video: "/videos/flixi-Video.mp4",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
      }}
    >
      <div className="aspect-[16/10] relative overflow-hidden rounded-lg">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-500 lg:group-hover:blur-sm lg:group-hover:scale-105 group-hover:brightness-60"
        />

        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20"
        />
        <div className="hidden lg:flex absolute bottom-4 left-4 right-4 justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-1000 z-30">
          <p className="text-sm font-semibold">{project.title}</p>
        </div>
      </div>
      <div className="flex justify-between pt-3 lg:hidden">
        <p className="font-semibold">{project.title}</p>
        <span className="flex items-center gap-1 text-sm font-medium text-">
          <p className="font-semibold">View Project </p>
          <ArrowRight size={20} strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
};

const Works = () => {
  return (
    <section id="works" className="min-h-screen px-6 lg:px-8 py-24">
      <h2 className=" text-4xl lg:text-6xl uppercase font-bold mb-12">Works</h2>
      <div className="grid gap-12 md:grid-cols-2 md:gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Works;
