import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Sun from "@/components/Sun";
import Moon from "@/components/Moon";
import NextLanding from "@/components/NextLanding";

const moons = [
  { label: "About me", route: "/about", size: 200, floatClass: "animate-float", style: { top: "62%", left: "43%" } },
  { label: "Experience", route: "/experience", size: 150, floatClass: "animate-float-delay-1", style: { top: "22%", left: "53%" } },
  { label: "Video works", route: "/video", size: 150, floatClass: "animate-float-delay-2", style: { top: "14%", left: "76%" } },
  { label: "AIGC works", route: "/aigc", size: 200, floatClass: "animate-float-delay-3", style: { top: "54%", right: "2%" } },
];

const Index = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatedBackground />
      <Header />

      <div className="relative z-10 w-full h-full">
        <div className="absolute top-[16%] left-[4%]">
          <h1 className="text-foreground font-bold leading-tight" style={{ fontSize: "clamp(38px, 4vw, 52px)" }}>
            {"< Hi >"}
          </h1>
          <p className="text-foreground font-bold mt-3" style={{ fontSize: "clamp(38px, 4vw, 52px)" }}>
            {"< I'm Cynthia >"}
          </p>
        </div>

        <div className="absolute" style={{ top: "55%", left: "75%", transform: "translate(-50%, -50%)" }}>
          <Sun />
        </div>

        {moons.map((moon) => (
          <Moon key={moon.label} {...moon} />
        ))}

        <NextLanding currentPath="/" />
      </div>
    </div>
  );
};

export default Index;
