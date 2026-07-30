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
  { label: "Projects", href: "/#works" },
  { label: "About me", href: "/#about" },
];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

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
          <Link href="/#works" className="transition-colors hover:text-[#52525b]">
            Projects
          </Link>
          <Link href="/#about" className="transition-colors hover:text-[#52525b]">
            About
          </Link>
          <a href={`mailto:${personalInfo.email}`} className="email-pill">
            <span>Email me</span>
            <EnvelopeIcon />
          </a>
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
      <div
        inert={!menuOpen || undefined}
        aria-hidden={!menuOpen}
        className={`fixed inset-x-0 top-[72px] bottom-0 z-40 hidden flex-col gap-7 border-t border-[rgba(9,9,11,0.06)] bg-[#f2f2f0] px-8 pt-12 max-[720px]:flex ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1)" }}
      >
        {links.map(({ label, href }, i) => (
          <Link
            key={href}
            href={href}
            onClick={closeMenu}
            className="w-fit text-[34px] font-semibold tracking-[-0.02em]"
            style={{
              transition:
                "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s cubic-bezier(0.22,1,0.36,1)",
              transitionDelay: menuOpen ? `${0.08 + i * 0.07}s` : "0s",
              transform: menuOpen ? "translateY(0)" : "translateY(24px)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {label}
          </Link>
        ))}
        <a
          href={`mailto:${personalInfo.email}`}
          onClick={closeMenu}
          className="email-pill mt-2 w-fit"
          style={{
            transition:
              "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: menuOpen ? `${0.08 + links.length * 0.07}s` : "0s",
            transform: menuOpen ? "translateY(0)" : "translateY(24px)",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <span>Email me</span>
          <EnvelopeIcon />
        </a>
      </div>
    </>
  );
};

export default Nav;
