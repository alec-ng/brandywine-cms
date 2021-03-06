import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

export default function SnackbarComponent({open, handleClose, message}) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            x
          </IconButton>
        </>
      }
    />
  );
}
