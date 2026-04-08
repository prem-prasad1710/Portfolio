import React, { useEffect, useRef, useState } from "react";

/**
 * Subtle dual radial glow that follows the pointer (desktop only).
 * Respects reduced motion and coarse pointers.
 */
function CursorAura() {
  const [xy, setXy] = useState({ x: "50vw", y: "40vh" });
  const raf = useRef(0);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const onMove = (e) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setXy({ x: `${e.clientX}px`, y: `${e.clientY}px` });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      className="cursor-aura"
      aria-hidden
      style={{
        "--cursor-x": xy.x,
        "--cursor-y": xy.y,
      }}
    />
  );
}

export default CursorAura;
