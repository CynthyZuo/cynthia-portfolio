import { useEffect, useRef, useState } from "react";
import sunBody from "@/assets/sun-body.png";
import hourHand from "@/assets/hour-hand.png";
import minuteHand from "@/assets/minute-hand.png";

// ── Layout constants ────────────────────────────────────────────────
const SUN_SIZE = 335;
const ARM_WIDTH = 195; // visual width of each arm (height is auto from image ratio)

// minute-hand.png: 1260×1536  → at 195px wide, natural height ≈ 238px
// hour-hand.png:  1412×1536  → at 195px wide, natural height ≈ 212px
// NO object-contain: image fills exactly ARM_WIDTH wide, shoulder sits at y=0 of div

// Hour hand orbit radius (matches blue circle in reference ≈ 1/5 of sun size)
const HOUR_ORBIT_R = SUN_SIZE / 5; // 67px — shoulder orbits this circle inside sun

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
  // Shoulder orbits HOUR_ORBIT_R circle (centred at sun centre) at 1/12 speed.
  const hourRad = hourDeg * (Math.PI / 180);
  const shoulderX = SUN_SIZE / 2 + Math.cos(hourRad) * HOUR_ORBIT_R;
  const shoulderY = SUN_SIZE / 2 + Math.sin(hourRad) * HOUR_ORBIT_R;
  const hourCSS = 90 - hourDeg; // arm always points outward from orbit centre

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ width: SUN_SIZE, height: SUN_SIZE }}
    >
      {/* ── Hour hand: below sun body ─────────────────────────── */}
      {/* Shoulder at (shoulderX, shoulderY); arm extends outward. */}
      {/* top: shoulderY  → TOP of div = shoulder → y=0 of div    */}
      {/* transformOrigin: centre-top of div = shoulder point      */}
      <div
        className="absolute z-[5]"
        style={{
          width: ARM_WIDTH,
          left: shoulderX - ARM_WIDTH / 2,
          top: shoulderY,
          transformOrigin: `${ARM_WIDTH / 2}px 0px`,
          transform: `rotate(${hourCSS}deg)`,
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
