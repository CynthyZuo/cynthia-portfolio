import { useEffect, useRef } from "react";
import backgroundImg from "@/assets/background.png";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Create particles that radiate outward from center of background
    const cx = w * 0.729;
    const cy = h * 0.558;
    const NUM = 300;

    interface Particle {
      angle: number;
      dist: number;
      speed: number;
      size: number;
      opacity: number;
      maxDist: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < NUM; i++) {
      const angle = Math.random() * Math.PI * 2;
      const maxDist = Math.max(w, h) * 0.85;
      particles.push({
        angle,
        dist: Math.random() * maxDist,
        speed: 0.15 + Math.random() * 0.4,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.6,
        maxDist,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.dist += p.speed;
        if (p.dist > p.maxDist) {
          // Reset to a small random distance so particles re-emerge smoothly
          p.dist = Math.random() * 20;
          p.angle = Math.random() * Math.PI * 2;
          p.opacity = 0.2 + Math.random() * 0.6;
        }
        const x = cx + Math.cos(p.angle) * p.dist;
        const y = cy + Math.sin(p.angle) * p.dist;
        // Smooth fade-in near center and fade-out near edge
        const fadeIn = Math.min(1, p.dist / 80);
        const fadeOut = Math.min(1, (p.maxDist - p.dist) / 120);
        const fade = fadeIn * fadeOut * p.opacity;
        ctx.fillStyle = `rgba(255,255,255,${fade})`;
        ctx.fillRect(x, y, p.size, p.size);
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <img
        src={backgroundImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover animate-radiate"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
};

export default AnimatedBackground;
