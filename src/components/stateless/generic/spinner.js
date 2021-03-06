import React from "react";

/*
 * Bootstrap style spinner
 * Use as content for a button of class btn
 */ 
export default function Spinner() {
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
