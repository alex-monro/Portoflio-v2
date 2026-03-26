import { div, main } from "motion/react-client";
import Image from "next/image";
import Hero from "../components/Hero";
import About from "../components/About";
import Works from "../components/Works";
import Footer from "../components/Footer";
import Nav from "@/components/Nav";
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
