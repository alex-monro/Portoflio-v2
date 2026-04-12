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
        <div className="media-frame relative">
          {project.featuredImage && (
            <Image
              src={project.featuredImage}
              alt={project.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-500 lg:group-hover:blur-sm lg:group-hover:scale-105 lg:group-hover:brightness-[0.4]"
            />
          )}

          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute left-1/2 top-1/2 z-20 hidden w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-sm opacity-0 transition-opacity duration-500 lg:block group-hover:opacity-100 pointer-events-none"
          />

          <div className="absolute bottom-0 left-0 right-0 z-30 text-2xl hidden p-6 lg:flex lg:items-end lg:justify-between">
            <h3 className="translate-y-1 opacity-0 transition-all delay-200 duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              {project.title}
            </h3>
            <p className="translate-y-1 opacity-0 transition-all delay-200 duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              View →
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-6 lg:hidden">
          <h3 className="text-base  tracking-tight">{project.title}</h3>
          <span className="text-base tracking-tight">View →</span>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
