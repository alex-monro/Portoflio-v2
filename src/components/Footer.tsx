"use client";

import { useEffect, useState } from "react";
import { LinkedInIcon, GitHubIcon } from "@/components/Icons";
import { personalInfo } from "@/lib/projects";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeoutId = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeoutId);
  }, [copied]);

  const handleCopy = async () => {
    if (copied) return;
    await navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
  };

  return (
    <footer className="site-shell border-t border-zinc-300 py-10 md:py-12">
      <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold uppercase">
          © 2026 {personalInfo.name}
        </p>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Email copied" : "Copy email address"}
            className="rounded-full border border-zinc-950 px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-zinc-950 hover:text-white"
          >
            {copied ? "Copied ✓" : "Copy email"}
          </button>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-opacity hover:opacity-50"
          >
            <LinkedInIcon />
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-opacity hover:opacity-50"
          >
            <GitHubIcon className="h-6 w-6" />
          </a>

          <button
            type="button"
            onClick={() => {
              if (window.location.hash) {
                window.history.replaceState(null, "", "/");
              }
              window.__appLenis?.scrollTo(0, { duration: 1.2 });
            }}
            aria-label="Back to top"
            className="transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
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
