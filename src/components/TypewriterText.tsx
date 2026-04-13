import { useState, useEffect } from "react";

interface TextSegment {
  text: string;
  style?: React.CSSProperties;
}

interface TypewriterTextProps {
  text?: string;
  segments?: TextSegment[];
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "pre" | "div" | "span";
}

const TypewriterText = ({ text, segments, duration = 3000, className, style, as: Tag = "div" }: TypewriterTextProps) => {
  const [charCount, setCharCount] = useState(0);

  const allSegments: TextSegment[] = segments || [{ text: text || "" }];
  const fullText = allSegments.map(s => s.text).join("");
  const totalChars = fullText.length;
  const interval = duration / totalChars;

  useEffect(() => {
    if (charCount >= totalChars) return;
    const timer = setTimeout(() => setCharCount(c => c + 1), interval);
    return () => clearTimeout(timer);
  }, [charCount, totalChars, interval]);

  // Click on element to skip
  const handleClick = () => {
    if (charCount < totalChars) {
      setCharCount(totalChars);
    }
  };

  // Render segments up to charCount
  let rendered = 0;
  const elements = allSegments.map((seg, i) => {
    if (rendered >= charCount) return null;
    const available = Math.min(seg.text.length, charCount - rendered);
    const visibleText = seg.text.slice(0, available);
    rendered += seg.text.length;
    return (
      <span key={i} style={seg.style}>
        {visibleText}
      </span>
    );
  });

  return (
    <Tag
      className={className}
      style={{ ...style, cursor: charCount < totalChars ? "pointer" : "default" }}
      onClick={handleClick}
    >
      {elements}
      {charCount < totalChars && (
        <span className="inline-block w-[2px] h-[1em] bg-foreground align-middle animate-pulse ml-[1px]" />
      )}
    </Tag>
  );
};

export default TypewriterText;
