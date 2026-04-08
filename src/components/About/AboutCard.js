import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { SITE } from "../../config/site";

function AboutCard() {
  return (
    <Card className="quote-card-view dev-panel about-card-v2 border-0">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone — I&apos;m <span className="purple">{SITE.name}</span>{" "}
            from <span className="purple">{SITE.location}</span>.
            <br />
            <br />
            I&apos;m a <span className="purple">{SITE.role}</span> at{" "}
            <span className="purple">{SITE.company}</span>, focused on building
            software that scales and feels great to use. I enjoy owning features
            end-to-end: APIs, data, UI, and the operational story around them.
            <br />
            <br />
            When I&apos;m not shipping at work, you&apos;ll find me on{" "}
            <span className="purple">LeetCode</span>, polishing side projects, or
            learning something new.
            <br />
            <br />
            Beyond engineering, a few things I enjoy:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Chess &amp; strategy games
            </li>
            <li className="about-activity">
              <ImPointRight /> Films &amp; long-form series
            </li>
            <li className="about-activity">
              <ImPointRight /> Travel &amp; good coffee
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            &ldquo;Build things people trust — in code and in craft.&rdquo;
          </p>
          <footer className="blockquote-footer">{SITE.name}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
