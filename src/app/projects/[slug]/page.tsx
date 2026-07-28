import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProjects, projects } from "@/lib/projects";
import ProcessSlider from "@/components/ProcessSlider";
import VideoPlayer from "@/components/VideoPlayer";
import BackToWorks from "@/components/BackToWorks";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await Promise.resolve(params);
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const images = project.featuredImage
    ? [{ url: project.featuredImage, alt: project.featuredImageAlt }]
    : undefined;

  return {
    title: `${project.title} | Alex Monro`,
    description: project.overview,
    openGraph: {
      title: `${project.title} | Alex Monro`,
      description: project.overview,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Alex Monro`,
      description: project.overview,
      images: project.featuredImage ? [project.featuredImage] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await Promise.resolve(params);
  const project = projects.find((item) => item.slug === slug) ?? null;
  if (!project) notFound();

  const navigationProjects = featuredProjects.includes(project)
    ? featuredProjects
    : projects;
  const currentIndex = navigationProjects.findIndex(
    (item) => item.slug === project.slug,
  );
  const previousProject =
    navigationProjects[
      (currentIndex - 1 + navigationProjects.length) %
        navigationProjects.length
    ];
  const nextProject =
    navigationProjects[(currentIndex + 1) % navigationProjects.length];

  return (
    <div className="section-shell">
      <header className="border-b border-zinc-300 pb-10 md:pb-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide">
              {project.type ?? "Project"}
            </p>
            <h1 className="text-5xl font-bold uppercase leading-none tracking-tight md:text-7xl lg:text-8xl">
              {project.title}
            </h1>
            {project.formerName && (
              <p className="mt-4 text-lg">{project.formerName}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-70"
              >
                View live ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-zinc-950 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-zinc-950 hover:text-white"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </header>

      <section className="py-10 md:py-14 lg:py-16">
        <figure className="relative m-0 aspect-[16/9] overflow-hidden rounded-xl bg-white">
          {project.video ? (
            <VideoPlayer
              src={project.video}
              label={`${project.title} demo video`}
            />
          ) : project.featuredImage ? (
            <Image
              src={project.featuredImage}
              alt={project.featuredImageAlt}
              fill
              priority
              sizes="(max-width: 2200px) 94vw, 2100px"
              className={
                project.featuredImageStyle === "logo"
                  ? "bg-zinc-950 object-contain p-[14%] invert"
                  : "object-cover"
              }
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              Preview unavailable
            </div>
          )}
        </figure>
      </section>

      <section className="grid gap-10 border-t border-zinc-300 py-16 md:grid-cols-12 md:gap-8 lg:py-24">
        <div className="md:col-span-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Overview
          </h2>
        </div>

        <div className="md:col-span-8 lg:col-span-7">
          <p className="text-xl leading-snug md:text-2xl lg:text-3xl">
            {project.overview}
          </p>

          <dl className="mt-12 grid gap-8 border-t border-zinc-300 pt-8 sm:grid-cols-2">
            <div>
              <dt className="mb-2 text-sm font-semibold uppercase tracking-wide">
                Tech stack
              </dt>
              <dd className="text-lg leading-relaxed">
                {project.tags.join(", ")}
              </dd>
            </div>

            <div>
              <dt className="mb-2 text-sm font-semibold uppercase tracking-wide">
                Status
              </dt>
              <dd className="text-lg">
                {project.status ?? "Complete"}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {project.process && project.process.length > 0 && (
        <section className="grid gap-10 border-t border-zinc-300 py-16 md:grid-cols-12 md:gap-8 lg:py-24">
          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Process
            </h2>
          </div>

          <div className="md:col-span-8">
            <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {project.process.map((step, index) => (
                <li
                  key={step}
                  className="border-t border-zinc-300 pt-4 text-lg leading-relaxed"
                >
                  <span className="mb-3 block text-sm font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            {project.processImages && project.processImages.length > 0 && (
              <div className="mt-14">
                <ProcessSlider
                  images={project.processImages}
                  tall={project.type === "Chrome Extension"}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {project.whatILearned && project.whatILearned.length > 0 && (
        <section className="grid gap-10 border-t border-zinc-300 py-16 md:grid-cols-12 md:gap-8 lg:py-24">
          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              What I learned
            </h2>
          </div>

          <ul className="grid gap-x-10 gap-y-8 md:col-span-8 sm:grid-cols-2">
            {project.whatILearned.map((item, index) => (
              <li
                key={item}
                className="border-t border-zinc-300 pt-4 text-lg leading-relaxed"
              >
                <span className="mb-3 block text-sm font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.reflection && (
        <section className="grid gap-10 border-t border-zinc-300 py-16 md:grid-cols-12 md:gap-8 lg:py-24">
          <h2 className="text-sm font-semibold uppercase tracking-wide md:col-span-4">
            Reflection
          </h2>
          <p className="text-xl leading-snug md:col-span-8 md:text-2xl">
            {project.reflection}
          </p>
        </section>
      )}

      <section className="border-t border-zinc-300 pt-12">
        <div className="grid gap-10 md:grid-cols-2 md:gap-0">
          <Link
            href={`/projects/${previousProject.slug}`}
            className="group border-zinc-300 md:border-r md:pr-10"
          >
            <span className="mb-3 block text-sm font-semibold uppercase tracking-wide">
              Previous project
            </span>
            <span className="block text-3xl font-semibold tracking-tight transition-opacity group-hover:opacity-50 md:text-4xl">
              ← {previousProject.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group md:pl-10 md:text-right"
          >
            <span className="mb-3 block text-sm font-semibold uppercase tracking-wide">
              Next project
            </span>
            <span className="block text-3xl font-semibold tracking-tight transition-opacity group-hover:opacity-50 md:text-4xl">
              {nextProject.title} →
            </span>
          </Link>
        </div>

        <div className="mt-14">
          <BackToWorks />
        </div>
      </section>
    </div>
  );
}
