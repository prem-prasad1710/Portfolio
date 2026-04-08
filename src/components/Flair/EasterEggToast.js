import React, { useState, useCallback } from "react";
import { useKonamiCode } from "../../hooks/useKonamiCode";

function EasterEggToast() {
  const [open, setOpen] = useState(false);

  const unlock = useCallback(() => setOpen(true), []);
  useKonamiCode(unlock);

  if (!open) return null;

  return (
    <div className="easter-egg-toast" role="status">
      <div className="easter-egg-toast__panel">
        <p className="easter-egg-toast__title font-monospace">
          achievement_unlocked.md
        </p>
        <p className="easter-egg-toast__body">
          Konami code detected. You clearly read the fine print — that&apos;s the
          kind of attention to detail teams remember.
        </p>
        <button
          type="button"
          className="easter-egg-toast__close font-monospace"
          onClick={() => setOpen(false)}
        >
          dismiss
        </button>
      </div>
    </div>
  );
}

export default EasterEggToast;
