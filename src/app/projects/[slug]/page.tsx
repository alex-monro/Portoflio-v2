import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProjects, projects } from "@/lib/projects";
import CaseSlider from "@/components/CaseSlider";
import NextProjectLink from "@/components/NextProjectLink";
import ProjectActionLink from "@/components/ProjectActionLink";
import VideoPlayer from "@/components/VideoPlayer";

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

  const description = `${project.tagline} ${project.whyIBuiltIt}`;
  const images = project.featuredImage
    ? [{ url: project.featuredImage, alt: project.featuredImageAlt }]
    : undefined;

  return {
    title: `${project.title} | Alex Monro`,
    description,
    openGraph: {
      title: `${project.title} | Alex Monro`,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Alex Monro`,
      description,
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
  const nextProject =
    navigationProjects[(currentIndex + 1) % navigationProjects.length];

  const isLogo = project.featuredImageStyle === "logo";
  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);

  return (
    <article>
      {/* Hero */}
      <section className="animate-rise pt-10 md:pt-14 motion-reduce:animate-none">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
          <h1
            className={`text-4xl font-semibold ${
              project.titleHover === "split"
                ? "cursor-default tracking-tight transition-[letter-spacing] duration-500 ease-out hover:tracking-[0.22em] motion-reduce:transition-none"
                : "tracking-tight"
            }`}
          >
            {project.title}
          </h1>
          <span className="text-xs font-medium text-muted">
            {project.meta}
          </span>
        </div>
        <p className="mt-2 max-w-md text-base leading-normal text-pretty text-zinc-800 italic">
          {project.tagline}
        </p>
      </section>

      {/* Media + aside */}
      <section
        className="animate-rise grid items-start gap-8 pt-7 motion-reduce:animate-none lg:grid-cols-3 lg:gap-x-12 xl:grid-cols-5"
        style={{ animationDelay: "0.1s" }}
      >
        <figure
          className={`relative aspect-video overflow-hidden rounded-lg lg:col-span-2 xl:col-span-3 ${
            !project.video && isLogo ? "bg-foreground" : "bg-white"
          }`}
        >
          {project.video ? (
            <VideoPlayer
              src={project.video}
              label={`${project.title} demo video`}
            />
          ) : (
            <Image
              src={project.cardImage ?? project.featuredImage}
              alt={project.cardImageAlt ?? project.featuredImageAlt}
              fill
              priority
              sizes="(max-width: 64rem) 100vw, 60vw"
              className={
                isLogo ? "object-contain p-[14%] invert" : "object-cover"
              }
            />
          )}
        </figure>

        <aside className="flex flex-col gap-5 pt-1 lg:col-span-1 xl:col-span-2">
          <div>
            <p className="text-sm font-semibold">My role</p>
            <p className="mt-1 text-base leading-normal text-muted">
              {project.role}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Built with</p>
            <p className="mt-1 text-base leading-normal text-muted">
              {project.builtWith}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.link && (
              <ProjectActionLink href={project.link} type="live" />
            )}
            {project.github && (
              <ProjectActionLink href={project.github} type="github" />
            )}
          </div>

          <div className="pt-2">
            <h2 className="mb-2 text-xl font-semibold">
              Why I built it
            </h2>
            <p className="text-lg leading-relaxed text-pretty">
              {project.whyIBuiltIt}
            </p>
          </div>
        </aside>
      </section>

      {/* How I built it */}
      <section className="mt-18 border-t border-zinc-300 pt-16">
        <div
          className={`grid gap-x-14 gap-y-10 ${
            hasGallery ? "items-center lg:grid-cols-5" : ""
          }`}
        >
          <div
            className={`flex flex-col gap-7 ${
              hasGallery ? "lg:col-span-2" : "max-w-prose"
            }`}
          >
            <div>
              <h2 className="mb-4 text-4xl font-semibold tracking-tight">
                How I built it
              </h2>
              <p className="text-lg leading-relaxed text-pretty">
                {project.howIntro}
              </p>
            </div>

            {project.howSteps.map((step) => (
              <div key={step.heading}>
                <h3 className="mb-2 text-xl font-semibold">
                  {step.heading}
                </h3>
                <p className="text-lg leading-relaxed text-pretty">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {hasGallery && (
            <div className="lg:col-span-3 lg:translate-y-5">
              <CaseSlider images={project.gallery!} />
            </div>
          )}
        </div>
      </section>

      {/* What I learned */}
      <section className="mt-18 border-t border-zinc-300 pt-16">
        <h2 className="mb-6 text-4xl font-semibold tracking-tight">
          What I learned
        </h2>
        <div className="flex max-w-prose flex-col gap-5">
          {project.whatILearned.map((item) => (
            <p key={item} className="text-lg leading-relaxed text-pretty">
              {item}
            </p>
          ))}
        </div>
      </section>

      {/* Bottom nav */}
      <section className="mt-20 flex flex-wrap items-end justify-between gap-8 border-t border-zinc-300 pt-10 pb-18">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 pb-1.5 text-sm font-medium"
        >
          <span
            className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-1 motion-reduce:transition-none"
            aria-hidden="true"
          >
            ←
          </span>
          <span>All projects</span>
        </Link>

        <NextProjectLink
          href={`/projects/${nextProject.slug}`}
          projectTitle={nextProject.title}
        />
      </section>
    </article>
  );
}
