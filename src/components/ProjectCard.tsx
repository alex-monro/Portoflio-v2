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
  const cardSrc = project.cardImage ?? project.featuredImage;
  const cardAlt = project.cardImage
    ? (project.cardImageAlt ?? project.featuredImageAlt)
    : project.featuredImageAlt;
  const imageMotion =
    "transition-transform duration-500 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025] motion-reduce:transition-none";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group animate-rise block motion-reduce:animate-none"
      style={{ animationDelay: `${riseDelay}s` }}
    >
      <figure
        className={`relative aspect-video overflow-hidden rounded-lg ${
          isLogo ? "bg-foreground" : "bg-white"
        }`}
      >
        <Image
          src={cardSrc}
          alt={cardAlt}
          fill
          priority={priority}
          sizes="(max-width: 960px) 100vw, 50vw"
          className={`${imageMotion} ${
            isLogo ? "object-contain p-[14%] invert" : "object-cover"
          }`}
        />
      </figure>

      <div className="mt-4 flex items-baseline justify-between gap-6">
        <h2 className="text-xl font-semibold">{project.title}</h2>
        <span className="shrink-0 text-xs font-medium text-zinc-600">
          {project.meta}
        </span>
      </div>

      <p className="mt-1.5 max-w-md text-base leading-normal text-pretty text-muted italic">
        {project.tagline}
      </p>
    </Link>
  );
};

export default ProjectCard;
