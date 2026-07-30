"use client";

import { useEffect, useState } from "react";

// Full-screen intro loader. Shows once per browser session (sessionStorage
// gate), holds for ~1.3s, fades over 0.45s, unmounts at 1.8s. Never replays
// on client-side navigation.
const IntroLoader = () => {
  const [visible, setVisible] = useState(false);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    let seen = true;
    try {
      seen = Boolean(sessionStorage.getItem("am-intro-seen"));
    } catch {}
    if (seen) return;

    const showId = setTimeout(() => setVisible(true), 0);
    const fadeId = setTimeout(() => setFaded(true), 1300);
    const unmountId = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("am-intro-seen", "1");
      } catch {}
    }, 1800);

    return () => {
      clearTimeout(showId);
      clearTimeout(fadeId);
      clearTimeout(unmountId);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#f2f2f0]"
      style={{ transition: "opacity 0.45s ease", opacity: faded ? 0 : 1 }}
    >
      <div className="intro-loader-dot" />
    </div>
  );
};

export default IntroLoader;
