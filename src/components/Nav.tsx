"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsapConfig";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#works" },
  { label: "About", href: "/#about" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const items = navMenuRef.current?.querySelectorAll("a");
    if (!items) return;

    if (isOpen) {
      gsap.fromTo(
        items,
        { x: 18, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(items, {
        x: 14,
        opacity: 0,
        duration: 0.2,
        stagger: { each: 0.03, from: "end" },
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const header = menuButtonRef.current?.closest("header");
      if (header && !header.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    setIsOpen(false);

    if (pathname !== "/") {
      const hash = href.includes("#") ? href.split("#")[1] : null;
      if (hash) {
        try {
          sessionStorage.setItem("pendingScrollTarget", hash);
        } catch {}
      }
      router.push("/");
      return;
    }

    const hash = href.includes("#") ? href.split("#")[1] : null;
    const target = hash ? document.getElementById(hash) : null;
    const lenis = window.__appLenis;

    if (target) {
      lenis?.scrollTo(target, { duration: 1.2 });
    } else {
      window.history.replaceState(null, "", "/");
      lenis?.scrollTo(0, { duration: 1.2 });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#f2f2f0]/95 text-zinc-950 backdrop-blur-sm">
      <div className="site-shell relative flex h-24 items-center justify-between">
        <Link
          href="/"
          onClick={(event) => handleLinkClick(event, "/")}
          aria-label="Alex Monro, home"
          className="text-lg font-bold uppercase tracking-tighter transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 md:text-xl"
        >
          Alex Monro
        </Link>

        <p className="absolute left-1/2 hidden -translate-x-1/2 text-sm font-medium lg:block">
          Software Developer
        </p>

        <div className="flex items-center gap-2">
          <a
            href="mailto:alexmonro546@gmail.com"
            className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 md:px-5 md:text-sm"
          >
            Email me
          </a>

          <nav aria-label="Main navigation" className="relative">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="nav-menu"
              className="flex items-center gap-3 rounded-full border border-zinc-950 px-4 py-2 text-xs font-semibold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 md:px-5 md:text-sm"
            >
              {isOpen ? "Close" : "Menu"}
              <span className="relative h-3 w-4" aria-hidden="true">
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${
                    isOpen ? "top-1.5 rotate-45" : "top-1"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${
                    isOpen ? "top-1.5 -rotate-45" : "top-2"
                  }`}
                />
              </span>
            </button>

            <ul
              ref={navMenuRef}
              id="nav-menu"
              className={`absolute right-0 top-full mt-3 flex min-w-44 flex-col items-end gap-3 rounded-lg border border-zinc-300 bg-[#f2f2f0] p-5 text-xl font-semibold uppercase tracking-wide shadow-sm ${
                isOpen
                  ? "visible pointer-events-auto"
                  : "invisible pointer-events-none"
              }`}
            >
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    tabIndex={isOpen ? 0 : -1}
                    onClick={(event) => handleLinkClick(event, href)}
                    className="inline-block opacity-0 transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Nav;
