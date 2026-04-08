import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Github from "./Github";
import Aboutcard from "./AboutCard";
import AboutSidePlayground from "./AboutSidePlayground";
import LeetCodeShowcase from "../LeetCode/LeetCodeShowcase";
import SkillsSection from "./SkillsSection";
import PrinciplesRow from "../Flair/PrinciplesRow";
import { SITE } from "../../config/site";

function About() {
  return (
    <Container fluid className="about-section dev-page">
      <Container>
        <header className="dev-page__header">
          <p className="dev-page__label">./about</p>
          <h1 className="dev-page__title">
            Engineer, builder, <span className="purple">lifelong learner</span>
          </h1>
          <p className="dev-page__lead">
            {SITE.role} @ {SITE.company} — I combine product sense with strong
            engineering habits: typed codebases, automated checks, and
            observable systems.
          </p>
        </header>

        <Row className="g-4 align-items-start">
          <Col lg={7}>
            <Aboutcard />
          </Col>
          <Col lg={5}>
            <AboutSidePlayground />
          </Col>
        </Row>

        <section className="mt-5 pt-4">
          <h2 className="project-heading mb-1">
            Stack <span className="purple">&amp;</span> toolchain
          </h2>
          <p className="about-page-lead mb-4" style={{ maxWidth: "46rem" }}>
            A visual map of the stack — each tile is a tool I reach for or stay
            sharp on. Icons are sized for clarity; categories are color-coded.
          </p>
          <SkillsSection />
        </section>

        <PrinciplesRow />

        <div className="mt-5 pt-3">
          <Github />
        </div>

        <div className="about-leetcode-wrap">
          <LeetCodeShowcase />
        </div>
      </Container>
    </Container>
  );
}

export default About;
