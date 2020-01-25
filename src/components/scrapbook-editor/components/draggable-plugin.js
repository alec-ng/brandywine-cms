import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * Represents a plugin shown in the toolbar that can be dragged and dropped
 * onto the canvas
 */
export default function DraggablePlugin(props) {
  // dataTransfer the the name of the plugin
  function onDragStart(e) {
    e.dataTransfer.setData("dragType", "plugin");
    e.dataTransfer.setData("pluginName", props.plugin.name);
  }

  return (
    <Row draggable="true" onDragStart={onDragStart} className="mb-2">
      <Col
        className="mx-3"
        style={{
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "5px",
          cursor: "move"
        }}
      >
        <h5 className="mt-2">{props.plugin.label}</h5>
        {props.showPluginDescription && (
          <p className="mb-2">{props.plugin.description}</p>
        )}
      </Col>
    </Row>
  );
}
