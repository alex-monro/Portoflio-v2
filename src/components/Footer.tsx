"use client";

import React, { useState } from "react";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("alexmonro546@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="px-6 lg:px-8 pt-48 pb-12">
      <p className="text-2xl font-bold text-zinc-50 mb-8">Email</p>
      <div className="flex items-center gap-4 mb-8">
        <p className="text-2xl lg:text-4xl font-bold text-zinc-50">
          Alexmonro546@gmail.com
        </p>
      </div>

      <div className="flex items-center gap-6 mb-32">
        <a
          href="https://www.linkedin.com/in/alex-monro-8b67813b6"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2lg font-semibold tracking-wide text-zinc-50"
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/alex-monro"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold tracking-wide text-zinc-50"
        >
          GitHub
        </a>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm uppercase  font-semibold tracking-widest text-zinc-50">
          © Copyright 2026 Alex Monro
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl text-zinc-50 w-8 h-8 flex items-center justify-center"
        >
          ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;
