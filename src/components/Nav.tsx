"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsapConfig";

const links = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/#works" },
  { label: "About", href: "/#about" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const navMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setIsOpen(false);
    if (logoRef.current) {
      let hasPendingTarget = false;
      try { hasPendingTarget = !!sessionStorage.getItem("pendingScrollTarget"); } catch {}
      logoRef.current.style.opacity = hasPendingTarget ? "0" : "1";
    }
  }, [pathname]);

  // GSAP animation on open/close
  useEffect(() => {
    const items = navMenuRef.current?.querySelectorAll("a");
    if (!items) return;

    if (isOpen) {
      gsap.fromTo(
        items,
        { x: 32, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(items, {
        x: 24,
        opacity: 0,
        duration: 0.25,
        stagger: { each: 0.04, from: "end" },
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const header = hamburgerRef.current?.closest("header");
      if (header && !header.contains(e.target as Node)) {
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

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (logoRef.current) {
          logoRef.current.style.opacity = window.scrollY > 120 ? "0" : "1";
        }
        if (window.scrollY < 10 && window.location.hash) {
          window.history.replaceState(null, "", "/");
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);

    if (pathname !== "/") {
      const hash = href.includes("#") ? href.split("#")[1] : null;
      if (hash) {
        try { sessionStorage.setItem("pendingScrollTarget", hash); } catch {}
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
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-8 mix-blend-difference text-white">
      <div className="site-shell flex items-start justify-between pointer-events-auto">
        <Link
          ref={logoRef}
          href="/"
          onClick={(e) => handleLinkClick(e, "/")}
          className="flex h-16 items-center text-xl font-bold uppercase transition-opacity duration-300 hover:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-50 md:text-2xl"
        >
          Alex Monro
        </Link>

        <nav aria-label="Main navigation" className="flex flex-col items-end">
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="nav-menu"
            className="-mr-4 relative flex h-16 w-16 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-50"
          >
            <span className={`hamburger-line ${isOpen ? "rotate-45" : "-translate-y-2.5"}`} />
            <span className={`hamburger-line ${isOpen ? "-rotate-45" : "translate-y-2.5"}`} />
          </button>

          <ul
            ref={navMenuRef}
            id="nav-menu"
            className={`mt-6 flex flex-col items-end gap-3 text-2xl md:text-3xl font-bold uppercase tracking-wide ${
              isOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={(e) => handleLinkClick(e, href)}
                  className="inline-block opacity-0 hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-50"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
