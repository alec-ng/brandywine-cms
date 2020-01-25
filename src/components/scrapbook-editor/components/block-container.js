import React, { useEffect } from "react";
import styled from "styled-components";

/**
 * Wraps a block in a container that provides focus/draggable functionality
 */

const FocusDiv = styled.div`
  cursor: ${props => (props.locked ? "inherit" : "move")};
  min-height: ${props => (props.locked ? "inherit" : "20px")};
  border: ${props =>
    props.isFocused && !props.locked ? "2pt solid rgba(0,0,0,0.5)" : "none"};
  margin-bottom: ${props =>
    props.locked && props.verticalBlockMargin && !props.omitBottomMargin
      ? props.verticalBlockMargin
      : 0};
`;

// Only refresh if focus is different
const isPropsEqual = function(oldProps, newProps) {
  return (
    oldProps.variation === newProps.variation &&
    oldProps.isFocused === newProps.isFocused &&
    oldProps.locked === newProps.locked &&
    JSON.stringify(oldProps.baseAttrs) === JSON.stringify(newProps.baseAttrs) &&
    JSON.stringify(oldProps.variationAttrs) ===
      JSON.stringify(newProps.variationAttrs)
  );
};

function BlockContainer(props) {
  let containerDivRef = React.createRef();

  // Scroll into view whenever the block is in focus
  useEffect(() => {
    if (props.isFocused && !props.locked) {
      containerDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });

  const onDragStart = function(e) {
    e.dataTransfer.setData("dragType", "block");
    e.dataTransfer.setData("targetBlockId", props.uuid);
  };
  const BlockElement = props.blockElement;
  const isDraggable = props.locked ? {} : { draggable: true };

  return (
    <FocusDiv
      {...isDraggable}
      onDragStart={onDragStart}
      onClick={props.onBlockClick}
      isFocused={props.isFocused}
      verticalBlockMargin={props.verticalBlockMargin}
      locked={props.locked}
      ref={containerDivRef}
      data-uuid={props.uuid}
      omitBottomMargin={props.omitBottomMargin}
    >
      <BlockElement
        isEditable={!props.locked}
        variation={props.variation}
        baseAttrs={props.baseAttrs}
        variationAttrs={props.variationAttrs}
      />
    </FocusDiv>
  );
}

export default React.memo(BlockContainer, isPropsEqual);
