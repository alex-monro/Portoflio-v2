import Isolate from "@/assets/images/isolate/featured-image/isolate.png";
import Isolate1 from "@/assets/images/isolate/gallery/isolate_1.png";
import Isolate2 from "@/assets/images/isolate/gallery/isolate_2.png";
import Isolate3 from "@/assets/images/isolate/gallery/isolate_3.png";
import Radar1 from "@/assets/images/radar/gallery/1-landing.png";
import Radar2 from "@/assets/images/radar/gallery/2-scan-results.png";
import Radar3 from "@/assets/images/radar/gallery/3-issue-highlights.png";
import Flixi from "@/assets/images/flixi/featured-image/flixi.png";
import Orbit from "@/assets/images/access-lens/featured-image/orbit-scan.png";
import OrbitReady from "@/assets/images/access-lens/gallery/orbit-ready-2026.png";
import OrbitResults from "@/assets/images/access-lens/gallery/orbit-results-2026.png";
import OrbitTools from "@/assets/images/access-lens/gallery/orbit-tools-2026.png";
import OrbitColors from "@/assets/images/access-lens/gallery/orbit-colors-2026.png";
import TofinoMap from "@/assets/images/tofino-time/gallery/tofino-map.png";
import TofinoAbout from "@/assets/images/tofino-time/gallery/tofino-about.png";
import IsolateCard from "@/assets/images/isolate/featured-image/isolate-card.png";
import RadarCard from "@/assets/images/radar/featured-image/radar-card.png";
import OrbitCard from "@/assets/images/access-lens/featured-image/orbit-card.png";
import TofinoCard from "@/assets/images/tofino-time/featured-image/tofino-card.png";
import ApolloLanding from "@/assets/images/apollo/featured-image/apollo-landing.png";
import ApolloReorder from "@/assets/images/apollo/gallery/apollo-reorder.png";

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
      "Scan a public page, understand its accessibility issues, and get an AI-ready fix prompt.",
    featuredImage: Radar1.src,
    featuredImageAlt:
      "Radar landing page with a single URL field and Scan button under the headline: find accessibility issues, understand them, fix them",
    cardImage: RadarCard.src,
    cardImageAlt:
      "Radar score gauge showing 90 in green beside a plain-English issue card, on a dark starfield",
    role: "Research, design, and full stack development",
    builtWith:
      "Next.js, TypeScript, Playwright, axe-core, Google PageSpeed Insights API, OpenAI API, Hyperbrowser, Zod, Upstash Redis",
    link: "https://radar.gogogravity.com/",
    github: "https://github.com/alex-monro/Radar",
    whyIBuiltIt:
      "Accessibility scanners often assume the user already understands the terminology. I built Radar for developers, business owners, and people building websites with AI. It runs an axe-core scan, explains the findings in plain English, shows where they appear, and creates a prompt the user can take to a developer or paste into an AI coding tool.",
    howIntro:
      "I planned Radar through the BMAD workflow, starting with research into existing accessibility tools and the people they leave behind. I designed the interface and built the scan process from the initial URL request through to the final results.",
    howSteps: [
      {
        heading: "Designing around the user",
        body: "I designed the results in layers: a quick score and overview, plain-English issue cards, visual highlights, and technical details for people who need them. On mobile, the issue cards come first and the full-page screenshot is optional because shrinking a desktop page onto a phone made it useless.",
      },
      {
        heading: "Running the scan",
        body: "Playwright connects to a remote Hyperbrowser session, loads the full page, captures a screenshot, and runs axe-core. PageSpeed Insights provides the accessibility score when it is available.",
      },
      {
        heading: "Keeping Radar free",
        body: "Radar runs on Hyperbrowser's free plan, which allows one browser session at a time. I added rate limiting to control usage, check links before they use any resources, and close unfinished sessions so the next visitor is not left waiting.",
      },
    ],
    whatILearned: [
      "Isolate was my first serious backend project, and Radar let me apply those lessons to a different problem. Instead of sending one audio file to one API, I was taking a public URL, controlling a remote browser, and bringing several services together in one scan.",
      "I learned to think through the full lifecycle of a request: what enters the route, when it becomes trusted, when work begins, and what happens when something fails. Real scans exposed problems that TypeScript, lint, and a successful build could not, including bad URLs consuming rate limits before validation.",
      "Radar also taught me that more information is not always more useful. I had to decide what a business owner needs first, what a developer may want next, and what could wait. I learned a lot, and I can see the decisions I would make earlier on my next full-stack project.",
    ],
    gallery: [
      {
        src: Radar2.src,
        alt: "Radar scan results page with a plain-English AI overview and a Radar Score gauge showing 50",
        fit: "cover",
      },
      {
        src: Radar3.src,
        alt: "Radar issue view highlighting a flagged search field on a page screenshot next to plain-English issue cards",
        fit: "cover",
      },
    ],
  },
  {
    slug: "apollo",
    title: "Apollo",
    meta: "Web app · Live demo",
    tagline:
      "Paste a messy reorder list and get back a priced, stock-checked order.",
    featuredImage: ApolloLanding.src,
    featuredImageAlt:
      "The Apollo landing page, headed \"Apollo turns a wholesale buyer's pasted list into a priced order\", with View live demo and View on GitHub buttons above a framed screenshot of the app",
    role: "Co-development, full stack",
    builtWith:
      "Next.js, TypeScript, Tailwind CSS, Zod, Claude API",
    link: "https://apollo.gogogravity.com",
    github: "https://github.com/mtq01/apollo",
    whyIBuiltIt:
      "Apollo came out of a conversation with the owner of a B2B ecommerce agency, who kept running into the same front-end problems: stock numbers that are already hours old by the time a buyer sees them, pricing and availability that change depending on the account, and buyers who never browse a catalog because they are reordering what they bought last time. I took it on because it looked like a fun way to challenge myself on something I had not built before, which was integrating real data with a model and keeping the output structured enough to actually build on.",
    howIntro:
      "Three of us built Apollo over four weeks. We rotated between three tracks each week for the first three weeks, so each of us worked across the stack. The fourth week was dedicated to bug fixes and agile enhancements. My work included the tool Claude calls to turn a pasted message into line items, and the validation that runs on whatever comes back. I also built the landing page.",
    howSteps: [
      {
        heading: "Hammering structure into the model",
        body: "I wrote the reorder tool Claude calls, a JSON schema with a description on every field. Early versions kept coming back with fields quietly missing and I could not work out why. The schema has to be specific in a way I was not being: strict set on the tool, an explicit required list at every level of nesting, and additionalProperties set to false so nothing extra creeps in. Once those were in place the shape came back identical every time, and the code downstream stopped having to guess.",
      },
      {
        heading: "Deciding what the model does not do",
        body: "Claude reads the paste and works out what is being asked for. That is the whole job. Looking up a code, applying an account's discount, deciding which fields a role is allowed to see, and choosing the sentence a buyer reads when a stock check times out are all ordinary code, because each has exactly one correct answer for a given input. Keeping that line clear is most of what makes the result trustworthy.",
      },
      {
        heading: "Checking the answer before using it",
        body: "The schema tells Claude what to send. Zod checks what actually arrived before anything downstream touches it. Anything the buyer never stated comes back as null rather than missing, so a quantity nobody wrote is a value the table can render instead of a hole that throws three layers later.",
      },
    ],
    whatILearned: [
      "The biggest thing I took away is how much structure a model needs before its output is safe to build on. Left loose, it answers a little differently every time. Pinned down with a strict schema, required fields at every level, and a description on each one, it answers the same way every time. That difference is the difference between a demo and something you can write real code against.",
      "I also learned where a model does not belong. It is tempting to hand it more of the job, but anything with one correct answer, pricing, stock rules, who is allowed to see which field, is better as plain code I can read and test. Apollo ended up with the model doing one narrow thing, and that restraint is what makes the rest of it predictable.",
      "Working in parallel tracks was new to me. My part had to hand structured data to code I did not write, which meant agreeing on the shape early and then not moving it. The schema turned out to be the contract between us as much as it was the instruction to Claude.",
    ],
    gallery: [
      {
        src: ApolloReorder.src,
        alt: "The Apollo reorder page: a paste box above a cart of five priced line items showing stock, lead time and warehouse per row, with an activity log alongside",
        fit: "cover",
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
    role: "Research, design, and full stack development",
    builtWith:
      "Next.js, TypeScript, Tailwind CSS, Zod, Replicate API, Demucs",
    link: "https://tryisolate.xyz/",
    github: "https://github.com/alex-monro/isolate.",
    whyIBuiltIt:
      "Stem separation is useful, but many of the tools I tried made a simple task feel more complicated than it needed to be. I wanted to understand how the process worked and see how smooth I could make the experience. My goal was to build the easiest stem splitter to use: upload an audio file, preview it, choose the stems you want, and download them. No account, no upsell, and no unnecessary decisions.",
    howIntro:
      "The whole product came from one question: what is the simplest version of this that actually works? Every decision came back to that.",
    howSteps: [
      {
        heading: "Keeping the flow simple",
        body: "The complete process is drag, preview, select, and download. Users choose vocals, drums, bass, or melody instead of processing files they do not need, and toast messages explain problems without interrupting the whole flow.",
      },
      {
        heading: "Separating the audio",
        body: "I tested the Demucs model through Replicate because it produced good results and was inexpensive enough to keep the product free. It runs in the cloud, so users need no special hardware, installation, or setup.",
      },
      {
        heading: "Handling real uploads",
        body: "My first version only handled the successful path. After the flow broke when I uploaded an image, I added immediate file checks in the browser, Zod validation on the server, and cleanup for the temporary object URLs used by audio previews.",
      },
    ],
    whatILearned: [
      "Building the successful path is only the beginning. File uploads also need to handle the wrong format, missing files, failed processing, and someone changing their mind halfway through.",
      "Client-side and server-side checks solve different problems. The browser helps someone correct a mistake immediately, while the server decides what the application will actually accept.",
      "Audio previews taught me how the browser handles blobs and temporary object URLs. Creating one is easy, but it also needs to be cleaned up when the user replaces a file or leaves.",
      "Simplicity takes deliberate work. Every additional choice, message, and screen had to justify being there. The clean final flow came from removing things, not adding them.",
      "A smooth interface cannot completely hide a slow core process. A musician friend immediately understood the product and said he would use it, but the processing time was the first problem he noticed. The next step is testing faster models without sacrificing the quality of the separated audio.",
      "Isolate was my first serious full-stack project. It gave me the foundation for Radar, especially around validation, external APIs, unsuccessful requests, and thinking beyond the first working version.",
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
    tagline: "Fast, in-browser accessibility checks for developers.",
    featuredImage: Orbit.src,
    featuredImageAlt:
      "Browser window with the extension panel open over a university site, ready to run an accessibility scan",
    cardImage: OrbitCard.src,
    cardImageAlt:
      "Orbit extension panel with the Scan tab active and a Run Scan button",
    role:
      "Product and UX design, scan-results interface, extension architecture, and co-development",
    builtWith:
      "React, TypeScript, Tailwind CSS, axe-core, Chrome Extension APIs, Figma",
    link: "https://chromewebstore.google.com/detail/orbit/nflfajnljpdmndndfeeaagljhgjailco",
    whyIBuiltIt:
      "A colleague had an idea for an accessibility tool, and I suggested turning it into a Chrome extension. We wanted something we would actually use while building or reviewing a website: open the side panel, scan the current page, click an issue to see the affected element, then move to the next page and scan again. Orbit gives developers the useful parts quickly without dropping them into a wall of Lighthouse output.",
    howIntro:
      "We quickly built a working prototype called Access Lens. It proved the idea had potential, but the code became difficult to maintain as the product grew. Another colleague joined the project, and the three of us rebuilt it from the ground up as Orbit with a clearer structure and a codebase we could confidently maintain.",
    howSteps: [
      {
        heading: "Designing the workflow",
        body: "I helped design the interface in Figma and built the initial scan state, no-issues state, and scan-results interface. The goal was to make the process obvious: run a scan, read the issues in plain English, and click one to see the affected element highlighted on the website.",
      },
      {
        heading: "Building the extension",
        body: "Orbit runs axe-core against the active page and sends the findings back to the side panel. I checked the current Chrome documentation and found that the side panel could communicate directly with the content script instead of routing every scan interaction through the background service worker.",
      },
      {
        heading: "Connecting Orbit to the page",
        body: "I built the interaction between the issue cards and the active website. Clicking an issue highlights the affected element on the page. I also added cleanup so those highlights disappear when Orbit closes or the user starts another scan.",
      },
    ],
    whatILearned: [
      "A working prototype can prove an idea without becoming the foundation for the final product. Starting again gave us the chance to understand the architecture, divide responsibilities clearly, and build a codebase we could maintain.",
      "Chrome extensions have several separate environments. The side panel, content script, and background service worker each have different jobs. Understanding which parts actually needed to communicate made the architecture much simpler.",
      "Current documentation matters. The first architecture used an older method that routed every scan interaction through the background service worker. After checking the current Chrome documentation, I simplified the flow so the side panel could communicate directly with the content script.",
      "An extension needs to be tested inside the real browser surface. The interface looked different in the development server than it did inside Chrome's side panel, so I had to design and test it where people would actually use it.",
      "If an extension changes the active webpage, it also needs to undo those changes. The highlight feature was not finished until closing Orbit reliably removed everything it added.",
      "Automated accessibility tools have limits. Orbit can find common rule violations and point developers toward fixes, but it is not a complete audit and cannot guarantee compliance. Manual testing and human judgment still matter.",
      "This was my first time rebuilding a working idea as part of a team. Starting over was frustrating, but the released version is something we can explain, maintain, and genuinely use.",
    ],
    gallery: [
      {
        src: OrbitReady.src,
        alt: "Orbit open beside a webpage and ready to run an accessibility scan",
        fit: "cover",
      },
      {
        src: OrbitResults.src,
        alt: "Orbit showing accessibility scan results beside the highlighted webpage",
        fit: "cover",
      },
      {
        src: OrbitTools.src,
        alt: "Orbit showing its keyboard tab order and high contrast testing tools beside a webpage",
        fit: "cover",
      },
      {
        src: OrbitColors.src,
        alt: "Orbit color contrast checker showing WCAG pass and fail results beside a webpage",
        fit: "cover",
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
