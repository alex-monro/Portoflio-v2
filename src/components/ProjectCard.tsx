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
        className="block"
        onMouseEnter={() => videoRef.current?.play().catch(() => {})}
        onMouseLeave={() => {
          const v = videoRef.current;
          if (v) {
            v.pause();
            v.currentTime = 0;
          }
        }}
      >
        <figure className="media-frame relative m-0">
          {project.featuredImage && (
            <Image
              src={project.featuredImage}
              alt={project.featuredImageAlt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-[transform,filter] duration-500 lg:group-hover:blur-sm lg:group-hover:scale-105 lg:group-hover:brightness-[0.4]"
            />
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

          {/* Shown on hover for non-touch screens */}
          <div className="absolute bottom-0 left-0 right-0 z-30 hidden p-6 text-zinc-50 lg:flex lg:items-end lg:justify-between">
            <h3 className="translate-y-1 text-2xl opacity-0 transition-[transform,opacity] delay-200 duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              {project.title}
            </h3>
            <p className="translate-y-1 text-base font-semibold opacity-0 transition-[transform,opacity] delay-200 duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              View project details →
            </p>
          </div>
        </figure>

        {/* Shown on touch devices at any size, and below lg on non-touch */}
        <div className="project-info-bar mt-4 hidden items-center justify-between gap-6 lg:hidden">
          <h3 className="text-base tracking-tight">{project.title}</h3>
          <span className="text-sm font-semibold">View project details →</span>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
