import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import NextLanding from "@/components/NextLanding";

const VideoWorks = () => (
  <div className="relative w-screen h-screen overflow-hidden">
    <AnimatedBackground />
    <Header />

    <div
      className="relative z-10 h-[calc(100vh-56px)] mt-14 overflow-y-auto px-20 py-10"
      style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}
    >
      {/* Video 1: Video Essay - 16:9 horizontal */}
      <div className="mb-20">
        <div className="max-w-[860px] mx-auto">
          <video className="w-full aspect-video rounded-lg" controls poster="/poster-a24.png" src="/video-a24.mov" />
          <div className="mt-5" style={{ fontFamily: "var(--font-body)" }}>
            <p className="text-foreground text-sm">
              Video Essay &nbsp;&nbsp; Director & Editor
            </p>
            <p className="text-foreground text-sm mt-1">
              " What exactly are we looking for when we watch A24? "
            </p>
          </div>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-t border-foreground/10 my-16 max-w-[860px] mx-auto" />

      {/* Video 2: Tencent - 9:16 vertical */}
      <div className="mb-20">
        <div className="max-w-[860px] mx-auto flex items-center gap-0">
          <div className="flex-[0_0_30%] pr-5" />
          <div className="flex-[0_0_40%] flex justify-center">
            <video className="w-full max-w-[320px] aspect-[9/16] rounded-lg" controls src="/video-tencent.mov" />
          </div>
          <div className="flex-[0_0_30%] pl-5 flex items-center">
            <div style={{ fontFamily: "var(--font-body)" }}>
              <p className="text-foreground text-sm">
                Tencent 1M+ views video &nbsp;&nbsp; Editor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-t border-foreground/10 my-16 max-w-[860px] mx-auto" />

      {/* Video 3: Short Documentary - 16:9 horizontal */}
      <div className="mb-20">
        <div className="max-w-[860px] mx-auto">
          <video className="w-full aspect-video rounded-lg" controls poster="/poster-documentary.jpg" src="/video-documentary.mp4" />
          <div className="mt-5" style={{ fontFamily: "var(--font-body)" }}>
            <p className="text-foreground text-sm">
              Short Documentary &nbsp;&nbsp; Director & Editor
            </p>
            <p className="text-foreground text-sm mt-1">
              " Passion Till The End "
            </p>
          </div>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-t border-foreground/10 my-16 max-w-[860px] mx-auto" />

      {/* Video 4: Short Video Ads - 16:9 horizontal */}
      <div className="mb-20">
        <div className="max-w-[860px] mx-auto">
          <video className="w-full aspect-video rounded-lg" controls poster="/poster-kuaike.png" src="/video-kuaike.mp4" />
          <div className="mt-5" style={{ fontFamily: "var(--font-body)" }}>
            <p className="text-foreground text-sm">
              Short Video Ads &nbsp;&nbsp; Director & Editor
            </p>
            <p className="text-foreground text-sm mt-1">
              " The '5G' of Medicine "
            </p>
          </div>
        </div>
      </div>
    </div>

    <NextLanding currentPath="/video" />
  </div>
);

export default VideoWorks;
