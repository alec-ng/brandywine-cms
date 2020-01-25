import React from "react";
import styled from "styled-components";
import { GROUPING_KEYS } from "../post-util";

const InitContainer = styled.div`
  display: flex;
  text-align: center;
  height: 80vh;
  justify-content: center;
  flex-direction: column;
`;
const GroupButton = styled.button`
  width: 200px;
  margin: 5px auto 10px auto;
`;

/**
 * Renders group of buttons for each index collection defined in post-util.js
 */
export default function GroupingButtons(props) {
  const buttons = GROUPING_KEYS.map(key => (
    <GroupButton
      className="btn btn-info"
      type="button"
      onClick={props.onClick}
      data-post={key}
      key={key}
    >
      {key}
    </GroupButton>
  ));

  return (
    <InitContainer>
      <h2>Select a post grouping to work with</h2>
      {buttons}
    </InitContainer>
  );
}
