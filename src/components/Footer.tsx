"use client";

import { LinkedInIcon, GitHubIcon } from "@/components/Icons";
import { personalInfo } from "@/lib/projects";

const Footer = () => {
  const toTop = () => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="hairline">
      <div className="site-shell flex flex-wrap-reverse items-center justify-between gap-8 py-11">
        <p className="m-0 text-[14px] font-medium">
          © 2026 {personalInfo.name}
        </p>

        <div className="flex items-center gap-6">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex transition-opacity hover:opacity-50"
          >
            <LinkedInIcon />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex transition-opacity hover:opacity-50"
          >
            <GitHubIcon className="h-6 w-6" />
          </a>

          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="flex cursor-pointer border-none bg-transparent p-0 text-[#09090b] transition-opacity hover:opacity-50"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
