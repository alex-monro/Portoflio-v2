"use client";

import Link from "next/link";

type NextProjectLinkProps = {
  href: string;
  projectTitle: string;
};

/*
 * Adapted from alexmaracinaru's "Brown Bobcat 65" button on Uiverse.
 * https://uiverse.io/alexmaracinaru/brown-bobcat-65
 * License: MIT
 */
const NextProjectLink = ({ href, projectTitle }: NextProjectLinkProps) => (
  <>
    <Link
      href={href}
      scroll={false}
      aria-label={`Next project: ${projectTitle}`}
      className="next-project-link"
    >
      <span className="next-project-circle" aria-hidden="true" />
      <span className="next-project-text">Next project</span>
      <span className="next-project-overlay" aria-hidden="true">
        Next project
      </span>
      <svg
        className="next-project-arrow"
        width="15"
        height="10"
        viewBox="0 0 13 10"
        aria-hidden="true"
      >
        <path d="M1,5 L11,5" />
        <polyline points="8 1 12 5 8 9" />
      </svg>
    </Link>

    <style jsx global>{`
      .next-project-link {
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.125rem;
      }

      .next-project-link:active {
        transform: scale(0.95);
      }

      .next-project-circle {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 2.8125rem;
        height: 2.8125rem;
        border-radius: 9999px;
        background: var(--color-foreground);
        transition: width 0.3s ease;
      }

      .next-project-link:hover .next-project-circle {
        width: 100%;
      }

      .next-project-text {
        position: relative;
        z-index: 2;
        color: var(--color-foreground);
        font-size: 1.0625rem;
        font-weight: 700;
        letter-spacing: 0.02em;
      }

      .next-project-overlay {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        box-sizing: content-box;
        width: 0.5625rem;
        height: 1.3125rem;
        padding: 0.75rem 1.125rem;
        background: var(--color-background);
        background-clip: text;
        color: transparent;
        font-size: 1.0625rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        text-align: left;
        white-space: nowrap;
        transition: width 0.3s ease;
        -webkit-background-clip: text;
      }

      .next-project-link:hover .next-project-overlay {
        width: 100%;
      }

      .next-project-arrow {
        position: relative;
        z-index: 2;
        margin-left: 0.625rem;
        fill: none;
        stroke: var(--color-foreground);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        transform: translateX(-0.3125rem);
        transition:
          stroke 0.3s ease,
          transform 0.3s ease;
      }

      .next-project-link:hover .next-project-arrow {
        stroke: var(--color-background);
        transform: translateX(0);
      }

      @media (width < 48rem) {
        .next-project-link {
          padding: 0.5625rem 0.875rem;
        }

        .next-project-circle {
          width: 100%;
          height: 2.4375rem;
        }

        .next-project-text {
          color: var(--color-background);
          font-size: 0.9375rem;
        }

        .next-project-overlay {
          display: none;
        }

        .next-project-arrow {
          margin-left: 0.5rem;
          stroke: var(--color-background);
          transform: translateX(0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .next-project-link,
        .next-project-circle,
        .next-project-overlay,
        .next-project-arrow {
          transition: none;
        }
      }
    `}</style>
  </>
);

export default NextProjectLink;
