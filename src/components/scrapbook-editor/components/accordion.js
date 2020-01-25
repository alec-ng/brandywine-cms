import React from "react";
import BootstrapAccordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/**
 * Wraps its children in a collapsible accordion
 */
export default function Accordion(props) {
  let openOnDefault = props.openOnDefault === true ? "0" : "1";

  return (
    <BootstrapAccordion defaultActiveKey={openOnDefault}>
      <Card>
        <Card.Header>
          <BootstrapAccordion.Toggle as={Button} variant="link" eventKey="0">
            {props.title}
          </BootstrapAccordion.Toggle>
        </Card.Header>
        <BootstrapAccordion.Collapse eventKey="0">
          <Card.Body>{props.children}</Card.Body>
        </BootstrapAccordion.Collapse>
      </Card>
    </BootstrapAccordion>
  );
}
