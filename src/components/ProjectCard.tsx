import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const ProjectCard = ({
  project,
  priority = false,
  riseDelay = 0,
}: {
  project: Project;
  priority?: boolean;
  riseDelay?: number;
}) => {
  const isLogo = project.featuredImageStyle === "logo";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-link rise block"
      style={{ animationDelay: `${riseDelay}s` }}
    >
      <figure
        className={`relative m-0 aspect-video overflow-hidden rounded-[10px] ${
          isLogo ? "bg-[#09090b]" : "bg-white"
        }`}
      >
        <Image
          src={project.featuredImage}
          alt={project.featuredImageAlt}
          fill
          priority={priority}
          sizes="(max-width: 960px) 100vw, 50vw"
          className={
            isLogo
              ? "card-img object-contain p-[14%] invert"
              : "card-img object-cover"
          }
        />
      </figure>

      <div className="mt-4 flex items-baseline justify-between gap-6">
        <h2 className="m-0 text-[20px] font-semibold tracking-[-0.01em]">
          {project.title}
        </h2>
        <span className="shrink-0 text-[13px] font-medium text-[#52525b]">
          {project.meta}
        </span>
      </div>

      <p className="mt-[6px] mb-0 max-w-[420px] text-[15.5px] leading-[1.5] text-pretty text-[#3f3f46] italic">
        {project.tagline}
      </p>
    </Link>
  );
};

export default ProjectCard;
