import React from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const ModalContainer = styled.div`
  background: white;
  padding: 30px;
  width: 350px;
  border-radius: 5px;
`;

/**
 * Modal with backdrop
 */
export default function ModelComponent(props) {
  let closeAction = props.locked ? () => {} : props.handleClose;

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      open={props.open}
      onClose={closeAction}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.open}>
        <ModalContainer>{props.children}</ModalContainer>
      </Fade>
    </Modal>
  );
}
