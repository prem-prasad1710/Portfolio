import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
  SiMacos,
  SiFigma,
  SiCodesandbox,
  SiCodecademy,
  SiAdobeillustrator,
  SiAdobelightroom,
  SiAdobephotoshop,
  SiLeetcode,
  SiCodechef,
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons" title="VS Code">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Leetcode">
        <SiLeetcode />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="CodeChef">
        <SiCodechef />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Figma">
        <SiFigma />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="CodeSandbox">
        <SiCodesandbox />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Codecademy">
        <SiCodecademy />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Adobe Illustrator">
        <SiAdobeillustrator />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Adobe Lightroom">
        <SiAdobelightroom />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Adobe Photoshop">
        <SiAdobephotoshop />
      </Col>
    </Row>
  );
}

export default Toolstack;