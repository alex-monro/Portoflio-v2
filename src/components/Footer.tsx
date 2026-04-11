"use client";

import { useEffect, useState } from "react";
import { LinkedInIcon, GitHubIcon } from "@/components/Icons";
import { EMAIL } from "@/lib/constants";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const handleCopy = async () => {
    if (copied) return;
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
  };

  return (
    <footer className="site-shell border-t border-zinc-800 py-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold uppercase tracking-widest">
          © 2026 Alex Monro
        </p>

        <div className="flex items-center gap-8">
          <button
            onClick={handleCopy}
            aria-label="Copy email address"
            className="rounded-md border border-zinc-800 border-l-2 border-l-zinc-500 px-6 py-3 text-base overflow-hidden"
          >
            <span className="inline-grid">
              <span
                className={`col-start-1 row-start-1 transition-all duration-300 ease-out ${copied ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}`}
              >
                Copy Email
              </span>
              <span
                className={`col-start-1 row-start-1 transition-all duration-300 ease-out ${copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
              >
                Copied ✓
              </span>
            </span>
          </button>

          <a
            href="https://www.linkedin.com/in/alexmonro/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="link-fade"
          >
            <LinkedInIcon />
          </a>

          <a
            href="https://github.com/alex-monro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="link-fade"
          >
            <GitHubIcon className="h-6 w-6" />
          </a>

          <button
            onClick={() =>
              window.__appLenis?.scrollTo(0, { duration: 1.4 }) ??
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="link-fade focus-visible:outline-none"
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
