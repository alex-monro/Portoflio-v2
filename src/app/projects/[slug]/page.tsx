import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProjects, projects } from "@/lib/projects";
import CaseSlider from "@/components/CaseSlider";
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
      <section className="rise pt-14 max-[720px]:pt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
          <h1
            className={`m-0 text-[34px] font-semibold ${
              project.titleHover === "split"
                ? "title-split"
                : "tracking-[-0.02em]"
            }`}
          >
            {project.title}
          </h1>
          <span className="text-[13px] font-medium text-[#3f3f46]">
            {project.meta}
          </span>
        </div>
        <p className="mt-2 mb-0 max-w-[420px] text-[15.5px] leading-[1.5] text-pretty text-[#27272a] italic">
          {project.tagline}
        </p>
      </section>

      {/* Media + aside */}
      <section
        className="rise flex flex-wrap items-start gap-x-12 gap-y-8 pt-7"
        style={{ animationDelay: "0.1s" }}
      >
        <figure
          className={`relative m-0 aspect-video max-w-[820px] min-w-[min(460px,100%)] flex-[1_1_460px] overflow-hidden rounded-[10px] ${
            !project.video && isLogo ? "bg-[#09090b]" : "bg-white"
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
              sizes="(max-width: 960px) 100vw, 64vw"
              className={
                isLogo ? "object-contain p-[14%] invert" : "object-cover"
              }
            />
          )}
        </figure>

        <aside className="flex min-w-[min(230px,100%)] flex-[1_1_230px] flex-col gap-5 pt-1">
          <div>
            <p className="m-0 text-[14px] font-semibold">My role</p>
            <p className="mt-1 mb-0 text-[15.5px] leading-[1.5] text-[#3f3f46]">
              {project.role}
            </p>
          </div>

          <div>
            <p className="m-0 text-[14px] font-semibold">Built with</p>
            <p className="mt-1 mb-0 text-[15.5px] leading-[1.5] text-[#3f3f46]">
              {project.builtWith}
            </p>
          </div>

          <div className="flex gap-6 text-[14px] font-medium">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-[#09090b] pb-[2px] transition-colors hover:text-[#52525b]"
              >
                Live site ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-[#09090b] pb-[2px] transition-colors hover:text-[#52525b]"
              >
                GitHub ↗
              </a>
            )}
          </div>

          <div className="pt-2">
            <h2 className="mt-0 mb-2 text-[20px] font-semibold tracking-[-0.01em]">
              Why I built it
            </h2>
            <p className="m-0 text-[17px] leading-[1.6] text-pretty">
              {project.whyIBuiltIt}
            </p>
          </div>
        </aside>
      </section>

      {/* How I built it */}
      <section className="hairline mt-18 pt-16">
        <div
          className={`flex flex-wrap gap-x-14 gap-y-10 ${
            hasGallery ? "items-center" : ""
          }`}
        >
          <div className="flex min-w-[min(340px,100%)] flex-[1_1_340px] flex-col gap-7">
            <div>
              <h2 className="mt-0 mb-4 text-[34px] font-semibold tracking-[-0.02em]">
                How I built it
              </h2>
              <p className="m-0 text-[18px] leading-[1.65] text-pretty">
                {project.howIntro}
              </p>
            </div>

            {project.howSteps.map((step) => (
              <div key={step.heading}>
                <h3 className="mt-0 mb-2 text-[20px] font-semibold tracking-[-0.01em]">
                  {step.heading}
                </h3>
                <p className="m-0 text-[17px] leading-[1.65] text-pretty">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {hasGallery && (
            <div className="min-w-[min(440px,100%)] flex-[1_1_440px] translate-y-[21px]">
              <CaseSlider images={project.gallery!} />
            </div>
          )}
        </div>
      </section>

      {/* What I learned */}
      <section className="hairline mt-18 pt-16">
        <h2 className="mt-0 mb-6 text-[34px] font-semibold tracking-[-0.02em]">
          What I learned
        </h2>
        <div className="flex max-w-[640px] flex-col gap-[18px]">
          {project.whatILearned.map((item) => (
            <p key={item} className="m-0 text-[17px] leading-[1.65] text-pretty">
              {item}
            </p>
          ))}
        </div>
      </section>

      {/* Bottom nav */}
      <section className="hairline mt-20 flex flex-wrap items-end justify-between gap-8 pt-10 pb-18">
        <Link
          href="/"
          className="back-link inline-flex items-center gap-2 pb-[6px] text-[14px] font-medium"
        >
          <span className="back-arrow" aria-hidden="true">
            ←
          </span>
          <span>All projects</span>
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          scroll={false}
          aria-label={`Next project: ${nextProject.title}`}
          className="next-cta"
        >
          <span className="next-cta-circle" aria-hidden="true" />
          <span className="next-cta-text">Next project</span>
          <span className="next-cta-overlay" aria-hidden="true">
            Next project
          </span>
          <svg
            className="next-cta-arrow"
            width="15"
            height="10"
            viewBox="0 0 13 10"
            aria-hidden="true"
          >
            <path d="M1,5 L11,5" />
            <polyline points="8 1 12 5 8 9" />
          </svg>
        </Link>
      </section>
    </article>
  );
}
