import React from "react";
import { PRINCIPLES } from "../../config/site";

function PrinciplesRow() {
  return (
    <section className="principles-row mt-5 pt-4">
      <p className="dev-page__label mb-2">./values</p>
      <h2 className="project-heading mb-3">
        How I <span className="purple">work</span>
      </h2>
      <div className="principles-row__grid">
        {PRINCIPLES.map((p) => (
          <article key={p.title} className="principles-row__card">
            <h3 className="principles-row__card-title">{p.title}</h3>
            <p className="principles-row__card-detail">{p.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PrinciplesRow;
