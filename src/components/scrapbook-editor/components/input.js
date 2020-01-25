import React from "react";

/**
 * Represents an HTML5 input. Requires at least props.onInput to handle any
 * changes, and type to defined data type expected
 */
export default function Input(props) {
  return (
    <div className="form-group">
      <label style={{ width: "100%" }}>
        {props.label}
        {props.type === "checkbox" ? (
          <CheckboxInput {...props} />
        ) : (
          <BaseInput {...props} />
        )}
      </label>
    </div>
  );
}

function BaseInput(props) {
  let inputClass =
    props.type === "range" ? "form-control-range" : "form-control";
  return (
    <input
      type={props.type}
      data-key={props.dataKey}
      className={inputClass}
      onChange={props.handleOnChange}
      {...props.attributes}
    />
  );
}

// Encapsulates checked logic specific to checkboxes
function CheckboxInput(props) {
  // Convert value to checked property
  let attributeObj = props.attributes
    ? Object.assign({}, props.attributes)
    : {};
  attributeObj.checked = attributeObj.value;
  let newProps = Object.assign({}, props, { attributes: attributeObj });
  return <BaseInput {...newProps} />;
}
