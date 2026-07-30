import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";

const riseDelays = [0.12, 0.2, 0.28, 0.36];

const Works = ({ projects }: { projects: Project[] }) => (
  <section
    id="works"
    className="pt-[56px] pb-[88px] max-[720px]:pt-[40px]"
  >
    <h1 className="sr-only">Projects</h1>

    <div
      className="grid gap-x-10 gap-y-12"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(min(440px, 100%), 1fr))",
      }}
    >
      {projects.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          priority
          riseDelay={riseDelays[i % riseDelays.length]}
        />
      ))}
    </div>
  </section>
);

export default Works;
