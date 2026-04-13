import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import moonLight from "@/assets/moon-light.png";
import moonDark from "@/assets/moon-dark.png";

interface MoonProps {
  label: string;
  route: string;
  size: number;
  floatClass: string;
  style?: React.CSSProperties;
}

const Moon = ({ label, route, size, floatClass, style }: MoonProps) => {
  const [hovered, setHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const navigate = useNavigate();

  const svgSize = size + 10;
  const orbitR = (size - 4) / 2;
  const circumference = 2 * Math.PI * orbitR;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const pathId = `orbit-${label}-${hoverKey}`;

  // 4 repetitions; textLength stretches text to fill exactly one circumference
  // so there is never a gap or overflow at the seam.
  const orbitText = useMemo(() => {
    const unit = ` · ${label}`;
    return Array(4).fill(unit).join("");
  }, [label]);

  const handleMouseEnter = () => {
    setHovered(true);
    setHoverKey(k => k + 1);
  };

  return (
    <div
      className={`absolute cursor-pointer ${hovered ? "" : floatClass}`}
      style={{ width: size, height: size, ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(route)}
    >
      <img
        src={moonLight}
        alt={label}
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700"
        style={{ opacity: hovered ? 0 : 1 }}
      />
      <img
        src={moonDark}
        alt={label}
        className="absolute object-contain transition-opacity duration-700"
        style={{
          opacity: hovered ? 1 : 0,
          width: "78%",
          height: "78%",
          top: "11%",
          left: "11%",
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <svg
          key={hoverKey}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="absolute"
          style={{ top: -5, left: -5, width: svgSize, height: svgSize, overflow: "visible" }}
        >
          <defs>
            <path
              id={pathId}
              d={`M ${cx},${cy} m -${orbitR},0 a ${orbitR},${orbitR} 0 1,1 ${orbitR * 2},0 a ${orbitR},${orbitR} 0 1,1 -${orbitR * 2},0`}
            />
          </defs>
          {/* textLength on <text> has better browser support than on <textPath> */}
          <text
            fill="hsl(0, 0%, 80%)"
            fontSize="12"
            fontFamily="Menlo, 'Courier New', monospace"
            textLength={circumference}
            lengthAdjust="spacing"
          >
            <textPath href={`#${pathId}`} startOffset="0%">
              {/* startOffset SMIL animation: text flows along the fixed circle path.
                  Because textLength = circumference, text fills exactly one revolution
                  with no gap at the seam — spacing around every · is identical. */}
              <animate
                attributeName="startOffset"
                from="0%"
                to="100%"
                dur="14s"
                repeatCount="indefinite"
              />
              {orbitText}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Moon;
