import Hero from "@/components/Hero";
import Works from "@/components/Works";
import About from "@/components/About";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div id="top">
      <Hero />
      <Works projects={projects} />
      <About />
    </div>
  );
}
