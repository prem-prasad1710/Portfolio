import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function NotFound() {
  return (
    <Container fluid className="not-found dev-page">
      <Container className="not-found__inner">
        <p className="not-found__status font-monospace">HTTP 404</p>
        <h1 className="not-found__title">
          This path <span className="purple">does not exist</span>
        </h1>
        <pre className="not-found__terminal" aria-hidden="true">
{`$ curl https://you.example/missing
curl: (404) Not Found

$ ls ./
home  about  projects  resume`}
        </pre>
        <p className="not-found__hint text-muted">
          Maybe a typo in the URL — or you&apos;re exploring. Either way,
          you&apos;re not lost for long.
        </p>
        <Button as={Link} to="/" className="dev-btn dev-btn--primary me-2">
          cd ~
        </Button>
        <Button
          as={Link}
          to="/project"
          variant="outline-light"
          className="dev-btn dev-btn--ghost"
        >
          ls ./projects
        </Button>
      </Container>
    </Container>
  );
}

export default NotFound;
