import Works from "@/components/Works";
import About from "@/components/About";
import { featuredProjects } from "@/lib/projects";

export default function Home() {
  return (
    <div id="top">
      <Works projects={featuredProjects} />
      <About />
    </div>
  );
}
