import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { BsBriefcase, BsChevronDown, BsChevronUp, BsStars } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { SITE, RECRUITER_BULLETS } from "../../config/site";
import { openCommandPalette } from "./SiteCommandPalette";

function RecruiterSnapshot() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  const onSparkle = useCallback(() => {
    setPulse(true);
    setTimeout(() => setPulse(false), 900);
  }, []);

  return (
    <section
      className={`recruiter-snapshot dev-reveal${pulse ? " recruiter-snapshot--pulse" : ""}`}
      style={{ animationDelay: "0.22s" }}
      aria-label="Recruiter snapshot and quick links"
    >
      <div className="recruiter-snapshot__chrome">
        <div className="recruiter-snapshot__badge" aria-hidden>
          <BsBriefcase />
          <span>For recruiters &amp; hiring managers</span>
        </div>
        <button
          type="button"
          className="recruiter-snapshot__toggle"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="recruiter-snapshot-details"
        >
          <span className="recruiter-snapshot__toggle-text">
            <strong>{SITE.name}</strong>
            <span className="recruiter-snapshot__role">
              — {SITE.role} @ {SITE.company} · {SITE.location}
            </span>
          </span>
          {open ? <BsChevronUp aria-hidden /> : <BsChevronDown aria-hidden />}
        </button>
      </div>

      <div className="recruiter-snapshot__rail" aria-hidden>
        <span className="recruiter-snapshot__rail-dot" />
        <span className="recruiter-snapshot__rail-line" />
      </div>

      <div className="recruiter-snapshot__body">
        <p className="recruiter-snapshot__lede">
          The one-screen brief: what I do, where I ship, and how to reach me.
        </p>
        <div className="recruiter-snapshot__actions">
          <Button
            as={Link}
            to="/resume"
            className="dev-btn dev-btn--primary recruiter-snapshot__btn"
          >
            View resume
          </Button>
          <Button
            as={Link}
            to="/project"
            variant="outline-light"
            className="dev-btn dev-btn--ghost recruiter-snapshot__btn"
          >
            See projects
          </Button>
          <Button
            href={SITE.links.linkedin}
            target="_blank"
            rel="noreferrer"
            variant="outline-light"
            className="dev-btn dev-btn--ghost recruiter-snapshot__btn recruiter-snapshot__btn--icon"
          >
            <FaLinkedinIn className="me-1" aria-hidden />
            LinkedIn
          </Button>
          <Button
            type="button"
            variant="outline-light"
            className="dev-btn dev-btn--ghost recruiter-snapshot__btn d-md-none"
            onClick={() => openCommandPalette()}
          >
            Quick nav
          </Button>
          <Button
            type="button"
            variant="outline-light"
            className="dev-btn dev-btn--ghost recruiter-snapshot__btn recruiter-snapshot__btn--spark"
            onClick={onSparkle}
            aria-label="Highlight this section"
          >
            <BsStars aria-hidden />
          </Button>
        </div>

        <div
          id="recruiter-snapshot-details"
          className={`recruiter-snapshot__details${open ? " is-open" : ""}`}
          aria-hidden={!open}
          role="region"
          aria-label="Hiring brief details"
        >
          <ul className="recruiter-snapshot__list">
            {RECRUITER_BULLETS.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          <p className="recruiter-snapshot__footnote font-monospace small text-muted mb-0">
            Tip: press <kbd className="recruiter-snapshot__kbd">⌘</kbd>
            <kbd className="recruiter-snapshot__kbd">K</kbd> /{" "}
            <kbd className="recruiter-snapshot__kbd">Ctrl</kbd>
            <kbd className="recruiter-snapshot__kbd">K</kbd> for instant navigation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RecruiterSnapshot;
