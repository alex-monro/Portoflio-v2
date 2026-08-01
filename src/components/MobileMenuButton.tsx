type MobileMenuButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

/*
 * Adapted from gagan-gv's "Massive Goat 19" button on Uiverse.
 * https://uiverse.io/gagan-gv/massive-goat-19
 * License: MIT
 */
const MobileMenuButton = ({
  isOpen,
  onToggle,
}: MobileMenuButtonProps) => (
  <>
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="menu-button flex md:hidden"
    >
      <span className="menu-icon">
        <svg viewBox="0 0 175 80" width="30" height="14" aria-hidden="true">
          <rect width="80" height="15" fill="currentColor" rx="10" />
          <rect
            y="30"
            width="80"
            height="15"
            fill="currentColor"
            rx="10"
          />
          <rect
            y="60"
            width="80"
            height="15"
            fill="currentColor"
            rx="10"
          />
        </svg>
      </span>
      <span className="menu-label">{isOpen ? "CLOSE" : "MENU"}</span>
    </button>

    <style jsx>{`
      .menu-button {
        position: relative;
        align-items: center;
        width: 7.375rem;
        height: 2.75rem;
        overflow: hidden;
        border: 0;
        border-radius: 0.375rem;
        background: var(--color-foreground);
        color: var(--color-background);
        font-family: inherit;
        font-size: 0.875rem;
        font-weight: 700;
        cursor: pointer;
        transition:
          box-shadow 0.5s ease-in-out,
          transform 0.5s ease-in-out;
      }

      .menu-button:active {
        transform: scale(0.95);
      }

      .menu-icon {
        position: absolute;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.25rem;
        height: 2.75rem;
        transition: width 0.5s ease;
      }

      .menu-label {
        opacity: 1;
        transform: translateX(3.25rem);
        transition: opacity 0.5s ease;
      }

      @media (hover: hover) and (pointer: fine) {
        .menu-button:hover {
          box-shadow: 0 0 1.25rem
            color-mix(in srgb, var(--color-foreground) 23%, transparent);
        }

        .menu-button:hover .menu-icon {
          width: 7.375rem;
        }

        .menu-button:hover .menu-label {
          opacity: 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .menu-button,
        .menu-icon,
        .menu-label {
          transition: none;
        }
      }
    `}</style>
  </>
);

export default MobileMenuButton;
