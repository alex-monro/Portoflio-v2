"use client";

import { useRef, useState } from "react";

const VideoPlayer = ({ src, label }: { src: string; label: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        loop
        aria-label={label}
        className="w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {playing ? (
          /* Pause icon */
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <rect x="1" y="0" width="4" height="14" rx="1" />
            <rect x="9" y="0" width="4" height="14" rx="1" />
          </svg>
        ) : (
          /* Play icon */
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M2 1.5l10 5.5-10 5.5V1.5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default VideoPlayer;
