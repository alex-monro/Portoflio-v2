import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, getProject } from "@/lib/projects";
import ProjectImageSlider from "@/components/ProjectImageSlider";
import { GitHubIcon } from "@/components/Icons";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function WorkPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await Promise.resolve(params);
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <main className="section-shell">
      <section className="border-b border-zinc-800 pb-8">
        <h1 className="text-7xl font-bold uppercase tracking-tight lg:text-8xl">
          {project.title}
        </h1>
      </section>

      <section className="py-16 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7">
            <div className="media-frame">
              {project.video ? (
                <video src={project.video} autoPlay muted playsInline />
              ) : (
                <div className="">No preview</div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-16 lg:col-span-5">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="project-subheading mb-6">Overview</h2>
                <p className="default-text">{project.overview}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest mb-3">Tech Used</p>
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-fade"
                  aria-label="Live site"
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
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-fade"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 py-16 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-28">
          <div>
            <h2 className="project-subheading mb-6">Reflection</h2>
            <p className="default-text max-w-lg">{project.reflection}</p>
          </div>
          <ProjectImageSlider images={project.images} title={project.title} />
        </div>
      </section>

      <div className="border-t border-zinc-800 pt-8">
        <Link
          href="/#works"
          className="text-2xl transition-opacity hover:opacity-50"
        >
          ← Back to Works
        </Link>
      </div>
    </main>
  );
}
