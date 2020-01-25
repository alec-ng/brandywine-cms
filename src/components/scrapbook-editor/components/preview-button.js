import React from "react";
import styled from "styled-components";
import { useStateValue } from "./../state";
import { ACTION_TYPES } from "./../reducers/index";

/**
 * Toggles preview mode by the toolbar
 */

const InPreviewModeButton = styled.button`
  position: fixed;
  width: 150px;
  height: 40px;
  bottom: 5%;
  right: 5%;
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0.4);
  color: rgba(0, 0, 0, 0.4);
`;

export default function PreviewButton(props) {
  const [{ inPreviewMode }, dispatch] = useStateValue();

  function togglePreview(e) {
    dispatch({
      type: ACTION_TYPES.TOGGLE_PREVIEW_MODE
    });
  }

  return (
    <React.Fragment>
      {inPreviewMode ? (
        <InPreviewModeButton
          type="button"
          className="btn btn-block btn-primary"
          onClick={togglePreview}
        >
          Return to Editor
        </InPreviewModeButton>
      ) : (
        <button
          type="button"
          className="btn btn-block btn-primary"
          onClick={togglePreview}
        >
          Preview
        </button>
      )}
    </React.Fragment>
  );
}
