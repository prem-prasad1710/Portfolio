import React, { useEffect, useState } from "react";

function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    function tick() {
      const el = document.documentElement;
      const sh = el.scrollHeight - el.clientHeight;
      const x = sh > 0 ? (el.scrollTop / sh) * 100 : 0;
      setP(Math.min(100, Math.max(0, x)));
    }
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress__bar"
        style={{ transform: `scaleX(${p / 100})` }}
      />
    </div>
  );
}

export default ScrollProgress;
