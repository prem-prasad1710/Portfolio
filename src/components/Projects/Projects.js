import React from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import RepoCard from "./RepoCard";
import { useProfileData } from "../../context/ProfileDataContext";
import { GITHUB_USERNAME } from "../../config/site";

function Projects() {
  const { github } = useProfileData();
  const {
    repos,
    loading,
    error,
    usingFallback,
    fromBrowserCache,
    repoFetchIncomplete,
  } = github;

  const githubReposTab = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;

  return (
    <Container fluid className="project-section dev-page">
      <Container>
        <header className="dev-page__header dev-reveal dev-reveal--1">
          <p className="dev-page__label">./projects — watch *.git</p>
          <h1 className="dev-page__title">
            GitHub <span className="purple">repositories</span>
          </h1>
          <p className="dev-page__lead">
            Fetches <strong>all pages</strong> of your public repos (
            <span className="font-monospace">type=all</span>, 100 per page).
            Open your profile for anything the API can&apos;t show.
          </p>
          <Button
            as="a"
            href={githubReposTab}
            target="_blank"
            rel="noreferrer"
            variant="outline-light"
            size="sm"
            className="dev-btn dev-btn--ghost mb-3"
          >
            Open @{GITHUB_USERNAME} on GitHub →
          </Button>
        </header>

        {usingFallback && !loading && (
          <Alert variant="info" className="dev-panel border-0 dev-reveal">
            <strong>Placeholder list only (2 repos).</strong> GitHub blocked the
            first request from this IP. Add{" "}
            <code className="text-dark">REACT_APP_GITHUB_TOKEN</code> to{" "}
            <code className="text-dark">.env.local</code> and restart{" "}
            <code className="text-dark">npm start</code> — or load this site once
            on a good network so we can save your full list in the browser (see
            below).
          </Alert>
        )}

        {fromBrowserCache && !usingFallback && !loading && (
          <Alert variant="warning" className="dev-panel border-0 dev-reveal">
            <strong>Showing your last good repo list from this browser.</strong>{" "}
            GitHub is rate-limiting right now. After a successful fetch we cache
            up to 14 days. Add a token for live sync anytime.
          </Alert>
        )}

        {repoFetchIncomplete && !loading && (
          <Alert variant="warning" className="dev-panel border-0 dev-reveal">
            <strong>List truncated.</strong> Rate limit hit while loading page 2+.
            Showing {repos.length} repos we got before the limit — add{" "}
            <code className="text-dark">REACT_APP_GITHUB_TOKEN</code> to fetch all
            pages reliably.
          </Alert>
        )}

        {loading && (
          <div className="projects-state font-monospace text-muted">
            <Spinner animation="border" size="sm" role="status" />{" "}
            <span className="ms-2">
              GET /users/{GITHUB_USERNAME}/repos?page=…&amp;per_page=100 …
            </span>
          </div>
        )}

        {!loading && !error && (
          <p className="font-monospace small text-muted mb-3">
            Showing <strong className="text-white">{repos.length}</strong>{" "}
            repositories
          </p>
        )}

        {error && !loading && (
          <Alert variant="danger" className="dev-panel border-0">
            <strong>Network error</strong> — {error}
          </Alert>
        )}

        {!loading && !error && repos.length === 0 && (
          <p className="projects-empty font-monospace">No public repos found.</p>
        )}

        <Row className="justify-content-center repo-grid">
          {repos.map((repo, i) => (
            <Col
              key={repo.id ?? `${repo.full_name || repo.name}-${i}`}
              lg={4}
              md={6}
              className="repo-grid__col dev-reveal-card"
              style={{ animationDelay: `${Math.min(i, 8) * 0.06}s` }}
            >
              <RepoCard repo={repo} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
