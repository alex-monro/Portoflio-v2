const Hero = () => {
  return (
    <section className="h-svh flex flex-col justify-center px-6 lg:px-8 pb-12 relative">
      <p className="absolute top-6 left-6 lg:top-8 lg:left-8 text-2xl lg:text-xl font-semibold italic uppercase tracking-widest">
        AM
      </p>
      <div className="pt-[20vh]">
        <p className="text-base lg:text-lg font-semibold tracking-widest pb-6">
          I Build Things For The Web
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-7xl xl:text-[7.4rem] font-bold uppercase tracking-wide ">
          Front-End Developer
        </h1>
      </div>
      <a
        href="#works"
        className="absolute bottom-10 left-6 lg:left-8 text-sm lg:text-base font-medium uppercase tracking-widest text-zinc-50 hover:text-zinc-400 transition-colors"
      >
        Scroll ↓
      </a>
    </section>
  );
};

export default Hero;
