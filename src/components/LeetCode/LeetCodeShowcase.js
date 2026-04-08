import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { SiLeetcode } from "react-icons/si";
import { useProfileData } from "../../context/ProfileDataContext";

function LeetCodeShowcase() {
  const { leetcode } = useProfileData();
  const { stats, loading, profileUrl, cardImageUrl, username } = leetcode;

  return (
    <Row className="leetcode-section justify-content-center align-items-start g-4">
      <Col lg={5}>
        <h1 className="project-heading text-start">
          LeetCode <strong className="purple">insights</strong>
        </h1>
        <p className="leetcode-lead">
          Practice metrics update from public APIs when available. Open your
          full profile for submissions, contest history, and badges.
        </p>
        {loading && !stats ? (
          <div className="leetcode-loading">
            <Spinner animation="border" size="sm" variant="light" />{" "}
            <span>Loading stats…</span>
          </div>
        ) : stats ? (
          <div className="leetcode-grid glass-panel">
            <div className="leetcode-metric">
              <span className="leetcode-metric__val">{stats.totalSolved ?? "—"}</span>
              <span className="leetcode-metric__lbl">Solved</span>
            </div>
            <div className="leetcode-metric">
              <span className="leetcode-metric__val">{stats.easySolved ?? "—"}</span>
              <span className="leetcode-metric__lbl">Easy</span>
            </div>
            <div className="leetcode-metric">
              <span className="leetcode-metric__val">
                {stats.mediumSolved ?? "—"}
              </span>
              <span className="leetcode-metric__lbl">Medium</span>
            </div>
            <div className="leetcode-metric">
              <span className="leetcode-metric__val">{stats.hardSolved ?? "—"}</span>
              <span className="leetcode-metric__lbl">Hard</span>
            </div>
            {stats.ranking != null && (
              <div className="leetcode-metric leetcode-metric--wide">
                <span className="leetcode-metric__val">#{stats.ranking}</span>
                <span className="leetcode-metric__lbl">Global ranking</span>
              </div>
            )}
          </div>
        ) : (
          <p className="leetcode-fallback">
            Stats API is rate-limited or unavailable — use the card and profile
            link for the full picture.
          </p>
        )}
        <Button
          variant="primary"
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 leetcode-btn"
        >
          <SiLeetcode className="me-2" />
          @{username} on LeetCode
        </Button>
      </Col>
      <Col lg={7} className="text-center">
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="leetcode-card-link"
        >
          <img
            src={cardImageUrl}
            alt={`LeetCode stats for ${username}`}
            className="leetcode-card-img img-fluid"
            loading="lazy"
          />
        </a>
      </Col>
    </Row>
  );
}

export default LeetCodeShowcase;
