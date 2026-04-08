import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { CgWebsite } from "react-icons/cg";
import { BsGithub, BsStar, BsGit, BsClockHistory } from "react-icons/bs";

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Vue: "#41b883",
  null: "#8b5cf6",
};

function langColor(lang) {
  if (!lang) return LANG_COLORS.null;
  return LANG_COLORS[lang] || "#a78bfa";
}

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  } catch {
    return "";
  }
}

function RepoCard({ repo }) {
  const gh = repo.html_url;
  const demo = repo.homepage && /^https?:\/\//i.test(repo.homepage.trim())
    ? repo.homepage.trim()
    : null;
  const color = langColor(repo.language);
  const topics = (repo.topics || []).slice(0, 4);

  return (
    <Card className="repo-card-v2">
      <div className="repo-card-v2__accent" style={{ background: color }} />
      <Card.Body className="repo-card-v2__body">
        <div className="repo-card-v2__head">
          <Card.Title className="repo-card-v2__title">{repo.name}</Card.Title>
          {repo.fork && (
            <Badge bg="secondary" className="repo-card-v2__fork">
              fork
            </Badge>
          )}
        </div>
        <Card.Text className="repo-card-v2__desc">
          {repo.description?.trim() ||
            "No description — explore the repo for implementation details."}
        </Card.Text>
        <div className="repo-card-v2__meta">
          {repo.language && (
            <span className="repo-card-v2__lang">
              <span
                className="repo-card-v2__dot"
                style={{ background: color }}
              />
              {repo.language}
            </span>
          )}
          <span className="repo-card-v2__stat">
            <BsStar aria-hidden /> {repo.stargazers_count ?? 0}
          </span>
          <span className="repo-card-v2__stat">
            <BsGit aria-hidden /> {repo.forks_count ?? 0}
          </span>
          {repo.pushed_at && (
            <span className="repo-card-v2__stat repo-card-v2__stat--muted">
              <BsClockHistory aria-hidden /> {formatDate(repo.pushed_at)}
            </span>
          )}
        </div>
        {topics.length > 0 && (
          <div className="repo-card-v2__topics">
            {topics.map((t) => (
              <Badge key={t} pill bg="dark" className="repo-card-v2__topic">
                {t}
              </Badge>
            ))}
          </div>
        )}
        <div className="repo-card-v2__actions">
          <Button variant="primary" href={gh} target="_blank" rel="noreferrer">
            <BsGithub aria-hidden /> Code
          </Button>
          {demo && (
            <Button
              variant="outline-light"
              href={demo}
              target="_blank"
              rel="noreferrer"
              className="ms-2"
            >
              <CgWebsite aria-hidden /> Live
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default RepoCard;
