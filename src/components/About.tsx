import TypewriterHeading from "./TypewriterHeading";
import { personalInfo } from "@/lib/projects";

const About = () => (
  <section id="about" className="border-t border-zinc-300 pt-18 pb-24">
    <TypewriterHeading
      text="About me"
      className="mb-8 text-4xl font-semibold tracking-tight"
    />

    <div className="flex max-w-2xl flex-col gap-4">
      {personalInfo.bio.map((paragraph, index) => (
        <p key={index} className="text-lg leading-relaxed text-pretty">
          {paragraph}
        </p>
      ))}
    </div>
  </section>
);

export default About;
