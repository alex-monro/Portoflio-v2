import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";

const riseDelays = [0.12, 0.2, 0.28, 0.36];

const Works = ({ projects }: { projects: Project[] }) => (
  <section id="works" className="pt-10 pb-22 md:pt-14">
    <h1 className="sr-only">Projects</h1>

    <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-2">
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
