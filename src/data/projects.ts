export type Project = {
  slug: string;
  title: string;
  type: string;
  year: string;
  tags: string[];
  role: string;
};

export const projects: Project[] = [
  {
    slug: "blackjack",
    title: "BlackJack",
    type: "Personal",
    year: "2025",
    tags: ["HTML", "CSS", "JavaScript"],
    role: "Developer",
  },
  {
    slug: "flixi",
    title: "Flixi",
    type: "Personal",
    year: "2025",
    tags: ["React", "TMDB API", "Node.js"],
    role: "Design & Development",
  },
  {
    slug: "kai-sonoma",
    title: "Kai Sonoma",
    type: "Freelance",
    year: "2026",
    tags: ["Next.js", "TypeScript", "React"],
    role: "Design & Development",
  },
];
