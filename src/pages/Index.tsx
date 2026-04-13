import { useState } from "react";
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

const EMAIL = "cynthyyy1010@gmail.com";

const Index = () => {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatedBackground />
      <Header />

      <div className="relative z-10 w-full h-full">
        <div className="absolute top-[16%] left-[4%]">
          <p className="text-foreground font-bold leading-tight" style={{ fontSize: "clamp(38px, 4vw, 52px)", fontVariantLigatures: "none" }}>
            {"< Hi >"}
          </p>
          <p className="text-foreground font-bold mt-3" style={{ fontSize: "clamp(38px, 4vw, 52px)", fontVariantLigatures: "none" }}>
            {"< I'm Cynthia >"}
          </p>
        </div>

        <div className="absolute z-20" style={{ top: "55%", left: "75%", transform: "translate(-50%, -50%)" }}>
          <Sun />
        </div>

        {moons.map((moon) => (
          <Moon key={moon.label} {...moon} />
        ))}

        <NextLanding currentPath="/" />
      </div>

      <span
        className="fixed bottom-6 left-8 text-muted-foreground text-xs tracking-wider z-50 flex items-center gap-2 cursor-default"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        contact : {EMAIL}
        {hovered && (
          <button
            onClick={handleCopy}
            className="text-[10px] px-1.5 py-0.5 rounded border border-muted-foreground/40 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            {copied ? "copied!" : "copy"}
          </button>
        )}
      </span>
    </div>
  );
};

export default Index;
