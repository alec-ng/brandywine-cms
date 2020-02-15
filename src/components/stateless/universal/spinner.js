import React from "react";

// bootstrap style spinner, meant to be used in the body of a button of class btn
export default function Spinner(props) {
  return (
    <div
      className="spinner-border spinner-border-sm"
      role="status"
      style={{
        marginBottom: "2px",
        marginRight: "5px"
      }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
