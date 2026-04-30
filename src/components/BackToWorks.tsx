"use client";

import { useRouter } from "next/navigation";

const BackToWorks = () => {
  const router = useRouter();

  const handleClick = () => {
    try { sessionStorage.setItem("pendingScrollTarget", "works"); } catch {}
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-2xl transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-50"
    >
      ← Back to Works
    </button>
  );
};

export default BackToWorks;
