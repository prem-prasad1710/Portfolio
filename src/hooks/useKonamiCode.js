import { useEffect, useRef } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function norm(e) {
  if (e.key.startsWith("Arrow")) return e.key;
  return e.key.toLowerCase();
}

/**
 * Fires once when the Konami code is entered (keyboard).
 */
export function useKonamiCode(onUnlock) {
  const idx = useRef(0);
  const cb = useRef(onUnlock);
  cb.current = onUnlock;

  useEffect(() => {
    function onKey(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = norm(e);
      const want = SEQUENCE[idx.current];
      if (k === want) {
        idx.current += 1;
        if (idx.current >= SEQUENCE.length) {
          idx.current = 0;
          cb.current?.();
        }
      } else {
        idx.current = k === SEQUENCE[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
