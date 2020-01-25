import React, { useState } from "react";
import styled from "styled-components";

const DropZoneDiv = styled.div`
  z-index: 9999;
  height: 15px;
  background-color: rgba(0, 0, 0, 0.03);
  border: ${props =>
    props.dragEnter
      ? "1px dashed rgba(0,0,0,0.5)"
      : "1px dashed rgba(0,0,0,0.15)"};
  color: rgba(0, 0, 0, 0.5);
`;

const isEqual = function(oldProps, newProps) {
  return oldProps.uuid === newProps.uuid;
};

const DropZone = function(props) {
  const [dragEnter, setDragEnter] = useState(false);

  /**
   * Overwrite browser default behaviour to allow drag n' drop
   */
  function onDragOver(e) {
    e.preventDefault();
  }

  /**
   * Track if an item is dragged over, for CSS
   */
  function setDragLeft(e) {
    setDragEnter(false);
  }
  function setDrag(e) {
    setDragEnter(true);
  }

  return (
    <DropZoneDiv
      data-uuid={props.uuid}
      onDragOver={onDragOver}
      onDrop={props.onDrop}
      onDragLeave={setDragLeft}
      onDragEnter={setDrag}
      dragEnter={dragEnter}
    />
  );
};

export default React.memo(DropZone, isEqual);
