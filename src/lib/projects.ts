import Blackjack from "@/assets/images/blackjack/featured-image/blackjack.png";
import Flixi from "@/assets/images/flixi/featured-image/flixi.png";
import AccessLens from "@/assets/images/access-lens/featured-image/access-lens.png";
import AccessLens1 from "@/assets/images/access-lens/gallery/1-new-scan.png";
import AccessLens2 from "@/assets/images/access-lens/gallery/2-scan-results.png";
import AccessLens3 from "@/assets/images/access-lens/gallery/3-scan-colors.png";
import AccessLens4 from "@/assets/images/access-lens/gallery/4-extra-tools.png";
import AccessLens5 from "@/assets/images/access-lens/gallery/5-pick-element.png";
import AccessLens6 from "@/assets/images/access-lens/gallery/6-checklist.png";
import TofinoTime from "@/assets/images/tofino-time/featured-image/tofinotime.png";
import TofinoMap from "@/assets/images/tofino-time/gallery/tofino-map.png";
import TofinoAbout from "@/assets/images/tofino-time/gallery/tofino-about.png";

export type Project = {
  slug: string;
  title: string;
  tagline?: string;
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  video: string;
  overview: string;
  process?: string[];
  processImages?: { src: string; alt: string }[];
  reflection: string;
  link: string;
  github: string;
  status?: string;
  type?: string;
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
    "I recently completed the British Columbia Institute of Technology's Front-End Web Developer program and have been building projects across both the front and back end.",
    "I'm currently looking for opportunities where I can bring that same standard of craft to building great web experiences.",
  ],
};

export const projects: Project[] = [
  {
    slug: "accessibility-scanner",
    title: "Access Lens",
    tagline: "Chrome extension that scans any page for accessibility issues.",
    tags: ["React", "Axe-Core", "Chrome Extension"],
    featuredImage: AccessLens.src,
    featuredImageAlt: "Access Lens logo",
    video: "/videos/access-lens-demo.mp4",
    overview:
      "Accessibility lawsuits are rising, and existing tools like Lighthouse are complex and overwhelming. We wanted something developers could open, run a scan, and immediately understand what is wrong and why. Access Lens is a free Chrome extension that surfaces every issue with element location, a plain-English explanation, and how to fix it. V2 is a full SaaS product using Vision AI.",
    process: [
      "Built V1 around Axe-Core with a focus on plain-English output. Every issue includes what it is, where it is, why it matters, and how to fix it.",
      "Added a color contrast checker and a manual checklist to cover what automated scanning misses.",
      "Scoped V2 as a full SaaS product with Vision AI, targeting the issues automated scanning cannot catch. Launching with a landing page for the Chrome extension.",
    ],
    processImages: [
      {
        src: AccessLens1.src,
        alt: "Access Lens extension showing the initial scan ready state",
      },
      {
        src: AccessLens2.src,
        alt: "Access Lens scan results listing accessibility issues with plain-English explanations",
      },
      { src: AccessLens3.src, alt: "Access Lens color contrast checker tab" },
      { src: AccessLens4.src, alt: "Access Lens extra tools panel" },
      {
        src: AccessLens5.src,
        alt: "Access Lens element picker highlighting a selected element on the page",
      },
      {
        src: AccessLens6.src,
        alt: "Access Lens manual accessibility checklist",
      },
    ],
    reflection:
      "V1 was a lot of fun to build. There is a real gap in the market for this and we are excited to scale it. Built with Mike.",
    link: "",
    github: "",
    type: "Chrome Extension",
    status: "V1 releasing May 2026",
  },
  {
    slug: "tofino-time",
    title: "Tofino Time",
    tagline: "WordPress and WooCommerce site.",
    tags: ["WordPress", "WooCommerce"],
    featuredImage: TofinoTime.src,
    featuredImageAlt:
      "Screenshot of the Tofino Time tour and workshop website homepage with hero imagery and featured tours",
    video: "/videos/tofino-time-demo.mp4",
    overview:
      "A WordPress and WooCommerce site for a Tofino tour and workshop company. Visitors can browse tours and book workshops. Built with a custom theme as my capstone at BCIT's front-end development program.",
    process: [
      "Ran the full agile workflow in a group setting, starting with a memo of understanding and a project management and communication plan.",
      "Ran a content inventory and completed wireframes and prototyping in XD.",
      "Built a custom WordPress theme from scratch.",
      "Set up WooCommerce for tours and workshops, including pricing tiers, custom post types, and taxonomies.",
      "Designed and integrated a custom Leaflet map. Used open-source tools to style it and design the pins. That was the most fun part of the build.",
    ],
    processImages: [
      {
        src: TofinoMap.src,
        alt: "Custom Leaflet map with styled navy tiles and location pins for Tofino Time tours",
      },
      {
        src: TofinoAbout.src,
        alt: "Tofino Time team page showing guide profiles with Polaroid-style photos and custom illustrated stickers",
      },
    ],
    reflection:
      "Good experience working hybrid and running a full agile workflow start to finish. Dividing work across a team, keeping things in sync, and seeing how that process can help a project hold together.",
    link: "https://tofinotime.bcitwebdeveloper.ca/",
    github: "",
  },
  {
    slug: "flixi",
    title: "Flixi",
    tagline: "Movie database built with React and the TMDB API.",
    tags: ["React", "CSS", "TMDB API"],
    featuredImage: Flixi.src,
    featuredImageAlt:
      "Screenshot of the Flixi movie database app showing a grid of popular films with search and genre filters",
    video: "/videos/flixi-video.mp4",
    overview:
      "A movie database where users browse popular films, search by genre, and read ratings. Built with React and the TMDB API. Covers REST API integration, reusable component architecture, and responsive design across screen sizes.",
    reflection:
      "This was one of my first React-based projects. It was a good introduction to API integration, working with async data, and building reusable components from scratch.",
    process: [
      "Started with a high-fidelity wireframe, then prototyped the full interactions in Adobe XD.",
      "Split the work across the team by section and used React Router for navigation between views.",
      "Built reusable card components to keep the layout consistent across endpoints.",
      "Fleshed out the API integration across multiple endpoints, verified the data was fetching correctly, and deployed to live.",
    ],
    link: "https://alexmonro.com/flixi",
    github: "https://github.com/alex-monro/flixi",
  },
  {
    slug: "blackjack",
    title: "BlackJack",
    tagline: "JavaScript card game.",
    tags: ["HTML", "CSS", "JS"],
    featuredImage: Blackjack.src,
    featuredImageAlt:
      "Screenshot of a browser-based Blackjack card game showing the game table with player and dealer hands in play",
    video: "/videos/blackjack-video.mp4",
    overview:
      "Built entirely with vanilla HTML, CSS, and JavaScript, no frameworks or libraries. Features interactive gameplay with realistic game logic, including hit/stand mechanics and dealer AI. The game manages complex state transitions across rounds, tracks player scores, and handles edge cases like busts and blackjacks.",
    reflection:
      "It was fun figuring out what you could do with just vanilla JavaScript, manipulating the DOM directly and toggling CSS classes to drive transitions.",
    link: "",
    github: "https://github.com/alex-monro/blackjack",
  },
];
