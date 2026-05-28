import Isolate from "@/assets/images/isolate/featured-image/isolate.png";
import Isolate1 from "@/assets/images/isolate/gallery/isolate_1.png";
import Isolate2 from "@/assets/images/isolate/gallery/isolate_2.png";
import Isolate3 from "@/assets/images/isolate/gallery/isolate_3.png";
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
  formerName?: string;
  reflection?: string;
  whatILearned?: string[];
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
    slug: "isolate",
    title: "isolate.",
    tagline: "AI audio stem separator.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Zod", "Replicate API"],
    featuredImage: Isolate.src,
    featuredImageAlt: "isolate AI audio stem separator upload screen",
    video: "/videos/isolate-demo.mp4",
    overview:
      "Every stem splitter I found as a producer had a paywall or a sign-up wall before you could do anything. So I built the version that just works. Upload any MP3, WAV, or FLAC and get vocals, drums, bass, and melody back as separate files. Powered by Meta's Demucs model via Replicate. No account, no upsell. Drag, drop, download.",
    process: [
      "Designed around one question: what is the simplest version of this that actually works? Every decision came back to that.",
      "Handled validation at two layers intentionally. Client-side for instant UX feedback, server-side with Zod as the real security boundary.",
      "Wired the Replicate API to run Demucs in the cloud so users need no GPU, no install, and no setup on their end.",
      "Built custom toast notifications for errors, an audio preview player before processing, and selective stem extraction so users only download what they need.",
      "Added memory cleanup for object URLs after noticing they leak in long-running sessions.",
    ],
    processImages: [
      {
        src: Isolate1.src,
        alt: "isolate processing screen showing audio splitting at 99% with a progress bar",
      },
      {
        src: Isolate2.src,
        alt: "isolate how it works page showing the three-step flow: upload, select stems, download",
      },
      {
        src: Isolate3.src,
        alt: "isolate stem selection screen with waveform preview and Vocals, Drums, Bass, Melody buttons",
      },
    ],
    whatILearned: [
      "TypeScript is not enough. It checks types at build time but disappears at runtime. Zod fills that gap by validating real data from real users.",
      "Client and server validation serve different purposes. Client is for UX, server is for security. You need both.",
      "Middleware is not a security boundary. Auth and validation belong inside route handlers, not in middleware that can be bypassed.",
      "Environment variables behave differently at build time versus runtime. Moving checks inside request handlers prevents build failures while still catching misconfiguration.",
      "Memory cleanup matters. Creating object URLs without revoking them leaks memory in long-running sessions.",
    ],
    link: "https://tryisolate.xyz/",
    github: "https://github.com/alex-monro/isolate.",
  },
  {
    slug: "accessibility-scanner",
    title: "Orbit",
    formerName: "formerly Access Lens",
    tagline: "Developer tool for catching accessibility issues during the build.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Axe-Core"],
    featuredImage: AccessLens.src,
    featuredImageAlt: "Orbit accessibility developer tool scan results",
    video: "/videos/access-lens-demo.mp4",
    overview:
      "Accessibility lawsuits are rising, and existing tools like Lighthouse are complex and overwhelming. We wanted something developers could open, run a scan, and immediately understand what is wrong and why. Orbit is a free Chrome extension that surfaces every issue with element location, a plain-English explanation, and how to fix it. Part of the Gravity brand, an accessibility company. V2 is currently being built from scratch with a cleaner architecture and sharper scope. Prototype live on the Chrome Web Store.",
    process: [
      "V1 shipped as Access Lens, scanning pages with Axe-Core and surfacing issues with plain-English explanations, element location, and fixes.",
      "Added a color contrast checker and a manual checklist to cover what automated scanning cannot catch.",
      "V2 is a full rebuild under the Orbit name. Cleaner codebase, React and TypeScript, scoped tightly around what developers actually need during a build.",
      "The long-term vision is a tool that lets developers test for accessibility continuously during development, not as a final audit.",
    ],
    processImages: [
      {
        src: AccessLens1.src,
        alt: "Orbit extension showing the initial scan ready state",
      },
      {
        src: AccessLens2.src,
        alt: "Orbit scan results listing accessibility issues with plain-English explanations",
      },
      { src: AccessLens3.src, alt: "Orbit color contrast checker tab" },
      { src: AccessLens4.src, alt: "Orbit extra tools panel" },
      {
        src: AccessLens5.src,
        alt: "Orbit element picker highlighting a selected element on the page",
      },
      {
        src: AccessLens6.src,
        alt: "Orbit manual accessibility checklist",
      },
    ],
    whatILearned: [
      "Automated tools like Axe-Core catch rule violations but not everything. A manual checklist and color contrast checker are needed to cover what automation misses.",
      "Plain-English output is a design problem, not just a dev problem. Writing explanations a non-accessibility expert can act on took as much thought as the scan logic itself.",
      "Chrome Extension architecture is its own world. Background scripts, content scripts, and the popup all run in separate contexts and communicate through message passing.",
      "Scoping a V2 early clarified what V1 needed to be. Knowing where the rebuild was heading made the V1 boundaries obvious.",
    ],
    link: "https://chromewebstore.google.com/detail/orbit/nflfajnljpdmndndfeeaagljhgjailco",
    github: "",
    type: "Chrome Extension",
    status: "Prototype live, V2 in progress",
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
    whatILearned: [
      "Running a real agile workflow in a group meant the process held the project together as much as the code did. A memo of understanding at the start prevented scope drift later.",
      "Building a custom WordPress theme from scratch forces you to understand how the template hierarchy actually works, not just how to configure a premade one.",
      "WooCommerce handles commerce well but the real work is information architecture. Pricing tiers, custom post types, and taxonomies need to be right before any storefront logic makes sense.",
      "A Leaflet map is as much a design problem as a technical one. Tile styling, pin design, and zoom behavior all affect whether it feels like part of the site or bolted on.",
    ],
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
    whatILearned: [
      "Reusable components only stay reusable if you design them against the data shape early. Card components built for one endpoint broke when a different endpoint returned different fields.",
      "REST APIs rarely return exactly what you need. Working across multiple TMDB endpoints meant normalizing inconsistent data before it touched the UI.",
      "React Router changes how you think about state. Deciding what lives in the URL versus component state is a real architectural choice, not just a navigation detail.",
      "Prototyping in XD before writing code meant the team had shared agreement on interactions before anyone touched a component.",
    ],
    process: [
      "Started with a high-fidelity wireframe, then prototyped the full interactions in Adobe XD.",
      "Split the work across the team by section and used React Router for navigation between views.",
      "Built reusable card components to keep the layout consistent across endpoints.",
      "Fleshed out the API integration across multiple endpoints, verified the data was fetching correctly, and deployed to live.",
    ],
    link: "https://alexmonro.com/flixi",
    github: "https://github.com/alex-monro/flixi",
  },
];
