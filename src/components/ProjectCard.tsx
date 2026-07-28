"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const ProjectCard = ({
  project,
  className,
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <article className={`group relative z-10${className ? ` ${className}` : ""}`}>
      <Link
        href={`/projects/${project.slug}`}
        className="block no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
        onMouseEnter={() => videoRef.current?.play().catch(() => {})}
        onMouseLeave={() => {
          const v = videoRef.current;
          if (v) { v.pause(); v.currentTime = 0; }
        }}
        onFocus={() => videoRef.current?.play().catch(() => {})}
        onBlur={() => {
          const v = videoRef.current;
          if (v) { v.pause(); v.currentTime = 0; }
        }}
      >
        <figure className="media-frame relative m-0">
          {project.featuredImage ? (
            project.featuredImageStyle === "logo" ? (
              <div className="absolute inset-0 bg-zinc-950 transition-[transform,filter] duration-500 lg:group-hover:blur-sm lg:group-hover:scale-105 lg:group-hover:brightness-[0.4]">
                <Image
                  src={project.featuredImage}
                  alt={project.featuredImageAlt}
                  fill
                  priority={priority}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-[14%] invert"
                />
              </div>
            ) : (
              <Image
                src={project.featuredImage}
                alt={project.featuredImageAlt}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-[transform,filter] duration-500 lg:group-hover:blur-sm lg:group-hover:scale-105 lg:group-hover:brightness-[0.4]"
              />
            )
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white text-zinc-950 transition-[filter] duration-500 lg:group-hover:brightness-[0.4]">
              <span className="text-xl font-semibold tracking-tight">
                {project.title}
              </span>
              {project.status && (
                <span className="text-sm uppercase tracking-wider">
                  {project.status}
                </span>
              )}
            </div>
          )}

          {project.video && (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${project.title} demo video`}
              className="absolute left-1/2 top-1/2 z-20 hidden w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-sm opacity-0 transition-opacity duration-500 lg:block group-hover:opacity-100 pointer-events-none"
            />
          )}

          <div className="absolute bottom-0 left-0 right-0 z-30 hidden justify-end p-6 text-white lg:flex">
            <p className="translate-y-1 text-sm font-semibold uppercase tracking-wide opacity-0 transition-[transform,opacity] delay-200 duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              Explore project →
            </p>
          </div>
        </figure>

        <div className="mt-5 flex items-end justify-between gap-8">
          <div className="min-w-0">
            <h3 className="text-xl font-medium tracking-tight md:text-2xl">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="mt-2 max-w-md text-base leading-tight text-zinc-950">
                {project.tagline}
              </p>
            )}
          </div>
          <span className="shrink-0 border-b border-zinc-950 pb-1 text-xs font-semibold uppercase tracking-wide md:text-sm">
            Explore project →
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
