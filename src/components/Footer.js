import React from "react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { SITE, LEETCODE_USERNAME } from "../config/site";
import { Container } from "react-bootstrap";

function Footer() {
  const year = new Date().getFullYear();
  const lc = SITE.links.leetcode(LEETCODE_USERNAME);

  return (
    <footer className="dev-footer">
      <Container fluid className="footer px-3 px-md-4">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 py-2">
          <div className="d-flex flex-column align-items-center align-items-md-start gap-1">
            <p className="font-monospace small text-muted mb-0">
              <span style={{ color: "var(--dev-accent)" }}>➜</span> ~/portfolio{" "}
              <span className="text-white">git status</span>
              <span className="text-muted"> — clean · © {year}</span>
            </p>
            <p className="font-monospace small text-muted mb-0 dev-footer__craft">
              Hand-built React shell — no template dump.
            </p>
          </div>
          <ul className="footer-icons d-flex gap-2 list-unstyled mb-0">
            <li className="social-icons">
              <a
                href={SITE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href={lc}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
              >
                <SiLeetcode />
              </a>
            </li>
            <li className="social-icons">
              <a
                href={SITE.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <AiOutlineTwitter />
              </a>
            </li>
            <li className="social-icons">
              <a
                href={SITE.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href={SITE.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
