import { useEffect, useRef, useState } from "react";
import sunBody from "@/assets/sun-body.png";
import hourHand from "@/assets/hour-hand.png";
import minuteHand from "@/assets/minute-hand.png";

// ── Layout constants ────────────────────────────────────────────────
const SUN_SIZE = 335;
const ARM_WIDTH = 195;      // minute hand width
const HOUR_ARM_WIDTH = 150; // hour hand width
// hour-hand.png: 1412×1536 → at 150px wide, natural height ≈ 163px
const HOUR_ARM_HEIGHT = Math.round(HOUR_ARM_WIDTH * 1536 / 1412); // 163px

// Hour hand orbit radius
const HOUR_ORBIT_R = 47; // px — anchor (bottom) orbits this circle inside sun

// Minute hand: shoulder FIXED (independent of hour orbit radius)
const MINUTE_ANCHOR_X = 216; // px from left of sun div
const MINUTE_ANCHOR_Y = 140; // px from top of sun div

// ────────────────────────────────────────────────────────────────────

const Sun = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [minuteCSS, setMinuteCSS] = useState(0);
  const [hourDeg, setHourDeg] = useState(0);

  const totalMinuteRotation = useRef(0);
  const prevAngle = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // ── Minute hand ─────────────────────────────────────────────
      // Shoulder fixed at MINUTE_ANCHOR; finger points toward mouse.
      // atan2(dx, dy) [args swapped]: arm default = DOWN → correct.
      //   mouse RIGHT → +90° CW  → arm points RIGHT ✓
      //   mouse DOWN  →   0°     → arm stays DOWN   ✓
      //   mouse LEFT  → −90° CW  → arm points LEFT  ✓
      //   mouse UP    → ±180°    → arm points UP     ✓
      const anchorScreenX = rect.left + MINUTE_ANCHOR_X;
      const anchorScreenY = rect.top  + MINUTE_ANCHOR_Y;
      const dx = e.clientX - anchorScreenX;
      const dy = e.clientY - anchorScreenY;
      // Negate dx to correct the left-right mirror caused by the arm image orientation
      const newAngle = Math.atan2(-dx, dy) * (180 / Math.PI);

      // Accumulate without wrap-around jumps (used to drive hour hand)
      let diff = newAngle - prevAngle.current;
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      totalMinuteRotation.current += diff;
      prevAngle.current = newAngle;

      setMinuteCSS(newAngle);
      setHourDeg(totalMinuteRotation.current / 12);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ── Hour hand ────────────────────────────────────────────────────
  // anchorX/Y: bottom-center of arm div tracks standard polar coords.
  // transformOrigin = bottom-center; rotation = angle.
  // Result: arm extends radially outward; reverse line passes through sun centre.
  const hourRad = hourDeg * (Math.PI / 180);
  const anchorX = SUN_SIZE / 2 + Math.cos(hourRad) * HOUR_ORBIT_R;
  const anchorY = SUN_SIZE / 2 + Math.sin(hourRad) * HOUR_ORBIT_R;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ width: SUN_SIZE, height: SUN_SIZE, transform: "scale(0.82)", transformOrigin: "center center" }}
    >
      {/* ── Hour hand: below sun body ─────────────────────────── */}
      {/* Bottom-center of div pinned to (anchorX, anchorY) on orbit circle. */}
      {/* transformOrigin: bottom-center; rotation = hourDeg.                */}
      <div
        className="absolute z-[5]"
        style={{
          width: HOUR_ARM_WIDTH,
          height: HOUR_ARM_HEIGHT,
          left: anchorX - HOUR_ARM_WIDTH / 2,
          top: anchorY,
          transformOrigin: `${HOUR_ARM_WIDTH / 2}px 0px`,
          transform: `rotate(${hourDeg - 90}deg)`,
        }}
      >
        <img
          src={hourHand}
          alt="Hour hand"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* ── Sun body ─────────────────────────────────────────────── */}
      <img
        src={sunBody}
        alt="Sun"
        className="absolute inset-0 w-full h-full object-contain z-10"
      />

      {/* ── Minute hand: above sun body ──────────────────────────── */}
      {/* Shoulder fixed at MINUTE_ANCHOR; finger points toward mouse. */}
      {/* top: MINUTE_ANCHOR_Y → TOP of div = shoulder → y=0 of div   */}
      {/* transformOrigin: centre-top of div = shoulder point          */}
      <div
        className="absolute z-[15]"
        style={{
          width: ARM_WIDTH,
          left: MINUTE_ANCHOR_X - ARM_WIDTH / 2,
          top: MINUTE_ANCHOR_Y,
          transformOrigin: `${ARM_WIDTH / 2}px 0px`,
          transform: `rotate(${minuteCSS}deg)`,
        }}
      >
        <img
          src={minuteHand}
          alt="Minute hand"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
};

export default Sun;
