import React from "react";
import styled from "styled-components";
import { openModal, closeModal, close } from "../../../state/actions";

/**
 * Encapsulated exit functionality
 */
export default function PublishControl({ dispatch, save, hasChanged }) {
  function goBack() {
    if (!hasChanged) {
      dispatch(close());
    } else {
      const onSaveAndClose = () => {
        save(true);
      };
      dispatch(
        openModal("unsavedChanges", {
          onExit: closeCurrentPost,
          onSave: onSaveAndClose
        })
      );
    }
  }

  function closeCurrentPost() {
    dispatch(close());
    dispatch(closeModal());
  }

  return (
    <BackBtn type="button" onClick={goBack}>
      &#8592; Posts
    </BackBtn>
  );
}

const BackBtn = styled.button`
  border: none;
  position: absolute;
  background: none;
  padding: 0;
  color: inherit;
  top: 1.6%;
`;
