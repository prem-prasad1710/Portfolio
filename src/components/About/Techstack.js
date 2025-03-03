import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
  DiDocker,
  DiBitbucket,
  DiAws,
  DiDotnet,
  DiGithub,
  DiJira,
  DiRedis,
  DiPostgresql,
  DiMysql,
} from "react-icons/di";
import {
  SiRedis,
  SiFirebase,
  SiNextdotjs,
  SiSolidity,
  SiPostgresql, 
} from "react-icons/si";
import { TbBrandGolang } from "react-icons/tb";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons" title="C++">
        <CgCPlusPlus />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Docker">
        <DiDocker />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Bitbucket">
        <DiBitbucket />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="AWS">
        <DiAws />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Dotnet">
        <DiDotnet />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="GitHub">
        <DiGithub />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Jira">
        <DiJira />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Redis">
        <DiRedis />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="PostgreSQL">
        <DiPostgresql />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="MySQL">
        <DiMysql />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="JavaScript">
        <DiJavascript1 />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="React">
        <DiReact />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Node.js">
        <DiNodejs />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="MongoDB">
        <DiMongodb />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Next.js">
        <SiNextdotjs />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Git">
        <DiGit />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Python">
        <DiPython />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Java">
        <DiJava />
      </Col>
    </Row>
  );
}

export default Techstack;