import React from "react";
import { SITE, CURRENTLY } from "../../config/site";

function CurrentlyStrip() {
  return (
    <aside className="currently-strip dev-reveal" style={{ animationDelay: "0.22s" }}>
      <div className="currently-strip__label font-monospace">status.json</div>
      <div className="currently-strip__grid">
        <div className="currently-strip__item">
          <span className="currently-strip__key">focus</span>
          <span className="currently-strip__val">{CURRENTLY.focus}</span>
        </div>
        <div className="currently-strip__item">
          <span className="currently-strip__key">learning</span>
          <span className="currently-strip__val">{CURRENTLY.learning}</span>
        </div>
        <div className="currently-strip__item currently-strip__item--wide">
          <span className="currently-strip__key">timezone</span>
          <span className="currently-strip__val">{CURRENTLY.timezone}</span>
        </div>
        <div className="currently-strip__item currently-strip__item--wide">
          <span className="currently-strip__key">employer</span>
          <span className="currently-strip__val">
            {SITE.company} · {SITE.role}
          </span>
        </div>
      </div>
    </aside>
  );
}

export default CurrentlyStrip;
