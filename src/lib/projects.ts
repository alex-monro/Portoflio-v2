import Blackjack from "@/assets/images/blackjack.png";
import Flixi from "@/assets/images/flixi.png";
import { getWPProjects, getWPProject } from "./wordpress";

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  thumbnail: string;
  video: string;
  overview: string;
  reflection: string;
  link: string;
  github: string;
  images: string[];
};

const fallbackProjects: Project[] = [
  {
    slug: "blackjack",
    title: "BlackJack",
    tags: ["HTML", "CSS", "JS"],
    thumbnail: Blackjack.src,
    video: "/videos/blackjack-Video.mp4",
    overview:
      "Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks or libraries. Features interactive gameplay with realistic game logic, including hit/stand mechanics and dealer AI. The game manages complex state transitions across rounds, tracks player scores, and handles edge cases like busts and blackjacks.",
    reflection:
      "Building this helped me sharpen core JavaScript fundamentals and taught me the value of clean state transitions in interactive UI logic.",
    link: "https://alexmonro.com/",
    github: "https://github.com/alex-monro/blackjack",
    images: [],
  },
  {
    slug: "flixi",
    title: "Flixi",
    tags: ["React", "Node.js"],
    thumbnail: Flixi.src,
    video: "/videos/flixi-Video.mp4",
    overview:
      "A dynamic movie discovery platform where users can browse popular films, search by genre, and view detailed information including ratings, cast, and synopses. Built with React and powered by the TMDB API. Showcases REST API integration, reusable component architecture, and responsive design across all screen sizes.",
    reflection:
      "This project improved how I structure React components around async data, and reinforced the importance of balancing API richness with a fast, simple UX.",
    link: "https://alexmonro.com/flixi",
    github: "https://github.com/alex-monro/flixi",
    images: ["/photos/Flixi-desktop.png", "/photos/Flixi-mobile.png"],
  },
];

export async function getProjects(): Promise<Project[]> {
  if (process.env.WORDPRESS_URL) return getWPProjects();
  return fallbackProjects;
}

export async function getProject(slug: string): Promise<Project | null> {
  if (process.env.WORDPRESS_URL) return getWPProject(slug);
  return fallbackProjects.find((p) => p.slug === slug) ?? null;
}
