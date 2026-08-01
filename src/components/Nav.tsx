"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CopyEmailButton from "@/components/CopyEmailButton";
import MobileMenuButton from "@/components/MobileMenuButton";

const links = [
  { label: "Projects", href: "/#top" },
  { label: "About me", href: "/#about" },
];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Close the menu if the viewport crosses Tailwind's md breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
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
      <header className="sticky top-0 z-50 border-b border-foreground/5 bg-background">
        <div className="site-shell relative flex h-18 items-center justify-between">
          <Link
            href="/"
            aria-label="Alex Monro, home"
            onClick={closeMenu}
            className="text-[19px] font-bold "
          >
            Alex Monro
          </Link>

          <p
            className="absolute left-1/2 hidden -translate-x-1/2 cursor-default whitespace-nowrap text-[15px] font-medium transition-[letter-spacing] duration-500 ease-out hover:tracking-[0.18em] motion-reduce:transition-none md:block"
          >
            Software Developer
          </p>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 text-[15px] font-medium md:flex"
          >
            <Link
              href="/#top"
              className="transition-colors hover:text-zinc-600"
            >
              Projects
            </Link>
            <Link
              href="/#about"
              className="transition-colors hover:text-zinc-600"
            >
              About
            </Link>
            <CopyEmailButton />
          </nav>

          <MobileMenuButton
            isOpen={menuOpen}
            onToggle={() => setMenuOpen((open) => !open)}
          />
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
        className={`fixed inset-x-0 top-18 bottom-0 z-30 block bg-black/10 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        inert={!menuOpen || undefined}
        aria-hidden={!menuOpen}
        className={`fixed inset-x-0 top-18 z-40 flex flex-col gap-4 border-y border-foreground/10 bg-background px-8 py-8 shadow-lg md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={closeMenu}
            className="w-fit py-1 text-2xl font-semibold"
          >
            {label}
          </Link>
        ))}
        <CopyEmailButton variant="menu" />
      </div>
    </>
  );
};

export default Nav;
