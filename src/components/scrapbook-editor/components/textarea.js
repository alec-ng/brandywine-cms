import React from "react";

/**
 * Represents an HTML5 textarea element
 */
export default function TextArea(props) {
  let numRows = props.attributes.rows || 5;

  return (
    <div className="form-group">
      <label style={{ width: "100%" }}>
        {props.label}
        <textarea
          onChange={props.handleOnChange}
          className="form-control"
          rows={numRows}
          {...props.attributes}
        >
          {props.value}
        </textarea>
      </label>
    </div>
  );
}
