import React from "react";

/**
 * Represents an HTML5 select element
 */
export default function Select(props) {
  let attributes = props.attributes ? Object.assign({}, props.attributes) : {};
  let optionsList = props.defaultRequired
    ? []
    : [
        <option key="nullKey" value="">
          -- Select an option --
        </option>
      ];

  // assume options are list of objects with label/value properties
  let children = props.options.map(option => (
    <option key={option.name} value={option.name}>
      {option.label}
    </option>
  ));

  if (children.length === 1 && props.defaultRequired) {
    // only one default is used
    attributes.disabled = true;
  }
  optionsList.push(children);

  return (
    <div className="form-group">
      <label style={{ width: "100%" }}>
        {props.label}
        <select
          className="form-control"
          onChange={props.onChange}
          {...attributes}
        >
          {optionsList}
        </select>
      </label>
    </div>
  );
}
