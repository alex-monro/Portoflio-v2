"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/lib/projects";

type CopyStatus = "idle" | "copied" | "error";
type CopyEmailButtonVariant = "pill" | "menu";

type CopyEmailButtonProps = {
  variant?: CopyEmailButtonVariant;
};

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

const variantClasses: Record<CopyEmailButtonVariant, string> = {
  pill: "copy-email-pill",
  menu: "mt-1 w-fit cursor-pointer bg-transparent py-1 text-2xl font-semibold",
};

const CopyEmailButton = ({ variant = "pill" }: CopyEmailButtonProps) => {
  const [status, setStatus] = useState<CopyStatus>("idle");

  const label =
    status === "copied"
      ? "Copied!"
      : status === "error"
        ? "Try again"
        : "Copy email";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "idle") return;

    const resetId = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(resetId);
  }, [status]);

  return (
    <>
      <button
        type="button"
        onClick={copyEmail}
        aria-label="Copy email address"
        className={variantClasses[variant]}
      >
        <span>{label}</span>
        {variant === "pill" && <EnvelopeIcon />}
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {status === "copied"
          ? "Email address copied to clipboard."
          : status === "error"
            ? "Email address could not be copied."
            : ""}
      </p>

      <style jsx global>{`
        .copy-email-pill {
          display: inline-flex;
          flex: 0 0 9rem;
          align-items: center;
          justify-content: center;
          width: 9rem;
          min-width: 9rem;
          max-width: 9rem;
          gap: 0.5625rem;
          padding: 0.625rem 1.25rem;
          border: 0;
          border-radius: 9999px;
          background: var(--color-foreground);
          color: #fff;
          font-family: inherit;
          font-size: 0.9375rem;
          font-weight: 700;
          cursor: pointer;
          transition:
            color 0.5s ease,
            transform 0.5s ease;
        }

        .copy-email-pill:hover {
          color: #fff;
          transform: scale(1.08);
        }

        .copy-email-pill:active {
          transform: scale(1);
        }

        .copy-email-pill svg {
          transition:
            fill 1s ease,
            filter 1s ease,
            transform 1s ease;
        }

        .copy-email-pill:hover svg {
          fill: #ffd000;
          filter: drop-shadow(0 0 0.3125rem #ffd000cc)
            drop-shadow(0 0 0.625rem #ffd00099);
          transform: rotate(360deg) scale(1.1);
        }

        @media (prefers-reduced-motion: reduce) {
          .copy-email-pill,
          .copy-email-pill svg {
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

export default CopyEmailButton;
