import React from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsBoxArrowUpRight, BsGit, BsClockHistory } from "react-icons/bs";
import { useProfileData } from "../../context/ProfileDataContext";

function formatWhen(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function RecentWork() {
  const { github } = useProfileData();
  const { recentWork, loading, usingFallback, fromBrowserCache } = github;
  const shownCount = Math.min(recentWork.length, 5);

  if (loading && recentWork.length === 0) {
    return (
      <section className="recent-work recent-work--loading dev-reveal">
        <div className="recent-work__head">
          <p className="recent-work__label">git log --oneline -5</p>
          <h2 className="recent-work__title">
            Recent <span className="purple">activity</span>
          </h2>
        </div>
        <div className="recent-work__spinner text-muted font-monospace small">
          <Spinner animation="border" size="sm" className="me-2" />
          Loading push activity…
        </div>
      </section>
    );
  }

  if (recentWork.length === 0) return null;

  return (
    <section className="recent-work dev-reveal" style={{ animationDelay: "0.35s" }}>
      <div className="recent-work__head">
        <p className="recent-work__label">git log --oneline -5</p>
        <h2 className="recent-work__title">
          Top {shownCount || 5} repos by <span className="purple">recent commits</span>
        </h2>
        <p className="recent-work__sub">
          Ordered from your latest <span className="font-monospace">PushEvent</span> feed when GitHub
          allows it; otherwise by last repository push time.
          {usingFallback || fromBrowserCache ? (
            <>
              {" "}
              <span className="text-warning">
                {fromBrowserCache && !usingFallback
                  ? "(Showing data from your last successful load in this browser.)"
                  : "(Limited data — add REACT_APP_GITHUB_TOKEN for live GitHub.)"}
              </span>
            </>
          ) : null}
        </p>
      </div>

      <Row className="g-3">
        {recentWork.map((item, i) => (
          <Col key={item.key} md={6} xl={4}>
            <article className="recent-work__card" style={{ animationDelay: `${0.05 * i}s` }}>
              <div className="recent-work__card-top">
                <span className="recent-work__idx">{i + 1}</span>
                <a
                  href={item.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="recent-work__repo-name"
                >
                  {item.name}
                  <BsBoxArrowUpRight className="recent-work__ext" aria-hidden />
                </a>
              </div>
              <p className="recent-work__desc">
                {item.description?.trim() || <span className="text-muted">No description</span>}
              </p>
              <div className="recent-work__meta font-monospace">
                {item.language && <span className="recent-work__pill">{item.language}</span>}
                <span className="recent-work__pill">
                  <BsClockHistory aria-hidden /> {formatWhen(item.activityAt)}
                </span>
                {item.commitsInLastPush != null && item.source === "push_event" ? (
                  <span className="recent-work__pill recent-work__pill--accent">
                    <BsGit aria-hidden /> +{item.commitsInLastPush} in last push
                  </span>
                ) : null}
                {item.stargazers_count != null ? (
                  <span className="recent-work__pill">★ {item.stargazers_count}</span>
                ) : null}
              </div>
            </article>
          </Col>
        ))}
      </Row>

      <p className="recent-work__footer text-center text-muted small mt-3 mb-0">
        <Link to="/project" className="purple text-decoration-none">
          View all repositories →
        </Link>
      </p>
    </section>
  );
}

export default RecentWork;
