import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import Fade from "@material-ui/core/Fade";

const OverlayContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: ${props => (props.type === "linear" ? "initial" : "center")};
  width: 100%;
  padding: 0 20%;
  background-color: white;
`;

export default function LoadingOverlay(props) {
  return (
    <Fade in={props.visible}>
      <OverlayContainer type={props.type}>
        {props.type === "linear" && <LinearProgress />}
        {props.type === "circular" && <CircularProgress />}
      </OverlayContainer>
    </Fade>
  );
}
