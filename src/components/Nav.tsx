"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapConfig";

const links = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/#works" },
  { label: "About", href: "/#about" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const logoRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    gsap.to(logoRef.current, {
      autoAlpha: 0,
      scrollTrigger: {
        start: "top top",
        end: "120px top",
      },
    });
  });

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      setIsOpen(false);

      const hash = href.includes("#") ? href.split("#")[1] : null;
      const target = hash ? document.getElementById(hash) : null;

      target
        ? target.scrollIntoView({ behavior: "smooth" })
        : window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-8">
      <div className="site-shell flex items-start justify-between pointer-events-auto">
        <Link
          ref={logoRef}
          href="/"
          onClick={(e) => handleLinkClick(e, "/")}
          className="flex h-16 items-center text-xl font-bold uppercase transition-opacity hover:opacity-30 md:text-2xl"
        >
          Alex Monro
        </Link>

        <nav aria-label="Main navigation" className="flex flex-col items-end">
          <button
            onClick={() => setIsOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="-mr-4 flex h-16 w-16 items-center justify-center"
          >
            <span
              className={`hamburger-line ${isOpen ? "rotate-45" : "-translate-y-2.5"}`}
            />
            <span
              className={`hamburger-line ${isOpen ? "-rotate-45" : "translate-y-2.5"}`}
            />
          </button>

          <ul
            aria-hidden={!isOpen}
            className={`mt-6 flex flex-col items-end gap-3 text-2xl md:text-3xl font-bold uppercase tracking-wide ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            {links.map(({ label, href }, i) => (
              <li key={href}>
                <Link
                  href={href}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={(e) => handleLinkClick(e, href)}
                  className={`inline-block transition-all ease-out hover:opacity-50 ${
                    isOpen
                      ? `opacity-100 translate-x-0 duration-500 ${i === 0 ? "delay-0" : "delay-75"}`
                      : "opacity-0 translate-x-6 duration-300"
                  }`}
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
