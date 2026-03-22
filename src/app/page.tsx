import { div, main } from "motion/react-client";
import Image from "next/image";
import Hero from "../components/Hero";
import About from "../components/About";
import Works from "../components/Works";
import { Main } from "next/document";

export default function Home() {
  return (
    <main>
      <Hero />
      <Works />
      <About />
    </main>
  );
}
