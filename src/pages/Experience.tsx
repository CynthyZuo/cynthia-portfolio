import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import TypewriterText from "@/components/TypewriterText";
import NextLanding from "@/components/NextLanding";
import sunBody from "@/assets/sun-experience.png";

const Experience = () => (
  <div className="relative w-screen h-screen overflow-hidden">
    <AnimatedBackground />
    <Header />

    <div className="relative z-10 flex items-center h-full px-20 pt-14 gap-16">
      <div className="flex-shrink-0 max-w-[560px]">
        <TypewriterText
          duration={3000}
          as="div"
          className="text-foreground leading-[1.9] whitespace-pre-wrap"
          style={{ fontFamily: "var(--font-body)", fontSize: 19 }}
          segments={[
            { text: 'Tencent News', style: { fontSize: 24, fontWeight: 700 } },
            { text: '          Jan 2025– Mar 2026\nContent Operations Intern     Beijing,China\n\n· APP Content Operations\n· Video Channel Operations\n· Athlete Interviews\n\n\n' },
            { text: 'JCGC IMC', style: { fontSize: 24, fontWeight: 700 } },
            { text: '              Nov 2024– Jan 2025\nBrand Marketing Intern        Chengdu,China\n\n· Commercial Strategy & Proposal\n· IP Operations' },
          ]}
        />
      </div>

      <div className="absolute animate-float" style={{ left: "62%", top: "30%", transform: "translate(-50%, -50%)" }}>
        <img
          src={sunBody}
          alt="Working sun"
          className="w-[350px] h-[350px] object-contain"
          style={{ filter: "drop-shadow(0 0 40px rgba(255,184,0,0.4))" }}
        />
      </div>
    </div>

    <NextLanding currentPath="/experience" />
  </div>
);

export default Experience;
