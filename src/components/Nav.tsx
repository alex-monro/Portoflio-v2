"use client";

import React, { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 flex items-center justify-center"
      >
        <span
          className={`absolute bg-zinc-50 block h-0.5 w-6 rounded-sm transition-transform duration-500 ease-in-out ${
            isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
          }`}
        />
        <span
          className={`absolute bg-zinc-50 block h-0.5 w-6 rounded-sm transition-transform duration-500 ease-in-out ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
          }`}
        />
      </button>
      {isOpen && (
        <ul className="flex flex-col gap-1 mt-4 items-end font-bold text-xl uppercase tracking-wide 0">
          <li>
            <a
              className=" hover:text-3xl transition-all duration-700"
              href="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className=" hover:text-3xl transition-all duration-700"
              href="#works"
              onClick={() => setIsOpen(false)}
            >
              Works
            </a>
          </li>
          <li>
            <a
              className=" hover:text-3xl transition-all duration-700"
              href="#about"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
