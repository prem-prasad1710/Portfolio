import React, { useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import prem from "../../Assets/prem.jpeg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import {
  SITE,
  GITHUB_USERNAME,
  LEETCODE_USERNAME,
  PUBLIC_EMAIL,
} from "../../config/site";

function Home2() {
  const lc = SITE.links.leetcode(LEETCODE_USERNAME);
  const [copied, setCopied] = useState(false);
  const copyEmail = useCallback(() => {
    if (!PUBLIC_EMAIL) return;
    const run = async () => {
      try {
        await navigator.clipboard.writeText(PUBLIC_EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* ignore */
      }
    };
    run();
  }, []);

  return (
    <Container fluid className="home-about-section dev-intro" id="about">
      <Container>
        <Row className="align-items-center">
          <Col md={7}>
            <p className="dev-intro__title">README.md</p>
            <h2>
              A bit more <span className="purple">about me</span>
            </h2>
            <p className="dev-intro__body">
              I&apos;m <strong className="text-white">{SITE.name}</strong>, a{" "}
              <span className="purple">{SITE.role}</span> at{" "}
              <span className="purple">{SITE.company}</span> in{" "}
              {SITE.location}. I care about clear interfaces, solid APIs, and
              systems that stay maintainable as they grow.
              <br />
              <br />
              I stay current with modern stacks (TypeScript-first, component
              models, edge-ready deploys, observability, and AI-assisted
              workflows) and ship experiments you can explore on the Projects
              page.
            </p>
          </Col>
          <Col md={5} className="text-center mt-5 mt-md-0">
            <Tilt tiltMax={8} scale={1.02} transitionSpeed={2000}>
              <img
                src={prem}
                className="img-fluid home-avatar dev-intro__avatar"
                alt={SITE.name}
              />
            </Tilt>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={12} className="home-about-social text-md-start text-center">
            <h1>Connect</h1>
            <p>
              <span className="purple">git clone</span> my social graph
            </p>
            <ul className="home-about-social-links justify-content-md-start justify-content-center">
              <li className="social-icons">
                <a
                  href={SITE.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="GitHub"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={lc}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label={`LeetCode ${LEETCODE_USERNAME}`}
                >
                  <SiLeetcode />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={SITE.links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="X"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={SITE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={SITE.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="Instagram"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
            <p className="home-social-meta">
              <span className="font-monospace text-muted">origin</span>{" "}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                className="purple"
                target="_blank"
                rel="noreferrer"
              >
                github.com/{GITHUB_USERNAME}
              </a>
            </p>
            {PUBLIC_EMAIL ? (
              <div className="home-email-copy mt-3">
                <span className="font-monospace small text-muted me-2">mailto:</span>
                <code className="home-email-copy__addr small">{PUBLIC_EMAIL}</code>
                <Button
                  type="button"
                  variant="outline-light"
                  size="sm"
                  className="dev-btn dev-btn--ghost ms-2 font-monospace"
                  onClick={copyEmail}
                >
                  {copied ? "copied" : "copy"}
                </Button>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
