import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import TypewriterText from "@/components/TypewriterText";
import NextLanding from "@/components/NextLanding";
import sunBody from "@/assets/sun-about.png";

const About = () => (
  <div className="relative w-screen h-screen overflow-hidden">
    <AnimatedBackground />
    <Header />

    <div className="relative z-10 flex items-center h-full px-20 pt-14 gap-16">
      <div className="flex-shrink-0 max-w-[700px]">
        <TypewriterText
          duration={3000}
          as="div"
          className="text-foreground leading-[1.9] whitespace-pre-wrap"
          style={{ fontFamily: "var(--font-body)", fontSize: 19 }}
          segments={[
            { text: 'name = "Cynthia"', style: { fontSize: 28, fontWeight: 700 } },
            { text: '\n\neducation = \n"undergraduate": "Radio and Television Directing",\n"postgraduate": "Journalism and Communication"\n\nsign = "Aries"♈️\nhobbies = "basketball 🏀","fitness 💪","movies 🎬"\n\nself_intro = """\nOptimistic, high-energy, and thrive under pressure.I chase the success but I also embrace the grind because I get a kick out of solving the puzzle.I\'m a doer rather than a talker.\nCan\'t wait to connect!' },
          ]}
        />
      </div>

      <div className="absolute animate-float" style={{ left: "62%", top: "30%", transform: "translate(-50%, -50%)" }}>
        <img
          src={sunBody}
          alt="Cynthia portrait"
          className="w-[350px] h-[350px] object-contain"
          style={{ filter: "drop-shadow(0 0 40px rgba(255,184,0,0.4))" }}
        />
      </div>
    </div>

    <NextLanding currentPath="/about" />
  </div>
);

export default About;
