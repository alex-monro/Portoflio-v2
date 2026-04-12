import Blackjack from "@/assets/images/blackjack.png";
import Flixi from "@/assets/images/flixi.png";
import TofinoTime from "@/assets/images/tofinotime.png";

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

export type PersonalInfo = {
  name: string;
  email: string;
  linkedin: string;
  github: string;
  bio: string[];
};

export const personalInfo: PersonalInfo = {
  name: "Alex Monro",
  email: "alexmonro546@gmail.com",
  linkedin: "https://www.linkedin.com/in/alexwmonro/",
  github: "https://github.com/alex-monro",
  bio: [
    "I studied Computer Science at the University of Victoria before moving into music production, where I earned credits on platinum and gold records, including a Grammy-nominated project.",
    "I recently completed the British Columbia Institute of Technology's Front-End Web Developer program and have been building projects across both the front end and back end.",
    "I'm currently open to freelance and looking for opportunities where I can bring that same standard of craft to building great web experiences.",
  ],
};

export const projects: Project[] = [
  {
    slug: "flixi",
    title: "Flixi",
    tags: ["React", "Node.js"],
    thumbnail: Flixi.src,
    video: "/videos/Flixi-Video.mp4",
    overview:
      "A dynamic movie discovery platform where users can browse popular films, search by genre, and view detailed information including ratings, cast, and synopses. Built with React and powered by the TMDB API. Showcases REST API integration, reusable component architecture, and responsive design across all screen sizes.",
    reflection:
      "This project improved how I structure React components around async data, and reinforced the importance of balancing API richness with a fast, simple UX.",
    link: "https://alexmonro.com/flixi",
    github: "https://github.com/alex-monro/flixi",
    images: ["/photos/Flixi-desktop.png", "/photos/Flixi-mobile.png"],
  },
  {
    slug: "blackjack",
    title: "BlackJack",
    tags: ["HTML", "CSS", "JS"],
    thumbnail: Blackjack.src,
    video: "/videos/Blackjack-Video.mp4",
    overview:
      "Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks or libraries. Features interactive gameplay with realistic game logic, including hit/stand mechanics and dealer AI. The game manages complex state transitions across rounds, tracks player scores, and handles edge cases like busts and blackjacks.",
    reflection:
      "Building this helped me sharpen core JavaScript fundamentals and taught me the value of clean state transitions in interactive UI logic.",
    link: "https://alexmonro.com/",
    github: "https://github.com/alex-monro/blackjack",
    images: [],
  },
  {
    slug: "tofino-time",
    title: "Tofino Time",
    tags: ["WordPress", "WooCommerce"],
    thumbnail: TofinoTime.src,
    video: "",
    overview: "Coming soon.",
    reflection: "",
    link: "",
    github: "",
    images: [],
  },
];
