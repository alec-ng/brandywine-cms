import React from "react";
import { useStateValue } from "./state";
import styled from "styled-components";
import "./styles.css";
import Toolbar from "./toolbar";
import Canvas from "./canvas";
import PreviewButton from "./components/preview-button";

/**
 * Highest level rendering component
 */

const BaseContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  height: 100%;
  min-width: ${props =>
    props.readOnly || props.inPreviewMode ? "inherit" : "992px"};
`;
const ToolbarContainer = styled.div`
  flex: 0 0 25%;
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    opacity: 0;
    margin: 3px 0;
  }
`;
const CanvasContainer = styled.div`
  overflow-y: auto;
  flex: ${props => (props.readOnly ? "100%" : "75%")};
  padding: ${props => (props.readOnly || props.inPreviewMode ? "0" : "0 10px")};
  padding-bottom: ${props =>
    props.readOnly || props.inPreviewMode ? "0" : "20px"};
  height: ${props =>
    !props.readOnly && !props.inPreviewMode ? "100%" : "initial"};
`;

export default function App(props) {
  const [{ inPreviewMode, readOnly }] = useStateValue();

  return (
    <BaseContainer readOnly={readOnly} inPreviewMode={inPreviewMode}>
      {!inPreviewMode && !readOnly && (
        <ToolbarContainer>
          <Toolbar />
        </ToolbarContainer>
      )}
      <CanvasContainer readOnly={readOnly} inPreviewMode={inPreviewMode}>
        <Canvas />
      </CanvasContainer>
      {inPreviewMode && <PreviewButton />}
    </BaseContainer>
  );
}
