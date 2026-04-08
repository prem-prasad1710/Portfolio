import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Home2 from "./Home2";
import Type from "./Type";
import HeroStats from "./HeroStats";
import PortfolioTerminal from "../Terminal/PortfolioTerminal";
import RecentWork from "./RecentWork";
import CurrentlyStrip from "../Flair/CurrentlyStrip";
import FunFactRotator from "../Flair/FunFactRotator";
import { SITE } from "../../config/site";

function Home() {
  return (
    <section className="dev-hero-page">
      <Container fluid className="home-section">
        <Container className="dev-hero">
          <Row className="align-items-start g-4 g-lg-5">
            <Col lg={6} className="dev-reveal dev-reveal--1">
              <p className="dev-hero__eyebrow">
                <span>$</span> open ./profile
              </p>
              <h1 className="dev-hero__title">
                Hey, I&apos;m{" "}
                <span className="wave" role="img" aria-label="wave">
                  👋
                </span>
              </h1>
              <div className="dev-hero__name">{SITE.name}</div>
              <div className="dev-hero__type">
                <Type />
              </div>
              <p className="dev-hero__desc">{SITE.bio}</p>
              <div className="dev-hero__actions">
                <Button
                  as={Link}
                  to="/project"
                  className="dev-btn dev-btn--primary"
                >
                  ls ./projects
                </Button>
                <Button
                  as={Link}
                  to="/about"
                  variant="outline-light"
                  className="dev-btn dev-btn--ghost"
                >
                  cat ./skills.md
                </Button>
              </div>
            </Col>
            <Col lg={6} className="dev-reveal dev-reveal--2">
              <PortfolioTerminal />
            </Col>
          </Row>
          <div className="dev-reveal dev-reveal--2" style={{ animationDelay: "0.28s" }}>
            <HeroStats />
          </div>
          <RecentWork />
          <CurrentlyStrip />
          <FunFactRotator />
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
