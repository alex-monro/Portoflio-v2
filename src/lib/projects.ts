import Isolate from "@/assets/images/isolate/featured-image/isolate.png";
import Isolate1 from "@/assets/images/isolate/gallery/isolate_1.png";
import Isolate2 from "@/assets/images/isolate/gallery/isolate_2.png";
import Isolate3 from "@/assets/images/isolate/gallery/isolate_3.png";
import Radar1 from "@/assets/images/radar/gallery/1-landing.png";
import Radar2 from "@/assets/images/radar/gallery/2-scan-results.png";
import Radar3 from "@/assets/images/radar/gallery/3-issue-highlights.png";
import Flixi from "@/assets/images/flixi/featured-image/flixi.png";
import Orbit from "@/assets/images/access-lens/featured-image/orbit-scan.png";
import AccessLens1 from "@/assets/images/access-lens/gallery/1-new-scan.png";
import AccessLens2 from "@/assets/images/access-lens/gallery/2-scan-results.png";
import AccessLens3 from "@/assets/images/access-lens/gallery/3-scan-colors.png";
import AccessLens4 from "@/assets/images/access-lens/gallery/4-extra-tools.png";
import AccessLens5 from "@/assets/images/access-lens/gallery/5-pick-element.png";
import AccessLens6 from "@/assets/images/access-lens/gallery/6-checklist.png";
import TofinoMap from "@/assets/images/tofino-time/gallery/tofino-map.png";
import TofinoAbout from "@/assets/images/tofino-time/gallery/tofino-about.png";
import IsolateCard from "@/assets/images/isolate/featured-image/isolate-card.png";
import RadarCard from "@/assets/images/radar/featured-image/radar-card.png";
import OrbitCard from "@/assets/images/access-lens/featured-image/orbit-card.png";
import TofinoCard from "@/assets/images/tofino-time/featured-image/tofino-card.png";

export type CaseStep = {
  heading: string;
  body: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
};

export type Project = {
  slug: string;
  title: string;
  /** Right-aligned card/hero meta, e.g. "Web app · Live" */
  meta: string;
  tagline: string;
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageStyle?: "cover" | "logo";
  /** Composed home-card art. The home grid prefers this over featuredImage. */
  cardImage?: string;
  cardImageAlt?: string;
  video?: string;
  role: string;
  builtWith: string;
  link?: string;
  github?: string;
  whyIBuiltIt: string;
  howIntro: string;
  howSteps: CaseStep[];
  whatILearned: string[];
  gallery?: GalleryImage[];
  /** Per-project title hover joke. "split": letter-spacing spreads apart. */
  titleHover?: "split";
  featured?: boolean;
};

export type Faq = {
  q: string;
  a: string;
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
    "I'm Alex, a developer based in Vancouver. I took the long way here: two years of computer science at UVic, then seven years producing music.",
    "In 2025 I went back to school for BCIT's Front-End Web Developer program. Since then I've been building web projects and digging deeper into the back end.",
    "I love building things that are useful, and thinking about how to make the user experience as simple as possible. The seven years of producer habits stuck around too: I still lose whole nights to building, and I wouldn't have it any other way.",
  ],
};

export const faqs: Faq[] = [
  {
    q: "Do you still make music?",
    a: "Yes. Seven years of habits do not just leave. It is also why isolate. exists, because the tool I wanted kept asking me to sign up first.",
  },
  {
    q: "Why the switch from music to code?",
    a: "It is less of a switch than it looks. Producing is arranging small pieces until the whole thing feels right. So is building an interface.",
  },
  {
    q: "Tabs or spaces?",
    a: "Whatever Prettier decides. I save my strong opinions for accessibility.",
  },
  {
    q: "Will you fix my printer?",
    a: "No.",
  },
];

