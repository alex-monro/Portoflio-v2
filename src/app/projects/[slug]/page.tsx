import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

const projects = [
  {
    slug: "blackjack",
    title: "BlackJack",
    type: "Personal",
    year: "2025",
    tags: ["HTML", "CSS", "JavaScript"],
    role: "Developer",
    summary: "Placeholder summary for BlackJack project.",
    link: "#",
  },
  {
    slug: "flixi",
    title: "Flixi",
    type: "Personal",
    year: "2025",
    tags: ["React", "TMDB API", "Node.js"],
    role: "Design & Development",
    summary: "Placeholder summary for Flixi project.",
    link: "#",
  },
  {
    slug: "kai-sonoma",
    title: "Kai Sonoma",
    type: "Freelance",
    year: "2026",
    tags: ["Next.js", "TypeScript", "React"],
    role: "Design & Development",
    summary: "Placeholder summary for Kai Sonoma project.",
    link: "#",
  },
];

export default async function WorkPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="px-6 lg:px-8">
      {/* Hero */}
      <section className="py-24">
        <h1 className="text-6xl lg:text-9xl font-bold uppercase tracking-tight">
          {project.title}
        </h1>
      </section>

      {/* Details card */}
      <section className="bg-[#111113] rounded-2xl p-6 lg:p-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Year */}
          <div className="lg:col-span-2">
            <p className="text-xs uppercase font-semibold tracking-widest text-zinc-500 mb-2">
              Year
            </p>
            <p className="text-4xl font-bold text-zinc-50">{project.year}</p>
          </div>

          {/* Media slider */}
          <div className="lg:col-span-5">
            <p className="text-xs uppercase font-semibold tracking-widest text-zinc-500 mb-4">
              Preview
            </p>
            <div className="aspect-[16/10] bg-zinc-900 rounded-lg flex items-center justify-center text-sm text-zinc-500">
              Media Slider Placeholder
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5">
            <p className="text-xs uppercase font-semibold tracking-widest text-zinc-500 mb-4">
              Summary
            </p>
            <p className="text-lg font-semibold text-zinc-50 leading-relaxed mb-6">
              {project.summary}
            </p>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-widest font-semibold text-zinc-50"
            >
              Visit Site ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
