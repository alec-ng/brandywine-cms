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
export default function ModelComponent({ handleClose, open, locked, children }) {
  // if modal is locked, it should not be dismissable 
  const closeAction = locked ? () => {} : handleClose;

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      open={open}
      onClose={closeAction}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <ModalContainer>{children}</ModalContainer>
      </Fade>
    </Modal>
  );
}
