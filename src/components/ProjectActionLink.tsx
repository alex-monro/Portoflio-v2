import { GitHubIcon } from "@/components/Icons";

type ProjectActionLinkProps = {
  href: string;
  type: "github" | "live";
};

const GlobeIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
);

/*
 * Adapted from kamehame-ha's "Kind Otter 31" button on Uiverse.
 * https://uiverse.io/kamehame-ha/kind-otter-31
 * License: MIT
 */
const ProjectActionLink = ({ href, type }: ProjectActionLinkProps) => {
  const isGitHub = type === "github";
  const label = isGitHub ? "GitHub" : "Live site";
  const iconClasses = "h-4 w-4 shrink-0";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 items-center justify-center gap-2 rounded-full border-2 border-zinc-950 bg-transparent px-3 text-sm font-bold text-zinc-950 transition-colors duration-300 hover:bg-zinc-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 motion-reduce:transition-none"
    >
      {isGitHub ? (
        <GitHubIcon className={iconClasses} />
      ) : (
        <GlobeIcon className={iconClasses} />
      )}
      <span>{label}</span>
      <span className="sr-only">, opens in a new tab</span>
    </a>
  );
};

export default ProjectActionLink;
