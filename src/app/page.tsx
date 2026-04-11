import Hero from "@/components/Hero";
import Works from "@/components/Works";
import About from "@/components/About";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main id="top">
      <Hero />
      <Works projects={projects} />
      <About />
    </main>
  );
}
