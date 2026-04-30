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
    <article className={`group${className ? ` ${className}` : ""}`}>
      <Link
        href={`/projects/${project.slug}`}
        className="block no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-50"
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
            <Image
              src={project.featuredImage}
              alt={project.featuredImageAlt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-[transform,filter] duration-500 lg:group-hover:blur-sm lg:group-hover:scale-105 lg:group-hover:brightness-[0.4]"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-zinc-900 text-zinc-300 transition-[filter] duration-500 lg:group-hover:brightness-[0.4]">
              <span className="text-xl font-semibold tracking-tight">
                {project.title}
              </span>
              {project.status && (
                <span className="text-sm uppercase tracking-wider text-zinc-500">
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

          {/* Hover overlay — desktop non-touch only */}
          <div className="absolute bottom-0 left-0 right-0 z-30 hidden p-6 text-white lg:flex lg:items-end lg:justify-between">
            <div className="translate-y-1 opacity-0 transition-[transform,opacity] delay-200 duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-2xl">{project.title}</h3>
              {project.tagline && (
                <p className="mt-1 text-base text-white">{project.tagline}</p>
              )}
            </div>
            <p className="translate-y-1 text-base font-semibold opacity-0 transition-[transform,opacity] delay-200 duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              View project details →
            </p>
          </div>
        </figure>

        {/* Static info bar — visible on all screens below lg */}
        <div className="project-info-bar mt-4 flex items-center justify-between gap-6 lg:hidden">
          <h3 className="text-base tracking-tight">{project.title}</h3>
          <span className="shrink-0 text-sm font-semibold">View project →</span>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
