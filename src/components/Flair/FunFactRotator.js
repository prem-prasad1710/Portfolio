import React, { useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import { FUN_FACTS } from "../../config/site";
import { BsArrowRepeat, BsLightbulb } from "react-icons/bs";

function FunFactRotator() {
  const len = FUN_FACTS.length;
  const [i, setI] = useState(() =>
    len ? Math.floor(Math.random() * len) : 0
  );
  const fact = useMemo(() => (len ? FUN_FACTS[i % len] : ""), [i, len]);

  if (!len) return null;

  return (
    <aside className="fun-fact dev-reveal" style={{ animationDelay: "0.4s" }}>
      <div className="fun-fact__head">
        <BsLightbulb className="fun-fact__icon" aria-hidden />
        <span className="fun-fact__title font-monospace">random_fact()</span>
        <Button
          type="button"
          variant="link"
          className="fun-fact__shuffle p-0 ms-auto font-monospace"
          onClick={() => {
            if (FUN_FACTS.length <= 1) return;
            let next = i;
            while (next === i) next = Math.floor(Math.random() * FUN_FACTS.length);
            setI(next);
          }}
          aria-label="Another fact"
        >
          <BsArrowRepeat className="me-1" />
          shuffle
        </Button>
      </div>
      <blockquote className="fun-fact__quote">&ldquo;{fact}&rdquo;</blockquote>
    </aside>
  );
}

export default FunFactRotator;
