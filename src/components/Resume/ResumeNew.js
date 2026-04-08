import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import pdf from "../../Assets/../Assets/PREM's RESUME (2).pdf";
import { getResumeQrUrl } from "../../config/site";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <Container fluid className="resume-section dev-page">
        <header className="dev-page__header text-center text-md-start">
          <p className="dev-page__label">./resume.pdf</p>
          <h1 className="dev-page__title">
            Curriculum <span className="purple">vitae</span>
          </h1>
          <p className="dev-page__lead mx-md-0 mx-auto">
            Preview below or download the PDF for recruiters and ATS tools.
          </p>
        </header>

        <Row className="justify-content-center align-items-center g-4 mb-4">
          <Col xs="auto">
            <Button
              variant="primary"
              href={pdf}
              target="_blank"
              className="dev-btn dev-btn--primary"
            >
              <AiOutlineDownload />
              &nbsp;Download PDF
            </Button>
          </Col>
          <Col xs="auto">
            <div className="resume-qr text-center text-md-start">
              <p className="font-monospace small text-muted mb-2 resume-qr__label">
                scan → profile
              </p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&ecc=M&data=${encodeURIComponent(
                  getResumeQrUrl()
                )}`}
                alt="QR code linking to public profile"
                className="resume-qr__img d-block mx-auto mx-md-0"
                width={140}
                height={140}
                loading="lazy"
              />
              <p className="small text-muted mt-2 mb-0 resume-qr__caption">
                Encodes the profile URL from your site config (LinkedIn by default — change in{" "}
                <code className="text-muted">site.js</code>).
              </p>
            </div>
          </Col>
        </Row>

        <div className="dev-panel p-3 p-md-4 mb-4">
          <Row className="resume justify-content-center">
            <Document file={pdf} className="d-flex justify-content-center">
              <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
            </Document>
          </Row>
        </div>

        <Row className="justify-content-center">
          <Col xs="auto">
            <Button
              variant="primary"
              href={pdf}
              target="_blank"
              className="dev-btn dev-btn--primary"
            >
              <AiOutlineDownload />
              &nbsp;Download PDF
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
