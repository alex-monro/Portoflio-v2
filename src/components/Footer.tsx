"use client";

import { useEffect, useState } from "react";
import { LinkedInIcon, GitHubIcon } from "@/components/Icons";
import { personalInfo } from "@/lib/projects";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const handleCopy = async () => {
    if (copied) return;
    await navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
  };

  return (
    <footer className="site-shell border-t border-zinc-800 py-12">
      <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold uppercase">
          © 2026 {personalInfo.name}
        </p>

        <div className="flex items-center gap-8">
          <button
            onClick={handleCopy}
            className="rounded-md border border-zinc-800 border-l-2 border-l-zinc-500 px-8 py-3 text-base overflow-hidden"
          >
            <span className="inline-grid">
              <span
                className={`text-xl col-start-1 row-start-1 transition-all duration-100 ease-out ${copied ? "opacity-0 " : "opacity-100 "}`}
              >
                Copy Email
              </span>
              <span
                className={`text-xl col-start-1 row-start-1 transition-all duration-100 ease-out ${copied ? "opacity-100 " : "opacity-0 "}`}
              >
                Copied ✓
              </span>
            </span>
          </button>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            aria-label="LinkedIn"
            className="transition-opacity hover:opacity-50"
          >
            <LinkedInIcon />
          </a>

          <a
            href={personalInfo.github}
            aria-label="GitHub"
            className="transition-opacity hover:opacity-50"
          >
            <GitHubIcon className="h-6 w-6" />
          </a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="transition-opacity hover:opacity-50 focus-visible:outline-none"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
