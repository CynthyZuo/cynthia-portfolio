import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import NextLanding from "@/components/NextLanding";

const AIGC = () => (
  <div className="relative w-screen h-screen overflow-hidden">
    <AnimatedBackground />
    <Header />

    <div className="relative z-10 flex flex-col items-center justify-center h-full pt-14 px-20">
      {/* Video */}
      <video
        className="w-full max-w-[860px] aspect-video rounded-lg"
        controls
        poster="/poster-clockwork-city.png"
        src="https://10personalweb-1421781834.cos.ap-beijing.myqcloud.com/AI%20Anime"
      />

      {/* Text */}
      <div className="mt-5 w-full max-w-[860px]" style={{ fontFamily: "var(--font-body)" }}>
        <p className="text-foreground text-sm">
          AI Anime &nbsp;&nbsp; AIGC Creator & Editor
        </p>
        <p className="text-foreground text-sm mt-1">
          " The Clockwork City "
        </p>
      </div>
    </div>

    <NextLanding currentPath="/aigc" />
  </div>
);

export default AIGC;
