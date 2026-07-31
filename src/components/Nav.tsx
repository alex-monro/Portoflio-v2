"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { personalInfo } from "@/lib/projects";

const EnvelopeIcon = () => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 24 24"
    width="16"
    height="16"
  >
    <path d="M12 12.713L.015 3h23.97L12 12.713zM12 15.287L0 5.562V21h24V5.562l-12 9.725z" />
  </svg>
);

const links = [
  { label: "Projects", href: "/#top" },
  { label: "About me", href: "/#about" },
  { label: "Resume", href: "/alex-monro-resume.pdf", newTab: true },
];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied" | "error"
  >("idle");
  const closeMenu = () => setMenuOpen(false);
  const copyLabel =
    copyStatus === "copied"
      ? "Copied!"
      : copyStatus === "error"
        ? "Try again"
        : "Copy email";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  // Close the menu if the viewport crosses the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const onChange = () => setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock page scroll while the overlay is open, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (copyStatus === "idle") return;
    const resetId = window.setTimeout(() => setCopyStatus("idle"), 2000);
    return () => window.clearTimeout(resetId);
  }, [copyStatus]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-[rgba(9,9,11,0.06)] bg-[rgba(242,242,240,0.92)] backdrop-blur-[8px]">
      <div className="site-shell relative flex h-[72px] items-center justify-between">
        <Link
          href="/"
          aria-label="Alex Monro, home"
          onClick={closeMenu}
          className="text-[19px] font-bold tracking-[-0.01em]"
        >
          Alex Monro
        </Link>

        <p className="dev-title absolute left-1/2 m-0 -translate-x-1/2 text-[15px] font-medium max-[720px]:hidden">
          Software Developer
        </p>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-7 text-[15px] font-medium max-[720px]:hidden"
        >
          <Link href="/#top" className="transition-colors hover:text-[#52525b]">
            Projects
          </Link>
          <Link href="/#about" className="transition-colors hover:text-[#52525b]">
            About
          </Link>
          <Link
            href="/alex-monro-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#52525b]"
          >
            Resume
          </Link>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="email-pill"
          >
            <span>{copyLabel}</span>
            <EnvelopeIcon />
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="menu-btn hidden max-[720px]:flex"
        >
          <span className="menu-btn-icon">
            <svg viewBox="0 0 175 80" width="30" height="14" aria-hidden="true">
              <rect width="80" height="15" fill="#f0f0f0" rx="10" />
              <rect y="30" width="80" height="15" fill="#f0f0f0" rx="10" />
              <rect y="60" width="80" height="15" fill="#f0f0f0" rx="10" />
            </svg>
          </span>
          <span className="menu-btn-label">{menuOpen ? "CLOSE" : "MENU"}</span>
        </button>
      </div>
    </header>

    {/* Mobile overlay menu — sibling of the header: backdrop-filter on the
        header would otherwise become the containing block for this fixed
        element and collapse it. */}
      <button
        type="button"
        aria-label="Close menu"
        disabled={!menuOpen}
        onClick={closeMenu}
        className={`fixed inset-x-0 top-[72px] bottom-0 z-30 hidden bg-black/10 max-[720px]:block ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        inert={!menuOpen || undefined}
        aria-hidden={!menuOpen}
        className={`fixed inset-x-0 top-[72px] z-40 hidden flex-col gap-4 border-y border-[rgba(9,9,11,0.08)] bg-[#f2f2f0] px-8 py-8 shadow-[0_14px_30px_rgba(9,9,11,0.08)] max-[720px]:flex ${
          menuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {links.map(({ label, href, newTab }) => (
          <Link
            key={href}
            href={href}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noopener noreferrer" : undefined}
            onClick={closeMenu}
            className="w-fit py-1 text-[26px] font-semibold tracking-[-0.02em]"
          >
            {label}
          </Link>
        ))}
        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy email address"
          className="mt-1 w-fit cursor-pointer bg-transparent py-1 text-[26px] font-semibold tracking-[-0.02em]"
        >
          <span>{copyLabel}</span>
        </button>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {copyStatus === "copied"
          ? "Email address copied to clipboard."
          : copyStatus === "error"
            ? "Email address could not be copied."
            : ""}
      </p>
    </>
  );
};

export default Nav;
