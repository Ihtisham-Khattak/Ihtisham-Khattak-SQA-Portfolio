import { memo, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

function ScrambleTextInner({ text }) {
  const reducedMotion = usePrefersReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    let frame = 0;
    const total = text.length + 8;
    const id = window.setInterval(() => {
      frame += 1;
      if (frame >= total) {
        setOutput(text);
        window.clearInterval(id);
        return;
      }
      setOutput(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "." || index < frame - 4) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
    }, 42);

    return () => window.clearInterval(id);
  }, [reducedMotion, text]);

  return <span>{output}</span>;
}

const ScrambleText = memo(ScrambleTextInner);
export default ScrambleText;
