import React from "react";
import { STACK_ORBIT_INNER, STACK_ORBIT_OUTER } from "../../config/site";

function OrbitRing({ labels, radiusPx, durationSec, reverse, className }) {
  const n = labels.length || 1;

  return (
    <div
      className={`stack-orbit__ring ${className || ""}`}
      style={{
        "--orbit-r": `${radiusPx}px`,
        "--orbit-dur": `${durationSec}s`,
        animationDuration: `${durationSec}s`,
        animationName: reverse ? "stack-orbit-spin-rev" : "stack-orbit-spin",
      }}
      aria-hidden
    >
      {labels.map((label, i) => (
        <div
          key={label}
          className="stack-orbit__node"
          style={{ "--orbit-a": `${(360 / n) * i}deg` }}
        >
          <span
            className={`stack-orbit__chip font-monospace${
              reverse ? " stack-orbit__chip--rev" : ""
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Dual-ring “stack constellation” — chips orbit the core; hover pauses motion.
 */
const STACK_ORBIT_HEADING_ID = "stack-orbit-heading";

function StackOrbit() {
  return (
    <section
      className="stack-orbit dev-reveal"
      style={{ animationDelay: "0.32s" }}
      aria-labelledby={STACK_ORBIT_HEADING_ID}
    >
      <div className="stack-orbit__header">
        <p className="stack-orbit__kicker font-monospace">./stack --graph</p>
        <h2 className="stack-orbit__title" id={STACK_ORBIT_HEADING_ID}>
          How the <span className="purple">tooling</span> orbits the work
        </h2>
        <p className="stack-orbit__lede">
          Inner ring: day-to-day delivery. Outer ring: platform and longevity. Hover
          to freeze the orbit.
        </p>
      </div>

      <div className="stack-orbit__stage">
        <div className="stack-orbit__grid-bg" aria-hidden />
        <OrbitRing
          labels={STACK_ORBIT_OUTER}
          radiusPx={128}
          durationSec={52}
          reverse
          className="stack-orbit__ring--outer"
        />
        <OrbitRing
          labels={STACK_ORBIT_INNER}
          radiusPx={82}
          durationSec={36}
          reverse={false}
          className="stack-orbit__ring--inner"
        />
        <div className="stack-orbit__core font-monospace" aria-hidden>
          <span className="stack-orbit__core-prompt">$</span>
          <span className="stack-orbit__core-text">ship</span>
          <span className="stack-orbit__core-cursor" />
        </div>
      </div>
    </section>
  );
}

export default StackOrbit;
