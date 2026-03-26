export type Project = {
  slug: string;
  title: string;
  type: string;
  tags: string[];
  role: string;
};

export const projects: Project[] = [
  {
    slug: "blackjack",
    title: "BlackJack",
    type: "Personal",
    tags: ["HTML", "CSS", "JavaScript"],
    role: "Developer",
  },
  {
    slug: "flixi",
    title: "Flixi",
    type: "Personal",
    tags: ["React", "TMDB API", "Node.js"],
    role: "Design & Development",
  },
  {
    slug: "kai-sonoma",
    title: "Kai Sonoma",
    type: "Freelance",
    tags: ["Next.js", "TypeScript", "React"],
    role: "Design & Development",
  },
];
