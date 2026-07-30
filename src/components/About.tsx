// import Faq from "./Faq";
import TypewriterHeading from "./TypewriterHeading";
import { personalInfo } from "@/lib/projects";

const About = () => (
  <section id="about" className="hairline pt-18 pb-24">
    <TypewriterHeading
      text="About me"
      className="mt-0 mb-8 text-[34px] font-semibold tracking-[-0.02em]"
    />

    <div className="flex flex-wrap items-start gap-x-18 gap-y-12">
      <div className="min-w-[min(420px,100%)] flex-[1_1_420px]">
        <div className="flex max-w-[560px] flex-col gap-4">
          {personalInfo.bio.map((paragraph, i) => (
            <p key={i} className="m-0 text-[18px] leading-[1.65] text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* FAQ temporarily disabled — being reworked.
      <div className="-mt-4 min-h-[360px] min-w-[min(380px,100%)] flex-[1_1_380px]">
        <Faq />
      </div>
      */}
    </div>
  </section>
);

export default About;
