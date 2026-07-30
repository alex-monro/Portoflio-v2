"use client";

import { useEffect, useRef, useState } from "react";

// Types out its text the first time it scrolls into view, with a blinking
// caret that fades once finished. Renders the full text for SSR/no-JS and
// under prefers-reduced-motion. Screen readers always get the full text via
// aria-label; the animated characters are hidden from them.
const TypewriterHeading = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [typed, setTyped] = useState(text);
  const [caretVisible, setCaretVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const timers = timersRef.current;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((entry) => entry.isIntersecting)) return;
        started = true;
        observer.disconnect();

        setTyped("");
        setCaretVisible(true);

        for (let i = 1; i <= text.length; i++) {
          timers.push(
            setTimeout(() => setTyped(text.slice(0, i)), 90 + i * 70),
          );
        }
        timers.push(
          setTimeout(
            () => setCaretVisible(false),
            90 + text.length * 70 + 4500,
          ),
        );
      },
      { threshold: 0.5 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      timers.length = 0;
    };
  }, [text]);

  return (
    <h2 ref={ref} aria-label={text} className={className}>
      <span aria-hidden="true">{typed || " "}</span>
      {caretVisible && <span aria-hidden="true" className="type-caret" />}
    </h2>
  );
};

export default TypewriterHeading;
