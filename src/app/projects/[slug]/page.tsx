import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { GitHubIcon } from "@/components/Icons";

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
  return {
    title: `${project.title} — Alex Monro`,
    description: project.overview,
    openGraph: {
      title: `${project.title} — Alex Monro`,
      description: project.overview,
      images: [{ url: project.featuredImage, alt: project.featuredImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Alex Monro`,
      description: project.overview,
      images: [project.featuredImage],
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

  return (
    <div className="section-shell">
      <section className="border-b border-zinc-800 pb-8">
        <h1 className="text-5xl font-bold uppercase tracking-tight lg:text-8xl">
          {project.title}
        </h1>
      </section>

      <section className="py-16 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7">
            <figure className="media-frame m-0">
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  muted
                  playsInline
                  aria-label={`${project.title} demo video`}
                />
              ) : (
                <div className="py-16 text-center">No preview available</div>
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
                      className="text-sm font-semibold border border-zinc-700 rounded-full px-4 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {project.link && (
                <a
                  href={project.link}
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

      {project.reflection && (
        <section className="border-t border-zinc-800 py-16 lg:py-28">
          <h2 className="project-subheading mb-6">Reflection</h2>
          <p className="default-text max-w-lg">{project.reflection}</p>
        </section>
      )}

      <div>
        <Link
          href="/#works"
          scroll={false}
          className="text-2xl transition-opacity hover:opacity-50"
        >
          ← Back to Works
        </Link>
      </div>
    </div>
  );
}
