import React from "react";
import { Row, Col } from "react-bootstrap";
import { BsPeople, BsFolder2Open, BsCalendar3 } from "react-icons/bs";
import { useProfileData } from "../../context/ProfileDataContext";

function StatBox({ icon, label, value, sub }) {
  return (
    <Col xs={6} md={3} className="hero-stat-col">
      <div className="hero-stat glass-panel">
        <div className="hero-stat__icon" aria-hidden>
          {icon}
        </div>
        <div className="hero-stat__value">{value}</div>
        <div className="hero-stat__label">{label}</div>
        {sub && <div className="hero-stat__sub">{sub}</div>}
      </div>
    </Col>
  );
}

function HeroStats() {
  const { github, leetcode } = useProfileData();
  const p = github.profile;

  const repos =
    github.loading && !p
      ? "..."
      : github.error && !p
      ? "—"
      : (p?.public_repos ?? github.repos?.length ?? "—").toString();

  const followers =
    github.loading && !p
      ? "..."
      : github.error && !p
      ? "—"
      : (p?.followers ?? 0).toString();

  const joined =
    !p?.created_at || github.error
      ? null
      : new Date(p.created_at).getFullYear().toString();

  const lcTotal =
    leetcode.loading && !leetcode.stats
      ? "…"
      : leetcode.stats?.totalSolved != null
      ? String(leetcode.stats.totalSolved)
      : "—";

  const gitHubSub = github.loading
    ? "Syncing GitHub"
    : github.fromBrowserCache
    ? "GitHub cached"
    : github.usingFallback
    ? "GitHub fallback"
    : "Live from GitHub";

  const leetCodeSub = leetcode.loading
    ? "Syncing LeetCode"
    : leetcode.fromCache
    ? "LeetCode cached"
    : "Live from LeetCode";

  return (
    <Row className="hero-stats-row g-3">
      <StatBox
        icon={<BsFolder2Open />}
        label="Public repos"
        value={repos}
        sub={gitHubSub}
      />
      <StatBox
        icon={<BsPeople />}
        label="Followers"
        value={followers}
        sub={gitHubSub}
      />
      <StatBox
        icon={
          <span className="hero-stat__lc" aria-hidden>
            LC
          </span>
        }
        label="Problems solved"
        value={lcTotal}
        sub={leetCodeSub}
      />
      <StatBox
        icon={<BsCalendar3 />}
        label="On GitHub since"
        value={joined || "—"}
        sub="Member since"
      />
    </Row>
  );
}

export default HeroStats;
