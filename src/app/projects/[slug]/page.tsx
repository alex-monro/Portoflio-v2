import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { featuredProjects, projects } from "@/lib/projects";
import { GitHubIcon } from "@/components/Icons";
import ProcessSlider from "@/components/ProcessSlider";
import VideoPlayer from "@/components/VideoPlayer";
import BackToWorks from "@/components/BackToWorks";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await Promise.resolve(params);
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const ogImages = project.featuredImage
    ? [{ url: project.featuredImage, alt: project.featuredImageAlt }]
    : undefined;
  const twitterImages = project.featuredImage
    ? [project.featuredImage]
    : undefined;

  return {
    title: `${project.title} | Alex Monro`,
    description: project.overview,
    openGraph: {
      title: `${project.title} | Alex Monro`,
      description: project.overview,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Alex Monro`,
      description: project.overview,
      images: twitterImages,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await Promise.resolve(params);

  const project = projects.find((p) => p.slug === slug) ?? null;
  if (!project) notFound();

  const navigationProjects = featuredProjects.includes(project)
    ? featuredProjects
    : projects;
  const currentIndex = navigationProjects.findIndex((p) => p.slug === slug);
  const prevProject =
    navigationProjects[
      (currentIndex - 1 + navigationProjects.length) %
        navigationProjects.length
    ];
  const nextProject =
    navigationProjects[(currentIndex + 1) % navigationProjects.length];

  return (
    <div className="section-shell">
      <section className="border-b border-zinc-300 pb-8">
        <h1 className="text-5xl font-bold uppercase tracking-tight lg:text-7xl">
          {project.title}
        </h1>
        {project.formerName && (
          <p className="mt-3 text-xl tracking-wide">{project.formerName}</p>
        )}
      </section>

      <section className="py-16 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7">
            <figure className="media-frame relative m-0">
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
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className={
                    project.featuredImageStyle === "logo"
                      ? "bg-zinc-950 object-contain p-[14%] invert"
                      : "object-cover"
                  }
                />
              ) : (
                <div className="py-16 text-center">
                  {project.status ?? "No preview available"}
                </div>
              )}
            </figure>
          </div>

          <div className="flex flex-col justify-between gap-16 lg:col-span-5">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="project-subheading mb-6">Overview</h2>
                <p className="default-text">{project.overview}</p>
              </div>
              <div>
                <p className="text-xl font-semibold mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-400 px-4 py-1 text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {project.status && (
                <div>
                  <p className="text-xl font-semibold mb-3">Status</p>
                  <p className="default-text">{project.status}</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live site`}
                  className="transition-opacity hover:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                  className="transition-opacity hover:opacity-50"
                >
                  <GitHubIcon className="h-8 w-8" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {project.process && project.process.length > 0 && (
        <section className="border-t border-zinc-300 py-16 lg:py-28">
          <h2 className="project-subheading mb-6">Process</h2>
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 lg:items-center">
            <ul
              className={`default-text flex flex-col gap-4 list-disc pl-6 ${
                project.processImages?.length
                  ? "shrink-0 order-last lg:order-first lg:w-2/5"
                  : "max-w-4xl"
              }`}
            >
              {project.process.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
            {project.processImages && project.processImages.length > 0 && (
              <div className="lg:w-3/5 order-first lg:order-last">
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
        <section className="border-t border-zinc-300 py-16 lg:py-28">
          <h2 className="project-subheading mb-6">What I Learned</h2>
          <ul className="default-text grid gap-y-4 gap-x-16 list-disc pl-6 sm:grid-cols-2">
            {project.whatILearned.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {project.reflection && (
        <section className="border-t border-zinc-300 py-16 lg:py-28">
          <h2 className="project-subheading mb-6">Reflection</h2>
          <p className="default-text max-w-lg">{project.reflection}</p>
        </section>
      )}

      <div className="border-t border-zinc-300">
        <div className="project-subheading flex items-center justify-between gap-4 pt-24">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="text-xl font-bold  tracking-tight transition-opacity hover:opacity-50"
          >
            ← {prevProject.title}
          </Link>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="text-xl font-bold  tracking-tight transition-opacity hover:opacity-50 text-right"
          >
            {nextProject.title} →
          </Link>
        </div>

        <div className="mt-12">
          <BackToWorks />
        </div>
      </div>
    </div>
  );
}
