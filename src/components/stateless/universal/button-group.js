import React from "react";

/**
 * Renders a group of buttons with radio behaviour
 * Fully controlled active state through keys
 */
export default function ButtonGroup(props) {
  const buttonList = props.buttons.map(button => (
    <Button
      key={button.key}
      activeKey={props.activeKey}
      buttonKey={button.key}
      label={button.label}
      onClick={props.onClick}
    />
  ));

  return (
    <div className="btn-group btn-group-toggle" style={{ width: "100%" }}>
      {buttonList}
    </div>
  );
}

function Button(props) {
  let classes = "btn btn-secondary";
  if (props.activeKey === props.buttonKey) {
    classes += " active";
  }
  return (
    <label className={classes}>
      <input
        type="radio"
        name="options"
        data-buttonkey={props.buttonKey}
        onClick={props.onClick}
        autoComplete="off"
      />{" "}
      {props.label}
    </label>
  );
}
