import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

const projects = [
  {
    slug: "blackjack",
    title: "BlackJack",
    type: "Personal",
    tags: ["HTML", "CSS", "JavaScript"],
    summary:
      "A classic card game built from scratch using vanilla HTML, CSS, and JavaScript. Features interactive gameplay with realistic game logic, including hit/stand mechanics and dealer AI. Perfect demonstration of DOM manipulation and game state management without external frameworks.",
    reflection:
      "Building this helped me sharpen core JavaScript fundamentals and taught me the value of clean state transitions in interactive UI logic.",
    link: "#",
    github: "https://github.com/alex-monro/blackjack",
  },
  {
    slug: "flixi",
    title: "Flixi",
    type: "Personal",
    tags: ["React", "TMDB API", "Node.js"],
    summary:
      "A dynamic movie discovery platform built with React and powered by the TMDB API. Users can browse popular films, search by genre, and view detailed information including ratings, cast, and synopses. Showcases REST API integration, component architecture, and responsive design.",
    reflection:
      "This project improved how I structure React components around async data, and reinforced the importance of balancing API richness with a fast, simple UX.",
    link: "#",
    github: "https://github.com/alex-monro/flixi",
  },
  {
    slug: "kai-sonoma",
    title: "Kai Sonoma",
    type: "Freelance",
    tags: ["Next.js", "TypeScript", "React"],
    summary:
      "A full-featured website redesign and development project delivered as a freelance engagement. Built with modern web technologies including Next.js and TypeScript for optimal performance and maintainability. Includes responsive design, SEO optimization, and intuitive user experience tailored to client specifications.",
    reflection:
      "Working directly with a client strengthened my communication and iteration process, especially around translating feedback into clear design and engineering decisions.",
    link: "#",
    github: "https://github.com/alex-monro/kai-sonoma",
  },
];

export default async function WorkPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="px-6 lg:px-8">
      {/* Title */}
      <section className="py-24">
        <h1 className="text-6xl lg:text-8xl font-bold uppercase tracking-tight">
          {project.title}
        </h1>
      </section>

      {/* Details card */}
      <section className="bg-[#111113] rounded-2xl p-6 lg:p-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Media slider */}
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] bg-zinc-900 rounded-lg flex items-center justify-center text-sm text-zinc-500">
              Media Slider Placeholder
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-lg font-semibold text-zinc-50 leading-relaxed mb-6">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-semibold text-zinc-50 border border-zinc-700 rounded-full px-4 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-6">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-widest font-semibold text-zinc-50"
              >
                Live Site ↗
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-widest font-semibold text-zinc-50"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24 max-w-3xl">
        <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight mb-4">
          Reflection
        </h2>
        <p className="text-base lg:text-lg text-zinc-300 leading-relaxed">
          {project.reflection}
        </p>
      </section>

      <section className="mb-24">
        <Link
          href="/projects"
          className="text-sm uppercase font-semibold text-zinc-50"
        >
          ← Back to Works
        </Link>
      </section>
    </main>
  );
}
