import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectImageSlider from "@/components/ProjectImageSlider";

type Params = Promise<{ slug: string }>;

const projects = [
  {
    slug: "blackjack",
    title: "BlackJack",
    subtitle:
      "A vanilla JavaScript card game built from scratch as a personal project.",
    type: "Personal",
    tags: ["HTML", "CSS", "JavaScript"],
    overview:
      "Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks or libraries. Features interactive gameplay with realistic game logic, including hit/stand mechanics and dealer AI. The game manages complex state transitions across rounds, tracks player scores, and handles edge cases like busts and blackjacks.",
    reflection:
      "Building this helped me sharpen core JavaScript fundamentals and taught me the value of clean state transitions in interactive UI logic.",
    link: "https://alexmonro.com/",
    github: "https://github.com/alex-monro/blackjack",
    video: "/videos/blackjack-Video.mp4",
    images: [],
  },
  {
    slug: "flixi",
    title: "Flixi",
    subtitle:
      "A React-powered movie discovery platform built with the TMDB API.",
    type: "Personal",
    tags: ["React", "TMDB API", "Node.js"],
    overview:
      "A dynamic movie discovery platform where users can browse popular films, search by genre, and view detailed information including ratings, cast, and synopses. Built with React and powered by the TMDB API. Showcases REST API integration, reusable component architecture, and responsive design across all screen sizes.",
    reflection:
      "This project improved how I structure React components around async data, and reinforced the importance of balancing API richness with a fast, simple UX.",
    link: "https://alexmonro.com/flixi",
    github: "https://github.com/alex-monro/flixi",
    video: "/videos/flixi-Video.mp4",
    images: ["/photos/Flixi-desktop.png", "/photos/Flixi-mobile.png"],
  },
  {
    slug: "kai-sonoma",
    title: "Kai Sonoma",
    subtitle: "A freelance website redesign built with Next.js and TypeScript.",
    type: "Freelance",
    tags: ["Next.js", "TypeScript", "React"],
    overview:
      "A full-featured website redesign and development project delivered as a freelance engagement. Built with modern web technologies including Next.js and TypeScript for optimal performance and maintainability. Includes responsive design, SEO optimization, and intuitive user experience tailored to client specifications.",
    reflection:
      "Working directly with a client strengthened my communication and iteration process, especially around translating feedback into clear design and engineering decisions.",
    link: "#",
    github: "https://github.com/alex-monro/kai-sonoma",
    images: [
      "/images/kai-sonoma-1.png",
      "/images/kai-sonoma-2.png",
      "/images/kai-sonoma-3.png",
      "/images/kai-sonoma-4.png",
    ],
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
      <section className="py-12">
        <p className="absolute top-6 left-6 lg:top-8 lg:left-8 text-2xl lg:text-xl font-semibold italic uppercase tracking-widest">
          AM
        </p>
        <h1 className="text-6xl font-bold uppercase tracking-tight pt-12">
          {project.title}
        </h1>
        <p className="hidden lg:block text-lg text-zinc-400 mt-2">
          {project.subtitle}
        </p>
      </section>

      {/* Details card */}
      <section className="rounded-2xl p-1 md:p-6 lg:p-6 lg:bg-[#111113] mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Video */}
          <div className="lg:col-span-7">
            <div className="aspect-[16/9] bg-zinc-900 rounded-lg overflow-hidden">
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-zinc-500">
                  No preview available
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-lg text-zinc-50 leading-relaxed mb-8 lg:mb-6">
                {project.overview}
              </p>

              <h3 className="text-sm uppercase tracking-widest font-semibold text-zinc-50 mb-3">
                Tech Used
              </h3>
              <div className="flex flex-wrap gap-2 mb-8 lg:mb-6">
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

            <div className="flex items-center gap-4">
              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-50 hover:text-zinc-400 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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
                className="text-zinc-50 hover:text-zinc-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[22px] w-[22px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reflection + Image Slider */}
      <section className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Reflection */}
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight mb-4">
              Reflection
            </h2>
            <p className="text-lg leading-relaxed text-zinc-50">
              {project.reflection}
            </p>
          </div>

          {/* Image Slider */}
          <div className="lg:col-span-1 w-full ">
            <ProjectImageSlider images={project.images} title={project.title} />
          </div>
        </div>
      </section>

      {/* Back nav */}
      <section className="pt-12">
        <Link
          href="/projects"
          className="text-sm uppercase font-semibold text-zinc-200 hover:text-zinc-50"
        >
          ← Back to Works
        </Link>
      </section>
    </main>
  );
}