export const projects: Project[] = [
  {
    slug: "radar",
    title: "Radar",
    meta: "Web app · Live",
    tagline:
      "Scan a public page and get accessibility issues in plain English.",
    featuredImage: Radar1.src,
    featuredImageAlt:
      "Radar landing page with a single URL field and Scan button under the headline: find accessibility issues, understand them, fix them",
    cardImage: RadarCard.src,
    cardImageAlt:
      "Radar score gauge showing 90 in green beside a plain-English issue card, on a dark starfield",
    role: "Research, UX design, front end, and scan back end",
    builtWith:
      "Next.js, TypeScript, Playwright, axe-core, OpenAI API, Hyperbrowser",
    link: "https://radar.gogogravity.com/",
    github: "https://github.com/alex-monro/Radar",
    whyIBuiltIt:
      "Most accessibility tools assume you already know the terminology. Radar does not. Paste a public URL and get a score, a plain-English summary, visual highlights, and copy-ready fix prompts.",
    howIntro:
      "I spent a week researching existing accessibility tools, then designed the product around one action: paste a public URL and scan.",
    howSteps: [
      {
        heading: "The scan",
        body: "Playwright connects to a Hyperbrowser session, scrolls through lazy-loaded content, captures a full-page screenshot, and runs axe-core in the same browser session.",
      },
      {
        heading: "Scoring",
        body: "Radar uses the PageSpeed Insights accessibility score when it is available, with a severity-weighted fallback I wrote that accounts for issue impact and repeated elements.",
      },
      {
        heading: "The output",
        body: "The OpenAI API turns raw axe output into plain-English issue cards, element highlights, and copy-ready fix prompts. Zod validates every URL, Upstash Redis handles rate limiting, and browser sessions clean up immediately if a user leaves mid-scan.",
      },
    ],
    whatILearned: [
      "Remote browser sessions need explicit cleanup. If a user leaves mid-scan, the session has to stop immediately or it blocks the next scan.",
      "Full-page screenshots drift when lazy-loaded content changes the page height during capture. Scrolling first and measuring after the page settles keeps highlights aligned.",
      "A useful fallback score cannot count every passing rule equally. Severity and repeated failures need more weight without letting one repeated issue dominate the result.",
      "Automated scans have limits. Radar states plainly that a clean scan is not the same as a complete accessibility audit.",
    ],
    gallery: [
      {
        src: Radar2.src,
        alt: "Radar scan results page with a plain-English AI overview and a Radar Score gauge showing 50",
        fit: "contain",
      },
      {
        src: Radar3.src,
        alt: "Radar issue view highlighting a flagged search field on a page screenshot next to plain-English issue cards",
        fit: "contain",
      },
    ],
  },
  {
    slug: "isolate",
    title: "isolate.",
    meta: "Web app · Live",
    tagline: "Separate vocals, drums, bass, and melody from any track.",
    featuredImage: Isolate.src,
    featuredImageAlt: "isolate AI audio stem separator upload screen",
    cardImage: IsolateCard.src,
    cardImageAlt:
      "Waveform with Vocals, Drums, Bass, and Melody stem selection pills on a floating card",
    video: "/videos/isolate-demo.mp4",
    role: "Product design and full-stack development",
    builtWith: "Next.js, TypeScript, Tailwind CSS, Zod, Replicate API",
    link: "https://tryisolate.xyz/",
    github: "https://github.com/alex-monro/isolate.",
    whyIBuiltIt:
      "Every stem splitter I found as a producer had a paywall or a sign-up wall. So I built the version that just works. No account, no upsell. Drag, drop, download.",
    howIntro:
      "The whole product came from one question: what is the simplest version of this that actually works? Every decision came back to that.",
    howSteps: [
      {
        heading: "Validation",
        body: "Validation happens at two layers on purpose. Client-side for instant feedback while you drag a file in, server-side with Zod as the real security boundary.",
      },
      {
        heading: "Processing",
        body: "The Replicate API runs Meta's Demucs model in the cloud, so users need no GPU, no install, and no setup. Upload, select stems, download.",
      },
      {
        heading: "The details",
        body: "Custom toast notifications for errors, an audio preview player before processing, and selective stem extraction so users only download what they need. I also added memory cleanup for object URLs after noticing they leak in long sessions.",
      },
    ],
    whatILearned: [
      "TypeScript checks types at build time but disappears at runtime. Zod fills that gap by validating real data from real users.",
      "Client and server validation serve different purposes. Client is for UX, server is for security. You need both, and middleware is not a security boundary either. Auth and validation belong inside route handlers.",
      "Environment variables behave differently at build time versus runtime. Moving checks inside request handlers prevents build failures while still catching misconfiguration.",
      "Creating object URLs without revoking them leaks memory in long-running sessions. Cleanup matters.",
    ],
    gallery: [
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
    titleHover: "split",
  },
  {
    slug: "accessibility-scanner",
    title: "Orbit",
    meta: "Chrome extension · Live",
    tagline: "In-browser accessibility checks for developers.",
    featuredImage: Orbit.src,
    featuredImageAlt:
      "Browser window with the extension panel open over a university site, ready to run an accessibility scan",
    cardImage: OrbitCard.src,
    cardImageAlt:
      "Orbit extension panel with the Scan tab active and a Run Scan button",
    video: "/videos/access-lens-demo.mp4",
    role: "Co-development, extension architecture, and accessibility UX",
    builtWith: "React, TypeScript, Tailwind CSS, axe-core",
    link: "https://chromewebstore.google.com/detail/orbit/nflfajnljpdmndndfeeaagljhgjailco",
    whyIBuiltIt:
      "Accessibility checks usually happen too late, after the build. Orbit runs them in the browser while you work, and explains every issue in plain English with a suggested fix.",
    howIntro:
      "I co-built the first version, released as Access Lens, with a BCIT classmate. I later rebuilt it in React and TypeScript and released it as Orbit.",
    howSteps: [
      {
        heading: "The first version",
        body: "Access Lens scanned pages with axe-core and showed each issue with its location, a plain-English explanation, and a suggested fix.",
      },
      {
        heading: "Beyond automation",
        body: "A color contrast checker and a manual checklist cover what automated scanning cannot catch.",
      },
      {
        heading: "The rebuild",
        body: "I rebuilt Orbit in React and TypeScript with a tighter scope: checks developers can run while they work. The extension popup, content scripts, and background scripts run in separate contexts and connect through message passing.",
      },
    ],
    whatILearned: [
      "Automated tools like axe-core catch rule violations but not everything. A manual checklist and a contrast checker are needed to cover what automation misses.",
      "Plain-English output is a design problem, not just a dev problem. Writing explanations a non-expert can act on took as much thought as the scan logic itself.",
      "Chrome extension architecture is its own world. Background scripts, content scripts, and the popup all run in separate contexts and communicate through message passing.",
      "Scoping the rebuild early clarified what the first version needed to be. Knowing where Orbit was heading made the boundaries obvious.",
    ],
    gallery: [
      {
        src: AccessLens1.src,
        alt: "Orbit extension showing the initial scan ready state",
        fit: "contain",
      },
      {
        src: AccessLens2.src,
        alt: "Orbit scan results listing accessibility issues with plain-English explanations",
        fit: "contain",
      },
      {
        src: AccessLens3.src,
        alt: "Orbit color contrast checker tab",
        fit: "contain",
      },
      {
        src: AccessLens4.src,
        alt: "Orbit extra tools panel",
        fit: "contain",
      },
      {
        src: AccessLens5.src,
        alt: "Orbit element picker highlighting a selected element on the page",
        fit: "contain",
      },
      {
        src: AccessLens6.src,
        alt: "Orbit manual accessibility checklist",
        fit: "contain",
      },
    ],
  },
  {
    slug: "tofino-time",
    title: "Tofino Time",
    meta: "WordPress site",
    tagline: "Custom tour-booking site built with WordPress and WooCommerce.",
    featuredImage: TofinoMap.src,
    featuredImageAlt:
      "Custom Leaflet map with styled navy tiles and location pins for Tofino Time tours",
    cardImage: TofinoCard.src,
    cardImageAlt:
      "Custom Leaflet map with navy tiles, location pins, and a surf lesson workshop popup card",
    video: "/videos/tofino-time-demo.mp4",
    role: "Team project, custom theme, WooCommerce, and Leaflet map",
    builtWith: "WordPress, WooCommerce, Leaflet",
    link: "https://tofinotime.bcitwebdeveloper.ca/",
    whyIBuiltIt:
      "My capstone at BCIT, built for a Tofino tour and workshop company. Visitors browse tours, book workshops, and pay online. Custom theme from scratch, no page builders.",
    howIntro:
      "A group project run as a real agile workflow, from a memo of understanding through a content inventory, wireframes and prototyping in XD, and the build itself.",
    howSteps: [
      {
        heading: "The theme",
        body: "A custom WordPress theme built from scratch, which meant learning how the template hierarchy actually works rather than configuring a premade one.",
      },
      {
        heading: "Commerce",
        body: "WooCommerce handles tours and workshops, with pricing tiers, custom post types, and taxonomies doing the information architecture underneath.",
      },
      {
        heading: "The map",
        body: "A custom Leaflet map with styled navy tiles and hand-designed pins, put together with open-source tools. The most fun part of the build.",
      },
    ],
    whatILearned: [
      "Running a real agile workflow in a group meant the process held the project together as much as the code did. A memo of understanding at the start prevented scope drift later.",
      "Building a custom WordPress theme from scratch forces you to understand how the template hierarchy actually works, not just how to configure a premade one.",
      "WooCommerce handles commerce well, but the real work is information architecture. Pricing tiers, custom post types, and taxonomies need to be right before any storefront logic makes sense.",
      "A Leaflet map is as much a design problem as a technical one. Tile styling, pin design, and zoom behavior all decide whether it feels like part of the site or bolted on.",
    ],
    gallery: [
      {
        src: TofinoMap.src,
        alt: "Custom Leaflet map with styled navy tiles and location pins for Tofino Time tours",
      },
      {
        src: TofinoAbout.src,
        alt: "Tofino Time team page showing guide profiles with Polaroid-style photos and custom illustrated stickers",
      },
    ],
  },
  {
    slug: "flixi",
    title: "Flixi",
    meta: "Web app",
    tagline: "Movie database built with React and the TMDB API.",
    featuredImage: Flixi.src,
    featuredImageAlt:
      "Screenshot of the Flixi movie database app showing a grid of popular films with search and genre filters",
    video: "/videos/flixi-video.mp4",
    role: "Team project, API integration, and reusable React components",
    builtWith: "React, CSS, TMDB API",
    link: "https://alexmonro.com/flixi",
    github: "https://github.com/alex-monro/flixi",
    whyIBuiltIt:
      "A movie database where users browse popular films, search by genre, and read ratings. Built with React and the TMDB API as a team project at BCIT.",
    howIntro:
      "A team build covering REST API integration, reusable component architecture, and responsive design across screen sizes.",
    howSteps: [
      {
        heading: "Design first",
        body: "High-fidelity wireframes and full interaction prototypes in Adobe XD, so the team had shared agreement on interactions before anyone touched a component.",
      },
      {
        heading: "The build",
        body: "Work split across the team by section, React Router for navigation between views, and reusable card components to keep the layout consistent across endpoints.",
      },
      {
        heading: "Shipping",
        body: "API integration across multiple TMDB endpoints, data verified end to end, and deployed to live.",
      },
    ],
    whatILearned: [
      "Reusable components only stay reusable if you design them against the data shape early. Card components built for one endpoint broke when a different endpoint returned different fields.",
      "REST APIs rarely return exactly what you need. Working across multiple TMDB endpoints meant normalizing inconsistent data before it touched the UI.",
      "React Router changes how you think about state. Deciding what lives in the URL versus component state is a real architectural choice, not just a navigation detail.",
      "Prototyping in XD before writing code meant the team had shared agreement on interactions before anyone touched a component.",
    ],
    featured: false,
  },
];

export const featuredProjects = projects.filter(
  (project) => project.featured !== false,
);
