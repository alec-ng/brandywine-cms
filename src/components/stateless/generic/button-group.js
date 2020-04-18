import React from "react";

/**
 * Renders a group of buttons with radio behaviour
 * Fully controlled active state through keys
 */
export default function ButtonGroup({ 
  buttons,
  activeKey,
  onClick 
}) {
  const buttonList = buttons.map(button => (
    <Button
      key={button.key}
      activeKey={activeKey}
      buttonKey={button.key}
      label={button.label}
      onClick={onClick}
    />
  ));

  return (
    <div className="btn-group btn-group-toggle" style={{ width: "100%" }}>
      {buttonList}
    </div>
  );
}

function Button({
  activeKey,
  buttonKey,
  onClick,
  label
}) {
  let classes = "btn btn-sm btn-secondary";
  if (activeKey === buttonKey) {
    classes += " active";
  }
  return (
    <label className={classes}>
      <input
        type="radio"
        name="options"
        data-buttonkey={buttonKey}
        onClick={onClick}
        autoComplete="off"
      />{" "}
      {label}
    </label>
  );
}
